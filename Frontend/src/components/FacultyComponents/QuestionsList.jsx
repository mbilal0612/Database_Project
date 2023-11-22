import * as React from "react";
import { createTheme, styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { TextField } from "@mui/material";
import { MultipleSelect } from "./CLODropDown";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

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

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

var i = 0;

export default function QuestionsTable({ rows, CLO, handleQuestion, handleMax, buttonPressed, setSelectedClo }) {
  // console.log(CLO);
  return (
    <TableContainer
      sx={{ width: "94%", marginLeft: "3%", boxShadow: 20 }}
      component={Paper}
    >
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell sx={{ width: "50%" }}>Question</StyledTableCell>
            <StyledTableCell align="right" sx={{ width: "10%" }}>
              Max Marks
            </StyledTableCell>
            <StyledTableCell align="right">CLO</StyledTableCell>
            <StyledTableCell align="right" sx={{ width: "10%" }}>
              Edit
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={i++}>
              <StyledTableCell sx={{ width: "50%" }} component="th" scope="row">
                {row.QUESTION_DESC}
              </StyledTableCell>
              <StyledTableCell sx={{ width: "10%" }} align="right">
                {row.MAX_MARKS}
              </StyledTableCell>
              <StyledTableCell size="small" align="right">{row.CLO_LIST.toString()}</StyledTableCell>
              <StyledTableCell sx={{ width: "10%" }} align="right">
                {
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
                    <EditIcon />
                  </Button>
                }
              </StyledTableCell>
            </StyledTableRow>
          ))}
          <StyledTableRow>
            <StyledTableCell sx={{ width: "50%" }} component="th" scope="row">
              <TextField
                id="outlined-basic"
                variant="outlined"
                fullWidth
                label="Question"
                  onChange={handleQuestion}
              />
            </StyledTableCell>
            <StyledTableCell sx={{ width: "10%" }} align="right">
              <TextField
                id="outlined-basic"
                variant="outlined"
                fullWidth
                label="Marks"
                  onChange={handleMax}
              />
            </StyledTableCell>
            <StyledTableCell size="small" align="right">
              <MultipleSelect names={CLO} setSelectedClo = {setSelectedClo}/>
            </StyledTableCell>
            <StyledTableCell sx={{ width: "10%" }} align="right">
              {
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
              }
            </StyledTableCell>
          </StyledTableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
