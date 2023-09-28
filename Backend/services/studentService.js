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
    if(!obj.classID){
        // TODO: THIS NEEDS TO BE CLASS AND SECTION AND WE CHECK ID OURSELVES
        return res.status(400).json({message:"classID is required!"});
    }
    if(!obj.emergencyContact){
        return res.status(400).json({message:"emergency contact is required!"});
    }

    //TODO: QUERY INTO DATABASE
    db.query(
        {
            sql:"INSERT INTO ?? (??,??,??,??,??,??,??,??,??,??) VALUES (?,?,?,?,?,?,?,?,?,?)",
            timeout:40000, //40s
            values:[
                "STUDENT",
                "CNIC",
                "FIRST_NAME",
                "LAST_NAME",
                "CLASS_ID",
                "DOB",
                "GENDER",
                "EMERGENCY_CONTACT",
                "ADMISSION_DATE",
                "NATIONALITY",
                "RELIGION",
                obj.CNIC,
                obj.firstName,
                obj.lastName,
                obj.classID,
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
                    console.log(results1);
                    console.log(fields1);
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
                                classID: obj.classID,
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

const getStudent = (req,res) =>{
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

module.exports = {
    createStudent
}
