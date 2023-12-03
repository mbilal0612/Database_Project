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
export default function MarksEnteringTable({ contents }) {
  return (
    <TableContainer sx={{boxShadow:"20"}} component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right">Student ID</TableCell>
            <TableCell align="right">Student Name</TableCell>
            <TableCell align="right">Gender</TableCell>
            <TableCell align="right">Phone no.</TableCell>
            <TableCell align="right">Email-Address</TableCell>
            <TableCell align="right">Performance</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {contents.map((row) => (
            <TableRow
              key={i++}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="right" component="th" scope="row">
                {row.STUDENT_ID}
              </TableCell>
              <TableCell align="right">
                {row.FIRST_NAME + " " + row.LAST_NAME}
              </TableCell>
              <TableCell align="right">{row.GENDER}</TableCell>
              <TableCell align="right">{row.PHONE}</TableCell>
              <TableCell align="right">{row.EMAIL_ADDRESS}</TableCell>
              <TableCell align="right">
                {" "}
                <Button
                  theme={theme}
                  variant="outlined"
                  border="black"
                  onClick={() => {
                    sessionStorage.setItem("studentId", row.STUDENT_ID);
                    window.location.assign('/ClassDetails/StudentDetails');
                  }}
                  fullWidth
                  sx={{
                    marginTop: "2%",
                    marginLeft: "20%",
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
