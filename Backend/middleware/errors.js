 const errors = (err, req, res, next) =>{
    //log exception here
    console.log(err);
    // return res.status(500).send("Something failed. Please try again later");
    return res.status(500).json({"message":"Error handler"});
  };

module.exports = errors;