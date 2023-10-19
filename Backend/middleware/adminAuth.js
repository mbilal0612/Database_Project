module.exports = function (req, res, next) {
    if (req.details.ROLE_ID != "ADMIN")
      return res.status(403).send({ message: "Access Denied!" });
  
    next();
  };