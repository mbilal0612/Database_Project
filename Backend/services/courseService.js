db = require("../config/db").connection;

const createCourse = (req, res) => {
  const obj = req.body;

  if (!obj.courseName) {
    return res.status(400).json({ message: " Course Name required" });
  }
  if (!obj.courseId) {
    return res.status(400).json({ message: "Course- ID is required" });
  }

  db.query(
    {
      sql: "INSERT INTO ?? (??,??) VALUES (?,?)",
      timeout: 40000,
      values: [
        "COURSE",
        "COURSE_ID",
        "COURSE_NAME",
        obj.courseId,
        obj.courseName,
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

const getStudentCourses = (req, res) => {
  var obj = req.params;
  if (!obj.id)
    return res.status(400).json({ message: "student id not provided" });
  db.query(
    {
      sql: "SELECT * FROM ?? JOIN ?? USING (??) JOIN ?? USING (??) WHERE ?? = ? and EXTRACT(YEAR FROM ??) = (SELECT MAX(EXTRACT(YEAR FROM ??)) FROM ?? WHERE ?? = ?)",
      values: [
        "STUDENT_ACADEMIC_HISTORY",
        "CLASS_COURSE",
        "CLASS_ID",
        "COURSE",
        "COURSE_ID",
        "STUDENT_ID",
        obj.id,
        "ENROLLMENT_DATE",
        "ENROLLMENT_DATE",
        "STUDENT_ACADEMIC_HISTORY",
        "STUDENT_ID",
        obj.id,
      ],
    },
    (error, results, fields) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ message: "unkown error occurred" });
      }
      return res.status(200).json(results);
    }
  );
};

const getAllCourse = (req, res) => {
  const obj = req.body;

  db.query(
    {
      sql: "SELECT * FROM ??",
      timeout: 40000,
      values: ["COURSE"],
    },
    (error, results, fields) => {
      if (error) {
        return res.status(500).send(error);
      }

      return res.status(200).send(results);
    }
  );
};

const getCourseById = (req, res) => {
  const obj = req.params;

  if (!obj.Id) {
    return res.status(400).json({ message: "please give id in the url" });
  }

  db.query(
    {
      sql: "SELECT * FROM ?? WHERE ?? = ?",
      timeout: 40000,
      values: ["COURSE", "COURSE_ID", obj.Id],
    },

    (error, results, fields) => {
      if (error) {
        return res.status(400).send(error);
      }

      return res.status(200).send(results);
    }
  );
};

const getFacultyCourses = (req, res) => {
  var obj = req.params;
  if (!obj.facultyId)
    return res.status(400).json({ message: "facultyID not provided" });
  db.query(
    {
      sql: "SELECT * FROM ?? JOIN ?? USING (??) WHERE ?? = ?",
      values: [
        "CLASS_COURSE",
        "COURSE",
        "COURSE_ID",
        "FACULTY_ID",
        obj.facultyId,
      ],
    },
    (err, results, fields) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: "internal error occured" });
      }
      return res.status(200).send(results);
    }
  );
};

const getSimilarCourse = (req, res) => {
  const obj = req.params;
  let queryTerm = "%";
  if (!obj.searchTerm) {
    return res.status(400).json({ message: "search Term is required" });
  }

  queryTerm = queryTerm + obj.searchTerm + "%";

  db.query(
    {
      sql: "SELECT * FROM ?? WHERE ?? LIKE ?",
      timeout: 40000,
      values: ["COURSE", "COURSE_NAME", queryTerm],
    },
    (error, results, fields) => {
      if (error) {
        return res.status(500).send(error);
      }

      return res.status(200).send(results);
    }
  );
};

const updateCourse = (req, res) => {
  const obj = req.body;

  if (!obj.courseName) {
    return res.status(400).json({ message: "course Name is required" });
  }

  if (!obj.courseId) {
    return res.status(400).json({ message: "course Id is required" });
  }

  db.query(
    {
      sql: "UPDATE ?? SET ?? = ? WHERE ?? = ?",
      timeout: 40000,
      values: [
        "COURSE",
        "COURSE_NAME",
        obj.courseName,
        "COURSE_ID",
        obj.courseId,
      ],
    },
    (error, results, fields) => {
      if (error) {
        return res.status(500).send(error);
      }

      return res.status(200).json({ message: " successful change" });
    }
  );
};

const getCourseDetails = (req, res) => {
  var obj = req.params;
  if (!obj.classId)
    return res.status(400).json({ message: "class id is required" });
  
  db.query(
    {
      sql: "SELECT * FROM ?? JOIN ?? ON ??=??  WHERE ?? = ? ",
      values: [
        "USERS",
        "STUDENT_ACADEMIC_HISTORY",
        "STUDENT_ID",
        "USER_ID",
        "CLASS_ID",
        obj.classId,
      ],
    },
    (error, results, fields) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ message: "Unknown errorrr occured" });
      }
      return res.status(200).json(results);
    }
  );
};

module.exports = {
  createCourse,
  getCourseById,
  getAllCourse,
  updateCourse,
  getSimilarCourse,
  getFacultyCourses,
  getStudentCourses,
  getCourseDetails,
};
