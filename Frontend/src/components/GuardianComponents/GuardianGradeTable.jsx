import * as React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { getChildrenClass } from "../../apis/guardian/getChildrenClass";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CloRow from "./clorow";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { getClassCourse } from "../../apis/guardian/getClassCourse";
import { getChildrenCourseAssessment } from "../../apis/guardian/getChildrenAssessment";
import { getCloIds } from "../../apis/guardian/getCloIds";
import { getCloDetails } from "../../apis/guardian/cloDetails";

// function createData(name, calories, fat, carbs, protein, price) {
//     return {
//         name,
//         calories,
//         fat,
//         carbs,
//         protein,
//         price,
//         history: [
//             {
//                 date: "2020-01-05",
//                 customerId: "11091700",
//                 amount: 3,
//             },
//             {
//                 date: "2020-01-02",
//                 customerId: "Anonymous",
//                 amount: 1,
//             },
//         ],
//     };
// }

function Row({ row }) {
    // const { row } = props;
    const [open, setOpen] = React.useState(false);
    const [course, setCourse] = useState([]);
    const [ass, setAss] = useState([]);
    const [clo, setClo] = useState([]);
    //console.log("c", row);

    useEffect(() => {
        const handleCourse = async () => {
            // getClassCourse(row.CLASS_ID).then((res) => {
            //     setCourse(res.data);
            // });

            getChildrenCourseAssessment(row.STUDENT_ID, row.COURSE_ID).then((res) => { 
                setAss(res.data);

            });

            var temp = await getCloIds(row.STUDENT_ID, row.COURSE_ID);
            setClo(temp.data);

            console.log(temp.data);
            
        };
        //console.log("row", row);
        handleCourse();
        console.log("clo", clo);
        
    },[row]);

    return (
        <React.Fragment>
            <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? (
                            <KeyboardArrowUpIcon />
                        ) : (
                            <KeyboardArrowDownIcon />
                        )}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row" >
                    {row.COURSE_ID}
                </TableCell>
                <TableCell >{row.COURSE_NAME}</TableCell>
                <TableCell >{row.CLASS_ID}</TableCell>
                {/* <TableCell align="right">{row.carbs}</TableCell>
                <TableCell align="right">{row.protein}</TableCell> */}
            </TableRow>
            <TableRow>
                <TableCell
                    style={{ paddingBottom: 0, paddingTop: 0 }}
                    colSpan={6}
                >
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 3 }}>
                            <Typography
                                variant="h6"
                                gutterBottom
                                component="div"
                            >
                                Assessments
                            </Typography>
                            <Table size="small" aria-label="assessment marks">
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{fontWeight:"bolder"}}>Assessment_ID</TableCell>
                                        <TableCell sx={{fontWeight:"bolder"}}>Assessment Type</TableCell>
                                        <TableCell sx={{fontWeight:"bolder"}} align="right">
                                            Max Marks
                                        </TableCell>
                                        <TableCell sx={{fontWeight:"bolder"}} align="right">
                                            Obtained Marks
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    
                                {ass.map((as) => (
                                        <TableRow key={as.ASSESSMENT_ID}>
                                            <TableCell
                                                component="th"
                                                scope="row"
                                            >
                                                {as.ASSESSMENT_ID}
                                            </TableCell>
                                            <TableCell
                                                component="th"
                                                scope="row"
                                            >
                                             {as.ASSESSMENT_TYPE}   
                                            </TableCell>
                                            <TableCell
                                                component="th"
                                                scope="row"
                                                align="right"
                                            >
                                                {as.MAX_MARKS}
                                            </TableCell>
                                            <TableCell
                                                component="th"
                                                scope="row"
                                                align="right"
                                            >
                                                {as.OBTAINED_MARKS}
                                            </TableCell>
                                            
                                        </TableRow>
                                    ))}
                                    
                                        
                                </TableBody>
                            </Table>
                            
                        </Box>
                        <Box sx={{margin: 3}}>
                            <Typography
                                variant="h6"
                                gutterBottom
                                component="div"
                            >
                                CLO Progress
                            </Typography>
                            <Table size="small" aria-label="clo progress">
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{fontWeight:"bolder"}}>CLO_ID</TableCell>
                                        <TableCell sx={{fontWeight:"bolder"}}>CLO Type</TableCell>
                                        <TableCell sx={{fontWeight:"bolder"}} align="right">
                                            Percentage
                                        </TableCell>
                                        <TableCell sx={{fontWeight:"bolder"}} align="right">
                                            
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    

                                    {clo.map((cl) => (
                                        //<CloRow clo={cl} studentId={row.STUDENT_ID} courseId={row.COURSE_ID}/>
                                        <TableRow key={cl.CLO_ID}>
                                            <TableCell component="th" scope="row">
                                                {cl.CLO_ID}
                                                
                                            </TableCell>
                                            <TableCell component="th" scope="row">
                                                {cl.CLO_NAME}
                                                
                                            </TableCell>
                                            <TableCell component="th" scope="row" align="right">
                                               
                                                {cl.OBTAINED}
                                            </TableCell>
                                            <TableCell component="th" scope="row" align="right">
                                                {cl.MAX_MARKS >= 70 ?"PASS":"FAIL"}
                                               
                                            </TableCell>
                                    </TableRow>
                                    ))}

                                    {/* {clo.map( async (cl) => {
                                        let res = await getCloDetails(cl.CLO_ID,row.STUDENT_ID,row.COURSE_ID)
                                        return (
                                            <TableRow>
                                                <TableCell>  nello</TableCell>
                                            </TableRow>
                                        )
                                    }
                                        
                                    )} */}
                                   
                                   
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

// Row.propTypes = {
//     row: PropTypes.shape({
//         calories: PropTypes.number.isRequired,
//         carbs: PropTypes.number.isRequired,
//         fat: PropTypes.number.isRequired,
//         history: PropTypes.arrayOf(
//             PropTypes.shape({
//                 amount: PropTypes.number.isRequired,
//                 customerId: PropTypes.string.isRequired,
//                 date: PropTypes.string.isRequired,
//             })
//         ).isRequired,
//         name: PropTypes.string.isRequired,
//         price: PropTypes.number.isRequired,
//         protein: PropTypes.number.isRequired,
//     }).isRequired,
// };

// const rows = [
//     createData("Frozen yoghurt", 159, 6.0, 24, 4.0, 3.99),
//     createData("Ice cream sandwich", 237, 9.0, 37, 4.3, 4.99),
//     createData("Eclair", 262, 16.0, 24, 6.0, 3.79),
//     createData("Cupcake", 305, 3.7, 67, 4.3, 2.5),
//     createData("Gingerbread", 356, 16.0, 49, 3.9, 1.5),
// ];

export default function GuardianGradeTable({ studentId }) {
    const [stdClss, setclss] = useState([]);

    useEffect(() => {
        const handleClss = async () => {
            getChildrenClass(studentId).then((res) => {
                console.log("res2", res.data);
                setclss(res.data);
                
            });
            console.log("std", stdClss);
        };
        console.log(stdClss);
        handleClss();
    }, [studentId]);

    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell sx={{fontWeight:"bolder"}} >Course ID</TableCell>
                        <TableCell sx={{fontWeight:"bolder"}} >Course Name</TableCell>
                        <TableCell sx={{fontWeight:"bolder"}} >Class</TableCell>
                        {/* <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                        <TableCell align="right">Protein&nbsp;(g)</TableCell> */}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {stdClss.length !== 0 &&
                        stdClss.map((c) => <Row key={c} row={c} />)}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
