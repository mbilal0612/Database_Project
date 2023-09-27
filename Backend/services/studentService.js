const db = require("../config/db");

const createStudent = (req,res) =>{
    const obj = req.body;

    if(!obj.studentId){
        return res.status(400).json({message:"studentId is required!"});
    }
    if(!obj.firstName){
        return res.status(400).json({message:"firstName is required!"});
    }
    if(!obj.lastName){
        return res.status(400).json({message:"lastName is required!"});
    }
    if(!obj.CNIC){
        return res.status(400).json({message:"CNIC is required!"});
    }
    if(!obj.gender){
        return res.status(400).json({message:"Gender is required!"});
    }
    if(!obj.religion){
        return res.status(400).json( {message:"religion is required!"});
    }
    if(!obj.nationality){
        return res.status(400).json({message:"nationality is required!"});
    }
    if(!obj.dateOfBirth){
        return res.status(400).json({message:"dateOfBirth is required!"});
    }
    if(!obj.admissionDate){
        return res.status(400).json({message:"admissionDate is required!"});
    }
    if(!obj.classID){
        // TODO: check if classID is valid
        return res.status(400).json({message:"classID is required!"});
    }
    //todo: add emergencey contact

    //TODO: QUERY INTO DATABASE
    db.query(
        {
            sql:"INSERT INTO ?? (??,??,??,??,??,??,??,??,??,??) VALUES (?,?,?,?,?,?,?,?,?,?)",
            timeout:40000, //40s
            values:[
                "STUDENT",
                "STUDENT_ID",
                "CNIC",
                "FIRST_NAME",
                "LAST_NAME",
                "CLASS_ID",
                "DATE_OF_BIRTH",
                "GENDER",
                "EMERGENCEY_CONTACT",
                "ADMISSION_DATE",
                "NATIONALITY",
                "RELIGION",
                obj.studentId,
                obj.CNIC,
                obj.firstName,
                obj.lastName,
                obj.classID,
                obj.dateOfBirth,
                obj.gender,
                obj.emergenceyContact,
                obj.admissionDate,
                obj.nationality,
                obj.religion,
            ],
        },

        function(error,results,fields){
            if(error){
                //TODO:UPDATE error response properly
                return res.status(500).json({message:"Something went wrong please try again later..."});
            }else{
                return res.json({
                    message:"Student Created",
                    student: {
                        studentId: obj.studentId,
                        CNIC: obj.CNIC,
                        firstName: obj.firstName,
                        lastName: obj.lastName,
                        classID: obj.classID,
                        dateOfBirth:obj.dateOfBirth,
                        gender: obj.gender,
                        emergenceyContact: obj.emergenceyContact,
                        admissionDate: obj.admissionDate,
                        nationality: obj.nationality,
                        religion: obj.religion,
                    },
                });
            }
            // error will be an Error if one occurred during the query
            // results will contain the results of the query
            // fields will contain information about the returned results fields (if any)
        }

        
    )


};

module.exports = {
    createStudent
}
