import * as React from "react";
import { GridColumnMenu, GridFooterContainer } from "@mui/x-data-grid";
import { DataGrid, GridFooter, GridPagination } from '@mui/x-data-grid';
import { Box } from "@mui/material";
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { useEffect } from "react";
import { getChildrenAttendance } from "../../apis/guardian/getChildrenAttendance";
import { useState } from "react";
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

// const CustomFooter = (props) => (
//     <GridFooter {...props}>
//       {/* Your custom text goes here */}
//       <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px' }}>
//         <div>
//           Hello world
//           <span style={{ marginRight: '16px' }}>hello</span>
//         </div>
//         <GridPagination />
//       </div>
//     </GridFooter>
//   );

export function CustomFooterStatusComponent(props) {
    return (
      <Box sx={{ p: 1, display: 'flex' }}>
        <Box>
        <FiberManualRecordIcon
          fontSize="small"
          sx={{
            mr: 1,
            color: '#4caf50' ,
          }}
        />
        Status
        </Box>
         <GridPagination {...props} />
      </Box>
    );
  }


function CustomFooter(props) {
    return (
        <GridFooterContainer>
            <TableRow>
                <TableCell> </TableCell>
                <TableCell> </TableCell>
                <TableCell> </TableCell>
                <TableCell>Hello</TableCell>
            </TableRow>
            <GridPagination {...props} />
        </GridFooterContainer>
    );
}

function CustomColumnMenu(props) {
    return (
        <GridColumnMenu
            {...props}
            slots={{
                // Hide `columnMenuColumnsItem`
                columnMenuColumnsItem: null,
            }}
        />
    );
}

const columns = [
    { field: "P_DATE", headerName: "Day", width: 100, valueGetter: ({ value }) => value && new Date(value),type:'date'  },
    { field: "PRESENT", headerName: "Present?", width: 90, type:'boolean' },
    { field: "ACADEMIC_YEAR", headerName: "Academic Year", width: 150 },
];

export default function Attendance2({ studentId }) {

    const [dis,setDis] = useState([]);

    useEffect(() => {
        const getAttendanceRows = async ()=> {
            getChildrenAttendance(studentId).then((res)=>{
                console.log(res);
                setDis(res.data);
                console.log(studentId);
            })
           
        }
        getAttendanceRows();
    }, [studentId]);

    return (
        <div style={{ width: "100%", height:600 }}>
            <DataGrid
                rows={dis}
                columns={columns}
                pagination
                slots={{
                    columnMenu: CustomColumnMenu,
                    footer: CustomFooter,
                }}
                
            />
        </div>
    );
}
