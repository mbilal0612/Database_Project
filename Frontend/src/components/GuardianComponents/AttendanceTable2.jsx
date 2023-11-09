import * as React from "react";
import { DataGrid, GridColumnMenu } from "@mui/x-data-grid";

import { useEffect } from "react";
import { getChildrenAttendance } from "../../apis/guardian/getChildrenAttendance";
import { useState } from "react";



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
    { field: "P_DATE", headerName: "Day", width: 100 },
    { field: "PRESENT", headerName: "Present?", width: 90 },
    { field: "ACADEMIC_YEAR", headerName: "Academic Year", width: 150 },
];

export default function Attendance2({ studentId, showrows }) {

    const [dis,setDis] = useState([]);

    useEffect(() => {
        const getAttendanceRows = async ()=> {
            getChildrenAttendance(studentId).then((res)=>{
                console.log(res);
                setDis(res.data);
                console.log(studentId)
            })
           
        }
        getAttendanceRows();
    }, [studentId]);

    return (
        <div style={{ width: "100%", height:600 }}>
            <DataGrid
                rows={dis}
                columns={columns}
                slots={{
                    columnMenu: CustomColumnMenu,
                }}
            />
        </div>
    );
}
