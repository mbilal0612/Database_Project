const db = require("../config/db").connection;

const createAcademicYear = (req, res) =>{

    var obj = req.body;

    if(!obj.startYear){
        return res.status(400).json({message: "MissingInputException: startYear is required!"})
    }

    if(!obj.academicDesc){
        return res.status(400).json({message: "MissingInputException: academicDesc is required!"})
    }

    db.query(
        {
            sql: "SELECT * FROM ?? WHERE ?? = ?",
            values: [
                "AcademicYear",
                "Start_Year",
                obj.startYear
            ]
        }, (errors, results, fields) => {

            if(errors){
                return res.status(400).json({message: "SQLSkillIssueException: SQL Error!"})
            }

            if(results.length > 0){
                return res.status(400).json({message: "DataDuplicationException: Current start year already exists!"})
            }

            db.query(
                {
                    sql: "INSERT INTO ?? (??, ??) VALUES (?, ?)",
                    values: [
                        "AcademicYear",
                        "START_YEAR",
                        "ACADEMICDESC",
                        obj.startYear,
                        obj.academicDesc
                    ]
                }, (errors, results, fields) => {
                
                    if(errors){
                        return res.status(400).json({message: "SQLSkillIssueException: SQL Error!"})
                    }

                    return res.status(200).json({message: "Successfully added new academic year!"});

                }
                )

        }
    )
}

const getAcademicYears = (req, res) => {

    db.query(
        {
            sql:"SELECT * FROM ?? WHERE ?? = ?",
            values: 
            [
                "AcademicYear",
                "FLAG",
                1
            ]
        }, (errors, results, fields) =>{

            if(errors){
                return res.status(400).json({message: "SQLSkillIssueException: SQL Error!"})
            }

            if(results.length == 0){
                return res.status(200).json({message: "No entries exist!"});
            }

            return res.status(200).json({message:"Success", data: results});

        }
    )
}

const deleteAcademicYear = (req, res) => {

    var obj = req.body;

    if(!obj.startYear){
        return res.status(404).json({message: "MissingInputException: startYear is required!"});
    }

    db.query(
        {
            sql:"SELECT * FROM ?? WHERE ?? = ?",
            values: 
            [
                "AcademicYear",
                "START_YEAR",
                obj.startYear
            ]
        }, (errors, results, fields) =>{

            if(errors){
                return res.status(400).json({message: "SQLSkillIssueException: SQL Error!"})
            }

            if(results.length == 1){
                db.query(
                    {
                        sql:"UPDATE ?? SET ?? = ? WHERE ?? = ?",
                        values: 
                        [
                            "AcademicYear",
                            "FLAG",
                            0,
                            "START_YEAR",
                            obj.startYear
                        ]
                    }, (errors, results, fields) =>{
                        
                        if(errors){
                            return res.status(400).json({message: "SQLSkillIssueException: SQL Error!"})
                        }
                    
                        return res.status(200).json({message:"Deletion Success!"});
                    
                    }
                )
            }
        }
    )

}

const restoreAcademicYear = (req, res) => {

    var obj = req.body;

    if(!obj.startYear){
        return res.status(404).json({message: "MissingInputException: startYear is required!"});
    }

    db.query(
        {
            sql:"SELECT * FROM ?? WHERE ?? = ?",
            values: 
            [
                "AcademicYear",
                "START_YEAR",
                obj.startYear
            ]
        }, (errors, results, fields) =>{

            if(errors){
                return res.status(400).json({message: "SQLSkillIssueException: SQL Error!"})
            }

            if(results.length == 1){
                db.query(
                    {
                        sql:"UPDATE ?? SET ?? = ? WHERE ?? = ?",
                        values: 
                        [
                            "AcademicYear",
                            "FLAG",
                            1,
                            "START_YEAR",
                            obj.startYear
                        ]
                    }, (errors, results, fields) =>{
                        
                        if(errors){
                            return res.status(400).json({message: "SQLSkillIssueException: SQL Error!"})
                        }

                        return res.status(200).json({message:"Restore Success!"});
                    
                    }
                )
            }
        }
    )

}

const setAcademicYearDays = (req, res) => {

    var obj = req.body;

    if(!obj.startYear){
        return res.status(404).json({message: "MissingInputException: startYear is required!"});
    }

    if(!obj.days){
        return res.status(404).json({message: "MissingInputException: days required!"});
    }

    db.query(
        {
            sql:"SELECT * FROM ?? WHERE ?? = ?",
            values: 
            [
                "AcademicYear",
                "START_YEAR",
                obj.startYear
            ]
        }, (errors, results, fields) =>{

            if(errors){
                return res.status(400).json({message: "SQLSkillIssueException: SQL Error!"})
            }

            if(results.length == 1){
                db.query(
                    {
                        sql:"UPDATE ?? SET ?? = ? WHERE ?? = ?",
                        values: 
                        [
                            "AcademicYear",
                            "DAYS",
                            obj.days,
                            "START_YEAR",
                            obj.startYear
                        ]
                    }, (errors, results, fields) =>{
                        
                        if(errors){
                            return res.status(400).json({message: "SQLSkillIssueException: SQL Error!"})
                        }

                        return res.status(200).json({message:"Update success!"});
                    
                    }
                )
            }
        }
    )
}

module.exports = {
    createAcademicYear,
    getAcademicYears,
    deleteAcademicYear,
    restoreAcademicYear,
    setAcademicYearDays
}