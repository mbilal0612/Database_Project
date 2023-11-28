import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(day, monday, tuesday, wednesday, thursday, friday) {
    return {day, monday, tuesday, wednesday, thursday, friday };
  }
  
const rows = [
  createData('1st Block', 159, 6.0, 24, 4.0, 4.0),
  createData('2nd Block', 237, 9.0, 37, 4.3, 4.0),
  createData('3rd Block', 262, 16.0, 24, 6.0, 4.0),
  createData('4th Block', 305, 3.7, 67, 4.3, 4.0),
  createData('Break', "free", "free", "free", "free" ,"free"),
  createData('5th Block', 305, 3.7, 67, 4.3, 4.0),
  createData('6th Block', 305, 3.7, 67, 4.3, 4.0),
  createData('7th Block', 305, 3.7, 67, 4.3, 4.0),
  createData('8th Block', 305, 3.7, 67, 4.3, 4.0),
];

const ScheduleTable = ({ schedule }) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700}} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell> </StyledTableCell>
            <StyledTableCell style={{ fontWeight: 'bolder' }} align="left">Class Slots</StyledTableCell>
            <StyledTableCell style={{ fontWeight: 'bolder' }} align="right">Monday</StyledTableCell>
            <StyledTableCell style={{ fontWeight: 'bolder' }} align="right">Tuesday</StyledTableCell>
            <StyledTableCell style={{ fontWeight: 'bolder' }} align="right">Wednesday</StyledTableCell>
            <StyledTableCell style={{ fontWeight: 'bolder' }} align="right">Thursday</StyledTableCell>
            <StyledTableCell style={{ fontWeight: 'bolder' }} align="right">Friday</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell style={{ fontWeight: 'bolder' }} >{row.day}</StyledTableCell>
              <StyledTableCell align="right">{schedule[1][1]}</StyledTableCell>
              <StyledTableCell align="right">{row.tuesday}</StyledTableCell>
              <StyledTableCell align="right">{row.wednesday}</StyledTableCell>
              <StyledTableCell align="right">{row.thursday}</StyledTableCell>
              <StyledTableCell align="right">{row.friday}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ScheduleTable;