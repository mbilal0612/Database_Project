const createUser = function (req, res) {
  try {

  } catch (err) {
    res.status(500).send("Something went wrong please try again later...");
  }
  res.send("!!!");
};
module.exports = {
  createUser,
};
