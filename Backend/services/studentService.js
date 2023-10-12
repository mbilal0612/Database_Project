const db = require("../config/db").connection;
const bcrypt = require('bcrypt');
const defaultPass = "12345678";

const createStudent = (req,res) =>{
    const obj = req.body;

    if(!obj.firstName){
        return res.status(400).json({message:"firstName is required!"});
    }
    if(!obj.lastName){
        return res.status(400).json({message:"lastName is required!"});
    }
    if(!obj.CNIC){
        return res.status(400).json({message:"CNIC is required!"});
    }
    if(!obj.gender){
        return res.status(400).json({message:"Gender is required!"});
    }
    if(!obj.religion){
        return res.status(400).json( {message:"religion is required!"});
    }
    if(!obj.nationality){
        return res.status(400).json({message:"nationality is required!"});
    }
    if(!obj.dateOfBirth){
        return res.status(400).json({message:"dateOfBirth is required!"});
    }
    if(!obj.admissionDate){
        return res.status(400).json({message:"admissionDate is required!"});
    }
    if(!obj.emergencyContact){
        return res.status(400).json({message:"emergency contact is required!"});
    }

    //TODO: QUERY INTO DATABASE
    db.query(
        {
            sql:"INSERT INTO ?? (??,??,??,??,??,??,??,??,??) VALUES (?,?,?,?,?,?,?,?,?)",
            timeout:40000, //40s
            values:[
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

        function(error,results,fields){
            if(error){
                //TODO:UPDATE error response properly
                return res.status(500).send(error.message);
            }else{
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
                    db.query({
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
                      ]},
                      (error,results,fields)=>{
                        if(error) return res.status(500).send(error);
                        else{
                          return res.json({
                            message:"successfully created and added to users",
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
                                religion: obj.religion
                            }
                          })
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

        
    )


};

const getStudents = (req,res) =>{
    const obj = req.body;

    if(!obj.studentId){
        return res.status(400).json({message:"studentId is required!"});
    }
    db.query(
        {
            sql:"SELECT * FROM ?? WHERE ??=?",
            timeout:40000, //40s
            values:[
                "STUDENT",
                "STUDENT_ID",
                obj.studentId,
            ],
        },

        function(error,results,fields){
            if(error){
                return res.status(500).json({message:"Something went wrong please try again later..."});
            }else{
                
            }
        }
    )
}

const getStudentById = (req,res) =>{
    const obj = req.params;

    if(!obj.id){
        return res.status(400).json({message:"studentId is required!"});
    }
    var temp = parseInt(obj.id.substring(1,obj.id.length));
    
    db.query(
        {
            sql:"SELECT * FROM ?? WHERE ??=?",
            timeout:4000,
            values:[
                "STUDENT",
                "STUDENT_ID",
                temp
            ]

        },
        (error, results,fields)=> {
            if(error){
                return res.status(500).json({message:"Something went wrong please try again later..."});
            }else{
                results[0].STUDENT_ID = 'S' + results[0].STUDENT_ID;
                return res.status(200).json({
                    results: results
                });
            }
        }
    )
}

const getAllStudents = (req,res) => {
    db.query(
        {
            sql : "SELECT * FROM STUDENT",
            timeout:40000,
        },
        (error,results,fields)=>{
            if(error){
                return res.status(500).send(error);
            }

            return res.status(200).send(results);
        }
    )
}

const assignStudentECA = (req,res)=> {
    const obj = req.body;

    if(!obj.student_Id){
        return res.status(400).json({ message : "student Id is required"});
    }

    if(!obj.eca_Id){
        return res.status(400).json({ message : "eca Id is required"});

    }

    db.query(
        {
            sql:"INSERT INTO STUDENT_ECA (STUDENT_ID, ECA_ID) VALUES (?,?)",
            timeout: 40000,
            values : [
                obj.student_Id,
                obj.eca_Id
            ]
        },

        (error, results,fields)=> {
            if(error){
                return res.status(500).send(error);
            }

            return res.status(200).json({ message : "successful entry"});
        }
    )
}

const getStudentECA = (req, res)=> {
    const obj = req.params;

    if(!obj.id){
        return res.status(400).json({ message : 'student_id is required'});
    }

    //TODO: WRITE DB QUERY HERE
    db.query(
        {
            sql : "SELECT * FROM ?? INNER JOIN ?? USING (??) INNER JOIN ?? USING (??) WHERE  ??= ?",
            timeout: 40000,
            values : [
                "STUDENT_ECA",
                "ECA",
                "ECA_ID",
                "STUDENT",
                "STUDENT_ID",
                "STUDENT_ID",
                obj.id
            ]

        },
        (error, results, fields)=> {
            if(error){
                return res.status(500).send(error);
            }

            return res.status(200).json(results);
        }
    )
}

module.exports = {
    createStudent,
    getStudents,
    getStudentById,
    getAllStudents,
    assignStudentECA,
    getStudentECA,
}
