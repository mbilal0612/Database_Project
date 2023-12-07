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
    if (!obj.gender) {
        return res.status(400).json({ message: "Gender is required" });
    }
    if (!obj.hireDate) {
        return res.status(400).json({ message: "Hire Date is required!" });
    }
    if (!obj.nationality) {
        return res.status(400).json({ message: "Nationality is required!" });
    }
    if (!obj.religion) {
        return res.status(400).json({ message: "Relgion is required" });
    }
    if (!obj.salary) {
        return res.status(400).json({ message: "Salary is required!" });
    }
    db.query(
        {
            sql: "SELECT * FROM ?? WHERE ?? = ?",
            values: ["FACULTY", "CNIC", obj.CNIC],
        },
        (e, r, f) => {
            if (r.length == 0) {
                db.query(
                    {
                        sql: "INSERT INTO ?? (??,??,??,??,??,??,??,??,??,??) VALUES (?,?,?,?,?,?,?,?,?,?)",
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
                        ],
                    },
                    (error, results, fields) => {
                        if (error) {
                            console.log(error);
                            return res.status(500).json({ message: "unkown error occured" });
                        }
                        db.query(
                            {
                                sql: "SELECT * FROM ?? WHERE ??=?",
                                values: ["FACULTY", "CNIC", obj.CNIC],
                            },
                            (err, results, fields) => {
                                if (results.size === 0)
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
                                                    return res.status(200).json({
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
            } else {
                return res
                    .status(400)
                    .json({ message: "A faculty with the same CNIC already exists" });
            }
        }
    );
};

const updateFaculty = (req, res) => {
    const obj = req.body;

    if (!obj.facultyId) {
        return res.status(400).json({ message: "id is required" });
    }
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

    if (!obj.gender) {
        return res.status(400).json({ message: "Gender is required" });
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
    if (!obj.religion) {
        return res.status(400).json({ message: "Religion is Required! " });
    }

    if (!obj.fullTime) {
        return res.status(400).json({ message: "full time is required" });
    }

    db.query(
        {
            sql: "UPDATE ?? SET ??=? , ??=?, ??=? , ??=? , ??=? , ??=? , ??=? , ??=? , ??=? , ??=? WHERE ?? = ?",
            timeout: 40000,
            values: [
                "FACULTY",
                "CNIC",
                obj.CNIC,
                "FIRST_NAME",
                obj.firstName,
                "LAST_NAME",
                obj.lastName,
                "DOB",
                obj.DOB,
                "HIRE_DATE",
                obj.hireDate,
                "SALARY",
                obj.salary,
                "NATIONALITY",
                obj.nationality,
                "RELIGION",
                obj.religion,
                "GENDER",
                obj.gender,
                "FULL_TIME",
                obj.fullTime,
                "FACULTY_ID",
                obj.facultyId,
            ],
        },
        (error, results, fields) => {
            if (error) {
                return res.status(500).send(error);
            }

            return res.status(200).json({ message: "Succesfully changed" });
        }
    );
};

const getAllFaculty = (req, res) => {
    db.query(
        {
            sql: "SELECT * FROM ?? ",
            timeout: 40000,
            values: ["FACULTY"],
        },

        (error, results, fields) => {
            if (error) {
                return res.status(500).send(error);
            }

            return res.status(200).send(results);
        }
    );
};

const getFacultyById = (req, res) => {
    const obj = req.params;

    if (!obj.id) {
        return res.status(400).send({ message: "Need ID " });
    }

    db.query(
        {
            sql: "SELECT * FROM ?? WHERE ?? = ?",
            timeout: 40000,
            values: ["USERS", "USER_ID", obj.id],
        },

        (error, results, fields) => {
            if (error) {
                return res.status(500).send(error);
            }
            if (results.length === 0)
                return res.status(400).json({ message: "invalid id" });
            if (results[0].ROLE_ID != "FACULTY")
                return res
                    .status(400)
                    .json({ message: "The following id does not belong to a teacher" });
            return res.status(200).send(results[0]);
        }
    );
};

const getAssessmentsByCourseId = (req, res) => {
    var obj = req.params;
    if (!obj.courseId)
        return res.status(400).json({ message: "course ID is required" });
    if (!obj.facultyId)
        return res.status(400).json({ message: "course ID is required" });
    db.query(
        {
            sql: "SELECT * FROM ?? WHERE ??=? AND ??=?",
            values: [
                "ASSESSMENT",
                "COURSE_ID",
                obj.courseId,
                "FACULTY_ID",
                obj.facultyId,
            ],
        },
        (error, results, fields) => {
            if (error)
                return res.status(500).json({ message: "Unknown error occured" });
            return res.status(200).json({ results });
        }
    );
};

const createQuestion = (req, res) => {
    var obj = req.body;
    if (!obj.assessmentId)
        return res.status(400).json({ message: "Assessment ID is required" });
    if (!obj.questionDesc)
        return res
            .status(400)
            .json({ message: "Question Description is required" });
    if (!obj.maxMarks)
        return res.status(400).json({ message: "Maximum Marks is required" });
    db.query(
        {
            sql: "INSERT INTO ?? (??,??) VALUES (?,?)",
            values: [
                "QUESTION",
                "QUESTION_DESC",
                "MAX_MARKS",
                obj.questionDesc,
                obj.maxMarks,
            ],
        },
        (error, results, fields) => {
            if (error) {
                console.log(error);
                return res.status(500).json({ message: "Unknown error occured" });
            }
            // console.log(results.insertId);
            var quesId = results.insertId;
            db.query(
                {
                    sql: "INSERT INTO ?? VALUES (?,?)",
                    values: ["QUESTION_ASSESSMENT", quesId, obj.assessmentId],
                },
                (error, results, fields) => {
                    if (error) {
                        console.log(error);
                        return res.status(500).json({ message: "Unknown error occured" });
                    }
                    return res.status(200).json({ message: "successfully added" });
                }
            );
        }
    );
};

const getQuestionsByAssessmentId = (req, res) => {
    var obj = req.params;
    if (!obj.assessmentId)
        return res.status(400).json({ message: "Assessment ID is required" });
    db.query(
        {
            sql: "SELECT * FROM ?? JOIN ?? USING (??) WHERE ?? = ?",
            values: [
                "QUESTION_ASSESSMENT",
                "QUESTION",
                "QUESTION_ID",
                "ASSESSMENT_ID",
                obj.assessmentId,
            ],
        },
        (error, results, fields) => {
            if (error)
                return res.status(500).json({ message: "Unknown error occured" });
            return res.status(200).json({ results });
        }
    );
};

//exports
module.exports = {
    createFaculty,
    getFacultyById,
    getAllFaculty,
    updateFaculty,
    getAssessmentsByCourseId,
    getQuestionsByAssessmentId,
    createQuestion,
};
