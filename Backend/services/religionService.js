const db = require("../config/db").connection;

const getReligions = (req,res) =>{

    db.query(
        {
            sql:"SELECT ?? FROM ?? ORDER BY ??",
            values:[
                "RELIGION_ID",
                "RELIGIONS",
                "RELIGION_ID"
            ]
        }, (errors, results, fields) =>{

            if(errors){
                return res.status(400).json({message:"Damn , religions can't be fetched like this dawg!"})
            }
            return res.status(200).json({data:results});
        }
        )

}

module.exports ={
    getReligions
}