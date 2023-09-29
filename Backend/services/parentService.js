//connect to db
const {hashPassword} = require("mysql/lib/protocol/Auth");
db = require("../config/db").connection;
bcrypt = require('bcrypt');
defaultpass="12345678";

const createParent = (req, res) => {
    const obj = req.body;

    if(!obj.firstName){
        return res.status(400).json({message:"firstName is required!"});
    }

    if(!obj.lastName){
        return res.status(400).json({message:"lastName is required!"});
    }
    //check for cnic
    if(!obj.CNIC){
        return res.status(400).json({message:"CNIC is required!"});
    }
    //check for phone number
    if(!obj.phoneNumber){
        return res.status(400).json({message:"phoneNumber is required!"});
    }
    //check for nationality
    if(!obj.nationality){
        return res.status(400).json({ message :"Nationality is required!"});
    }
    //check for religion
    if(!obj.religion){
        return res.status(400).json({message:"Religion is required!"});
    }
    //check for occupation
    if(!obj.occupation){
        return res.status(400).json({message:"Occupation is required!"});
    }

    db.query(
        {
            sql: "INSERT INTO ?? (??,??,??,??,??,??,??) VALUES (?,?,?,?,?,?,?)",
            timeout: 40000, // 40s
            values : [
                "GUARDIAN",
                "FIRST_NAME",
                "LAST_NAME",
                "CNIC",
                "PHONE_NUMBER",
                "Nationality",
                "Religion",
                "Occupation",
                obj.firstName,
                obj.lastName,
                obj.CNIC,
                obj.phoneNumber,
                obj.nationality,
                obj.religion,
                obj.occupation
            ]
        },
        (error, results, fields) => {

            if(error){
                return res.status(500).json({ message : "Something went wrong please try again later...",
                    error: error
                });
            }else{
                db.query(
                    {
                        sql: "SELECT * FROM ?? WHERE ??=?",
                        timeout: 40000, // 40s
                        values : [
                            "GUARDIAN",
                            "CNIC",
                            obj.CNIC,
                        ]
                    },
                    (error, results, fields) => {
                        if(error){
                            return res.status(500).json({ message : "Something went wrong please try again later...",
                            error: error
                            });
                        }
                        console.log(results);
                        bcrypt.hash(defaultpass,10,(err,hash)=>{
                            let username = "G"+results[0].GUARDIAN_ID;
                            db.query(
                                {
                                    sql: "INSERT INTO ?? (??,??,??) VALUES (?,?,?)",
                                    timeout: 40000, // 40s
                                    values : [
                                        "USERS",
                                        "USERNAME",
                                        "PASSWORD",
                                        "GUARDIAN_ID",
                                        username,
                                        hash,
                                        results[0].GUARDIAN_ID
                                    ]

                                },
                                (error, results, fields) => {
                                    if(error){
                                        return res.status(500).json({message : "Something went wrong please try again later..."});

                                    }else{

                                    }
                                    return res.json({
                                        message: "Parent Created",
                                        username: username,
                                        password: defaultpass,
                                    });
                                }
                            )
                        });


                    }
                )
            }


        }
    )
}

module.exports = {
    createParent
}