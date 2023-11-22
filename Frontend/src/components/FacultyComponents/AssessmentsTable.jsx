import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { createTheme } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import BasicDatePicker from "./DateField";
import { TextField } from "@mui/material";

// function createData(
//   Student_Name,
//   Student_ID,
//   Attendance,
//   Percentage,
//   Email_Address
// ) {
//   return { Student_Name, Student_ID, Attendance, Percentage, Email_Address };
// }

// const rows = [
//   createData("Maaz Karim", 25, 80, 85, "maazkarim84@gmail.com"),
//   createData("Muhammad Bilal", 25, 80, 85, "Bilal84@gmail.com"),
//   createData("Nabeel Mirza", 25, 80, 85, "Nabeel84@gmail.com"),
//   createData("Musab Iqbal", 25, 80, 85, "musab84@gmail.com"),
//   createData("Akarima Iqbal", 25, 80, 85, "akarima84@gmail.com"),
// ];

var i = 0;
const theme = createTheme({
  palette: {
    primary: {
      main: "#000000",
    },
    secondary: {
      main: "#ffffff",
    },
  },
});
export default function AssessmentTable({
  contents,
  date,
  setDate,
  handleMax,
  handleTitle,
  buttonPressed
}) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right">Assessment ID</TableCell>
            <TableCell align="center">Assessment Title</TableCell>
            <TableCell align="center">Maximum Marks</TableCell>
            <TableCell align="center">Date</TableCell>
            <TableCell align="center">Update</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {contents.map((row) => (
            <TableRow
              key={i++}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="right" component="th" scope="row">
                {row.ASSESSMENT_ID}
              </TableCell>
              <TableCell align="center">{row.ASSESSMENT_TYPE}</TableCell>
              <TableCell align="center">{row.MAX_MARKS}</TableCell>
              <TableCell align="center">
                {new Date(row.ASSESSMENT_DATE).getDate() +
                  "-" +
                  new Date(row.ASSESSMENT_DATE).getMonth() +
                  "-" +
                  new Date(row.ASSESSMENT_DATE).getFullYear()}
              </TableCell>
              <TableCell align="center">
                {" "}
                <Button
                  theme={theme}
                  variant="outlined"
                  border="black"
                  onClick={() => {
                    sessionStorage.setItem("assessmentId", row.ASSESSMENT_ID);
                    sessionStorage.setItem("assessmentName", row.ASSESSMENT_TYPE);
                    window.location.assign(
                      "/AssessmentCourse/AssessmentDetails"
                    );
                  }}
                  fullWidth
                  sx={{
                    width: "30%",
                    color: "black",
                    // backgroundColor: "black",
                    ":hover": {
                      bgcolor: "#999",
                      color: "white",
                    },
                  }}
                >
                  <VisibilityIcon sx={{ color: "black" }} />
                </Button>
              </TableCell>
            </TableRow>
          ))}
          <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            <TableCell />
            <TableCell>
              <TextField
                id="outlined-basic"
                variant="outlined"
                fullWidth
                label="Title"
                onChange={handleTitle}
              />
            </TableCell>
            <TableCell>
              <TextField
                id="outlined-basic"
                variant="outlined"
                fullWidth
                label="Maximum Marks"
                onChange={handleMax}
              />
            </TableCell>
            <TableCell
              sx={{
                display: "flex",
                direction: "column",
                justifyContent: "center",
              }}
              align="center"
            >
              <BasicDatePicker
                sx={{ margin: 0 }}
                value={date}
                setValue={setDate}
              />
            </TableCell>
            <TableCell align="center">
              <Button
                theme={theme}
                variant="outlined"
                border="black"
                onClick={buttonPressed}
                fullWidth
                sx={{
                  width: "30%",
                  color: "black",
                  // backgroundColor: "black",
                  ":hover": {
                    bgcolor: "#999",
                    color: "white",
                  },
                }}
              >
                <AddCircleIcon />
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
