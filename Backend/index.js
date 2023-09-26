const express = require("express");

const app = express();
const adminRouter = require("./routes/adminRouter").adminRouter;

app.use(express.json());

app.get("/", (req, res) =>{

  res.status(500).send("It appears that you are gay!");

})
app.use("/admin", adminRouter);

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
