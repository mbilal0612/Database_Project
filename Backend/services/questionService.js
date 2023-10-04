const db = require("../config/db").connection;

const createQuestion = (req,res) => {
    const obj = req.body;

    if(!obj.questionDesc){
        return res.status(400).json({ message : " Question Description required"});
    }

    if(!obj.maxMarks){
        return res.status(400).json({ message : "Max Marks is required"});
    }

    db.query(
        {
            sql: "INSERT INTO ?? (??,??) VALUES (?,?)",
            timeout:40000,
            values : [
                "QUESTION",
                "QUESTION_DESC",
                "MAX_MARKS",
                obj.questionDesc,
                obj.maxMarks
            ]
        },
        (error, results, fields) => {
            if(error){
                return res.status(500).send(error);
            }
            return res.status(200).json({ message : "successfully added"});
        }
    )
};

// write a function to get all questions

const getAllQuestions = (req,res) => {

    db.query(
        {
            sql : "SELECT * FROM ??",
            timeout:40000,
            values : [
                "QUESTION"
            ]
        },
        (error, results, fields) => {
            if(error){
                return res.status(500).send(error);

            }
            return res.status(200).send(results);
        }
    )
};

const getQuestionById = (req,res) => {

    const obj = req.params;

    if(!obj.questionId){
        return res.status(400).json({ message : "Question ID is required"});
    }

    db.query(
        {
            sql: "SELECT * FROM ?? WHERE ?? = ?",
            timeout:40000,
            values: [
                "QUESTION",
                "QUESTION_ID",
                obj.questionId
            ]
        },
        (error,result,fields) => {
            if(error){
                return res.status(500).send(error);
            }
            return res.status(200).send(result);
        }

    )
}

const updateQuestion = (req,res) => {
    const obj = req.body;

    if(!obj.questionId){
        return res.status(400).json({ message : "Question ID is required"});
    }

    if(!obj.questionDesc){
        return res.status(400).json({ message : "Question Description is required" });
    }

    if(!obj.maxMarks){
        return res.status(400).json({ message : "Max Marks is required"});
    }

    db.query(
        {
            sql: "UPDATE ?? SET ?? = ?, ?? = ? WHERE ?? = ?",
            timeout:40000,
            values: [
                "QUESTION",
                "QUESTION_DESC",
                obj.questionDesc,
                "MAX_MARKS",
                obj.maxMarks,
                "QUESTION_ID",
                obj.questionId
            ]
        },
        (error,results,fields)=>{
            if(error){
                return res.status(500).send(error);
            }

            return res.status(200).json({ message : 'updated'});
        }
    )
};

module.exports = {
    createQuestion,
    getQuestionById,
    getAllQuestions,
    updateQuestion
}