const jwt = require("jsonwebtoken");
const privateKey = "NOONEcanCRACKthis";

const decryptToken = function (req, res) {
  try {
    const obj = req.params;
    if(!obj.token) res.status(400).json({message:"token not sent"});
    var tbf = jwt.verify(obj.token, privateKey);
    
    return res.json(tbf);
  } catch (err) {
    res.status(500).json({message: "Something went wrong..."});
  }
};
module.exports = {
  decryptToken,
};
