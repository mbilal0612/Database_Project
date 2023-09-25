const express = require("express");

const app = express();
const adminRouter = require("./routes/adminRouter").adminRouter;

app.use(express.json());

app.use("/admin", adminRouter);

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
