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
  createData('1st Block', 'Maths', 'English', 'Maths', 'English', 'Urdu'),
  createData('2nd Block', 'Arabic', 'ITP', 'Arabic', 'ITP', 'Urdu'),
  createData('3rd Block', 'English', 'Maths', 'English', 'Maths', 'Physics'),
  createData('4th Block', 'Physics', 'Biology', 'Physics', 'Biology', 'Biology'),
  createData('Break', "free", "free", "free", "free" ,"free"),
  createData('5th Block', 'ITP', 'ITC', 'ITP','ITC', 'Physics'),
  createData('6th Block', 'ITC', 'Chemistry', 'ITC', 'Chemistry', 'ITC'),
  createData('7th Block', 'PE', 'Arabic', 'PE', 'Arabic', 'ITP'),
  createData('8th Block', 'Art', 'Urdu', 'Art', 'Urdu', 'English'),
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
            <StyledTableCell> </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell style={{ fontWeight: 'bolder' }} >{row.day}</StyledTableCell>
              <StyledTableCell align="right">{row.monday}</StyledTableCell>
              <StyledTableCell align="right">{row.tuesday}</StyledTableCell>
              <StyledTableCell align="right">{row.wednesday}</StyledTableCell>
              <StyledTableCell align="right">{row.thursday}</StyledTableCell>
              <StyledTableCell align="right">{row.friday}</StyledTableCell>
              <StyledTableCell> </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ScheduleTable;