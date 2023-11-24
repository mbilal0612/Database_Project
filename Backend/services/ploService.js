const db = require("../config/db").connection;

/**
 *
 * @param {body:{ ploName, ploDesc}} req needs req.body.ploName and req.body.ploDesc
 * @param {*} res
 * @returns sucess - status 200 otherwise 400 or 500.
 */
const createPLO = (req, res) => {
    obj = req.body;
    if (!obj.ploName) {
        return res.status(400).json({ message: "Need plo to add to table" });
    }

    if (!obj.ploDesc) {
        return res.status(400).json({ message: "PLO Description required!" });
    }

    db.query(
        {
            sql: "SELECT * FROM ?? WHERE ?? = ?",
            values: ["PLO", "PLO_NAME", obj.ploName]
        }, (errors, results, fields) => {

            if (errors) {
                return res.status(500).json(
                    {
                        message: "SQLSkill_IssueException: Learn2SQL!"
                    }
                );
            }

            if (results.length == 0) {

                db.query(
                    {
                        sql: "INSERT INTO ?? (??,??) VALUES (?,?)",
                        timeout: 40000,
                        values: ["PLO", "PLO_NAME", "PLO_DESC", obj.ploName, obj.ploDesc],
                    },
                    (errors, results, fields) => {
                        
                        if (errors) {
                            return res.status(500).json(
                                {
                                    message: "SQLSkill_IssueException: Learn2SQL!"
                                }
                            );
                        }

                        return res.status(200).json(
                            {
                                message: `PLO [Name : ${obj.ploName}] successfully added!`,
                                EC: 1
                            }
                        );
                    }
                );

            } else {

                return res.status(200).json(
                    {
                        message: `PLO [Name : ${obj.ploName}] already exists in the database!`,
                        EC: -1
                    }
                );

            }
        }
    )
};

const getPLOs = (req, res) => {
    db.query(
        {
            sql: "SELECT * FROM ??",
            timeout: 40000,
            values: ["PLO"],
        },
        (error, results, fields) => {
            if (error)
                return res.status(500).json({ message: "unkown error!" });
            return res.status(200).json(results);
        }
    );
};

/**
 * Retrieves a PLO by its ID from the database.
 * @param {Object} req - The request object.
 * @param {Object} req.params - The parameters object containing the PLO ID.
 * @param {string} req.params.ploID - The ID of the PLO to retrieve.
 * @param {Object} res - The response object.
 * @returns {Object} The retrieved PLO object.
 */
const getPLOByID = (req, res) => {
    const obj = req.params;

    if (!obj.ploID) {
        return res.status(400).json({ message: "PLO ID required!" });
    }

    db.query(
        {
            sql: "SELECT * FROM ?? WHERE ?? = ?",
            timeout: 40000,
            values: ["PLO", "PLO_ID", obj.ploID],
        },
        (error, results, fields) => {
            if (error) {
                console.log(error);
                return res.status(500).json({ message: "server error!" });
            }

            return res.status(200).json(results);
        }
    );
};
/**
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */
const updatePLO = (req, res) => {
    const obj = req.body;

    if (!obj.ploID) {
        return res.status(400).json({ message: "PLO ID required!" });
    }
    if (!obj.ploName) {
        return res.status(400).json({ message: "PLO Name required!" });
    }

    if (!obj.ploDesc) {
        return res.status(400).json({ message: "PLO Description required!" });
    }

    db.query(
        {
            sql: "UPDATE ?? SET ?? = ?, ?? = ? WHERE ?? = ?",
            timeout: 40000,
            values: [
                "PLO",
                "PLO_NAME",
                obj.ploName,
                "PLO_DESC",
                obj.ploDesc,
                "PLO_ID",
                obj.ploID,
            ],
        },
        (error, results, fields) => {
            if (error) {
                return res.status(500).json({ message: "server error!" });
            }
            if (results.affectedRows == 0) {
                return res.status(400).json({ message: "PLO not found!" });
            }
            return res
                .status(200)
                .json({ message: "PLO updated successfully!" });
        }
    );
};

const deletePLO = (req, res) => {
    const obj = req.params;

    if (!obj.ploID) {
        return res.status(400).json({ message: "PLO ID required!" });
    }

    db.query(
        {
            sql: "DELETE FROM ?? WHERE ?? = ?",
            timeout: 40000,
            values: ["PLO", "PLO_ID", obj.ploID],
        },
        (error, results, fields) => {
            if (error) {
                return res.status(500).json({ message: "server error!" });
            }
            return res
                .status(200)
                .json({ message: "PLO deleted successfully!" });
        }
    );
};

const getPloByProgram = (req, res) => {
    const obj = req.params;

    if (!obj.programName) {
        return res.status(400).json({ message: "Program name required!" });
    }

    db.query(
        {
            sql: "SELECT * FROM ?? WHERE ?? = ?",
            timeout: 40000,
            values: ["PROGRAM_PLO", "PROGRAM_NAME", obj.programName],
        },
        (error, results, fields) => {
            if (error) {
                return res.status(500).json({ message: "server error!" });
            }
            return res.status(200).json(results);
        }
    );
};

module.exports = {
    createPLO,
    getPLOs,
    getPLOByID,
    updatePLO,
    deletePLO,
    getPloByProgram,
};
