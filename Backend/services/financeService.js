const db = require("../config/db").connection;
var backendUtility = require("../services/backendUtility");

const createArrearsByGrade = (req, res) =>{

    const obj = req.body;

    if(!obj.grade){
        return res.status(500).json("MissingInputException: Grade must be defined!");
    }
    
    if(!obj.academicYear){
        return res.status(500).json("MissingInputException: Academic Year must be defined!");
    }

    if(!obj.amount){
        return res.status(500).json("MissingInputException: Arrear amount must be defined!");
    }
    
    if(!obj.name){
        return res.status(500).json("MissingInputException: Arrear must have a name!");
    }
    
    var quer = obj.grade + "-%-"+obj.academicYear;

    //Example = SELECT * FROM `STUDENT` JOIN `CLASS` ON STUDENT.CLASS_ID = CLASS.CLASS_ID WHERE START_YEAR = 2023 AND YEAR = 11;
    db.query({sql: "SELECT ?? FROM ?? WHERE ?? LIKE ?",
            timeout: 40000,
            values :[
                "STUDENT_ID",
                "STUDENT_ACADEMIC_HISTORY",
                "CLASS_ID",
                quer,
            ]
        }, (errors, results, fields) => {
            if(errors){
                return res.status(500).json({message: errors});
            }else{

                let date = new Date();
                
                for(let i =0; i < results.length; i++){              
                    db.query({
                        sql: "INSERT INTO ?? (??,??,??,??) VALUES (?,?,?,?)",
                        timeout:40000,
                        values: [
                            "TRANSACTION",
                            "STUDENT_ID",
                            "T_NAME",
                            "T_DATE",
                            "T_AMOUNT",
                            results[i].STUDENT_ID,
                            obj.name,
                            date.toISOString().slice(0, 10),
                            obj.amount
                        ]
                        }, (errors, results, fields) => {

                            if(errors){
                                return res.status(500).json(error);
                            }
                        }
                    );
                }

                return res.status(200).json({message:"Successfully generated arrears hehe"});

            }
        }
        );
};

const createArrearsByStudentID = (req, res) =>{

    const obj = req.body;

    if(!obj.studentID){
        return res.status(500).json("MissingInputException: Student ID must be defined!");
    }

    if(!obj.amount){
        return res.status(500).json("MissingInputException: Arrear amount must be defined!");
    }
    
    if(!obj.name){
        return res.status(500).json("MissingInputException: Arrear must have a name!");
    }

    db.query({sql: "SELECT ?? FROM ?? WHERE ?? = ? AND ?? = ?",
    timeout: 40000,
    values :[
        "USER_ID",
        "USERS",
        "USER_ID",
        obj.studentID,
        "ROLE_ID",
        "STUDENT"
    ]
}, (errors, results, fields) => {
    if(errors){
        return res.status(500).json({message: "SQLException: Maybe Incorrect SQL statement or XAMPP off?"});
    }else{

        if(results.length == 0){
            return res.status(400).json({message: "MissingDataException: The queried student does not exist in the database!"});
        }

        if(results.length > 1){
            return res.status(400).json({message: "DuplicateDataException: Fatal Database Error!"});
        }

        let date = new Date();
        var x = backendUtility.toLocalISO(date);

            db.query({
                sql: "INSERT INTO ?? (??,??,??,??) VALUES (?,?,?,?)",
                timeout:40000,
                values: [
                    "TRANSACTION",
                    "STUDENT_ID",
                    "T_NAME",
                    "T_DATE",
                    "T_AMOUNT",
                    obj.studentID,
                    obj.name,
                    x,
                    obj.amount
                ]
                }, (errors, results, fields) => {

                    if(errors){
                        return res.status(500).json(error);
                    }
                    return res.status(200).json({message: "Arrear succesfully added!"});
                }
            );
    }
}
);

}

const createArrearsByAcademicYear = (req, res) =>{

    const obj = req.body;

    if(!obj.academicYear){
        return res.status(500).json("MissingInputException: Academic Year must be defined!");
    }

    if(!obj.amount){
        return res.status(500).json("MissingInputException: Arrear amount must be defined!");
    }
    
    if(!obj.name){
        return res.status(500).json("MissingInputException: Arrear must have a name!");
    }
    
    var quer = "%-"+obj.academicYear;

    db.query({sql: "SELECT ?? FROM ?? WHERE ?? LIKE ?",
            timeout: 40000,
            values :[
                "STUDENT_ID",
                "STUDENT_ACADEMIC_HISTORY",
                "CLASS_ID",
                quer
            ]
        }, (errors, results, fields) => {
            if(errors){
                return res.status(500).json({message: "SQLException: Maybe Incorrect SQL statement or XAMPP off?"});
            }else{
                let date = new Date();

                console.log(results);

                for(let i =0; i < results.length; i++){              
                    db.query({
                        sql: "INSERT INTO ?? (??,??,??,??) VALUES (?,?,?,?)",
                        timeout:40000,
                        values: [
                            "TRANSACTION",
                            "STUDENT_ID",
                            "T_NAME",
                            "T_DATE",
                            "T_AMOUNT",
                            results[i].STUDENT_ID,
                            obj.name,
                            date.toISOString().slice(0, 10),
                            obj.amount
                        ]
                        }, (errors, results, fields) => {

                            if(errors){
                                return res.status(500).json(error);
                            }

                        }
                    );
                }

            }
        }
        );
    
        return res.status(200).json({message: "Arrears successfully created"});
    
};

const getStudentFee = (req, res) =>{

    const obj = req.params;

    if(!obj.id){
        return res.status(500).json("MissingInputException: StudentID must be defined!");
    }
    
    db.query({sql: "SELECT * FROM ?? WHERE ?? = ?",
            timeout: 40000,
            values :[
                "TRANSACTION",
                "STUDENT_ID",
                obj.id,
            ]
        }, (errors, results, fields) => {
            if(errors){
                return res.status(500).json({message: "SQLException: Maybe Incorrect SQL statement or XAMPP off?"});
            }else{

                if(results.length === 0){
                    return res.status(200).json({message: "MissingDataWarning: Either student DNE; or has no arrears on their ledger!"});
                }

                let sum= 0;
                for(let i =0; i<results.length; i++){
                    if(results[i].T_FLAG){
                    sum += results[i].T_AMOUNT;
                    }
                }

                res.status(200).json({message: "Fee successfully generated.", STUDENT_ID: results[0].STUDENT_ID, Fee:sum})

            }
        }
        );
    
    
};

const generateStudentLedger = (req,res) =>{
    
    const obj = req.params;
    
    if(!obj.id){
        return res.status(500).json("MissingInputException: StudentID must be defined!");
    }
    
    db.query({sql: "SELECT TRANSACTION_ID AS id,T_NAME,T_AMOUNT,T_DATE FROM ?? WHERE ?? = ? AND ?? = ?",
            timeout: 40000,
            values :[
                "TRANSACTION",
                "STUDENT_ID",
                obj.id,
                "T_FLAG",
                1
            ]
        }, (errors, results, fields) => {
            if(errors){
                return res.status(500).json({message: "SQLException: Maybe Incorrect SQL statement or XAMPP off?"});
            }else{

                if(results.length === 0){
                    return res.status(200).json({message: "MissingDataWarning: Either student DNE; or has no arrears on their ledger!"});
                }

                res.status(200).json({message: "Ledger successfully generated.", STUDENT_ID: obj.id, entities: results});

            }
        }
        );
}

const createGuardianPayment = (req,res) =>{

    const obj = req.body;

    if(!obj.studentID){
        return res.status(500).json("MissingInputException: Student ID must be defined!");
    }

    if(!obj.amount){
        return res.status(500).json("MissingInputException: Arrear amount must be defined!");
    }

    obj.amount *=-1;
    
    db.query({
            sql: "SELECT * FROM ?? WHERE ?? = ?",
            timeout: 40000,
            values :[
                "TRANSACTION",
                "STUDENT_ID",
                obj.studentID,
            ]
            }, (errors, results, fields) => {
            if(errors){
                return res.status(500).json({message: "SQLException: Maybe Incorrect SQL statement or XAMPP off? [1]"});
            }else{

                if(results.length === 0){
                    return res.status(400).json({message: "MissingDataException: The queried student does not exist in the database!"});
                }
        
                let date = new Date();
                
                    db.query({
                        sql: "INSERT INTO ?? (??,??,??,??) VALUES (?,?,?,?)",
                        timeout:40000,
                        values: [
                            "TRANSACTION",
                            "STUDENT_ID",
                            "T_NAME",
                            "T_DATE",
                            "T_AMOUNT",
                            results[0].STUDENT_ID,
                            "Fee Payment by Guardian <Guardian_ID> of Student <Student_ID> on <DATETIME>",
                            date.toISOString().slice(0, 10),
                            obj.amount
                        ]
                        }, (errors, results, fields) => {
        
                            if(errors){
                                return res.status(500).json(errors);
                            }
                            return res.status(200).json({message: "Payment succesfully dispatched!"});
                        }
                    );
            }
        }
    );
}

const deleteTransactionByID = (req,res) =>{

    const obj = req.body;

    if(!obj.transactionID){
        return res.status(500).json("MissingInputException: transactionID must be defined!");
    }

    db.query({
        sql: "SELECT * FROM ?? WHERE ?? = ?",
        timeout:40000,
        values:[
            "TRANSACTION",
            "TRANSACTION_ID",
            obj.transactionID
        ]
    }, (errors, results, fields) => {

        if(errors){
            return res.status(500).json({message: "SQLException: Maybe Incorrect SQL statement or XAMPP off?"});
        }

        console.log(results);

        if(results.length == 0){
            return res.status(500).json({message: "MissingDataException: Transaction DNE!"});
        }

        if(!results[0].T_FLAG){
            return res.status(400).json({message: "RedundentRequestException: Transaction is already deleted!"});
        }

        db.query({
            sql: "UPDATE ?? SET ?? = ? WHERE ?? = ?",
            timeout:40000,
            values:[
                "TRANSACTION",
                "T_FLAG",
                0,
                "TRANSACTION_ID",
                obj.transactionID
            ]
        }, (errors, results, fields) => {
    
            if(errors){
                return res.status(500).json({message: "SQLException: Maybe Incorrect SQL statement or XAMPP off?"});
            }
    
            return res.status(200).json({message: "Transaction successfully deleted!"});
    
        })

    })

}

const restoreTransactionByID = (req,res) =>{

    const obj = req.body;

    if(!obj.transactionID){
        return res.status(500).json("MissingInputException: transactionID must be defined!");
    }

    db.query({
        sql: "SELECT * FROM ?? WHERE ?? = ?",
        timeout:40000,
        values:[
            "TRANSACTION",
            "TRANSACTION_ID",
            obj.transactionID
        ]
    }, (errors, results, fields) => {

        if(errors){
            return res.status(500).json({message: "SQLException: Maybe Incorrect SQL statement or XAMPP off?"});
        }

        if(results.length == 0){
            return res.status(500).json({message: "MissingDataException: Transaction DNE!"});
        }

        if(results[0].T_FLAG){
            return res.status(400).json({message: "RedundentRequestException: Transaction is already restored!"});
        }

        db.query({
            sql: "UPDATE ?? SET ?? = ? WHERE ?? = ?",
            timeout:40000,
            values:[
                "TRANSACTION",
                "T_FLAG",
                1,
                "TRANSACTION_ID",
                obj.transactionID
            ]
        }, (errors, results, fields) => {
    
            if(errors){
                return res.status(500).json({message: "SQLException: Maybe Incorrect SQL statement or XAMPP off?"});
            }
    
            return res.status(200).json({message: "Transaction successfully restored!"});
    
        })
    })

}

const deleteTransactionByName = (req, res) =>{

    const obj = req.body;

    if(!obj.transactionName){
        return res.status(400).json("MissingInputException: transactionName must be defined!");
    }

    db.query({
        sql: "SELECT * FROM ?? WHERE ?? = ? AND ?? = ?",
        timeout : 40000,
        values:[
            "TRANSACTION",
            "T_FLAG",
            1,
            "T_NAME",
            obj.transactionName     
        ]
    }, (errors, results, fields)=>{

        if(errors){
            return res.status(500).json({message: "SQLException: Maybe Incorrect SQL statement or XAMPP off?"});
        }

        if(results.length == 0){
            return res.status(500).json({message: "MissingDataException: Transaction with the given name DNE!"});
        }

        db.query({
            sql: "UPDATE ?? SET ?? = ? WHERE ?? = ?",
            timeout : 40000,
            values:[
                "TRANSACTION",
                "T_FLAG",
                0,
                "T_NAME",
                obj.transactionName     
            ]
        }, (errors, results, fields)=>{
    
            if(errors){
                return res.status(500).json({message: "SQLException: Maybe Incorrect SQL statement or XAMPP off?"});
            }
    
            return res.status(200).json({message:"Transactions successfully deleted!"})
        })
    })    

}

const restoreTransactionByName = (req, res) =>{

    const obj = req.body;

    if(!obj.transactionName){
        return res.status(400).json("MissingInputException: transactionName must be defined!");
    }

    db.query({
        sql: "SELECT * FROM ?? WHERE ?? = ? AND ?? = ?",
        timeout : 40000,
        values:[
            "TRANSACTION",
            "T_FLAG",
            0,
            "T_NAME",
            obj.transactionName     
        ]
    }, (errors, results, fields)=>{

        if(errors){
            return res.status(500).json({message: "SQLException: Maybe Incorrect SQL statement or XAMPP off?"});
        }

        if(results.length == 0){
            return res.status(500).json({message: "MissingDataWarning: Transaction with the given name DNE!"});
        }

        db.query({
            sql: "UPDATE ?? SET ?? = ? WHERE ?? = ?",
            timeout : 40000,
            values:[
                "TRANSACTION",
                "T_FLAG",
                1,
                "T_NAME",
                obj.transactionName     
            ]
        }, (errors, results, fields)=>{
    
            if(errors){
                return res.status(500).json({message: "SQLException: Maybe Incorrect SQL statement or XAMPP off?"});
            }

            return res.status(200).json({message:"Transactions successfully restored!"});
        })
    })    
}

// All APIs made compatible with the new USERS implementation as of 19th October 2023

module.exports = {
    createArrearsByGrade,
    createArrearsByAcademicYear,
    createArrearsByStudentID,
    getStudentFee,
    generateStudentLedger,
    createGuardianPayment,
    deleteTransactionByID,
    restoreTransactionByID,
    deleteTransactionByName,
    restoreTransactionByName
};