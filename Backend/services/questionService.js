const db = require("../config/db").connection;

const createQuestion = (req, res) => {
  const obj = req.body;
  // console.log(obj);
  if (!obj.questionDesc) {
    return res.status(400).json({ message: " Question Description required" });
  }

  if (!obj.maxMarks) {
    return res.status(400).json({ message: "Max Marks is required" });
  }

  if (!obj.assessmentId) {
    return res.status(400).json({ message: "Assessment-ID is required" });
  }
  if (!obj.cloList) {
    return res.status(400).json({ message: "CLO List is required" });
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
        console.log(error);
        return res.status(500).send(error);
      }
      var quesId = results.insertId;
      db.query(
        {
          sql: "INSERT INTO ?? VALUES (?,?)",
          values: ["QUESTION_ASSESSMENT", quesId, obj.assessmentId],
        },
        (error, result, fields) => {
          if (error) {
            return res.status(500).send(error);
          }
          if (obj.cloList.length > 0) {
            var isError = false;
            var k = 0;
            var i = 0;
            for (i = 0; i < obj.cloList.length; i++) {
              if (isError) break;
              db.query(
                {
                  sql: "INSERT INTO ?? (??, ??) VALUES (?,?)",
                  values: [
                    "QUESTION_CLO",
                    "QUESTION_ID",
                    "CLO_ID",
                    quesId,
                    obj.cloList[i],
                  ],
                },
                (error, results, fields) => {
                  if (error) {
                    isError = true;
                    console.log(error);
                    // return res.status(500).send(error);
                  }
                  console.log(results);
                  k++;

                  if (k == obj.cloList.length) {
                    return res
                      .status(200)
                      .json({ message: "Successfully added with CLO's" });
                  }
                }
              );
            }
            if (isError) {
              return res.status(500).send(error);
            }
          } else
            return res
              .status(200)
              .json({ message: "Successfully added without CLO's" });
        }
      );
    }
  );
};

const createAssessment = (req, res) => {
  var obj = req.body;
  if (!obj.assessmentTitle) {
    return res.status(400).json({ message: "Title is required" });
  }
  if (!obj.maxMarks) {
    return res.status(400).json({ message: "Maximum Marks are required" });
  }
  if (!obj.assessmentDate) {
    return res.status(400).json({ message: "Assessment Date is required" });
  }
  if (!obj.facultyId) {
    return res.status(400).json({ message: "Faculty ID is required" });
  }
  if (!obj.courseId) {
    return res.status(400).json({ message: "Course ID is required" });
  }
  if (!obj.classId) {
    return res.status(400).json({ message: "Class ID is required" });
  }
  db.query(
    {
      sql: "INSERT INTO ?? (??,??,??,??,??) VALUES (?,?,?,?,?)",
      values: [
        "ASSESSMENT",
        "COURSE_ID",
        "FACULTY_ID",
        "MAX_MARKS",
        "ASSESSMENT_DATE",
        "ASSESSMENT_TYPE",
        obj.courseId,
        obj.facultyId,
        obj.maxMarks,
        obj.assessmentDate,
        obj.assessmentTitle,
      ],
    },
    (error, resu, fields) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ message: "unkown error occured" });
      }
      db.query(
        {
          sql: "SELECT * FROM ?? WHERE ?? = ?",
          values: ["STUDENT_ACADEMIC_HISTORY", "CLASS_ID", obj.classId],
        },
        (error, results, fields) => {
          if (error) {
            console.log(error);
            return res.status(500).json({ message: "Unkown error occured" });
          }
          var isError = false;
          for (var i = 0; i < results.length; i++) {
            if (isError) break;
            db.query(
              {
                sql: "INSERT INTO ?? (??, ??) VALUES (?, ?)",
                values: [
                  "STD_ASMNT",
                  "STUDENT_ID",
                  "ASSESSMENT_ID",
                  results[i].STUDENT_ID,
                  resu.insertId,
                ],
              },
              (error, results, fields) => {
                if (error) {
                  isError = true;
                  console.log(error);
                  return res
                    .status(500)
                    .json({ message: "Unknown error occured" });
                }
              }
            );
          }
          if (!isError)
            return res.status(200).json({ message: "Successful insertion" });
        }
      );
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

const getAssessmentQuestions = (req, res) => {
  const obj = req.params;
  if (!obj.assessmentId)
    return res.status(400).json({ message: "Assessment ID is required" });
  db.query(
    {
      sql: "SELECT * FROM ?? JOIN ?? USING (??) WHERE ?? = ?",
      values: [
        "QUESTION_ASSESSMENT",
        "QUESTION",
        "QUESTION_ID",
        "ASSESSMENT_ID",
        obj.assessmentId,
      ],
    },
    (error, results, fields) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ message: "Unknown error occured" });
      }
      if (results.length == 0) return res.status(200).json({ results });
      var isError = false;
      var k = 0;

      for (var i = 0; i < results.length; i++) {
        if (isError) {
          break;
        }
        // console.log(i);
        console.log(k);
        db.query(
          {
            sql: "SELECT * FROM ?? JOIN ?? USING (??) WHERE ?? = ?",
            values: [
              "CLO",
              "QUESTION_CLO",
              "CLO_ID",
              "QUESTION_ID",
              results[i].QUESTION_ID,
            ],
          },
          (err, result, field) => {
            if (err) {
              isError = true;
              console.log(error);
              return res.status(500).json({ message: "Unkown Error Occured" });
            }
            var temp = [];
            // console.log(results[k].QUESTION_ID,": ",result,field);
            for (var j = 0; j < result.length; j++) {
              temp.push(result[j].CLO_NAME);
              console.log(temp);
            }
            // console.log(temp);
            // console.log(k);
            results[k].CLO_LIST = temp;
            // console.log(results);
            k++;
            if (!isError && k == results.length) {
              console.log(results);
              return res.status(200).json({ results });
            }
          }
        );
      }
      // if(!isError) return res.status(200).json({ results });
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
        return res.status(400).json({
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
            if (err)
              return res.status(500).json({ message: "unkown error occured" });
            else
              return res
                .status(200)
                .json({ message: "CLO successfully assigned to question" });
          }
        );
      }
    }
  );
};

const deleteQuestion = (req, res) => {
  var obj = req.params;
  if (!obj.questionId) {
    return res.status(400).json({ message: "Question ID is required" });
  }
  db.query(
    {
      sql: "DELETE FROM ?? WHERE ?? = ?",
      values: ["QUESTION", "QUESTION_ID", obj.questionId],
    },
    (error, results, fields) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ message: "Unkown error occured" });
      }
      return res.status(200).json({ message: "Successfully deleted" });
    }
  );
};

const deleteAssessment = (req, res) => {
  var obj = req.params;
  if (!obj.assessmentId) {
    return res.status(400).json({ message: "Assessment ID is required" });
  }
  db.query(
    {
      sql: "DELETE FROM ?? WHERE ?? = ?",
      values: ["ASSESSMENT", "ASSESSMENT_ID", obj.assessmentId],
    },
    (error, results, fields) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ message: "Unkown error occured" });
      }
      return res.status(200).json({ message: "Successfully deleted" });
    }
  );
};

module.exports = {
  createQuestion,
  getQuestionById,
  getAllQuestions,
  updateQuestion,
  getQuestionsByCLO,
  assignCLOToQuestion,
  createAssessment,
  getAssessmentQuestions,
  deleteQuestion,
  deleteAssessment,
};
