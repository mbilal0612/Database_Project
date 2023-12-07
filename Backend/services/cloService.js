db = require("../config/db").connection;

const createCLO = (req, res) => {
    const obj = req.body;
    if (!obj.cloName) {
        return res.status(400).json({ message: " CLO Name required" });
    }

    if (!obj.cloDesc) {
        return res.status(400).json({ message: "CLO Description is required" });
    }

    if (!obj.courseId) {
        return res.status(400).json({ message: "Course ID is required" });
    }

    if (!obj.cloId) {
        return res.status(400).json({ message: " clo Id is required" });
    }

    if (!obj.ploIds) {
        return res
            .status(400)
            .json({ message: "MissingInputException: PLO ID(s are) required" });
    }

    db.query(
        {
            sql: "SELECT * FROM ?? WHERE ?? = ?",
            values: ["COURSE", "COURSE_ID", obj.courseId],
        },
        (errors, results, fields) => {
            if (errors) {
                return res.status(500).json({
                    message: "SQLSkill_IssueException: Learn2SQL Dumb fuck.",
                });
            }

            if (results.length == 0) {
                return res.status(200).json({
                    message: `Course [ID : ${obj.courseId}] does not exist in the database!`,
                    EC: -1,
                });
            } else {
                db.query(
                    {
                        sql: "SELECT * FROM ?? WHERE ?? = ?",
                        values: ["CLO", "CLO_ID", obj.cloId],
                    },
                    (errors, results, fields) => {
                        if (errors) {
                            return res.status(500).json({
                                message:
                                    "SQLSkill_IssueException: Learn2SQL Dumb fuck.",
                            });
                        }

                        if (results.length == 0) {
                            db.query(
                                {
                                    sql: "INSERT INTO ?? (??,??,??,??) VALUES (?,?,?,?)",
                                    timeout: 40000,
                                    values: [
                                        "CLO",
                                        "CLO_NAME",
                                        "CLO_DESC",
                                        "COURSE_ID",
                                        "CLO_ID",
                                        obj.cloName,
                                        obj.cloDesc,
                                        obj.courseId,
                                        obj.cloId,
                                    ],
                                },
                                (errors, results, fields) => {
                                    if (errors) {
                                        return res.status(500).json({
                                            message:
                                                "SQLSkill_IssueException: Learn2SQL Dumb fuck.",
                                        });
                                    }

                                    var k = 0;

                                    for (
                                        var i = 0;
                                        i < obj.ploIds.length;
                                        i++
                                    ) {
                                        db.query(
                                            {
                                                sql: "INSERT INTO ?? (??,??) VALUES (?,?)",
                                                values: [
                                                    "PLO_CLO",
                                                    "PLO_ID",
                                                    "CLO_ID",
                                                    obj.ploIds[i],
                                                    obj.cloId,
                                                ],
                                            },
                                            (errors, results, fields) => {
                                                if (errors) {
                                                    return res
                                                        .status(500)
                                                        .json({
                                                            message:
                                                                "SQLSkill_IssueException: Learn2SQL Dumb fuck.",
                                                        });
                                                }
                                                k++;
                                                if (k == obj.ploIds.length) {
                                                    return res
                                                        .status(200)
                                                        .json({
                                                            message: `Succesfully assigned CLO [ID : ${
                                                                obj.cloId
                                                            }] for course [ID : ${
                                                                obj.courseId
                                                            }] and PLOS [${obj.ploIds.toString()}]`,
                                                            EC: 1,
                                                        });
                                                }
                                            }
                                        );
                                    }
                                }
                            );
                        } else {
                            return res.status(200).json({
                                message: `CLO [ID : ${obj.cloId}] already exists for course [ID : ${results[0].COURSE_ID}]!`,
                                EC: 2,
                            });
                        }
                    }
                );
            }
        }
    );
};

const getAllClo = (req, res) => {
    db.query(
        {
            sql: "SELECT * FROM ??",
            timeout: 40000,
            values: ["CLO"],
        },
        (error, results, fields) => {
            if (error) {
                return res.status(500).send(error);
            }
            return res.status(200).send(results);
        }
    );
};

const getCloById = (req, res) => {
    const obj = req.params;

    if (!obj.cloId) {
        return res.status(400).json({ message: "CLO ID is required" });
    }

    db.query(
        {
            sql: "SELECT * FROM ?? WHERE ?? = ?",
            timeout: 40000,
            values: ["CLO", "CLO_ID", obj.cloId],
        },
        (error, results, fields) => {
            if (error) {
                return res.status(500).send(error);
            }
            return res.status(200).send(results);
        }
    );
};

const updateClo = (req, res) => {
    const obj = req.body;

    if (!obj.cloId) {
        return res.status(400).json({ message: "CLO ID is required" });
    }
    if (!obj.cloName) {
        return res.status(400).json({ message: " CLO Name required" });
    }
    if (!obj.cloDesc) {
        return res.status(400).json({ message: "CLO Description is required" });
    }
    if (!obj.courseId) {
        return res.status(400).json({ message: "Course ID is required" });
    }

    db.query(
        {
            sql: "UPDATE ?? SET ?? = ?, ?? = ?, ?? = ? WHERE ?? = ?",
            timeout: 40000,
            values: [
                "CLO",
                "CLO_NAME",
                obj.cloName,
                "CLO_DESC",
                obj.cloDesc,
                "COURSE_ID",
                obj.courseId,
                "CLO_ID",
                obj.cloId,
            ],
        },
        (error, results, fields) => {
            if (error) {
                return res.status(500).send(error);
            }
            return res
                .status(200)
                .json({ message: "clo successfully updated" });
        }
    );
};

const assignToPlo = (req, res) => {
    const obj = req.body;

    console.log(obj);

    if (!obj.ploId) {
        return res.status(400).json({ message: "PLO ID is required" });
    }
    if (!obj.cloId) {
        return res.status(400).json({ message: "CLO ID is required" });
    }

    db.query(
        {
            sql: "INSERT INTO ?? (??,??) VALUES (?,?)",
            timeout: 40000,
            values: ["PLO_CLO", "PLO_ID", "CLO_ID", obj.ploId, obj.cloId],
        },
        (error, results, fields) => {
            if (error) {
                console.log(error);
                return res.status(500).json({ message: "message" });
            }
            return res
                .status(200)
                .json({ message: "PLO successfully assigned to CLO" });
        }
    );
};

const getCloByCourse = (req, res) => {
    const obj = req.params;

    if (!obj.courseId) {
        return res.status(400).json({ message: "Course ID is required" });
    }

    db.query(
        {
            sql: "SELECT * FROM ?? WHERE ?? = ?",
            timeout: 40000,
            values: ["CLO", "COURSE_ID", obj.courseId],
        },
        (error, results, fields) => {
            if (error) {
                return res.status(500).json({ message: "Unknown error!" });
            }
            return res.status(200).json(results);
        }
    );
};

const cloHelper = async (obj, studentId) => {
    db.query(
        {
            sql: "SELECT SUM(??) AS TOTAL, SUM(??) AS OBTAINED FROM ?? JOIN ?? USING(??) JOIN ?? USING(??) JOIN ?? USING(??) WHERE ?? = ? AND ?? = ?",
            values: [
                "MAX_MARKS",
                "OBTAINED_MARKS",
                "QUESTION_ASSESSMENT",
                "STD_ASMNT",
                "ASSESSMENT_ID",
                "QUESTION_CLO",
                "QUESTION_ID",
                "ASSESSMENT",
                "ASSESSMENT_ID",
                "CLO_ID",
                obj.CLO_ID,
                "STUDENT_ID",
                studentId,
            ],
        },
        async (error, results, fields) => {
            if (error) {
                console.log(error);
                return null;
            } else {
                if (results.length == 0) return tbr;
                obj.OBTAINED_MARKS = results[0].OBTAINED;
                obj.MAX_MARKS = results[0].TOTAL;
                console.log("first");
                return obj;
            }
        }
    );
};

const funcCaller = async (arr, studentId) => {

    for (let i = 0; i < arr.length; i++) {
        arr[i] = { ...arr[i], OBTAINED_MARKS: 0, MAX_MARKS: 0 };
        arr[i] = await cloHelper(arr[i], studentId);
        // if (arr[i] == null) {
        //   console.log("second");
        //   return null;
        // }
    }
    return arr;
};

const getStudentProgress = (req, res) => {
    var obj = req.params;
    if (!obj.studentId) {
        return res.status(400).json({ message: "Student ID is required" });
    }
    if (!obj.courseId) {
        return res.status(400).json({ message: "course ID is required" });
    }
    db.query(
        {
            sql: "SELECT DISTINCT(??), ?? FROM ?? JOIN ?? USING(??) JOIN ?? USING(??) join ?? using(??) WHERE ?? = ?",
            values: [
                "CLO_ID",
                "CLO_NAME",
                "QUESTION_ASSESSMENT",
                "ASSESSMENT",
                "ASSESSMENT_ID",
                "QUESTION_CLO",
                "QUESTION_ID",
                "CLO",
                "CLO_ID",
                "ASSESSMENT.COURSE_ID",
                obj.courseId,
            ],
        },
        async (error, results1, fields) => {
            if (error) {
                return res.status(500).json({ message: "Unknown error!" });
            }
          //  var tbr = await funcCaller(results, obj.studentId);
            // for (let i = 0; i < results.length; i++) {
            //     results[i] = { ...results[i], OBTAINED_MARKS: 0, MAX_MARKS: 0 };
            //     results[i] = await cloHelper(results[i], obj.studentId);
            // }
            // if (tbr == null)
            //     return res
            //         .status(500)
            //         .json({ message: "unkown error occured" });


            data = []
            results1.forEach((clo) => {
                console.log(clo);
                db.query(
                    {
                        sql: "SELECT ??,??,??,SUM(??) AS TOTAL, SUM(??) AS OBTAINED FROM ?? JOIN ?? USING(??) JOIN ?? USING(??) JOIN ?? USING(??) WHERE ?? = ? AND ?? = ? AND ?? = ?",
                        values: [
                            "COURSE_ID","STUDENT_ID","CLO_ID",
                            "MAX_MARKS",
                            "OBTAINED_MARKS",
                            "QUESTION_ASSESSMENT",
                            "STD_ASMNT",
                            "ASSESSMENT_ID",
                            "QUESTION_CLO",
                            "QUESTION_ID",
                            "ASSESSMENT",
                            "ASSESSMENT_ID",
                            "CLO_ID",
                            clo.CLO_ID,
                            "STUDENT_ID",
                            obj.studentId,
                            "COURSE_ID",
                            obj.courseId
                        ],
                    },
                    (error, results, fields) => {
                        if (error) {
                            console.log(error);
                            return ;
                        } else {

                            console.log(results);
                            data.push({
                                CLO_ID: clo.CLO_ID,
                                CLO_NAME: clo.CLO_NAME,
                                OBTAINED: results[0].OBTAINED/results[0].TOTAL * 100.0,
                                MAX_MARKS: results[0].TOTAL,
                                

                            })
                            
                            if(results1.length == data.length){
                                console.timeLog(data);
                                return res.status(200).json(data);
                            }
                            
                            
                        }
                    }
                );


            });

        }
    );
};


const getCloProgess = (req, res) => {
  const obj = req.body;

  return res.status(200).json({ message: "success" });
};


const clohelper2 = (req, res) => {
    const obj = req.params;
    console.log(req.body)

    if(!obj.cloId){
        return res.status(400).json({ message: "CLO ID is required" });
    }

    if(!obj.studentId){
        return res.status(400).json({ message: "Student ID is required" });
    }

    if(!obj.courseId){
        return res.status(400).json({ message: "course ID is required" });
    }

    db.query(
        {
            sql: "SELECT ??,??,??,SUM(??) AS TOTAL, SUM(??) AS OBTAINED FROM ?? JOIN ?? USING(??) JOIN ?? USING(??) JOIN ?? USING(??) WHERE ?? = ? AND ?? = ? AND ?? = ?",
            values: [
                "COURSE_ID","STUDENT_ID","CLO_ID",
                "MAX_MARKS",
                "OBTAINED_MARKS",
                "QUESTION_ASSESSMENT",
                "STD_ASMNT",
                "ASSESSMENT_ID",
                "QUESTION_CLO",
                "QUESTION_ID",
                "ASSESSMENT",
                "ASSESSMENT_ID",
                "CLO_ID",
                obj.cloId,
                "STUDENT_ID",
                obj.studentId,
                "COURSE_ID",
                obj.courseId
            ],
        },
        async (error, results, fields) => {
            if (error) {
                console.log(error);
                return null;
            } else {
                // if (results.length == 0) return tbr;
                obj.OBTAINED_MARKS = results[0].OBTAINED;
                obj.MAX_MARKS = results[0].TOTAL;
                console.log("first");
                return res.status(200).json(results);
            }
        }
    );
};


module.exports = {
    createCLO,
    getCloById,
    getAllClo,
    updateClo,
    assignToPlo,
    getCloByCourse,
    getStudentProgress,
    clohelper2,
};
