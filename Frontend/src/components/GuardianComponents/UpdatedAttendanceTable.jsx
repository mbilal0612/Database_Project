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
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { getClassCourse } from "../../apis/guardian/getClassCourse";
import { getAttendanceSummary } from "../../apis/guardian/getAttendanceSummary";


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
    console.log("c", row);

    useEffect(() => {
        const handleCourse = async () => {
            // getClassCourse(row.CLASS_ID).then((res) => {
            //     setCourse(res.data);
            // });
            setCourse([]);
            setAss([]);
            // getAttendanceSummary(row.STUDENT_ID).then((res) => { 
            //     setAss(res.data);
            //  })
        };
        console.log("row", row);
        handleCourse();
    },[]);

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
                    {row.academicYear}
                </TableCell>
                <TableCell >{row.daysPresent}</TableCell>
                <TableCell >{row.totalDays}</TableCell>
                <TableCell >{Math.round( (row.daysPresent/row.totalDays) * 100 )}</TableCell>
            
        
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
                                Attendance
                            </Typography>
                            <Table size="small" aria-label="assessment marks">
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{fontWeight:"bolder"}} align="left">
                                            Date
                                        </TableCell>
                                        <TableCell sx={{fontWeight:"bolder"}} align="left">
                                            Is Present?
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                   
                                    {row.details.map((as,i) => (
                                        <TableRow key={i}>
                                            
                                            <TableCell
                                                component="th"
                                                scope="row"
                                                align="left"
                                            >
                                                {as.P_DATE}
                                            </TableCell>
                                            <TableCell
                                                component="th"
                                                scope="row"
                                                align="left"
                                            >
                                                {as.PRESENT}
                                            </TableCell>
                                        </TableRow>
                                    ))}
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

export default function AttendanceTableUpdate({ studentId }) {
    const [stdClss, setclss] = useState([]);

    useEffect(() => {
        const handleClss = async () => {
            getAttendanceSummary(studentId).then((res) => {
                console.log("res2", res.data);
                setclss(res.data.attendance);
                
            });
            console.log("std", stdClss);
        };
        console.log(stdClss);
       if(studentId){
        handleClss();
       }
    }, [studentId]);

    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell sx={{fontWeight:"bolder"}} >Academic Year</TableCell>
                        <TableCell sx={{fontWeight:"bolder"}} >Numbers of days Present</TableCell>
                        <TableCell sx={{fontWeight:"bolder"}} >Total Days</TableCell>
                        <TableCell sx={{fontWeight:"bolder"}} >Percentage %</TableCell>
                        {/* <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                        <TableCell align="right">Protein&nbsp;(g)</TableCell> */}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {stdClss.length !== 0 &&
                        stdClss.map((c) => <Row key={c.ACADEMIC_YEAR} row={c} />)}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
