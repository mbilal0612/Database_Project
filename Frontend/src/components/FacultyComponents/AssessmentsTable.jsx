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
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteAssessment } from "../../apis/Faculty/Assessments";

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
  buttonPressed,
}) {
  return (
    <TableContainer sx={{ boxShadow: "20" }} component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ width: "10%" }} align="right">
              Delete
            </TableCell>
            <TableCell sx={{ width: "10%" }} align="right">
              Assessment ID
            </TableCell>
            <TableCell sx={{ width: "45%" }} align="center">
              Assessment Title
            </TableCell>
            <TableCell sx={{ width: "10%" }} align="center">
              Maximum Marks
            </TableCell>
            <TableCell sx={{ width: "15%" }} align="center">
              Date
            </TableCell>
            <TableCell sx={{ width: "10%" }} align="center">
              Update
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {contents.map((row) => (
            <TableRow
              key={i++}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell sx={{ width: "10%" }} align="right">
                {
                  <Button
                    theme={theme}
                    variant="outlined"
                    border="black"
                    onClick={async () => {
                      console.log("clicked");
                      var api = await deleteAssessment(
                        row.ASSESSMENT_ID,
                        sessionStorage.getItem("token")
                      );
                      window.location.reload(false);
                    }}
                    fullWidth
                    sx={{
                      width: "50%",
                      color: "black",
                      // backgroundColor: "black",
                      ":hover": {
                        bgcolor: "#999",
                        color: "white",
                      },
                    }}
                  >
                    <DeleteIcon />
                  </Button>
                }
              </TableCell>
              <TableCell
                sx={{ width: "10%" }}
                align="right"
                component="th"
                scope="row"
              >
                {row.ASSESSMENT_ID}
              </TableCell>
              <TableCell sx={{ width: "45%" }} align="center">
                {row.ASSESSMENT_TYPE}
              </TableCell>
              <TableCell sx={{ width: "10%" }} align="center">
                {row.MAX_MARKS}
              </TableCell>
              <TableCell sx={{ width: "15%" }} align="center">
                {new Date(row.ASSESSMENT_DATE).getDate() +
                  "-" +
                  new Date(row.ASSESSMENT_DATE).getMonth() +
                  "-" +
                  new Date(row.ASSESSMENT_DATE).getFullYear()}
              </TableCell>
              <TableCell sx={{ width: "10%" }} align="center">
                {" "}
                <Button
                  theme={theme}
                  variant="outlined"
                  border="black"
                  onClick={() => {
                    sessionStorage.setItem("assessmentId", row.ASSESSMENT_ID);
                    sessionStorage.setItem(
                      "assessmentName",
                      row.ASSESSMENT_TYPE
                    );
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
            <TableCell sx={{ width: "10%" }} align="right" />
            <TableCell sx={{ width: "10%" }} />
            <TableCell sx={{ width: "45%" }}>
              <TextField
                id="outlined-basic"
                variant="outlined"
                fullWidth
                label="Title"
                onChange={handleTitle}
              />
            </TableCell>
            <TableCell sx={{ width: "10%" }}>
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
            <TableCell sx={{ width: "10%" }} align="center">
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
