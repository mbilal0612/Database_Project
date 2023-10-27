import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


const card = (
    <React.Fragment>
        <CardContent sx={{ textAlign:'left', }}>
            <Typography variant="h5" component="div">
                Muhammad Bilal
            </Typography>
            <Typography sx={{ mb: 1.5,}} color="text.secondary">
                Class of 10K
            </Typography>
            <Typography variant="body2">
                ERP:9
            </Typography>
            <Typography variant="body2">
                
            </Typography>
            <Typography variant="body2">
                well meaning and kindly.
            </Typography>
        </CardContent>
        <CardActions>
            <Button size="small">View more</Button>
        </CardActions>
    </React.Fragment>
);

export default function OutlinedCard() {
    return (
        
            <Card sx={{ minWidth:'90%', mt:2, display:'block', backgroundColor:'#E0E0E0'}}variant="outlined" >{card}</Card>
       
    );
}