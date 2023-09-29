const db = require("../config/db").connection;
const bcrypt = require("bcrypt");
const saltRounds = 10;
const defaultPass = "12345678";

const createAcademicYear = (req, res) => {
  const obj = req.body;
  if (!obj.startYear) {
    return res.status(400).json({ message: "Start Year is required !" });
  }
  if (!obj.desc) {
    return res.status(400).json({ message: "Description is required !" });
  }
  db.query(
    {
      sql: "INSERT INTO ?? (??,??) VALUES (?,?)",
      values: [
        "ACADEMIC_YEAR",
        "START_YEAR",
        "ACADEMIC_DESC",
        obj.startYear,
        obj.desc,
      ],
    },
    (error, results, fields) => {
      if(error) return res.status(500).json({ message: "An unknow error has occured" });
      else{
        return res.json({message:"Academic year successfully added",
      startYear: obj.startYear,
      description: obj.desc
    })
      }
    }
  );
};
const createAdmin = (req, res) => {
  const obj = req.body;

  if (obj.CNIC) {
    //check for regex here
    // return res.status(400).json({message: "CNIC is required!"} )
  } else {
    return res.status(400).json({ message: "cnic is required !" });
  }
  if (!obj.firstName) {
    return res.status(400).json({ message: "firstName is required!" });
  }
  if (!obj.lastName) {
    return res.status(400).json({ message: "lastName is required!" });
  }
  if (!obj.hireDate) {
    return res.status(400).json({ message: "hireDate is required!" });
  }
  if (!obj.nationality) {
    return res.status(400).json({ message: "nationality is required!" });
  }
  if (!obj.salary) {
    return res.status(400).json({ message: "salary is required!" });
  }

  db.query(
    {
      sql: "INSERT INTO ?? (??,??,??,??,??,??,??,??) VALUES (?,?,?,?,?,?,?,?)",
      timeout: 40000, // 40s
      values: [
        "ADMIN",
        "CNIC",
        "FIRST_NAME",
        "LAST_NAME",
        "HIRE_DATE",
        "GENDER",
        "NATIONALITY",
        "RELIGION",
        "SALARY",
        obj.CNIC,
        obj.firstName,
        obj.lastName,
        obj.hireDate,
        obj.gender,
        obj.nationality,
        obj.religion,
        obj.salary,
      ],
    },
    function (error, results, fields) {
      if (error) {
        //TODO: update error response properly
        return res.status(500).send(error);
      } else {
        //generate erp for the user
        db.query(
          {
            sql: "SELECT ?? FROM ?? WHERE ?? = ?",
            timeout: 40000,
            values: ["ADMIN_ID", "ADMIN", "CNIC", obj.CNIC],
          },
          (error1, results1, fields1) => {
            if (error1) {
              return res.status(500).send(error1);
            } else {
              bcrypt.hash(defaultPass, saltRounds, function (err, hash) {
                if (err) return res.status(500).send(err);
                else {
                  // console.log(results1);
                  // console.log(fields1);
                  var userName = results1[0].ADMIN_ID;

                  userName = "A" + userName;
                  db.query(
                    {
                      sql: "INSERT INTO ?? (??,??,??) VALUES (?,?,?)",
                      timeout: 40000,
                      values: [
                        "USERS",
                        "USERNAME",
                        "PASSWORD",
                        "ADMIN_ID",
                        userName,
                        hash,
                        results1[0].ADMIN_ID,
                      ],
                    },
                    (error, results, fields) => {
                      if (error) return res.status(500).send(error);
                      else {
                        return res.json({
                          message: "successfully created and added to users",
                          username: userName,
                          password: defaultPass,
                          admin: {
                            admin_ID: userName,
                            CNIC: obj.CNIC,
                            firstName: obj.firstName,
                            lastName: obj.lastName,
                            hireDate: obj.hireDate,
                            gender: obj.gender,
                            nationality: obj.nationality,
                            religion: obj.religion,
                            salary: obj.salary,
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



module.exports = {
  createAdmin,
  createAcademicYear
};
