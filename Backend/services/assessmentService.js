const db = require("../config/db").connection;

//get total marks of each assessment + assessment details
//need studentId + assessment id + course +id
const getAssessmentDetails = (req,res) => {
    const obj = req.params;

    if(!obj.studentId || !obj.courseId){
        return res.status(400).send("Missing parameters");
    }

    //get all unique clos for the course

    db.query({
        sql: "SELECT DISTINCT CLO_ID FROM STDNT_ASMNT WHERE ?? = ? AND ?? = ?",
        values: [
            "CLO_ID",
            "STDNT_ASMNT",
            "STUDENT_ID",
            obj.studentId,
            "COURSE_ID",
            obj.courseId
        ],
        timeout:40000, //40s
    }, (error, results, fields)=>{
        if(error){
            return res.status(400).json({"message": "Error in getting CLOs"});
        }

        results.forEach(r => {
            
            db.query({
                sql: "SELECT * FROM SDNT_ASMNT WHERE ?? = ? AND ?? = ?",
                
            })
        });

    })

}