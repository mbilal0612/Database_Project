db = require("../config/db").connection;

const createClo = (req,res) => {
    const obj = req.body;

    if(!obj.cloName){
        return res.status(400).json({ message : " CLO Name required"});
    }

    if(!obj.cloDesc){
        return res.status(400).json({ message : "CLO Description is required"});
    }

    if(!obj.courseId){
        return res.status(400).json({ message : "Course ID is required"});
    }

    db.query(
        {
            sql : "INSERT INTO ?? (??,??,??) VALUES (?,?,?)",
            timeout:40000,
            values: [
                "CLO",
                "CLO_NAME",
                "CLO_DESC",
                "COURSE_ID",
                obj.cloName,
                obj.cloDesc,
                obj.courseId
            ]
        },
        (error, results, fields) => {
            if(error){
                return res.status(500).send(error);
            }

            return res.status(200).json({ message : "clo successfully added"});
        }
    )

};

const getAllClo = (req,res) => {

    db.query(
        {
            sql: "SELECT * FROM ??",
            timeout:40000,
            values: [
                "CLO",
                ]
        },
        (error, results, fields)=>{
            if(error){
                return res.status(500).send(error);
            }
            return res.status(200).send(results);
        }
    )
};

const getCloById = (req,res) => {
    const obj = req.body;

    if(!obj.cloId){
        return res.status(400).json({ message : "CLO ID is required"});
    }

    db.query(
        {
            sql: "SELECT * FROM ?? WHERE ?? = ?",
            timeout:40000,
            values: [
                "CLO",
                "CLO_ID",
                obj.cloId
            ]
        },
        (error, results, fields)=>{

            if(error){
                return res.status(500).send(error);
            }
            return res.status(200).send(results);
        }
    )
}

const updateClo = (req,res) => {
    const obj = req.body;

    if(!obj.cloId){
        return res.status(400).json({ message : "CLO ID is required"});
    }
    if(!obj.cloName){
        return res.status(400).json({ message : " CLO Name required"});
    }
    if(!obj.cloDesc){
        return res.status(400).json({ message : "CLO Description is required"});
    }
    if(!obj.courseId){
        return res.status(400).json({ message : "Course ID is required"});
    }

    db.query(
        {
            sql : "UPDATE ?? SET ?? = ?, ?? = ?, ?? = ? WHERE ?? = ?",
            timeout:40000,
            values: [
                "CLO",
                "CLO_NAME",
                obj.cloName,
                "CLO_DESC",
                obj.cloDesc,
                "COURSE_ID",
                obj.courseId,
                "CLO_ID",
                obj.cloId
            ]
        },
        (error, results, fields) => {
            if(error){
                return res.status(500).send(error);
            }
            return res.status(200).json({ message : "clo successfully updated"});
        }
    )
};