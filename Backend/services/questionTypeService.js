const db = require("../config/db").connection;

const createQuestionType = (req, res) => {
    const obj = req.body;

    if (!obj.typeName) {
        return res.status(400).json({ message: "Question Type Name required" });
    }

    db.query(
        {
            sql : "INSERT INTO ?? (??) VALUES (?)",
            timeout:40000,
            values: [
                "QUESTION_TYPES",
                "TYPE_NAME",
                obj.typeName
            ]

        },
        (error, results, fields) => {
            console.log(fields);
            return res.status(200).send(results);
        }
    )
}

const getQuestionTypeById = (req, res) => {
    const obj = req.params;

    if(!obj.questionId){
        return res.status(400).json({ message: "Question ID is required"});
    }

    db.query(
        {
            sql : "SELECT * FROM ?? WHERE ?? = ?",
            timeout:40000,
            values: [
                "QUESTION_TYPES",
                "QUESTION_TYPE",
                obj.questionId
            ]
        },
        (error, results, fields) => {
            if(error){
                return res.status(500).send(error);
            }
            return res.status(200).json({
                message: "Successfully fetched",
                data : results
            });
        }
    )
}

const getAllQuestionTypes = (req, res) => {

    db.query(
        {
            sql: "SELECT * FROM ??",
            timeout:40000,
            values: [
                "QUESTION_TYPES",
                ]

        },
        (error, results, fields)=>{
            if(error){
                return res.status(500).send(error);
            }

            return res.status(200).json({message: "Successfully fetched", data: results});
        }

    )
}

const updateQuestionType = (req, res) => {
    const obj = req.body;

    if(!obj.questionType){
        return res.status(400).json({ message: "Question Type ID is required"});
    }

    if(!obj.typeName){
        return res.status(400).json({ message: "Question Type Name is required"});
    }

    db.query(
        {
            sql: "UPDATE ?? SET ?? = ? WHERE ?? = ?",
            timeout:40000,
            values: [
                "QUESTION_TYPES",
                "TYPE_NAME",
                obj.typeName,
                "QUESTION_TYPE",
                obj.questionType
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

const deleteQuestionType = (req, res) => {
    const obj = req.body;

    if (!obj.questionType) {
        return res.status(400).json({ message: "Question Type ID is required" });
    }


    db.query(
        {
            sql : "DELETE FROM ?? WHERE ?? = ?",
            timeout:40000,
            values: [
                "QUESTION_TYPES",
                "QUESTION_TYPE",
                obj.questionType
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

module.exports = {
    createQuestionType,
    getQuestionTypeById,
    getAllQuestionTypes,
    updateQuestionType,
    deleteQuestionType
}