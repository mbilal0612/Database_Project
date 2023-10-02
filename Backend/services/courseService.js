db = require("../config/db").connection;

const createCourse = (req,res) => {
    const obj = req.body;

    if(!obj.courseName){
        return res.status(400).json({ message : " Course Name required"});
    }
    if(!obj.courseId){
        return res.status(400).json({ message : "Course- ID is required"});
    }

    db.query(
        {
            sql : "INSERT INTO ?? (??,??) VALUES (?,?)",
            timeout:40000,
            values: [
                "COURSE",
                "COURSE_ID",
                "COURSE_NAME",
                obj.courseId,
                obj.courseName,

            ]
        },

        (error, results, fields) => {

            if(error){
                return res.status(500).send(error);
            }

            return res.status(200).json({ message : "successfully added"});
        }
    )
}

const getAllCourse = (req,res) => {
    const obj = req.body;


    db.query(
        {
            sql: "SELECT * FROM ??",
            timeout:40000,
            values: [
                "COURSE"
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

const getCourseById = (req,res)=>{

    const obj = req.params;

    if(!obj.Id){
        return res.status(400).json({ message : "please give id in the url"});
    }

    db.query(
        {
            sql: "SELECT * FROM ?? WHERE ?? = ?",
            timeout:40000,
            values: [
                "COURSE",
                "COURSE_ID",
                obj.Id
            ]
        },

        (error, results, fields)=> {
            if(error){
                return res.status(400).send(error);
            }

            return res.status(200).send(results);
        }
    )
}

const getSimilarCourse = (req,res) => {
    const obj = req.params;
    let queryTerm = "%";
    if(!obj.searchTerm){
        return res.status(400).json({ message : "search Term is required"});

    }

    queryTerm = queryTerm + obj.searchTerm + "%";


    db.query(
        {
            sql : "SELECT * FROM ?? WHERE ?? LIKE ?",
            timeout:40000,
            values : [
                "COURSE",
                "COURSE_NAME",
                queryTerm

            ]
        },
        (error, results, fields)=> {

            if(error){
                return res.status(500).send(error);
            }

            return res.status(200).send(results);

        }
    )
}

const updateCourse = (req,res) => {
    const obj = req.body;

    if(!obj.courseName){
        return res.status(400).json({ message : "course Name is required"});
    }

    if(!obj.courseId){
        return res.status(400).json({ message : "course Id is required"});
    }

    db.query(
        {
            sql : "UPDATE ?? SET ?? = ? WHERE ?? = ?",
            timeout: 40000,
            values : [
                "COURSE",
                "COURSE_NAME",
                obj.courseName,
                "COURSE_ID",
                obj.courseId
            ]
        },
        (error, results, fields) => {

            if(error){
                return res.status(500).send(error);
            }

            return res.status(200).json({ message :" successful change"})
        }
    )
}

module.exports = {
    createCourse,
    getCourseById,
    getAllCourse,
    updateCourse,
    getSimilarCourse,
}