const db = require("../config/db").connection;

const createAdmin = (req, res) => {
  const obj = req.body;

  if (obj.CNIC) {
    //check for regex here
    // return res.status(400).json({message: "CNIC is required!"} )
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
        return res.status(500).send(error);
      } else {
        return res.json({
          message: "Admin Created",
          admin: {
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
      // error will be an Error if one occurred during the query
      // results will contain the results of the query
      // fields will contain information about the returned results fields (if any)
    }
  );
  
};

module.exports = {
  createAdmin,
};
