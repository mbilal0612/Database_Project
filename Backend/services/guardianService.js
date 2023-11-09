//connect to db
const {hashPassword} = require("mysql/lib/protocol/Auth");
const db = require("../config/db").connection;
const bcrypt = require('bcrypt');
const defaultpass="12345678";

const createGuardian = (req, res) => {
    const obj = req.body;

    if(!obj.firstName){
        return res.status(400).json({message:"firstName is required!"});
    }

    if(!obj.lastName){
        return res.status(400).json({message:"lastName is required!"});
    }
    //check for cnic
    if(!obj.CNIC){
        return res.status(400).json({message:"CNIC is required!"});
    }
    //check for phone number
    if(!obj.phoneNumber){
        return res.status(400).json({message:"phoneNumber is required!"});
    }
    //check for nationality
    if(!obj.nationality){
        return res.status(400).json({ message :"Nationality is required!"});
    }
    //check for religion
    if(!obj.religion){
        return res.status(400).json({message:"Religion is required!"});
    }
    //check for occupation
    if(!obj.occupation){
        return res.status(400).json({message:"Occupation is required!"});
    }

    db.query(
        {
            sql: "INSERT INTO ?? (??,??,??,??,??,??,??) VALUES (?,?,?,?,?,?,?)",
            timeout: 40000, // 40s
            values : [
                "GUARDIAN",
                "FIRST_NAME",
                "LAST_NAME",
                "CNIC",
                "PHONE_NUMBER",
                "Nationality",
                "Religion",
                "Occupation",
                obj.firstName,
                obj.lastName,
                obj.CNIC,
                obj.phoneNumber,
                obj.nationality,
                obj.religion,
                obj.occupation
            ]
        },
        (error, results, fields) => {

            if(error){
                return res.status(500).json({ message : "Something went wrong please try again later...",
                    error: error
                });
            }else{
                db.query(
                    {
                        sql: "SELECT * FROM ?? WHERE ??=?",
                        timeout: 40000, // 40s
                        values : [
                            "GUARDIAN",
                            "CNIC",
                            obj.CNIC,
                        ]
                    },
                    (error, results, fields) => {
                        if(error){
                            return res.status(500).json({ message : "Something went wrong please try again later...",
                            error: error
                            });
                        }
                        bcrypt.hash(defaultpass,10,(err,hash)=>{
                            let username = "G"+results[0].GUARDIAN_ID;
                            db.query(
                                {
                                    sql: "INSERT INTO ?? (??,??,??) VALUES (?,?,?)",
                                    timeout: 40000, // 40s
                                    values : [
                                        "USERS",
                                        "USERNAME",
                                        "PASSWORD",
                                        "GUARDIAN_ID",
                                        username,
                                        hash,
                                        results[0].GUARDIAN_ID
                                    ]

                                },
                                (error, results, fields) => {
                                    if(error){
                                        return res.status(500).json({message : "Something went wrong please try again later..."});

                                    }else{
                                        return res.json({
                                            message: "Parent Created",
                                            username: username,
                                            password: defaultpass,
                                        });
                                    }
                                    
                                }
                            )
                        });


                    }
                )
            }


        }
    )
}

const getGuardians = (req, res) => {
    const obj = req.params;
    db.query(
        {
            sql: "SELECT * FROM ??",
            timeout: 40000, // 40s
            values : [
                "GUARDIAN"
                ]

        },
        (error, results, fields) => {
            if(error){
                return res.status(500).send(error);
            }
            return res.status(200).json({
                results: results
            });
        }
    )
}

const getGuardianById = (req, res) => {
    const obj = req.params;

    if(!obj.guardianId){
        return res.status(400).json({message:"guardianId is required!"});
    }
    let gId = parseInt(obj.guardianId.substring(1,obj.guardianId.length));

    db.query(
        {
            sql: "SELECT * FROM ?? WHERE ??=?",
            timeout:40000,
            values:[
                "GUARDIAN",
                "GUARDIAN_ID",
                gId
                ]

        },
        (error, results, fields) => {
            if(error){
                return res.status(500).send(error);
            }
            return res.status(200).json({
                results: results
            })
        })
}

// get details of a guardian's children
const getChildren = (req,res) => {
    const obj = req.params;
    console
    if(!obj.guardianId){
        return res.status(400).json({message:"guardianId is required!"});
    }

    db.query(
        {
            sql: "SELECT * FROM USERS AS U1 JOIN STUDENT_GUARDIAN ON U1.USER_ID = STUDENT_GUARDIAN.GUARDIAN_ID JOIN USERS AS U2 ON U2.USER_ID = STUDENT_GUARDIAN.STUDENT_ID WHERE U1.USER_ID=?",
            timeout:40000,
            values:[
                obj.guardianId
                ]

        },
        (error, results, fields) => {
            if(error){
                return res.status(500).send(error);
            }
            return res.status(200).json({
                results: results
            })
        });
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns Get's the attendance of all the children's of a guardian
 */
const getChildrenAttendance = (req,res) => {
    const obj = req.params;

    if(!obj.guardianId){
        return res.status(400).json({message:"guardianId is required!"});
    }

    db.query(
        {
            //sql:" WITH children AS ( SELECT STUDENT_ID, GUARDIAN_ID FROM STUDENT_GUARDIAN WHERE GUARDIAN_ID = ?),attendance AS ( SELECT STUDENT_ID, P_DATE, PRESENT, ACADEMIC_YEAR FROM ATTENDANCE WHERE STUDENT_ID IN (SELECT STUDENT_ID FROM children)) SELECT * FROM attendance ORDER BY STUDENT_ID, ACADEMIC_YEAR DESC, P_DATE DESC;",
            //sql:" SELECT * FROM ATTENDANCE WHERE STUDENT_ID = ?;",
            sql: "SELECT  ROW_NUMBER() OVER(ORDER BY P_DATE) AS id,P_DATE,PRESENT,ACADEMIC_YEAR   FROM ATTENDANCE WHERE STUDENT_ID = ?;",
            timeout:40000, 
            values:[
                obj.guardianId
                ]
        },
        (error,result,fields) => {
            if(error){
                return res.status(500).json("error");
            }
            return res.status(200).json(result);
        }
    )
}

module.exports = {
    createGuardian,
    getGuardians,
    getGuardianById,
    getChildren,
    getChildrenAttendance
}