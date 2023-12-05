import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { createTheme } from "@mui/material";
import { useState } from "react";
import { TextField } from "@mui/material";
import { updateMarks } from "../../apis/Faculty/Marks";

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
    const [newMarks, setNewMarks] = useState(new Array(contents.length));

    return (
        <TableContainer sx={{ boxShadow: "20" }} component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="right">Student ID</TableCell>
                        <TableCell align="right">Student Name</TableCell>
                        <TableCell align="right">Assessment ID</TableCell>
                        <TableCell align="right">Assessment Name</TableCell>
                        <TableCell align="right">Obtained Marks</TableCell>
                        <TableCell align="right">Maximum Marks</TableCell>
                        <TableCell align="center">Update Marks</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {contents.map((row, ind) => (
                        <TableRow
                            key={i++}
                            sx={{
                                "&:last-child td, &:last-child th": {
                                    border: 0,
                                },
                            }}
                        >
                            <TableCell align="right" component="th" scope="row">
                                {row.USER_ID}
                            </TableCell>
                            <TableCell align="right">
                                {row.FIRST_NAME + " " + row.LAST_NAME}
                            </TableCell>
                            <TableCell align="right">
                                {row.ASSESSMENT_ID}
                            </TableCell>
                            <TableCell align="right">
                                {row.ASSESSMENT_TYPE}
                            </TableCell>
                            <TableCell align="right">
                                {row.OBTAINED_MARKS}
                            </TableCell>
                            <TableCell align="right">{row.MAX_MARKS}</TableCell>
                            <TableCell
                                sx={{
                                    display: "flex",
                                    justifyItems: "space-between",
                                    alignItems: "center",
                                }}
                            >
                                <TextField
                                    id="outlined-basic"
                                    variant="outlined"
                                    fullWidth
                                    label="Title"
                                    onChange={(event) => {
                                        var temp = newMarks;
                                        temp[ind] = event.target.value;
                                        setNewMarks(temp);
                                        // console.log(newMarks);
                                    }}
                                    sx={{ width: "75%", margin: "10px" }}
                                />
                                <Button
                                    theme={theme}
                                    variant="outlined"
                                    border="black"
                                    onClick={async () => {
                                        if (
                                            newMarks[ind] <= row.MAX_MARKS &&
                                            newMarks[ind] >= 0
                                        ) {
                                            var res = await updateMarks(
                                                row.USER_ID,
                                                row.ASSESSMENT_ID,
                                                newMarks[ind],
                                                sessionStorage.getItem("token")
                                            );
                                            // console.log(res);
                                            window.location.reload(false);
                                        }
                                    }}
                                    fullWidth
                                    sx={{
                                        width: "10%",
                                        height: "90%",
                                        color: "black",
                                        // backgroundColor: "black",
                                        ":hover": {
                                            bgcolor: "#999",
                                            color: "white",
                                        },
                                    }}
                                >
                                    <EditIcon sx={{ color: "black" }} />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
