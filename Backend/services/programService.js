const db = require('../config/db').connection;

const createProgram = (req, res) => {
    const obj = req.body;

    if (!obj.programName) {
        return res.status(400).json({ message: "Program name required!" });
    }
    if (!obj.programDesc) {
        return res.status(400).json({ message: "Program description required!" });
    }

    db.query(
        {
            sql: "SELECT * FROM ?? WHERE ?? = ?",
            values: ["PROGRAM", "PROGRAM_NAME", obj.programName]
        }, (errors, results, fields) => {

            if (errors) {
                res.status(400).json(
                    {
                        message: "SQLException: Learn2SQL dog!"
                    }
                )
            }

            if (results.length > 0) {
                return res.status(200).json(
                    {
                        message: "Program with same name exists!",
                        EC: -1
                    }
                );
            } else {
                db.query({
                    sql: 'INSERT INTO ?? (??, ??) VALUES (?, ?)',
                    values: ['PROGRAM', 'PROGRAM_NAME', 'PROGRAM_DESC', obj.programName, obj.programDesc]
                }, (error, results, fields) => {
                    if (errors) {
                        res.status(400).json(
                            {
                                message: "SQLException: Learn2SQL dog!"
                            }
                        )
                    }

                    return res.status(200).json(
                        {
                            message: "Program successfully created!",
                            EC: 1
                        }
                    );
                })
            }
        }
    )
}

const getAllPrograms = (req, res) => {

    db.query({
        sql: 'SELECT * FROM ??',
        values: ['PROGRAM']
    }, (error, results, fields) => {
        if (error) {
            return res.status(500).json({ message: "Unknown error!" });
        }
        return res.status(200).json(results);
    })
}

const getProgramByID = (req, res) => {

    const obj = req.params;

    if (!obj.programName) {
        return res.status(400).json({ message: "Program ID required!" });
    }

    db.query({
        sql: "SELECT * FROM ?? WHERE ?? = ?",
        timeout: 40000,
        values: ["PROGRAM", "PROGRAM_NAME", obj.programName]
    },
        (error, results, fields) => {
            if (error) {
                return res.status(500).json({ message: "Unknown error!" });
            }
            return res.status(200).json(results);
        })

}

const updateProgram = (req, res) => {
    const obj = req.body;

    if (!obj.programName) {
        return res.status(400).json({ message: "Program name required!" });
    }
    if (!obj.programDesc) {
        return res.status(400).json({ message: "Program description required!" });
    }

    db.query({
        sql: "UPDATE ?? SET ?? = ? WHERE ?? = ?",
        timeout: 40000,
        values: ["PROGRAM", "PROGRAM_DESC", obj.programDesc, "PROGRAM_NAME", obj.programName]

    },
        (error, results, fields) => {
            if (error) {
                return res.status(500).json({ message: "Unknown error!" });
            }
            if (results.changedRows == 0) {
                return res.status(400).json({ message: "Program not found!" });
            }
            return res.status(200).json({ message: "Program updated successfully!" });
        })
};

const deleteProgram = (req, res) => {
    const obj = req.params;

    if (!obj.programName) {
        return res.status(400).json({ message: "Program name required!" });
    }

    db.query({
        sql: "DELETE FROM ?? WHERE ?? = ?",
        timeout: 40000,
        values: ["PROGRAM", "PROGRAM_NAME", obj.programName]

    },
        (error, results, fields) => {
            if (error) {
                return res.status(500).json({ message: "Unknown error!" });
            }
            return res.status(200).json({ message: "Program deleted successfully!" });
        })
};

const assignPlo = (req, res) => {
    const obj = req.body;

    if (!obj.programName) {
        return res.status(400).json({ message: "Program name required!" });
    }

    if (!obj.ploID) {
        return res.status(400).json({ message: "CLO ID required!" });
    }

    db.query({
        sql: "INSERT INTO ?? (??, ??) VALUES (?, ?)",
        timeout: 40000,
        values: ["PROGRAM_PLO", "PROGRAM_NAME", "PLO_ID", obj.programName, obj.ploID]

    },
        (error, results, fields) => {
            if (error) {
                return res.status(500).json({ message: "Unknown error!" });
            }
            return res.status(200).json({ message: "PLO assigned successfully!" });

        })

}

module.exports = {
    createProgram,
    getAllPrograms,
    getProgramByID,
    updateProgram,
    deleteProgram,
    assignPlo,
}