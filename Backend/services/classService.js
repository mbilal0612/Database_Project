const db = require("../config/db").connection;

const createClass = (req, res) => {
    const obj = req.body;

    if (!obj.strength) {
        return res.status(400).json({ message: "strength is required!" });
    }
    if (!obj.year) {
        return res.status(400).json({ message: "year is required!" });
    }
    if (!obj.section) {
        return res.status(400).json({ message: "Section is required!" });
    }
    if (!obj.startYear) {
        return res.status(400).json({ message: "start year is required!" });
    }

    var str = "";

    if (obj.year < 10) {
        str = str + "0";
    }
    str = str + obj.year + "-" + obj.section + "-" + obj.startYear;

    db.query(
        {
            sql: "INSERT INTO ?? (??,??,??,??,??) VALUES (?,?,?,?,?)",
            timeout: 40000, // 40s
            values: [
                "CLASS",
                "CLASS_ID",
                "START_YEAR",
                "STRENGTH",
                "YEAR",
                "SECTION",
                str,
                obj.startYear,
                obj.strength,
                obj.year,
                obj.section,
            ],
        },
        function (error, results, fields) {
            if (error) {
                return res.status(500).json({
                    message: "Something went wrong please try again later...",
                });
            } else {
                return res.status(200).json({
                    message: "Class Created",
                    class: {
                        startYear: obj.START_YEAR,
                        strength: obj.strength,
                        year: obj.year,
                        section: obj.section,
                    },
                });
            }
        }
    );
};

const getClassID = (req, res) => {
    const obj = req.body;
    if (!obj.year) {
        return res.status(400).json({ message: "year is required!" });
    }
    if (!obj.section) {
        return res.status(400).json({ message: "section is required!" });
    }
    if (!obj.startYear) {
        return res.status(400).json({ message: "start year is required!" });
    }
    db.query(
        {
            sql: "SELECT ?? FROM ?? WHERE ??=? AND ??=? AND ??=?",
            values: [
                "CLASS_ID",
                "CLASS",
                "YEAR",
                obj.year,
                "SECTION",
                obj.section,
                "START_YEAR",
                obj.startYear,
            ],
        },
        (error, results, fields) => {
            if (error) return res.status(500).send("unkown error occured");
            else {
                if (results.length === 0)
                    return res.status(400).send("Class does not exist");
                else return res.json(results[0]);
            }
        }
    );
};

const getClassByID = (req, res) => {
    const obj = req.params;

    if (!obj.classID) {
        return res.status(400).json({ message: "classId is required!" });
    }

    db.query(
        {
            sql: "SELECT * FROM ?? WHERE ??=?",
            timeout: 40000, // 40s
            values: ["CLASS", "CLASS_ID", obj.classID],
        },
        (error, results, fields) => {
            if (error) {
                return res.status(400).json("something went wrong");
            }

            return res.status(200).json(results);
        }
    );
};

const getClassByAcademicYear = (req, res) => {
    var obj = req.params;

    if (!obj.startYear) {
        return res
            .status(400)
            .json({ message: "MissingInputException: startYear is required!" });
    }

    db.query(
        {
            sql: "SELECT * FROM ?? WHERE ?? = ?",
            values: ["CLASS", "START_YEAR", obj.startYear],
        },
        (errors, results, fields) => {
            if (errors) {
                return res
                    .status(400)
                    .json({ message: "SQLSkillIssueException: SQL Error!" });
            }

            if (results.length == 0) {
                return res.status(200).json({ message: "No Records!" });
            }

            return res.status(200).json({ message: "Success!", data: results });
        }
    );
};

const getClassesForArrears = (req, res) => {
    db.query(
        {
            sql: "SELECT DISTINCT(??), ?? FROM ??",
            values: ["YEAR", "START_YEAR", "CLASS"],
        },
        (errors, results, fields) => {
            if (errors) {
                return res
                    .status(400)
                    .json({ message: "SQLSkill_Issue: Learn 2 SQL!" });
            }

            if (results.length == 0) {
                return res.status(400).json({
                    message: "DataMissingException: Request returned nothing!",
                });
            }

            return res.status(200).json({ results });
        }
    );
};

const getAllClasses = (req, res) => {
    db.query(
        {
            sql: "SELECT ?? FROM ??",
            values: ["CLASS_ID", "CLASS"],
        },
        (errors, results, fields) => {
            if (errors) {
                return res
                    .status(400)
                    .json({ message: "SQLSkill_Issue: Learn 2 SQL!" });
            }

            if (results.length == 0) {
                return res.status(400).json({
                    message: "DataMissingException: Request returned nothing!",
                });
            }

            return res.status(200).json({ results });
        }
    );
};

const getClassMarks = (req, res) => {
    var obj = req.params;
    if (!obj.assessmentId) {
        return res.status(400).json({ message: "Assessment ID is Required" });
    }
    if (!obj.classId) {
        return res.status(400).json({ message: "Class ID is Required" });
    }

    db.query(
        {
            sql: "SELECT ??, ??, ??, ??, ??, ??, ?? FROM ?? JOIN ?? ON ?? = ?? JOIN ?? USING(??) JOIN ?? USING(??) WHERE ?? = ? AND ?? = ?",
            values: [
                "FIRST_NAME",
                "LAST_NAME",
                "USER_ID",
                "ASSESSMENT_ID",
                "ASSESSMENT_TYPE",
                "MAX_MARKS",
                "OBTAINED_MARKS",
                "USERS",
                "STUDENT_ACADEMIC_HISTORY",
                "USER_ID",
                "STUDENT_ID",
                "STD_ASMNT",
                "STUDENT_ID",
                "ASSESSMENT",
                "ASSESSMENT_ID",
                "CLASS_ID",
                obj.classId,
                "ASSESSMENT_ID",
                obj.assessmentId,
            ],
        },
        (error, results, fields) => {
            if (error) {
                console.log(error);
                return res.status(500).json({ message: "database error" });
            }
            return res.status(200).json(results);
        }
    );
};

module.exports = {
    createClass,
    getClassByID,
    getClassID,
    getClassByAcademicYear,
    getClassesForArrears,
    getAllClasses,
    getClassMarks,
};
