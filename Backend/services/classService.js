const db = require("../config/db").connection;

const createClass = (req, res) => {
    const obj = req.body;

    if(!obj.strength){
        return res.status(400).json({message:"strength is required!"});
    }
    if(!obj.year){
        return res.status(400).json({message:"year is required!"});
    }  
    if(!obj.section){
        return res.status(400).json({message:"section is required!"});
    }

    db.query(
        {
            sql: "INSERT INTO ?? (??,??,??,??) VALUES (?,?,?,?)",
            timeout: 40000, // 40s
            values : [
                "CLASS",
                "START_YEAR",
                "STRENGTH",
                "YEAR",
                "SECTION",
                obj.START_YEAR,
                obj.strength,
                obj.year,
                obj.section      
            ]
        },
        function (error, results, fields) {
            if (error) {
                return res.status(500).json({ message : "Something went wrong please try again later..."});
            }else {
                return res.json({
                    message: "Class Created",
                    class: {
                        START_YEAR: obj.START_YEAR,
                        strength: obj.strength,
                        year: obj.year,
                        section: obj.section
                    }
                });
            }
        
        }
    )
}

module.exports = {
    createClass,
};