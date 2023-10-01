const db = require("../config/db").connection;
const bcrypt = require("bcrypt");
const defaultPass = "12345678";

const createFaculty = (req, res) => {
  var obj = req.body;
  if (!obj.CNIC) {
    return res.status(400).json({ message: "CNIC is required!" });
  }
  if (!obj.firstName) {
    return res.status(400).json({ message: "firstName is required!" });
  }
  if (!obj.lastName) {
    return res.status(400).json({ message: "lastName is required!" });
  }
  if (!obj.DOB) {
    return res.status(400).json({ message: "Date of Birth is required!" });
  }
  if (!obj.hireDate) {
    return res.status(400).json({ message: "Hire Date is required!" });
  }
  if (!obj.nationality) {
    return res.status(400).json({ message: "Nationality is required!" });
  }
  if (!obj.salary) {
    return res.status(400).json({ message: "Salary is required!" });
  }
  if (!obj.phoneNumber) {
    return res.status(400).json({ message: "Phone Number is Required! " });
  }
  db.query(
    {
      sql: "INSERT INTO ?? (??,??,??,??,??,??,??,??,??,??,??) VALUES (?,?,?,?,?,?,?,?,?,?,?)",
      values: [
        "FACULTY",
        "CNIC",
        "FIRST_NAME",
        "LAST_NAME",
        "DOB",
        "GENDER",
        "HIRE_DATE",
        "NATIONALITY",
        "RELIGION",
        "FULL_TIME",
        "SALARY",
        "PHONE_NUMBER",
        obj.CNIC,
        obj.firstName,
        obj.lastName,
        obj.DOB,
        obj.gender,
        obj.hireDate,
        obj.nationality,
        obj.religion,
        obj.fullTime,
        obj.salary,
        obj.phoneNumber,
      ],
    },
    (error, results, fields) => {
      if (error) console.log(error);
      db.query(
        {
          sql: "SELECT * FROM ?? WHERE ??=?",
          values: ["FACULTY", "CNIC", obj.CNIC],
        },
        (err, results, fields) => {
          if (results.size == 0)
            res.status(500).json({ message: "unkown error occurred" });
          else {
            var ID = results[0].FACULTY_ID;
            var u_name = "F" + ID;
            bcrypt.hash(defaultPass, 10, function (err, hash) {
              db.query(
                {
                    sql: "INSERT INTO ?? (??,??,??) VALUES (?,?,?)",
                    timeout: 40000,
                    values: [
                      "USERS",
                      "USERNAME",
                      "PASSWORD",
                      "FACULTY_ID",
                      u_name,
                      hash,
                      ID,
                  ],
                },
                (err, resu, fie) => {
                  if (err) {
                    console.log(err);
                    return res.status(500).send(err);
                  } else {
                    return res.json({
                      message: "Faculty created successfully!",
                      details: {
                        userName: u_name,
                        passWord: defaultPass,
                        facultyID: "F" + results[0].FACULTY_ID,
                        CNIC: obj.CNIC,
                        firstName: obj.firstName,
                        lastName: obj.lastName,
                        DOB: obj.DOB,
                        gender: obj.gender,
                        hireDate: obj.hireDate,
                        nationality: obj.nationality,
                        religion: obj.religion,
                        fullTime: obj.fullTime,
                        salary: obj.salary,
                        phoneNumber: obj.phoneNumber,
                      },
                    });
                  }
                }
              );
            });
          }
        }
      );
    }
  );
};

//exports
module.exports = {
  createFaculty,
};
