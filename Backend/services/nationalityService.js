const db = require("../config/db").connection;

const getNationalities = (req,res) =>{

    db.query(
        {
            sql:"SELECT ?? FROM ?? WHERE ?? = ? ORDER BY ??",
            values:[
                "NAT_ID",
                "NATIONALITIES",
                "BLOCKED",
                0,
                "NAT_ID"
            ]
        }, (errors, results, fields) =>{

            if(errors){
                return res.status(400).json({message:"Damn , nationalities can't be fetched dawg!"})
            }
            return res.status(200).json({data:results});
        }
        )

}

module.exports ={
    getNationalities
}