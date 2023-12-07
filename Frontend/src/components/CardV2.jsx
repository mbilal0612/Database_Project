import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useEffect } from "react";
import { useState } from "react";
import { getChildrenRecentClass } from "../apis/guardian/getChildrenRecentClass";
import { getChildrenECA } from "../apis/guardian/getChildrenECA";

// create a darkTheme function to handle dark theme using createTheme
const darkTheme = createTheme({
    palette: {
        mode: "light",
    },
});

export default function OutlinedCard({name,id,dob, classId, email,nationality, emergencyContact}) {

    const [clss, setClss] = useState([]);
    const [eca, setEca] = useState([]);

    
    useEffect(() => { 
        const handleClss = async () => {
            getChildrenRecentClass(id).then((res)=>{
                setClss(res.data[0].CLASS_ID);
            })
        }

        
        // const handleEca = ()=> {
        //     getChildrenECA(id).then((res)=>{
        //         setEca(res.data);
        //     });
        // }

        // handleEca();
        
        
        handleClss();
    },[id])

    useEffect(()=>{
        const handleEca = ()=> {
            getChildrenECA(id).then((res)=>{
                setEca(res.data[0]);
            });
        }

        handleEca();


    },[id]);

    return (
        <ThemeProvider theme={darkTheme}>
            <Card variant="outlined" sx={{ minWidth: "90%", mt: 0, display: "block" }}>
                <CardContent sx={{ textAlign: "left" }}>
                    <Typography variant="h5" component="div">
                        {name}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                       {eca ? `${eca.ROLE} Of ${eca.NAME} Club` : ""}
                       {/* {eca.ROLE + " " " "} */}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                       {clss}
                    </Typography>
                    <Typography variant="body2" >ERP:{id}</Typography>
                    <Typography variant="body2">
                        Date of Birth: {dob}
                    </Typography>
                    <Typography variant="body2">
                        Email: {email}
                    </Typography>
                    <Typography variant="body2">
                        Emergencey Contact: {emergencyContact}
                    </Typography>
                    <Typography variant="body2">
                        Nationality: {nationality}
                    </Typography>
                </CardContent>
                <CardActions sx={{}}>
                    {/* <Button size="small">View Attendance</Button>
                    <Button size="small">View Marks</Button>
                    <Button size="small">View Legder</Button> */}
                </CardActions>
            </Card>
        </ThemeProvider>
    );
}
