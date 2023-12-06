import { useEffect, useState } from "react";
import { getCloDetails } from "../../apis/guardian/cloDetails";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";

export default function CloRow({clo, studentId, courseId}) {

    const [ details , setDetails] = useState([]);
    const [ open , setOpen] = useState(false);

    useEffect(()=>{
        const handleDetails =()=> {
            
            getCloDetails(clo.CLO_ID,studentId,courseId).then((res)=>{
                setDetails(res.data);
                // console.log("details response", res);
                // console.log("details has been set",details);
                clo = {
                    ...clo,
                    ...res.data
                };
                console.log("clo id ", clo[0]);
                setOpen(true);
            })
        };

         if (clo && studentId && courseId){
            handleDetails();
            console.log("details",details);
        }
        
        //console.log("clo id ", clo);
    
    },[clo]);
    
    return (

        <TableRow key={details.CLO_ID}>
            <TableCell component="th" scope="row">
                {clo.CLO_ID}
                {/* {as.ASSESSMENT_ID} */}
            </TableCell>
            <TableCell component="th" scope="row">
                {clo.CLO_NAME}
                {/* {as.ASSESSMENT_TYPE} */}
            </TableCell>
            <TableCell component="th" scope="row" align="right">
                {/* {as.MAX_MARKS} */}
                {open ? clo[0].OBTAINED: ""}
            </TableCell>
            <TableCell component="th" scope="row" align="right">
                {details.OBTAINED}
                {/* {as.OBTAINED_MARKS} */}
            </TableCell>
        </TableRow>
        
    );
}
