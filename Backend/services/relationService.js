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
            return res.status(500).json({ message: "DataDuplicationException: Relation with the same name already exists!"});
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
                    message: "Successfully updated relationship name!"
                })

            })

        }
        else {
            return res.status(500).json({ message: "MissingDataException: Relation DNE!" });
        }

    })

}

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

const getRelationByGuardianID = (req, res) => {

    obj = req.params;

    if(!obj.guardianID) {
        return res.status(400).json({message: "MissingInputException: GuardianID is required!"});
    }

    db.query({
        sql:"SELECT * FROM ?? WHERE ?? = ?",
        values:[
            "GUARDIAN",
            "GUARDIAN_ID",
            obj.guardianID
        ]
    },(errors, results, fields) =>{

        if(errors){
            return res.status(400).json({message:"Internal Server Error!"});
        }

        if(results.length == 0){
            return res.status(200).json({message: "MissingDataException: No such guardian exists!"});
        }

        db.query({
            sql:"SELECT * FROM ?? WHERE ?? = ? AND ?? = ?",
            values:[
                "STUDENT_GUARDIAN",
                "GUARDIAN_ID",
                obj.guardianID,
                "FLAG",
                1
            ]
        }, (errors, results, fields)=>{
    
            if(errors){
                return res.status(400).json({message:"Internal Server Error!"});
            }
    
            if(results.length == 0){
                return res.status(200).json({message: "MissingDataWarning: Guardian has no assigned protectorate(s)!"});
            }
    
            return res.status(200).json({results});

        })

    } )
}

const getRelationByStudentID = (req, res) => {

    obj = req.params;

    if(!obj.studentID) {
        return res.status(400).json({message: "MissingInputException: GuardianID is required!"});
    }

    db.query({
        sql:"SELECT * FROM ?? WHERE ?? = ?",
        values:[
            "STUDENT",
            "STUDENT_ID",
            obj.studentID
        ]
    },(errors, results, fields) =>{

        if(errors){
            return res.status(400).json({message:"Internal Server Error!"});
        }

        if(results.length == 0){
            return res.status(200).json({message: "MissingDataException: No such student exists!"});
        }

        db.query({
            sql:"SELECT * FROM ?? WHERE ?? = ? AND ?? = ?",
            values:[
                "STUDENT_GUARDIAN",
                "STUDENT_ID",
                obj.studentID,
                "FLAG",
                1
            ]
        }, (errors, results, fields)=>{
    
            if(errors){
                return res.status(400).json({message:"Internal Server Error!"});
            }
    
            if(results.length == 0){
                return res.status(200).json({message: "MissingDataWarning: Student has no assigned guardians(s)!"});
            }
    
            return res.status(200).json({results});

        })

    } )
}

const deleteAllStudentRelations = (req, res) =>{

    var obj = req.body;

    if(!obj.studentID){
        return res.status(404).json({message:"MissingInputException: StudentID is required!"});
    }

    db.query(
        {
            sql: "SELECT * FROM ?? WHERE ?? = ?",
            values:[
                "STUDENT",
                "STUDENT_ID",
                obj.studentID
            ]
        }, (errors, results, fields)=>{

            if(errors){
                return res.status(500).json({message:"Internal Server Error!"});
            }

            if(results.length == 0){
                return res.status(400).json({message: "MissingDataException: No such student in the database!"})
            }

            db.query({
                sql:"UPDATE ?? SET ?? = ? WHERE ?? = ?",
                values:[
                    "STUDENT_GUARDIAN",
                    "FLAG",
                    0,
                    "STUDENT_ID",
                    obj.studentID
                ]
            }, (errors, results, fields) =>{

                if(errors){
                    return res.status(500).json({message:"Internal Server Error!"});
                }

                return res.status(200).json({message: "Deleted all matching student's guardians."})

            }   
            )

        }
    )

}

const deleteAllGuardianRelations = (req, res) =>{

    var obj = req.body;

    if(!obj.guardianID){
        return res.status(404).json({message:"MissingInputException: GuardianID is required!"});
    }

    db.query(
        {
            sql: "SELECT * FROM ?? WHERE ?? = ?",
            values:[
                "GUARDIAN",
                "GUARDIAN_ID",
                obj.guardianID
            ]
        }, (errors, results, fields)=>{

            if(errors){
                return res.status(500).json({message:"Internal Server Error!"});
            }

            if(results.length == 0){
                return res.status(400).json({message: "MissingDataException: No such guardian in the database!"})
            }

            db.query({
                sql:"UPDATE ?? SET ?? = ? WHERE ?? = ?",
                values:[
                    "STUDENT_GUARDIAN",
                    "FLAG",
                    0,
                    "GUARDIAN_ID",
                    obj.guardianID
                ]
            }, (errors, results, fields) =>{

                if(errors){
                    return res.status(500).json({message:"Internal Server Error!"});
                }

                return res.status(200).json({message: "Deleted all matching guardian's protectorate(s)."})

            }   
            )

        }
    )

}

const restoreAllStudentRelations = (req, res) =>{

    var obj = req.body;

    if(!obj.studentID){
        return res.status(404).json({message:"MissingInputException: StudentID is required!"});
    }

    db.query(
        {
            sql: "SELECT * FROM ?? WHERE ?? = ?",
            values:[
                "STUDENT",
                "STUDENT_ID",
                obj.studentID
            ]
        }, (errors, results, fields)=>{

            if(errors){
                return res.status(500).json({message:"Internal Server Error!"});
            }

            if(results.length == 0){
                return res.status(400).json({message: "MissingDataException: No such student in the database!"})
            }

            db.query({
                sql:"UPDATE ?? SET ?? = ? WHERE ?? = ?",
                values:[
                    "STUDENT_GUARDIAN",
                    "FLAG",
                    1,
                    "STUDENT_ID",
                    obj.studentID
                ]
            }, (errors, results, fields) =>{

                if(errors){
                    return res.status(500).json({message:"Internal Server Error!"});
                }

                return res.status(200).json({message: "Restored all matching student's guardians."})

            }   
            )

        }
    )

}

const restoreAllGuardianRelations = (req, res) =>{

    var obj = req.body;

    if(!obj.guardianID){
        return res.status(404).json({message:"MissingInputException: GuardianID is required!"});
    }

    db.query(
        {
            sql: "SELECT * FROM ?? WHERE ?? = ?",
            values:[
                "GUARDIAN",
                "GUARDIAN_ID",
                obj.guardianID
            ]
        }, (errors, results, fields)=>{

            if(errors){
                return res.status(500).json({message:"Internal Server Error!"});
            }

            if(results.length == 0){
                return res.status(400).json({message: "MissingDataException: No such guardian in the database!"})
            }

            db.query({
                sql:"UPDATE ?? SET ?? = ? WHERE ?? = ?",
                values:[
                    "STUDENT_GUARDIAN",
                    "FLAG",
                    1,
                    "GUARDIAN_ID",
                    obj.guardianID
                ]
            }, (errors, results, fields) =>{

                if(errors){
                    return res.status(500).json({message:"Internal Server Error!"});
                }

                return res.status(200).json({message: "Restored all matching guardian's protectorate(s)."})

            }   
            )

        }
    )

}

const deleteSpecificRelation = (req,res) =>{
    
    var obj = req.body;

    if(!obj.studentID){
        return res.status(404).json({message:"MissingInputException: StudentID is required!"});
    }
    if(!obj.guardianID){
        return res.status(404).json({message:"MissingInputException: guardianID is required!"});
    }

    db.query({
        sql:"SELECT * FROM ?? WHERE ?? = ? AND ?? = ?",
        values: [
            "STUDENT_GUARDIAN",
            "STUDENT_ID",
            obj.studentID,
            "GUARDIAN_ID",
            obj.guardianID
        ]
    }, (errors, results, fields) =>{

        if(errors){
            return res.status(500).json({message:"Internal Server Error!"});
        }

        if(results.length == 0){
            return res.status(400).json({message: "MissingDataException: No such relation in the database!"})
        }

        db.query({
            sql: "UPDATE ?? SET ?? = ? WHERE ?? = ? AND ?? = ?",
            values : [
                "STUDENT_GUARDIAN",
                "FLAG",
                0,
                "STUDENT_ID",
                obj.studentID,
                "GUARDIAN_ID",
                obj.guardianID
            ]
        }, (errors, results, fields) =>{

            if(errors){
                return res.status(500).json({message:"Internal Server Error!"});
            }

            return res.status(200).json({message: "Successfully deleted relation!"})

        })

    })
}

const restoreSpecificRelation = (req,res) =>{
    
    var obj = req.body;

    if(!obj.studentID){
        return res.status(404).json({message:"MissingInputException: StudentID is required!"});
    }
    if(!obj.guardianID){
        return res.status(404).json({message:"MissingInputException: guardianID is required!"});
    }

    db.query({
        sql:"SELECT * FROM ?? WHERE ?? = ? AND ?? = ?",
        values: [
            "STUDENT_GUARDIAN",
            "STUDENT_ID",
            obj.studentID,
            "GUARDIAN_ID",
            obj.guardianID
        ]
    }, (errors, results, fields) =>{

        if(errors){
            return res.status(500).json({message:"Internal Server Error!"});
        }

        if(results.length == 0){
            return res.status(400).json({message: "MissingDataException: No such relation in the database!"})
        }

        db.query({
            sql: "UPDATE ?? SET ?? = ? WHERE ?? = ? AND ?? = ?",
            values : [
                "STUDENT_GUARDIAN",
                "FLAG",
                1,
                "STUDENT_ID",
                obj.studentID,
                "GUARDIAN_ID",
                obj.guardianID
            ]
        }, (errors, results, fields) =>{

            if(errors){
                return res.status(500).json({message:"Internal Server Error!"});
            }

            return res.status(200).json({message: "Successfully restored relation!"})

        })

    })
}

const updateExistingRelationshipType = (req,res) =>{

    var obj = req.body;

    var relationID;

    if(!obj.guardianID){
        return res.status(404).json({message:"MissingInputException: GuardianID is required!"});
    }
    if(!obj.studentID){
        return res.status(404).json({message:"MissingInputException: StudentID is required!"});
    }
    if(!obj.newRelationName){
        return res.status(404).json({message:"MissingInputException: NewRelationName is required!"});
    }

    db.query(
        {
            sql: "SELECT * FROM ?? WHERE ?? = ?",
            values:[
                "RELATION",
                "RELATION_TYPE",
                obj.newRelationName
            ]
        }, (errors, results, fields) =>{
        
            
            if(errors){
                return res.status(500).json({message:"Internal Server Error!"});
            }
            
            if(results.length == 0){
                return res.status(400).json({message:"MissingDataException: No such relation type exists!"});
            }

            relationID = results[0].RELATION_ID;

            db.query(
                {
                    sql:"SELECT * FROM ?? WHERE ?? = ? AND ?? = ?",
                    values:[
                        "STUDENT_GUARDIAN",
                        "STUDENT_ID",
                        obj.studentID,
                        "GUARDIAN_ID",
                        obj.guardianID
                    ]
                }, (errors, results, fields) =>{
                
                    if(errors){
                        return res.status(500).json({message:"Internal Server Error!"});
                    }
                    
                    if(results.length == 0){
                        return res.status(400).json({message:"MissingDataException: No such relation exists!"});
                    }

                    db.query(
                        {
                            sql:"UPDATE ?? SET ?? = ? WHERE ?? = ? AND ?? = ?",
                            values:[
                                "STUDENT_GUARDIAN",
                                "RELATION_ID",
                                relationID,
                                "STUDENT_ID",
                                obj.studentID,
                                "GUARDIAN_ID",
                                obj.guardianID
                            ]
                        }, (errors, results, fields)=>{

                            if(errors){
                                return res.status(500).json({message:"Internal Server Error!"});
                            }

                            return res.status(200).json({message: "Successfully updated relation type of relationship!"})

                        }
                    )

                }
            )

            
        }
    )
}

const updateRelationNameByID = (req, res) =>{

    var obj = req.body;

    if(!obj.relationID){
        return res.status(404).json({message:"MissingInputException: RelationID is required!"});
    }
    if(!obj.newRelationName){
        return res.status(404).json({message:"MissingInputException: NewRelationName is required!"});
    }

    db.query(
        {
            sql:"SELECT * FROM ?? WHERE ?? = ?",
            values: [
                "RELATION",
                "RELATION_ID",
                obj.relationID,
            ]
        }, (errors, results, fields)=>{

            if(errors){
                return res.status(500).json({message:"Internal Server Error!"});
            }
            
            if(results.length == 0){
                return res.status(400).json({message:"MissingDataException: No such relation type exists!"});
            }

            db.query(
                {
                    sql:"UPDATE ?? SET ?? = ? WHERE ?? = ?",
                    values: [
                        "RELATION",
                        "RELATION_TYPE",
                        obj.newRelationName,
                        "RELATION_ID",
                        obj.relationID
                    ]
                }, (errors, results, fields)=>{

                    if(errors){
                        return res.status(500).json({message:"Internal Server Error!"});
                    }

                    return res.status(200).json({message: "Successfully updated relation name!"})
                }
            )

        }
        )

}

module.exports = {
    createRelation,
    getRelations,
    updateRelationByName,
    getRelationByID,
    getRelationByGuardianID,
    getRelationByStudentID,
    assignStudentGuardian,
    deleteAllGuardianRelations,
    deleteAllStudentRelations,
    deleteSpecificRelation, 
    restoreSpecificRelation,
    restoreAllStudentRelations,
    restoreAllGuardianRelations,
    updateExistingRelationshipType,
    updateRelationNameByID
};