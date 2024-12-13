const express = require("express");
const client = require("prom-client");
const errors = require("./middleware/errors");
const { createLogger, transports } = require("winston");
const LokiTransport = require("winston-loki");  
const env = require('dotenv').config();
const app = express();
const cors = require('cors')
const {connectDB} = require("./config/db");
const adminRouter = require("./routes/adminRouter");
const authRouter = require("./routes/authRouter");
const studentRouter = require("./routes/studentRouter");
const guardianRouter = require("./routes/guardianRouter");
const facultyRouter = require("./routes/facultyRouter");
const collectDefaultMetrics = client.collectDefaultMetrics;
const responseTime = require("response-time");

const options = {

  transports: [
    new LokiTransport({
      host: "http://127.0.0.1:3100"
    })
  ]
};
const logger = createLogger(options);


const reqResTime = new client.Histogram({
  name:"http_express_req_res_time",
  help: "This tells how much time is taken by req and res",
  labelNames: ["method", "route", "status_code"],
  buckets: [1,50,100,200,400,500, 800, 1000, 2000]
});

const totalReqCounter = new client.Counter({
  name : "total_req",
  help : 'TOtal total req'
});

collectDefaultMetrics({ register: client.register });  

connectDB();
app.use(cors())
app.use(express.json());

app.use("/admin", adminRouter);
app.use("/auth", authRouter);
app.use("/student", studentRouter);
app.use("/faculty", facultyRouter);
app.use("/guardian", guardianRouter);

app.use(errors);

app.use((req, res, next) => {
    logger.info(`${req.method} ${req.url}`);
});

app.use(responseTime((req,res,time)=>{
  totalReqCounter.inc(); 
  reqResTime.labels({
      method: req.method,
      route: req.url,
      status_code:res.statusCode
  })
  .observe(time);

}));





app.get("/metrics", async (req, res) => {
  res.setHeader('Content-Type', client.register.contentType);
  const metrics = await client.register.metrics();
  res.send(metrics);


});



const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
}); 

module.exports = { logger}