db = require("../config/db").connection;

const createRelation = (req, res) =>{
    
    var obj = req.body;

    if(!obj.relationName){
        return res.status(500).json({message: "MissingInputException: Relation must have a name!"});
    }

    db.query({
        sql:"SELECT * FROM ?? WHERE ?? = ?",
        values: [
            "RELATION",
            "RELATION_TYPE",
            obj.relationName
        ]
    }, (errors, results, fields) =>{

        if(errors){
            return res.status(400).json(errors);
        }

        if(results.length== 0){

            db.query({
                sql:"INSERT INTO ?? (??) VALUES (?)",
                values: [
                    "RELATION",
                    "RELATION_TYPE",
                    obj.relationName
                ]
            }, (errors, results, fields) =>{

                if(errors){
                    return res.status(400).json(errors);
                }

                return res.status(200).json({
                    message:"Successfully added a new relationship!"
                })

            })

        }
        else{
            return res.status(500).json({message: "DataDuplicationException: Relation with the same name already exists!"});
        }

    })

};

const getRelations = (req,res)=>{

    db.query({
        sql:"SELECT * FROM ??",
        values:[
            "RELATION",
        ]
    }, (errors, results, fields) =>{

        if(errors){
            return res.status(500).json(errors);
        }

        return res.status(200).json(results);

    })

}

module.exports = {
    createRelation,
    getRelations
};