db = require("../config/db").connection;

const createEca = (req, res) => {
    const obj = req.body;

    if(!obj.name){
        return res.status(400).json({message:"name is required!"});
    }

    db.query(
        {
            sql: "INSERT INTO ?? (??) VALUES (?)",
            timeout: 40000,
            values: [
                "ECA",
                "NAME",
                obj.name
                ]
        },
        (error,results, fields) => {
            if(error){
                return res.status(500).send(error);
            }
            return res.status(200).json({ message : "successfully created ECA"});
        }
    )
}

const getEcaId = (req, res) => {
    const obj = req.params;

    if(!obj.name){
        return res.status(400).json({ message : "name is required"});
    }

    db.query(
        {
            sql: "SELECT ?? FROM ?? WHERE ?? = ?",
            timeout : 40000,
            values : [
                "ECA_ID",
                "ECA",
                "ECA_NAME",
                obj.name
            ]
        },
        (error, results, fields) => {

            if(error){
                return res.status(500).send(error);
            }


            return res.status(200).send(results);
        }
    )
}

const updateEcaName = (req,res) => {
    const obj = req.body;

    if(obj.eca_Id){
        return res.status(400).json({ message : "ECA_ID required!"});
    }

    if(obj.eca_Name){
        return res.status(400).json({ message : "ECA_NAME required!"});
    }

    db.query(
        {
            sql: "UPDATE ?? SET ?? = ? WHERE ?? = ?",
            timeout : 40000,
            values : [
                "ECA",
                "ECA_NAME",
                obj.eca_Name,
                "ECA_ID",
                obj.eca_Id
            ]
        },
        (error, results, fields) => {

            if(error){
                return res.status(500).send(error);
            }

            return res.status(500).send(results);
        }
    )
}

const getAllEca = (req,res) => {
    const obj = req.params;

    db.query(
        {
            sql: "SELECT * FROM ??",
            timeout:40000,
            values: [
                "ECA"
            ]
        },

        (error,results,fields)=>{
            if(error){
                return res.status(500).send(error);
            }

            return res.status(200).send(results);
        }
    )
}

module.exports = {
    createEca,
    updateEcaName,
    getAllEca,
    getEcaId
}