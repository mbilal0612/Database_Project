const jwt = require("jsonwebtoken");
const privateKey = "NOONEcanCRACKthis";
db = require("../config/db").connection;

module.exports = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ message: "Access is Denied" });
  // console.log(token);
  var tbf = jwt.verify(token, privateKey);
  req.details = tbf;
  // console.log(req.details);
  // console.log(tbf.userId);
  db.query(
    {
      sql: "SELECT * FROM ?? WHERE ?? = ?",
      values: ["USERS", "USER_ID", tbf.id],
    },
    (errors, results, fields) => {
        console.log(results);
        if(errors) return res.status(500).json({message: "An unknown error has occured"});
        if(results.length===0) return res.status(401).json({message: "User not found"});
        req.details = results[0];
        next();
    }
  );
};
