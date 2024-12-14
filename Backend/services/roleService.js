const db = require("../config/db").connection;

const createRole = (req,res) =>{

    var obj = req.body;

    if(!obj.roleName){
        return res.status(400).json({message:"MissingArgumentException: roleName is required!"});
    }

    db.query(
            {
               sql:"SELECT * FROM ?? WHERE ?? = ?",
                values :[
                "roles",
                "obj.roleName"
                ]
            }, (errors, results, fields) =>{
                
                if(errors){
                    return res.status(400).json({message:"SQLSkill_IssueException: Get better, dog! [1]"});
                }

                if(results.length === 0){
                    
                    db.query(
                        {
                            sql:"INSERT INTO ?? (??) VALUES (?)",
                            values:[
                                "roles",
                                "ROLE_ID",
                                obj.roleName
                            ]
                        }, (errors, results) =>{
                            
                            if(errors){
                                return res.status(400).json({message:"SQLSkill_IssueException: Get better, dog! [2]"});
                            }

                            return res.status(200).json({message:"Success!"})

                        }
                    )

                }

            }
        )

}