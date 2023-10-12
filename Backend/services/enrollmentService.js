const db = require("../config/db").connection;

var backendUtility = require("../services/backendUtility");

const enrollStudentToClass = (req, res) => {

    var obj = req.body;

    if(!obj.classID){
        return res.status(400).json({message:"MissingInputException: ClassID is missing!"});
    }
    if(!obj.studentID){
        return res.status(400).json({message:"MissingInputException: studentID is missing!"});
    }

    db.query(
    {
        sql: "SELECT * FROM ?? WHERE ?? = ? AND ?? = ?",
        values:[
            "STUDENT_ACADEMIC_HISTORY",
            "STUDENT_ID",
            obj.studentID,
            "CLASS_ID",
            obj.classID,
        ]
    }, (errors, results, fields) => {

        if(errors){
            return res.status(400).json({message:"SQLSkillIssueException: SQL Error!" });
        }

        if(results.length > 0){
            return res.status(400).json({message:"DataDuplicationException: Record Already Exists!" });
        }

        var d = new Date();
        var x= backendUtility.toLocalISO(d);

        db.query(
            {
                sql: "INSERT INTO ?? (??, ??, ??) VALUES (?,?,?)",
                values:[
                    "STUDENT_ACADEMIC_HISTORY",
                    "STUDENT_ID",
                    "CLASS_ID",
                    "ENROLLMENT_DATE",
                    obj.studentID,
                    obj.classID,
                    x
                ]
            }, (errors, results, fields) => {

                if(errors){
                    return res.status(400).json({message:"SQLSkillIssueException: SQL Error!" });
                }
        
                return res.status(200).json({message:"Enrollment Success!"});

            }
        )
    }
    ) 
}

//No soft delete! Use brain for the why
const denrollStudentFromClass = (req, res) => {

    var obj = req.body;

    if(!obj.classID){
        return res.status(400).json({message:"MissingInputException: ClassID is missing!"});
    }
    if(!obj.studentID){
        return res.status(400).json({message:"MissingInputException: studentID is missing!"});
    }

    db.query(
    {
        sql: "SELECT * FROM ?? WHERE ?? = ? AND ?? = ?",
        values:[
            "STUDENT_ACADEMIC_HISTORY",
            "STUDENT_ID",
            obj.studentID,
            "CLASS_ID",
            obj.classID,
        ]
    }, (errors, results, fields) => {

        if(errors){
            return res.status(400).json({message:"SQLSkillIssueException: SQL Error!" });
        }

        if(results.length == 0){
            return res.status(400).json({message:"DataMissingException: No such record exists!" });
        }

        db.query(
            {
                sql: "DELETE FROM ?? WHERE ?? = ? AND ?? = ?",
                values:[
                    "STUDENT_ACADEMIC_HISTORY",
                    "STUDENT_ID",
                    obj.studentID,
                    "CLASS_ID",
                    obj.classID,
                ]
            }, (errors, results, fields) => {

                if(errors){
                    return res.status(400).json({message:"SQLSkillIssueException: SQL Error!" });
                }
        
                return res.status(200).json({message:"Deletion Success!"});

            }
        )

    }
    ) 
}

const getStudentsByClass = (req,res) => {

    var obj = req.params;

    if(!obj.classGrade){
        return res.status(400).json({message: "MissingInputException: Class Grade is needed!"})
    }
    if(!obj.classSection){
        return res.status(400).json({message: "MissingInputException: Class Section is needed!"})
    }
    if(!obj.classAcademicYear){
        return res.status(400).json({message: "MissingInputException: Class Academic Year is needed!"})
    }

    db.query(
        {
            sql : "SELECT * FROM ?? WHERE ?? = ? AND ?? = ? AND ?? = ?",
            timeout:40000,
            values :[
                "CLASS",
                "YEAR",
                obj.classGrade,
                "SECTION",
                obj.classSection,
                "START_YEAR",
                obj.classAcademicYear,
            ]
        },
        (errors,results,fields)=>{

            if(errors){
                return res.status(500).send("SQLSkillIssueException: Get better, dog!");
            }

            if(results.length == 0){
                return res.status(500).send("MissingDataException: No such class exists in the database!");
            }

            if(results.length != 1){
                return res.status(500).send("DuplicateDataException: More than one class may exist in the database!");
            }

            db.query(
                {
                    sql : "SELECT * FROM ?? NATURAL JOIN ?? WHERE ?? = ?",
                    timeout:40000,
                    values :[
                        "STUDENT",
                        "STUDENT_ACADEMIC_HISTORY",
                        "CLASS_ID",
                        results[0].CLASS_ID
                    ]
                },
                (errors,results,fields)=>{

                    if(errors){
                        return res.status(500).send();
                    }
        
                    if(results.length == 0){
                        return res.status(500).send("MissingDataWarning: No students exist in this class!");
                    }
        
                    return res.status(200).json({message: "Success", results})
                }
            )
        }
    )
}

const getStudentsByClassID = (req,res) => {

    var obj = req.params;

    if(!obj.classID){
        return res.status(400).json({message: "MissingInputException: ClassID is needed!"})
    }

    db.query(
        {
            sql : "SELECT * FROM ?? NATURAL JOIN ?? WHERE ?? = ?",
            timeout:40000,
            values :[
                "STUDENT",
                "STUDENT_ACADEMIC_HISTORY",
                "CLASS_ID",
                obj.classID
            ]
        },
        (errors,results,fields)=>{

            if(errors){
                return res.status(500).send();
            }

            if(results.length == 0){
                return res.status(500).send("MissingDataWarning: No students exist in this class!");
            }

            return res.status(200).json({message: "Success", results})
        }
    )

}


module.exports = {
    enrollStudentToClass,
    denrollStudentFromClass,
    getStudentsByClass,
    getStudentsByClassID
}