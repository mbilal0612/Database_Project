import * as React from "react";
import { DataGrid, GridColumnMenu } from "@mui/x-data-grid";

import { useEffect } from "react";
import { getChildrenAttendance } from "../../apis/guardian/getChildrenAttendance";
import { useState } from "react";
import { getChildrenFee } from "../../apis/guardian/getChildrenFee";
import { getChildrenLedger } from "../../apis/guardian/getChildrenLegder";


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
    { field: "T_DATE", headerName: "Date", width: 200, valueGetter: ({ value }) => value && new Date(value), type:'date'},
    { field: "T_NAME", headerName: "Details", width: 300 },
    { field: "T_AMOUNT", headerName: "Amount", width: 140 },
];

export default function GuardianLedgerTable({ studentId, showrows }) {

    const [dis,setDis] = useState([]);

    useEffect(() => {
        const getAttendanceRows = async ()=> {
            
            getChildrenLedger(studentId).then((res)=>{
                console.log(res);
                setDis(res.data.entities);
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
                pagination
                
                slots={{
                    columnMenu: CustomColumnMenu,
                }}
            />
        </div>
    );
}
