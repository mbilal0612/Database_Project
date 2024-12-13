//connect to db
const { hashPassword } = require("mysql/lib/protocol/Auth");
const db = require("../config/db").connection;
const logger = require("../index").logger;
const bcrypt = require("bcrypt");
const defaultpass = "12345678";

const createGuardian = (req, res) => {
    const obj = req.body;


    if (!obj.firstName) {
        return res.status(400).json({ message: "firstName is required!" });
    }

    if (!obj.lastName) {
        return res.status(400).json({ message: "lastName is required!" });
    }
    //check for cnic
    if (!obj.CNIC) {
        return res.status(400).json({ message: "CNIC is required!" });
    }
    //check for phone number
    if (!obj.phoneNumber) {
        return res.status(400).json({ message: "phoneNumber is required!" });
    }
    //check for nationality
    if (!obj.nationality) {
        return res.status(400).json({ message: "Nationality is required!" });
    }
    //check for religion
    if (!obj.religion) {
        return res.status(400).json({ message: "Religion is required!" });
    }
    //check for occupation
    if (!obj.occupation) {
        return res.status(400).json({ message: "Occupation is required!" });
    }

    db.query(
        {
            sql: "INSERT INTO ?? (??,??,??,??,??,??,??) VALUES (?,?,?,?,?,?,?)",
            timeout: 40000, // 40s
            values: [
                "guardian",
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
                obj.occupation,
            ],
        },
        (error, results, fields) => {
            if (error) {
                //logger.error(error.message);
                return res.status(500).json({
                    message: "Something went wrong please try again later...",
                    error: error,
                });
            } else {
                db.query(
                    {
                        sql: "SELECT * FROM ?? WHERE ??=?",
                        timeout: 40000, // 40s
                        values: ["guardian", "CNIC", obj.CNIC],
                    },
                    (error, results, fields) => {
                        if (error) {
                            //logger.error(error.message);
                            return res.status(500).json({
                                message:
                                    "Something went wrong please try again later...",
                                error: error,
                            });
                        }
                        bcrypt.hash(defaultpass, 10, (err, hash) => {
                            let username = "G" + results[0].GUARDIAN_ID;
                            db.query(
                                {
                                    sql: "INSERT INTO ?? (??,??,??) VALUES (?,?,?)",
                                    timeout: 40000, // 40s
                                    values: [
                                        "users",
                                        "USERNAME",
                                        "PASSWORD",
                                        "GUARDIAN_ID",
                                        username,
                                        hash,
                                        results[0].GUARDIAN_ID,
                                    ],
                                },
                                (error, results, fields) => {
                                    if (error) {
                                        //logger.error(error.message);
                                        return res.status(500).json({
                                            message:
                                                "Something went wrong please try again later...",
                                        });
                                    } else {
                                        return res.json({
                                            message: "Parent Created",
                                            username: username,
                                            password: defaultpass,
                                        });
                                    }
                                }
                            );
                        });
                    }
                );
            }
        }
    );
};

const getGuardians = (req, res) => {
    const obj = req.params;
    db.query(
        {
            sql: "SELECT * FROM ??",
            timeout: 40000, // 40s
            values: ["guardian"],
        },
        (error, results, fields) => {
            if (error) {
                
                return res.status(500).send(error);
            }
            return res.status(200).json({
                results: results,
            });
        }
    );
};

const getGuardianById = (req, res) => {
    const obj = req.params;

    if (!obj.guardianId) {
        return res.status(400).json({ message: "guardianId is required!" });
    }
    let gId = parseInt(obj.guardianId.substring(1, obj.guardianId.length));

    db.query(
        {
            sql: "SELECT * FROM ?? WHERE ??=?",
            timeout: 40000,
            values: ["guardian", "GUARDIAN_ID", gId],
        },
        (error, results, fields) => {
            if (error) {
                //logger.error(error.message);
                return res.status(500).send(error);
            }
            return res.status(200).json({
                results: results,
            });
        }
    );
};

// get details of a guardian's children
const getChildren = (req, res) => {
    const obj = req.params;
    logger.info("getChildren request received");
    if (!obj.guardianId) {
        return res.status(400).json({ message: "guardianId is required!" });
    }

    db.query(
        {
            // sql: "WITH children AS ( SELECT * FROM users JOIN student_guardian ON users.USER_ID = student_guardian.STUDENT_ID WHERE GUARDIAN_ID = ?), SELECT  * FROM children ORDER BY ENROLLMENT_DATE DESC ;",
            sql: "SELECT * FROM users AS U1 JOIN student_guardian ON U1.USER_ID = student_guardian.GUARDIAN_ID JOIN users AS U2 ON U2.USER_ID = student_guardian.STUDENT_ID  WHERE U1.USER_ID=? ",
            timeout: 40000,
            values: [obj.guardianId],
        },
        (error, results, fields) => {
            if (error) {
                //logger.error(error.message);
                return res.status(500).send(error);
            }
            return res.status(200).json({
                results: results,
            });
        }
    );
};

/**
 *
 * @param {*} req
 * @param {*} res
 * @returns Get's the attendance of all the children's of a guardian
 */
const getChildrenAttendance = (req, res) => {
    const obj = req.params;

    if (!obj.guardianId) {
        return res.status(400).json({ message: "guardianId is required!" });
    }

    db.query(
        {
            //sql:" WITH children AS ( SELECT STUDENT_ID, GUARDIAN_ID FROM student_guardian WHERE GUARDIAN_ID = ?),attendance AS ( SELECT STUDENT_ID, P_DATE, PRESENT, ACADEMIC_YEAR FROM ATTENDANCE WHERE STUDENT_ID IN (SELECT STUDENT_ID FROM children)) SELECT * FROM attendance ORDER BY STUDENT_ID, ACADEMIC_YEAR DESC, P_DATE DESC;",
            //sql:" SELECT * FROM ATTENDANCE WHERE STUDENT_ID = ?;",
            sql: "SELECT  ROW_NUMBER() OVER(ORDER BY P_DATE) AS id,P_DATE,PRESENT,ACADEMIC_YEAR   FROM ATTENDANCE WHERE STUDENT_ID = ?;",
            timeout: 40000,
            values: [obj.guardianId],
        },
        (error, result, fields) => {
            if (error) {
                //logger.error(error.message);
                return res.status(500).json("error");
            }
            return res.status(200).json(result);
        }
    );
};

const getChildrenClass = (req, res) => {
    const obj = req.params;

    if (!obj.studentId) {
        return res.status(400).json({ message: "studentId is required!" });
    }

    db.query(
        {
            sql: "SELECT * FROM student_academic_history JOIN class_course ON class_course.CLASS_ID = student_academic_history.CLASS_ID JOIN COURSE USING (COURSE_ID) WHERE STUDENT_ID = ? ORDER BY ENROLLMENT_DATE DESC;",
            timeout: 40000,
            values: [obj.studentId],
        },
        (error, result, fields) => {

            if (error) {
                //logger.error(error.message);
                return res.status(500).json("error");
            }

            return res.status(200).json(result);
        }
    );
};

const getClassCourse = (req, res) => {
    const obj = req.params;
    if (!obj.classId) {
        return res.status(400).json({ message: "classId is required!" });
    }

    db.query(
        {
            sql: "SELECT * FROM class_course JOIN COURSE ON COURSE.COURSE_ID = class_course.COURSE_ID WHERE CLASS_ID = ?;",
            timeout: 40000,
            values: [obj.classId],
        },
        (error, result, fields) => {
            if (error) {
                //logger.error(error.message);
                return res.status(500).json("error");
            }
            return res.status(200).json(result);
        }
    );
};

const getChildrenCourseAssessment = (req, res) => {
    const obj = req.params;

    if (!obj.studentId) {
        return res.status(400).json({ message: "studentId is required!" });
    }

    if (!obj.courseId) {
        return res.status(400).json({ message: "courseId is required!" });
    }

    db.query(
        {
            sql: "SELECT * FROM std_asmnt JOIN ASSESSMENT USING (ASSESSMENT_ID) WHERE STUDENT_ID = ? AND COURSE_ID = ?;",
            timeout: 40000,
            values: [obj.studentId, obj.courseId],
        },
        (error, result, fields) => {
            if (error) {
                //logger.error(error.message);
                return res.status(500).json("error");
            }
            return res.status(200).json(result);
        }
    );
};

const getRecentChildrenClass = (req, res) => {
    const obj = req.params;

    if (!obj.studentId) {
        return res.status(400).json({ message: "studentId is required!" });
    }

    db.query({
        sql: "SELECT * FROM student_academic_history WHERE STUDENT_ID = ? ORDER BY ENROLLMENT_DATE DESC LIMIT 1;",
        timeout: 40000,
        values: [obj.studentId],
    },
    (error, result, fields) => {
       
        if(error){
            //logger.error(error.message);
            return res.status(400).json("error");
        }

        return res.status(200).json(result);
    });
};

const getChildrenECA = (req,res) => {
    const obj = req.params;

    if(!obj.studentId){
        return res.status(400).json({message:"studentId is required!"});
    }

    db.query({
        sql:"SELECT * FROM student_eca JOIN ECA USING (ECA_ID) WHERE STUDENT_ID = ?;",
        timeout:40000,
        values:[obj.studentId]
    }, 
    (error,result,fields) => {
        
        if(error) {
            return res.status(500).json("error");
        }
        return res.status(200).json(result);
    })
}

module.exports = {
    createGuardian,
    getGuardians,
    getGuardianById,
    getChildren,
    getChildrenAttendance,
    getChildrenClass,
    getClassCourse,
    getChildrenCourseAssessment,
    getRecentChildrenClass,
    getChildrenECA,
};
