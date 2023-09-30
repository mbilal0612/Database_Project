const db = require("../config/db").connection;

const createArrearsByGrade = (req, res) =>{

    const obj = req.body;

    console.log("RUNNING");

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
    
    //Example = SELECT * FROM `STUDENT` JOIN `CLASS` ON STUDENT.CLASS_ID = CLASS.CLASS_ID WHERE START_YEAR = 2023 AND YEAR = 11;
    db.query({sql: "SELECT ?? FROM ?? JOIN ?? ON ?? = ?? WHERE ?? = ? AND ?? = ?",
            timeout: 40000,
            values :[
                "STUDENT_ID",
                "STUDENT",
                "CLASS",
                "STUDENT.CLASS_ID",
                "CLASS.CLASS_ID",
                "START_YEAR",
                obj.academicYear,
                "YEAR",
                obj.grade,
            ]
        }, (errors, results, fields) => {
            if(errors){
                return res.status(500).json({message: "SQLException: Maybe Incorrect SQL statement or XAMPP off?"});
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

            }
        }
        );
    
        return res.status(200).json({message: "Arrears successfully created"});
    
};

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
    
    db.query({sql: "SELECT ?? FROM ?? JOIN ?? ON ?? = ?? WHERE ?? = ?",
            timeout: 40000,
            values :[
                "STUDENT_ID",
                "STUDENT",
                "CLASS",
                "STUDENT.CLASS_ID",
                "CLASS.CLASS_ID",
                "START_YEAR",
                obj.academicYear,
            ]
        }, (errors, results, fields) => {
            if(errors){
                return res.status(500).json({message: "SQLException: Maybe Incorrect SQL statement or XAMPP off?"});
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

            }
        }
        );
    
        return res.status(200).json({message: "Arrears successfully created"});
    
};

const getStudentFee = (req, res) =>{

    const obj = req.params;
    var temp = parseInt(obj.id.substring(1,obj.id.length));

    console.log("RUNNING");

    if(!obj.id){
        return res.status(500).json("MissingInputException: StudentID must be defined!");
    }
    
    db.query({sql: "SELECT * FROM ?? WHERE ?? = ?",
            timeout: 40000,
            values :[
                "TRANSACTION",
                "STUDENT_ID",
                temp,
            ]
        }, (errors, results, fields) => {
            if(errors){
                return res.status(500).json({message: "SQLException: Maybe Incorrect SQL statement or XAMPP off?"});
            }else{

                if(results.length == 0){
                    return res.status(200).json({message: "Student has no arrears on their ledger!"});
                }

                let sum= 0;
                for(let i =0; i<results.length; i++){
                    sum += results[i].T_AMOUNT;
                }

                res.status(200).status(200).json({message: "Fee successfully generated.", STUDENT_ID: results[0].STUDENT_ID, Fee:sum})

            }
        }
        );
    
    
};

module.exports = {
    createArrearsByGrade,
    createArrearsByAcademicYear,
    getStudentFee
};