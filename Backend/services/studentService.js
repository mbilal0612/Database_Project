const db = require("../config/db").connection;
const bcrypt = require("bcrypt");
const defaultPass = "12345678";

const createStudent = (req, res) => {
  const obj = req.body;

  if (!obj.firstName) {
    return res.status(400).json({ message: "firstName is required!" });
  }
  if (!obj.lastName) {
    return res.status(400).json({ message: "lastName is required!" });
  }
  if (!obj.CNIC) {
    return res.status(400).json({ message: "CNIC is required!" });
  }
  if (!obj.gender) {
    return res.status(400).json({ message: "Gender is required!" });
  }
  if (!obj.religion) {
    return res.status(400).json({ message: "religion is required!" });
  }
  if (!obj.nationality) {
    return res.status(400).json({ message: "nationality is required!" });
  }
  if (!obj.dateOfBirth) {
    return res.status(400).json({ message: "dateOfBirth is required!" });
  }
  if (!obj.admissionDate) {
    return res.status(400).json({ message: "admissionDate is required!" });
  }
  if (!obj.emergencyContact) {
    return res.status(400).json({ message: "emergency contact is required!" });
  }

  //TODO: QUERY INTO DATABASE
  db.query(
    {
      sql: "INSERT INTO ?? (??,??,??,??,??,??,??,??,??) VALUES (?,?,?,?,?,?,?,?,?)",
      timeout: 40000, //40s
      values: [
        "STUDENT",
        "CNIC",
        "FIRST_NAME",
        "LAST_NAME",
        "DOB",
        "GENDER",
        "EMERGENCY_CONTACT",
        "ADMISSION_DATE",
        "NATIONALITY",
        "RELIGION",
        obj.CNIC,
        obj.firstName,
        obj.lastName,
        obj.dateOfBirth,
        obj.gender,
        obj.emergencyContact,
        obj.admissionDate,
        obj.nationality,
        obj.religion,
      ],
    },

    function (error, results, fields) {
      if (error) {
        //TODO:UPDATE error response properly
        return res.status(500).send(error.message);
      } else {
        //generate erp for the user
        db.query(
          {
            sql: "SELECT ?? FROM ?? WHERE ?? = ?",
            timeout: 40000,
            values: ["STUDENT_ID", "STUDENT", "CNIC", obj.CNIC],
          },
          (error1, results1, fields1) => {
            if (error1) {
              return res.status(500).send(error1);
            } else {
              bcrypt.hash(defaultPass, 10, function (err, hash) {
                if (err) return res.status(500).send(err);
                else {
                  // console.log(results1);
                  // console.log(fields1);
                  var userName = results1[0].STUDENT_ID;

                  userName = "S" + userName;
                  db.query(
                    {
                      sql: "INSERT INTO ?? (??,??,??) VALUES (?,?,?)",
                      timeout: 40000,
                      values: [
                        "USERS",
                        "USERNAME",
                        "PASSWORD",
                        "STUDENT_ID",
                        userName,
                        hash,
                        results1[0].STUDENT_ID,
                      ],
                    },
                    (error, results, fields) => {
                      if (error) return res.status(500).send(error);
                      else {
                        return res.json({
                          message: "successfully created and added to users",
                          username: userName,
                          password: defaultPass,
                          student: {
                            studentID: userName,
                            CNIC: obj.CNIC,
                            firstName: obj.firstName,
                            lastName: obj.lastName,
                            DOB: obj.dateOfBirth,
                            gender: obj.gender,
                            emergencyContact: obj.emergenceyContact,
                            admissionDate: obj.admissionDate,
                            nationality: obj.nationality,
                            religion: obj.religion,
                          },
                        });
                      }
                    }
                  );
                }
              });
            }
          }
        );
      }
      // error will be an Error if one occurred during the query
      // results will contain the results of the query
      // fields will contain information about the returned results fields (if any)
    }
  );
};

const getStudentPerformance = (req, res) => {
  var obj = req.params;
  if (!obj.studentId)
    return res.status(400).json({ message: "Student ID is required" });
  if (!obj.courseId)
    return res.status(400).json({ message: "Course ID is required" });
  if (!obj.classId)
    return res.status(400).json({ message: "Year is required" });

  db.query(
    {
      sql: "SELECT * FROM ?? JOIN ?? ON ??=?? JOIN ?? USING(??) JOIN ?? USING (??) WHERE ??=? AND ??=? AND ??= ?",
      values: [
        "USERS",
        "STUDENT_ACADEMIC_HISTORY",
        "USER_ID",
        "STUDENT_ID",
        "STD_ASMNT",
        "STUDENT_ID",
        "ASSESSMENT",
        "ASSESSMENT_ID",
        "COURSE_ID",
        obj.courseId,
        "USER_ID",
        obj.studentId,
        "CLASS_ID",
        obj.classId,
      ],
    },
    (error, results, fields) => {
      if (error)
        return res.status(500).json({ message: "unkown error occured" });
      var sum = 0;
      var total = 0;
      for (var i = 0; i < results.length; i++) {
        total += results[i].MAX_MARKS;
        sum += results[i].OBTAINED_MARKS;
      }
      var avg;
      if (total == 0) avg = 0;
      else avg = sum / total;
      var tbr = { details: results, average: avg * 100 };
      if (results.length > 0) {
        return res.status(200).json(tbr);
      } else {
        db.query(
          {
            sql: "SELECT * FROM ?? WHERE ?? = ?",
            values: ["USERS", "USER_ID", obj.studentId],
          },
          (error, resu, fields) => {
            if (error) {
              console.log(error);
              return res.status(500).json({ message: "unkown error occured" });
            }
            tbr.details.push(resu[0]);
            return res.status(200).json(tbr);
          }
        );
      }
    }
  );
};

const getStudentById = (req, res) => {
  const obj = req.params;

  if (!obj.id) {
    return res.status(400).json({ message: "studentId is required!" });
  }
  var temp = parseInt(obj.id.substring(1, obj.id.length));

  db.query(
    {
      sql: "SELECT * FROM ?? WHERE ??=? AND ?? = ?",
      timeout: 4000,
      values: ["USERS", "USER_ID", obj.id, "ROLE_ID", "STUDENT"],
    },
    (error, results, fields) => {
      if (error) {
        return res
          .status(500)
          .json({ message: "Something went wrong please try again later..." });
      } else {
        if (results.length === 0)
          return res
            .status(400)
            .json({ message: "This ID does not belong to any student" });
        return res.status(200).json({
          results: results,
        });
      }
    }
  );
};

const getAllStudents = (req, res) => {
  db.query(
    {
      sql: "SELECT * FROM ??",
      values: ["USERS"],
      timeout: 40000,
    },
    (error, results, fields) => {
      if (error) {
        return res.status(500).json({ message: "student_id is required" });
      }

      return res.status(200).send(results);
    }
  );
};

const assignStudentECA = (req, res) => {
  const obj = req.body;

  if (!obj.student_Id) {
    return res.status(400).json({ message: "student Id is required" });
  }

  if (!obj.eca_Id) {
    return res.status(400).json({ message: "eca Id is required" });
  }

  db.query(
    {
      sql: "INSERT INTO STUDENT_ECA (STUDENT_ID, ECA_ID) VALUES (?,?)",
      timeout: 40000,
      values: [obj.student_Id, obj.eca_Id],
    },

    (error, results, fields) => {
      if (error) {
        return res.status(500).json({ message: "student_id is required" });
      }

      return res.status(200).json({ message: "successful entry" });
    }
  );
};

const getStudentECA = (req, res) => {
  const obj = req.params;

  if (!obj.id) {
    return res.status(400).json({ message: "student_id is required" });
  }

  db.query(
    {
      sql: "SELECT * FROM ?? INNER JOIN ?? USING (??) INNER JOIN ?? USING (??) WHERE  ??= ?",
      timeout: 40000,
      values: [
        "STUDENT_ECA",
        "ECA",
        "ECA_ID",
        "STUDENT",
        "STUDENT_ID",
        "STUDENT_ID",
        obj.id,
      ],
    },
    (error, results, fields) => {
      if (error) {
        return res.status(500).json({ message: "unkown error" });
      }

      return res.status(200).json(results);
    }
  );
};

module.exports = {
  createStudent,
  getStudentById,
  getAllStudents,
  assignStudentECA,
  getStudentECA,
  getStudentPerformance,
};
