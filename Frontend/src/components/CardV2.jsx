import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { ThemeProvider, createTheme } from "@mui/material/styles";

// create a darkTheme function to handle dark theme using createTheme
const darkTheme = createTheme({
    palette: {
        mode: "light",
    },
});

export default function OutlinedCard({name,id,dob}) {
    return (
        <ThemeProvider theme={darkTheme}>
            <Card variant="outlined" sx={{ minWidth: "90%", mt: 0, display: "block" }}>
                <CardContent sx={{ textAlign: "left" }}>
                    <Typography variant="h5" component="div">
                        {name}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        Class of 10K
                    </Typography>
                    <Typography variant="body2" >ERP:{id}</Typography>
                    <Typography variant="body2">
                        Date of Birth: {dob}
                    </Typography>
                    <Typography variant="body2"></Typography>
                </CardContent>
                <CardActions sx={{}}>
                    <Button size="small">View Attendance</Button>
                    <Button size="small">View Marks</Button>
                    <Button size="small">View Legder</Button>
                </CardActions>
            </Card>
        </ThemeProvider>
    );
}
