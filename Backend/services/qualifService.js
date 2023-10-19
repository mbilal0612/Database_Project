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

  //Need to add check for faculty existence,
  db.query({
    sql: "SELECT * FROM ?? WHERE ?? = ?",
    values: ["QUALIFICATION", "QUALIFICATION_ID", obj.qualificationID],
  }, (error, results, fields)=>{
    if (error) return res.status(500).json({ message: "unkown error!" });
      if (results.length === 0)
        return res.status(400).json({ message: "Qualification DNE" });
        db.query(
          {
            sql: "SELECT * FROM ?? WHERE ?? = ?",
            values: ["USERS", "USER_ID", obj.facultyID],
          },
          (error, results, fields) => {
            if (error) return res.status(500).json({ message: "unkown error!" });
            if (results.length === 0)
              return res.status(400).json({ message: "User DNE" });
            db.query(
              {
                sql: "INSERT INTO ?? (??,??) VALUES (? ,?)",
                values: [
                  "FACULTY_QUALIFICATION",
                  "FACULTY_ID",
                  "QUALIFICATION_ID",
                  obj.facultyID,
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
          }
        );
  });
  
};

const createQualification = (req, res) => {
  console.log("it reaches this");
  obj = req.body;
  if (!obj.qualification) {
    return res
      .status(400)
      .json({ message: "Need qualification to add to table" });
  }
  db.query(
    {
      sql: "INSERT INTO ?? (??) VALUES (?)",
      values: ["QUALIFICATION", "NAME", obj.qualification],
    },
    (error, results, fields) => {
      if (error)
        return res.status(400).json({ message: "unkown error occured!" });
      else
        return res
          .status(200)
          .json({ message: "New qualification added to list" });
    }
  );
};
const getQualifs = (req, res) => {
  var obj = req.params;
  if (!obj.facultyID) {
    return res.status(400).json({
      message: "Please select the faculty you want to generate the report for",
    });
  }
  var id = parseInt(obj.facultyID.substring(1, obj.facultyID.length));
  db.query(
    {
      sql: "SELECT ?? FROM ?? INNER JOIN ?? ON ??=?? WHERE ??=?",
      values: [
        "QUALIFICATION.NAME",
        "QUALIFICATION",
        "FACULTY_QUALIFICATION",
        "QUALIFICATION.QUALIFICATION_ID",
        "FACULTY_QUALIFICATION.QUALIFICATION_ID",
        "FACULTY_QUALIFICATION.FACULTY_ID",
        id,
      ],
    },
    (error, results, fields) => {
      if (error)
        return res.status(500).json({
          message: "An unknown error has occured",
        });
      else {
        var qua = [];
        for (var i = 0; i < results.length; i++) {
          qua.push(results[i].NAME);
        }
        return res.status(200).json({
          message: "report successfully generated",
          qualifcations: qua,
        });
      }
    }
  );
};
const deleteQualification_faculty = (req, res) => {
  obj = req.body;
  if (!obj.facultyID)
    return res.status(400).json({
      message: "Faculty not mentioned",
    });
  if (!obj.qualifID)
    return res.status(400).json({
      message: "Please select the qualification you want to delete",
    });
  var facID = parseInt(obj.facultyID.substring(1, obj.facultyID.length));

  // Need to add check for link existence

  db.query(
    {
      sql: "DELETE FROM ?? WHERE ?? = ? AND ?? = ?",
      values: [
        "FACULTY_QUALIFICATION",
        "FACULTY_ID",
        facID,
        "QUALIFICATION_ID",
        obj.qualifID,
      ],
    },
    (error, results, fields) => {
      if (error) {
        return res.status(500).json({ message: "An unkown error has occured" });
      }
      if (results.affectedRows == 0)
        return res.status(400).json({
          message: "the following Faculty-->qualification does not exist",
        });
      else
        return res.status(200).json({
          message:
            "The following qualification has been deleted from this faculty's record",
        });
    }
  );
};
const deleteQualification = (req, res) => {
  obj = req.body;
  if (!obj.qualifID)
    return res.status(400).json({
      message: "Please select the qualification you want to delete",
    });
  db.query(
    {
      sql: "DELETE FROM ?? WHERE ?? = ?",
      values: ["QUALIFICATION", "QUALIFICATION_ID", obj.qualifID],
    },
    (error, results, fields) => {
      if (error) {
        return res.status(500).json({ message: "An unkown error has occured" });
      }
      if (results.affectedRows == 0)
        return res
          .status(400)
          .json({ message: "the following qualification does not exist" });
      else
        return res.status(200).json({
          message:
            "All records of the following qualification have been deleted",
        });
    }
  );
};
const getAllQualifications = (req, res) => {
  db.query(
    { sql: "SELECT ?? FROM ??", values: ["NAME", "QUALIFICATION"] },
    (err, results, fields) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: "unkown error occured" });
      }
      qualifs = [];
      for (var i = 0; i < results.length; i++) {
        qualifs.push(results[i].NAME);
      }
      return res.status(200).json({
        message: "report successfully generated",
        qualifications: qualifs,
      });
    }
  );
};

module.exports = {
  linkQualification,
  createQualification,
  getQualifs,
  deleteQualification_faculty,
  deleteQualification,
  getAllQualifications,
};
