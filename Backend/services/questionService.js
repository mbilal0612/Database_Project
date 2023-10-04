const db = require("../config/db").connection;

const createQuestion = (req, res) => {
  const obj = req.body;

  if (!obj.questionDesc) {
    return res.status(400).json({ message: " Question Description required" });
  }

  if (!obj.maxMarks) {
    return res.status(400).json({ message: "Max Marks is required" });
  }

  db.query(
    {
      sql: "INSERT INTO ?? (??,??) VALUES (?,?)",
      timeout: 40000,
      values: [
        "QUESTION",
        "QUESTION_DESC",
        "MAX_MARKS",
        obj.questionDesc,
        obj.maxMarks,
      ],
    },
    (error, results, fields) => {
      if (error) {
        return res.status(500).send(error);
      }
      return res.status(200).json({ message: "successfully added" });
    }
  );
};

// write a function to get all questions

const getAllQuestions = (req, res) => {
  db.query(
    {
      sql: "SELECT * FROM ??",
      timeout: 40000,
      values: ["QUESTION"],
    },
    (error, results, fields) => {
      if (error) {
        return res.status(500).send(error);
      }
      return res.status(200).send(results);
    }
  );
};

const getQuestionById = (req, res) => {
  const obj = req.params;

  if (!obj.questionId) {
    return res.status(400).json({ message: "Question ID is required" });
  }

  db.query(
    {
      sql: "SELECT * FROM ?? WHERE ?? = ?",
      timeout: 40000,
      values: ["QUESTION", "QUESTION_ID", obj.questionId],
    },
    (error, result, fields) => {
      if (error) {
        return res.status(500).send(error);
      }
      return res.status(200).send(result);
    }
  );
};

const updateQuestion = (req, res) => {
  const obj = req.body;

  if (!obj.questionId) {
    return res.status(400).json({ message: "Question ID is required" });
  }

  if (!obj.questionDesc) {
    return res
      .status(400)
      .json({ message: "Question Description is required" });
  }

  if (!obj.maxMarks) {
    return res.status(400).json({ message: "Max Marks is required" });
  }

  db.query(
    {
      sql: "UPDATE ?? SET ?? = ?, ?? = ? WHERE ?? = ?",
      timeout: 40000,
      values: [
        "QUESTION",
        "QUESTION_DESC",
        obj.questionDesc,
        "MAX_MARKS",
        obj.maxMarks,
        "QUESTION_ID",
        obj.questionId,
      ],
    },
    (error, results, fields) => {
      if (error) {
        return res.status(500).send(error);
      }

      return res.status(200).json({ message: "updated" });
    }
  );
};

const getQuestionsByCLO = (req, res) => {
  const obj = req.params;
  if (!obj.cloId) {
    return res.status(400).json({ message: "CLO ID is required" });
  }
  db.query(
    {
      sql: "SELECT * FROM ?? WHERE ?? = ?",
      values: ["QUESTION_CLO", "CLO_ID", obj.cloId],
    },
    (errors, results, fields) => {
      var list = [];
      if (errors)
        return res.status(500).json({ message: "Unknown error occured" });
      for (var i = 0; i < results.length; i++) {
        list.push(results[i].QUESTION_ID);
      }
      return res
        .status(200)
        .json({ message: "Report Generated Successfully", questions: list });
    }
  );
};

const assignCLOToQuestion = (req, res) => {
  const obj = req.body;
  if (!obj.questionId) {
    return res
      .status(400)
      .json({ message: "MissingInputException: Question ID is required!" });
  }
  if (!obj.cloId) {
    return res
      .status(400)
      .json({ message: "MissingInputException: Relation must have a name!" });
  }
  db.query(
    {
      sql: "SELECT * FROM ?? WHERE ?? = ? AND ?? = ?",
      values: [
        "QUESTION_CLO",
        "QUESTION_ID",
        obj.questionId,
        "CLO_ID",
        obj.cloId,
      ],
    },
    (error, results, fields) => {
      if (error)
        return res.status(500).json({ message: "unkown error occured" });
      if (results.length > 0)
        return res
          .status(400)
          .json({
            message:
              "Data Duplication Exception: Question was already linked to CLO",
          });
      else {
        db.query(
          {
            sql: "INSERT INTO ??(??,??) VALUES (?,?)",
            values: [
              "QUESTION_CLO",
              "QUESTION_ID",
              "CLO_ID",
              obj.questionId,
              obj.cloId,
            ],
          },
          (err, results, fields) => {
            if(err) return res.status(500).json({ message: "unkown error occured" });
            else return res.status(200).json({message: "CLO successfully assigned to question"});
          }
        );
      }
    }
  );
};

module.exports = {
  createQuestion,
  getQuestionById,
  getAllQuestions,
  updateQuestion,
  getQuestionsByCLO,
  assignCLOToQuestion
};
