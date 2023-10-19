const db = require("../config/db").connection;

const createAttendance = (req,res) =>{

    var obj = req.body;

    if(!obj.studentID){
        return res.status(400).json({message:"MissingInputException: StudentID is required"});
    }

    if(!obj.present){
        return res.status(400).json({message:"MissingInputException: Present status is required"});
    }

    if(!obj.academicYear){
        return res.status(400).json({message:"MissingInputException: Academic Year is required"});
    }

    db.query(
        {
            sql:"SELECT * FROM ??  WHERE ?? = ? AND ?? = ?",
            values: [
                "USERS",
                "USER_ID",
                obj.studentID,
                "ROLE_ID",
                "STUDENT"
            ]
        }, (errors, results, fields) =>{

            if(errors){
                return res.status(400).json({message:"Sounds like an SQL Skill Issue"});
            }

            if(results.length == 0){
                return res.status(400).json({message:"MissingDataException: Queried student does not exist in the database!"});
            }

            console.log(40);

            db.query(
                {
                    sql:"SELECT * FROM ?? WHERE ?? = ?",
                    values:[
                        "ACADEMICYEAR",
                        "START_YEAR",
                        obj.academicYear
                    ]
                }, (errors, results, fields) =>{


                    if(errors){
                        return res.status(400).json({message:"Sounds like an SQL Skill Issue"});
                    }
        
                    if(results.length == 0){
                        return res.status(400).json({message:"MissingDataException: Queried Academic Year does not exist in the database!"})
                    }

                    let date = new Date();

                    console.log(60);

                    db.query(
                        {
                            sql:"INSERT INTO ?? (??, ??, ??, ??) VALUES (?, ?, ?, ?)",
                            values:[
                                "ATTENDANCE",
                                "STUDENT_ID", 
                                "P_DATE",
                                "PRESENT", 
                                "ACADEMIC_YEAR",
                                obj.studentID, 
                                date.toISOString().split('T')[0], 
                                obj.present, 
                                obj.academicYear                               
                            ]
                        }
                    , (errors, results, fields) =>{
                        console.log(78);
                        console.log(results);
                        console.log(errors);

                        if(errors){
                            return res.status(400).json({message:"Sounds like an SQL Skill Issue"});
                        }

                        return res.status(200).json({message: "Successfully added attendance!"});

                    })

                }
            )
        }
    )

}

//Will be tested when frontend ready!
const createBatchAttendance = (req,res) =>{

    var obj = req.body;

    if(!obj.studentID){
        return res.status(400).json({message:"MissingInputException: StudentID is required"});
    }

    if(!obj.present){
        return res.status(400).json({message:"MissingInputException: Present status is required"});
    }

    if(!obj.academicYear){
        return res.status(400).json({message:"MissingInputException: AcademicYear is required"});
    }

    let date = new Date();
    let fdate = date.getFullYear + "-" + date.getMonth + "-" + date.getDate;

    /*
    The students inside obj are already verified as existing entities and are guaranteed to
    belong to the same class. Check studentService > getStudentsByClass.
    */

    for(let i =0; i < obj.studentID.length; i++){

        db.query(
            {
                sql:"INSERT INTO ?? (??, ??, ??, ??) VALUES (?, ?, ?, ?)",
                values:[
                    "ATTENDANCE",
                    "STUDENT_ID", "P_DATE", "PRESENT", "ACADEMIC_YEAR",
                    obj.studentID[i], fdate, obj.present[i], obj.academicYear[i]                               
                ]
            }
        , (errors, results, fields) =>{

            if(errors){
                return res.status(400).json({message:"Sounds like an SQL Skill Issue"});
            }

        }
        )

    }

    return res.status(200).json({message:"Successfully added batch attendance!"})

}

const updateAttendance = (req, res) =>{

    var obj = req.body;

    if(!obj.studentID){
        return res.status(400).json({message:"MissingInputException: StudentID is required!"});
    }

    if(!obj.present){
        return res.status(400).json({message:"MissingInputException: Present status is required!"});
    }

    if(!obj.date){
        return res.status(400).json({message:"MissingInputException: Date is required!"});
    }

    db.query(
        {
            sql:"SELECT * FROM ??  WHERE ?? = ? AND ?? = ?",
            values: [
                "USERS",
                "USER_ID",
                obj.studentID,
                "ROLE_ID",
                "STUDENT"
            ]
        }, (errors, results, fields) =>{

            if(errors){
                return res.status(400).json({message:"SQLSkillIssueException: Sounds like an SQL Skill Issue. [1]"});
            }

            if(results.length == 0){
                return res.status(400).json({message:"MissingDataException: Queried student does not exist in the database!"})
            }

            db.query(
                {
                    sql:"SELECT * FROM ?? WHERE ?? = ? AND ?? = ?",
                    values:[
                        "ATTENDANCE",
                        "P_DATE",
                        obj.date,
                        "STUDENT_ID",
                        obj.studentID
                    ]
                }, (errors, results, fields) =>{

                    if(errors){
                        return res.status(400).json({message:"SQLSkillIssueException: Sounds like an SQL Skill Issue. [2]"});
                    }
        
                    if(results.length == 0){
                        return res.status(400).json({message:"MissingDataException: Queried attendance record does not exist in the database!"})
                    }

                    db.query(
                        {
                            sql:"UPDATE ?? SET ?? = ? WHERE ?? = ? AND ?? = ?",
                            values:[
                                "ATTENDANCE",
                                "PRESENT",
                                obj.present,
                                "P_DATE",
                                obj.date,
                                "STUDENT_ID",
                                obj.studentID
                            ]
                        }
                    , (errors, results, fields) =>{

                        if(errors){
                            return res.status(400).json({message:"SQLSkillIssueException: Sounds like an SQL Skill Issue. [3]"});
                        }

                        return res.status(200).json({message: "Successfully altered student's attendance!"})
                    }
                    )

                }
            )
        }
    )
    
}

const getStudentAttendanceReportByAcademicYear = (req,res) =>{

    //Work in progress!
    var obj = req.params;

    var totalDays;

    if(!obj.studentID){
        return res.status(400).json({message:"MissingInputException: StudentID is required"});
    }
    if(!obj.startYear){
        return res.status(400).json({message:"MissingInputException: Academic Year is required"});
    }

    db.query(
        {
            sql:"SELECT * FROM ??  WHERE ?? = ? AND ?? = ?",
            values: [
                "USERS",
                "USER_ID",
                obj.studentID,
                "ROLE_ID",
                "STUDENT"
            ]
        }, (errors, results, fields) =>{

            if(errors){
                return res.status(400).json({message:"SQLSkillIssueException: Sounds like an SQL Skill Issue. [1]"});
            }

            if(results.length == 0){
                return res.status(400).json({message:"MissingDataException: Queried student does not exist in the database!"})
            }

            db.query(
                {
                    sql:"SELECT * FROM ?? WHERE ?? = ? AND ?? = ?",
                    values: [
                        "ATTENDANCE",
                        "STUDENT_ID",
                        obj.studentID,
                        "ACADEMIC_YEAR",
                        obj.startYear,
                    ]
                }, (errors, results, fields) =>{

                    if(errors){
                        return res.status(400).json({message:"SQLSkillIssueException: Sounds like an SQL Skill Issue. [2]"});
                    }

                    if(results.length == 0){
                        return res.status(400).json({message:"MissingDataException: Queried student does not have any attendance record in the database!"})
                    }

                    let presentDays = 0;
                    let absentDays = 0;

                    for(let i =0; i<results.length; i++){
                        if(results[i].PRESENT){
                            presentDays++;
                        }else{
                            absentDays++;
                        }
                    }

                    return res.status(200).json({
                    message: "Successfully fetched attendance!", 
                    totalDays:results.length,
                    daysPresent: presentDays, 
                    daysAbsent: absentDays,
                    attendance:results, 
                    })

                }
            )

        }
    )

}

const getStudentEntireAttendanceReport = (req,res) =>{

    //Work in progress!
    var obj = req.params;

    if(!obj.studentID){
        return res.status(400).json({message:"MissingInputException: StudentID is required"});
    }

    db.query(
        {
            sql:"SELECT * FROM ??  WHERE ?? = ? AND ?? = ?",
            values: [
                "USERS",
                "USER_ID",
                obj.studentID,
                "ROLE_ID",
                "STUDENT"
            ]
        }, (errors, results, fields) =>{

            if(errors){
                return res.status(400).json({message:"Sounds like an SQL Skill Issue. [1]"});
            }

            if(results.length == 0){
                return res.status(400).json({message:"MissingDataException: Queried student does not exist in the database!"})
            }

            db.query(
                {
                    sql:"SELECT * FROM ?? WHERE ?? = ?",
                    values: [
                        "ATTENDANCE",
                        "STUDENT_ID",
                        obj.studentID
                    ]
                }, (errors, results, fields) =>{

                    if(errors){
                        return res.status(400).json({message:"Sounds like an SQL Skill Issue. [2]"});
                    }

                    if(results.length == 0){
                        return res.status(400).json({message:"MissingDataException: Queried student does not have any attendance record in the database!"})
                    }

                    let presentDays = 0;
                    let absentDays = 0;

                    for(let i =0; i<results.length; i++){
                        if(results[i].PRESENT){
                            presentDays++;
                        }else{
                            absentDays++;
                        }
                    }

                    return res.status(200).json({
                    message: "Successfully fetched attendance!", 
                    expectedDays: "Will add later!",
                    totalDays:results.length,
                    daysPresent: presentDays, 
                    daysAbsent: absentDays,
                    attendance:results, 
                    })

                }
            )

        }
    )

}

// All APIs made compatible with the new USERS implementation as of 19th October 2023

module.exports = {
    createAttendance,
    createBatchAttendance,
    updateAttendance,
    getStudentEntireAttendanceReport,
    getStudentAttendanceReportByAcademicYear,
}