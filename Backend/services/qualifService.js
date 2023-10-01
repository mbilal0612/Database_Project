const db = require("../config/db").connection;

//This is to add a qualification to a faculty
const linkQualification = (req, res) => {
  obj = req.body;
  if (!obj.facultyID) {
    return res.status(400).json({ message: "Need faculty ID to add to" });
  }
  if (!obj.qualificationID) {
    return res.status(400).json({ message: "Need qualification ID to add" });
  }
  var temp = parseInt(obj.facultyID.substring(1, obj.facultyID.length));
  db.query(
    {
      sql: "INSERT INTO ?? (??,??) VALUES (? ,?)",
      values: [
        "FACULTY_QUALIFICATION",
        "FACULTY_ID",
        "QUALIFICATION_ID",
        temp,
        obj.qualificationID,
      ],
    },
    (error, result, fields) => {
      if (error) return res.status(500).json({ message: "unkown error!" });
      return res
        .status(200)
        .json({ message: "qualification successfully added to faculty" });
    }
  );
};

const createQualification = (req, res) => {
  console.log("it reaches this")
  obj = req.body;
  if (!obj.qualification) {
    return res
      .status(400)
      .json({ message: "Need qualification to add to table" });
  }
  db.query({
    sql: "INSERT INTO ?? (??) VALUES (?)",
    values: ["QUALIFICATION", "NAME", obj.qualification],
  },
    (error, results, fields)=>{
      if(error) return res.status(400).json({message: "unkown error occured!"});
      else return res.status(200).json({message:"New qualification added to list"});
    }
  );
};

module.exports = {
  linkQualification,
  createQualification,
};
