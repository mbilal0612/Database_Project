db = require("../config/db").connection;

const createRelation = (req, res) => {

    var obj = req.body;

    if (!obj.relationName) {
        return res.status(500).json({ message: "MissingInputException: Relation must have a name!" });
    }

    db.query({
        sql: "SELECT * FROM ?? WHERE ?? = ?",
        values: [
            "RELATION",
            "RELATION_TYPE",
            obj.relationName
        ]
    }, (errors, results, fields) => {

        if (errors) {
            return res.status(400).json(errors);
        }

        if (results.length == 0) {

            db.query({
                sql: "INSERT INTO ?? (??) VALUES (?)",
                values: [
                    "RELATION",
                    "RELATION_TYPE",
                    obj.relationName
                ]
            }, (errors, results, fields) => {

                if (errors) {
                    return res.status(400).json(errors);
                }

                return res.status(200).json({
                    message: "Successfully added a new relationship!"
                })

            })

        }
        else {
            return res.status(500).json({ message: "DataDuplicationException: Relation with the same name already exists!" });
        }

    })

};

const getRelations = (req, res) => {

    db.query({
        sql: "SELECT * FROM ??",
        values: [
            "RELATION",
        ]
    }, (errors, results, fields) => {

        if (errors) {
            return res.status(500).json(errors);
        }

        return res.status(200).json(results);

    })

}

const updateRelationByName = (req, res) => {

    var obj = req.body;

    if (!obj.oldRelationName) {
        return res.status(500).json({ message: "MissingInputException: Old Relation must have a name!" });
    }
    if (!obj.newRelationName) {
        return res.status(500).json({ message: "MissingInputException: New Relation must have a name!" });
    }

    db.query({
        sql: "SELECT * FROM ?? WHERE ?? = ?",
        values: [
            "RELATION",
            "RELATION_TYPE",
            obj.oldRelationName
        ]
    }, (errors, results, fields) => {

        if (errors) {
            return res.status(400).json(errors);
        }

        if (results.length > 0) {

            db.query({
                sql: "UPDATE ?? SET ?? = ? WHERE ?? = ?",
                values: [
                    "RELATION",
                    "RELATION_TYPE",
                    obj.newRelationName,
                    "RELATION_TYPE",
                    obj.oldRelationName,
                ]
            }, (errors, results, fields) => {

                if (errors) {
                    return res.status(400).json(errors);
                }

                return res.status(200).json({
                    message: "Successfully added a new relationship!"
                })

            })

        }
        else {
            return res.status(500).json({ message: "DataDuplicationException: Relation DNE!" });
        }

    })

}

//Test : Will not use most probably
const getRelationByID = (req, res) =>{

    var obj = req.params;

    if (!obj.relationName) {
        return res.status(500).json({ message: "MissingInputException: Relation must have a name!" });
    }

    db.query({
        sql: "SELECT * FROM ?? WHERE ?? = ?",
        values: [
            "RELATION",
            "RELATION_TYPE",
            obj.relationName
        ]
    }, (errors, results, fields) => {

        if (errors) {
            return res.status(400).json(errors);
        }

        if (results.length == 0) {
            return res.status(400).json({message: "MissingDataException: Queried relation does not exist!"});
        }
        else {
            return res.status(200).json({ relationID: results[0].RELATION_ID});
        }

    })
}

const assignStudentGuardian = (req, res) => {

    var obj = req.body;
    var relationID;

    db.query({
        sql: "SELECT * FROM ?? WHERE ?? = ?",
        values: [
            "RELATION",
            "RELATION_TYPE",
            obj.relationName
        ]
    }, (errors, results, fields) => {

        if (errors) {
            return res.status(500).json(errors);
        }

        if (results.length == 0) {
            return res.status(400).json({ message: "MissingDataException: Queried relation does not exist!" });
        }

        relationID = results[0].RELATION_ID;

        db.query({
            sql: "SELECT * FROM ?? WHERE ?? = ?",
            values: [
                "STUDENT",
                "STUDENT_ID",
                obj.studentID
            ]
        }, (errors, results, fields) => {
    
            if (errors) {
                return res.status(500).json(errors);
            }
    
            if (results.length == 0) {
                return res.status(400).json({ message: "MissingDataException: Queried student does not exist!" });
            }
            
            db.query({
                sql: "SELECT * FROM ?? WHERE ?? = ?",
                values: [
                    "GUARDIAN",
                    "GUARDIAN_ID",
                    obj.guardianID
                ]
            }, (errors, results, fields) => {
        
                if (errors) {
                    return res.status(500).json(errors);
                }
        
                if (results.length == 0) {
                    return res.status(400).json({ message: "MissingDataException: Queried guardian does not exist!" });
                }
                
                db.query({
                    sql:"INSERT INTO ?? (??,??,??) VALUES (?, ?, ?)",
                    values:
                    [
                        "STUDENT_GUARDIAN",
                        "STUDENT_ID",
                        "GUARDIAN_ID",
                        "RELATION_ID",
                        obj.studentID,
                        obj.guardianID,
                        relationID,
                    ]
                }, (errors, results, fields) => {
            
                    if(errors){
                        if(errors.errno == 1062){
                            return res.status(500).json({message: "DataDuplicationException: This relation already exists!"});
                        }
                        return res.status(500).json({message: "Unknown Error!"});
                    }
            
                    return res.status(200).json({message:"Successfully assigned a student a guardian!"});
            
                })
        
            })
    
        })

    })

}

module.exports = {
    createRelation,
    getRelations,
    updateRelationByName,
    getRelationByID,
    assignStudentGuardian,
};