const express = require("express");

const app = express();
const {connectDB} = require("./config/db");
const adminRouter = require("./routes/adminRouter");
const authRouter = require("./routes/authRouter");

connectDB();

app.use(express.json());

app.use("/admin", adminRouter);
app.use("/auth", authRouter);

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
