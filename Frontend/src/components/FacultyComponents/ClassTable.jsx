import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(Student_Name,	Student_ID,	Attendance,	Percentage,	Email_Address) {
  return { Student_Name,	Student_ID,	Attendance,	Percentage,	Email_Address};
}

const rows = [
  createData('Maaz Karim', 25, 80, 85, "maazkarim84@gmail.com"),
  createData('Muhammad Bilal', 25, 80, 85, "Bilal84@gmail.com"),
  createData('Nabeel Mirza', 25, 80, 85, "Nabeel84@gmail.com"),
  createData('Musab Iqbal', 25, 80, 85, "musab84@gmail.com"),
  createData('Akarima Iqbal', 25, 80, 85, "akarima84@gmail.com"),
];

var i = 0;

export default function BasicTable(contents) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Student Name</TableCell>
            <TableCell align="right">Student ID</TableCell>
            <TableCell align="right">Attendance&nbsp;(%)</TableCell>
            <TableCell align="right">Percentage&nbsp;(%)</TableCell>
            <TableCell align="right">Email-Address</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={i++}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.Student_Name}
              </TableCell>
              <TableCell align="right">{row.Student_ID}</TableCell>
              <TableCell align="right">{row.Attendance}</TableCell>
              <TableCell align="right">{row.Percentage}</TableCell>
              <TableCell align="right">{row.Email_Address}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}