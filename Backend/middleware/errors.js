module.exports = function (err, req, res, next) {
    //log exception here
    console.log(err)
    return res.status(500).send("Something failed.. Please try again later");
  };