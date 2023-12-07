db = require("../config/db").connection;

const createCourse = (req, res) => {
    const obj = req.body;

    if (!obj.courseName) {
        return res.status(400).json({ message: " Course Name required" });
    }
    if (!obj.courseId) {
        return res.status(400).json({ message: "CourseID is required" });
    }

    db.query(
        {
            sql: "SELECT * FROM ?? WHERE ?? = ?",
            values: [
                "COURSE",
                "COURSE_ID",
                obj.courseId,
            ]
        }, (errors, results, fields) => {

            if (errors) {
                res.status(400).json(
                    {
                        message: "SQLException: Learn2SQL dog!"
                    }
                )
            }

            if (results.length > 0) {
                return res.status(200).json({ message: `A duplicate course with ID [${obj.courseId}] exists!`, EC: -1 });
            } else {

                //Learn2Code
                db.query(
                    {
                        sql: "INSERT INTO ?? (??,??) VALUES (?,?)",
                        timeout: 40000,
                        values: [
                            "COURSE",
                            "COURSE_ID",
                            "COURSE_NAME",
                            obj.courseId,
                            obj.courseName,
                        ],
                    },
                    (error, results, fields) => {
                        if (errors) {
                            res.status(400).json(
                                {
                                    message: "SQLException: Learn2SQL dog!"
                                }
                            )
                        }

                        return res.status(200).json({ message: `Successfully added course ${obj.courseName} [${obj.courseId}]!`, EC: 1 });
                    }
                );
            }
        }
    )
};

const getStudentCourses = (req, res) => {
    var obj = req.params;
    if (!obj.id)
        return res.status(400).json({ message: "student id not provided" });
    db.query(
        {
            sql: "SELECT * FROM ?? JOIN ?? USING (??) JOIN ?? USING (??) WHERE ?? = ? and EXTRACT(YEAR FROM ??) = (SELECT MAX(EXTRACT(YEAR FROM ??)) FROM ?? WHERE ?? = ?)",
            values: [
                "STUDENT_ACADEMIC_HISTORY",
                "CLASS_COURSE",
                "CLASS_ID",
                "COURSE",
                "COURSE_ID",
                "STUDENT_ID",
                obj.id,
                "ENROLLMENT_DATE",
                "ENROLLMENT_DATE",
                "STUDENT_ACADEMIC_HISTORY",
                "STUDENT_ID",
                obj.id,
            ],
        },
        (error, results, fields) => {
            if (error) {
                console.log(error);
                return res.status(500).json({ message: "unkown error occurred" });
            }
            return res.status(200).json(results);
        }
    );
};

const getAllCourse = (req, res) => {
    const obj = req.body;

    db.query(
        {
            sql: "SELECT * FROM ??",
            timeout: 40000,
            values: ["COURSE"],
        },
        (error, results, fields) => {
            if (error) {
                return res.status(500).send(error);
            }

            return res.status(200).send(results);
        }
    );
};

const getCourseById = (req, res) => {
    const obj = req.params;

    if (!obj.Id) {
        return res.status(400).json({ message: "please give id in the url" });
    }

    db.query(
        {
            sql: "SELECT * FROM ?? WHERE ?? = ?",
            timeout: 40000,
            values: ["COURSE", "COURSE_ID", obj.Id],
        },

        (error, results, fields) => {
            if (error) {
                return res.status(400).send(error);
            }

            return res.status(200).send(results);
        }
    );
};

const getFacultyCourses = (req, res) => {
    var obj = req.params;
    if (!obj.facultyId)
        return res.status(400).json({ message: "facultyID not provided" });
    db.query(
        {
            sql: "SELECT * FROM ?? JOIN ?? USING (??) WHERE ?? = ?",
            values: [
                "CLASS_COURSE",
                "COURSE",
                "COURSE_ID",
                "FACULTY_ID",
                obj.facultyId,
            ],
        },
        (err, results, fields) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ message: "internal error occured" });
            }
            return res.status(200).send(results);
        }
    );
};

const getSimilarCourse = (req, res) => {
    const obj = req.params;
    let queryTerm = "%";
    if (!obj.searchTerm) {
        return res.status(400).json({ message: "search Term is required" });
    }

    queryTerm = queryTerm + obj.searchTerm + "%";

    db.query(
        {
            sql: "SELECT * FROM ?? WHERE ?? LIKE ?",
            timeout: 40000,
            values: ["COURSE", "COURSE_NAME", queryTerm],
        },
        (error, results, fields) => {
            if (error) {
                return res.status(500).send(error);
            }

            return res.status(200).send(results);
        }
    );
};

const updateCourse = (req, res) => {
    const obj = req.body;

    if (!obj.courseName) {
        return res.status(400).json({ message: "course Name is required" });
    }

    if (!obj.courseId) {
        return res.status(400).json({ message: "course Id is required" });
    }

    db.query(
        {
            sql: "UPDATE ?? SET ?? = ? WHERE ?? = ?",
            timeout: 40000,
            values: [
                "COURSE",
                "COURSE_NAME",
                obj.courseName,
                "COURSE_ID",
                obj.courseId,
            ],
        },
        (error, results, fields) => {
            if (error) {
                return res.status(500).send(error);
            }

            return res.status(200).json({ message: " successful change" });
        }
    );
};

const getCourseDetails = (req, res) => {
    var obj = req.params;
    if (!obj.classId)
        return res.status(400).json({ message: "class id is required" });

    db.query(
        {
            sql: "SELECT * FROM ?? JOIN ?? ON ??=??  WHERE ?? = ? ",
            values: [
                "USERS",
                "STUDENT_ACADEMIC_HISTORY",
                "STUDENT_ID",
                "USER_ID",
                "CLASS_ID",
                obj.classId,
            ],
        },
        (error, results, fields) => {
            if (error) {
                console.log(error);
                return res.status(500).json({ message: "Unknown errorrr occured" });
            }
            return res.status(200).json(results);
        }
    );
};

const assignCourseToClass = (req, res) => {

    var obj = req.body;

    if (!obj.courseID) {
        return res.status(400).json({ message: "MissingInputException: CourseID is missing!", EC: -1 });
    }

    if (!obj.classID) {
        return res.status(400).json({ message: "MissingInputException: ClassID is missing!", EC: -1 });
    }

    if (!obj.facultyID) {
        return res.status(400).json({ message: "MissingInputException: FacultyID is missing!", EC: -1 });
    }

    if (!obj.startTime) {
        return res.status(400).json({ message: "MissingInputException: Start TIme is missing!", EC: -1 });
    }

    if (!obj.endTime) {
        return res.status(400).json({ message: "MissingInputException: End Time is missing!", EC: -1 });
    }

    if (!obj.day) {
        return res.status(400).json({ message: "MissingInputException: Day is missing!", EC: -1 });
    }

    db.query(
        {
            sql: "SELECT * FROM ?? WHERE ?? = ? AND ?? = ?",
            values: ["USERS", "USER_ID", obj.facultyID, "ROLE_ID", "FACULTY"]
        }, (errors, results, fields) => {

            if (errors) {
                return res.status(400).json({ message: "SQLSkill_IssueException: Learn 2 SQL! [1]", EC: -1 });
            }

            if (results.length == 1) {

                db.query(
                    {
                        sql: "SELECT * FROM ?? WHERE ?? = ?",
                        values: ["COURSE", "COURSE_ID", obj.courseID]
                    }, (errors, results, fields) => {

                        if (errors) {
                            return res.status(400).json({ message: "SQLSkill_IssueException: Learn 2 SQL!! [2]", EC: -1 });
                        }

                        if (results.length == 1) {

                            db.query(
                                {
                                    sql: "SELECT * FROM ?? WHERE ?? = ?",
                                    values: ["CLASS", "CLASS_ID", obj.classID]
                                }, (errors, results, fields) => {

                                    if (errors) {
                                        return res.status(400).json({ message: "SQLSkill_IssueException: Learn 2 SQL !! [3]", EC: -1 });
                                    }

                                    if (results.length == 1) {

                                        db.query(
                                            {
                                                sql: "SELECT * FROM ?? WHERE ?? BETWEEN ? AND ? AND ?? = ? AND ?? =?",
                                                values: ["CLASS_COURSE", "START_TIME", obj.startTime, obj.endTime, "CLASS_ID", obj.classID, "DAY", obj.day]
                                            }, (errors, results, fields) => {

                                                if (errors) {
                                                    return res.status(400).json({ message: "SQLSkill_IssueException: Learn 2 SQL ! [4]", EC: -1 });
                                                }

                                                if (results.length == 0) {

                                                    db.query(
                                                        {
                                                            sql: "SELECT * FROM ?? WHERE ?? BETWEEN ? AND ? AND ?? = ? AND ?? = ?",
                                                            values: ["CLASS_COURSE", "END_TIME", obj.startTime, obj.endTime, "CLASS_ID", obj.classID, "DAY", obj.day]
                                                        }, (errors, results, fields) => {

                                                            if (errors) {
                                                                return res.status(400).json({ message: "SQLSkill_IssueException: Learn 2 SQL !! [5]", EC: -1 });
                                                            }

                                                            if (results.length == 0) {

                                                                db.query(
                                                                    {
                                                                        sql: " SELECT * FROM ?? WHERE ?? = ? AND ?? BETWEEN ? AND ? AND ?? = ?",
                                                                        values: ["CLASS_COURSE", "FACULTY_ID", obj.facultyID, "START_TIME", obj.startTime, obj.endTime, "DAY", obj.day]
                                                                    }, (errors, results, fields) => {

                                                                        if (errors) {
                                                                            return res.status(400).json({ message: "SQLSkill_IssueException: Learn 2 SQL !! [6]", EC: -1 });
                                                                        }

                                                                        if (results.length == 0) {

                                                                            db.query(
                                                                                {
                                                                                    sql: " SELECT * FROM ?? WHERE ?? = ? AND ?? BETWEEN ? AND ? AND ?? = ?",
                                                                                    values: ["CLASS_COURSE", "FACULTY_ID", obj.facultyID, "END_TIME", obj.startTime, obj.endTime,"DAY", obj.day]
                                                                                }, (errors, results, fields) => {

                                                                                    if (errors) {
                                                                                        return res.status(400).json({ message: "SQLSkill_IssueException: Learn 2 SQL !! [7]", EC: -1 });
                                                                                    }

                                                                                    if (results.length == 0) {

                                                                                        db.query(
                                                                                            {
                                                                                                sql: "INSERT INTO ?? (??,??,??,??,??,??) VALUES (?,?,?,?,?,?)",
                                                                                                values: ["CLASS_COURSE", "CLASS_ID", "COURSE_ID", "FACULTY_ID", "START_TIME", "END_TIME", "DAY",
                                                                                                    obj.classID, obj.courseID, obj.facultyID, obj.startTime, obj.endTime, obj.day]
                                                                                            }, (errors, results, fields) => {

                                                                                                if (errors) {
                                                                                                    return res.status(400).json({ message: "SQLSkill_IssueException: Learn 2 SQL !!"[8], EC: -1 });
                                                                                                }

                                                                                                return res.status(200).json({ message: "Successfully assigned Faculty and Class to Course!", EC: 1 });

                                                                                            }
                                                                                        )

                                                                                    } else {
                                                                                        return res.status(200).json({ message: "ScheduleConflict: Faculty not available at end time!", EC: -1 });
                                                                                    }

                                                                                }
                                                                            )

                                                                        } else {
                                                                            return res.status(200).json({ message: "ScheduleConflict: Faculty not available at the start time!", EC: -1 });
                                                                        }

                                                                    }
                                                                )
                                                            } else {
                                                                return res.status(200).json({ message: "ScheduleConflict: Course has conflicting end time!", EC: -1 });
                                                            }

                                                        }
                                                    )

                                                } else {
                                                    return res.status(200).json({ message: "ScheduleConflict: Course has conflicting start time!", EC: -1 });
                                                }

                                            }
                                        )

                                    } else {
                                        return res.status(200).json({ message: "DataIntegrityException: Input ClassID not found in database!", EC: -1 });
                                    }

                                }
                            )

                        } else {
                            return res.status(200).json({ message: "DataIntegrityException: Input CourseID not found in database!", EC: -1 });
                        }

                    }
                )

            } else {
                return res.status(200).json({ message: "DataIntegrityException: Input FacultyID not found in database!", EC: -1 });
            }
        }
    )

};

module.exports = {
    createCourse,
    getCourseById,
    getAllCourse,
    updateCourse,
    getSimilarCourse,
    getFacultyCourses,
    getStudentCourses,
    getCourseDetails,
    assignCourseToClass,
};
