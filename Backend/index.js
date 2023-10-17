const express = require("express");
const errors = require("./middleware/errors");

const app = express();
const {connectDB} = require("./config/db");
const adminRouter = require("./routes/adminRouter");
const authRouter = require("./routes/authRouter");
const studentRouter = require("./routes/studentRouter");
const guardianRouter = require("./routes/guardianRouter");
const facultyRouter = require("./routes/facultyRouter");


connectDB();

app.use(express.json());

app.use("/admin", adminRouter);
app.use("/auth", authRouter);
app.use("/student", studentRouter);
app.use("/faculty", facultyRouter);
app.use("/guardian", guardianRouter);

app.use(errors);

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
