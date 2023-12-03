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
export default function AMTable({
  contents
}) {
  return (
    <TableContainer sx={{ boxShadow: "20" }} component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ width: "10%" }} align="right">
              Assessment ID
            </TableCell>
            <TableCell sx={{ width: "55%" }} align="center">
              Assessment Title
            </TableCell>
            <TableCell sx={{ width: "10%" }} align="center">
              Maximum Marks
            </TableCell>
            <TableCell sx={{ width: "15%" }} align="center">
              Date
            </TableCell>
            <TableCell sx={{ width: "10%" }} align="center">
              Student List
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {contents.map((row) => (
            <TableRow
              key={i++}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell
                sx={{ width: "10%" }}
                align="right"
                component="th"
                scope="row"
              >
                {row.ASSESSMENT_ID}
              </TableCell>
              <TableCell sx={{ width: "55%" }} align="center">
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
                      "/AssessmentCourse/AssessmentDetails/StudentList"
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
        </TableBody>
      </Table>
    </TableContainer>
  );
}
