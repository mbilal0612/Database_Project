import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HandymanTwoToneIcon from '@mui/icons-material/HandymanTwoTone';

const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText('#3c3c3c'),
    backgroundColor: '#3c3c3c',
    '&:hover': {
        backgroundColor: '#606060',
    },
}));

export default function Kard({ title = 'Outlined', domain = 'default content', desc = 'This card takes you some place', status = false, Click }) {
    return (
        <Box sx={{ minWidth: 275, maxWidth: 275, marginRight: "0.5%", marginTop: "1%", boxShadow: 3, borderRadius: 3}}>
            <Card variant="outlined">
                <React.Fragment>
                    <CardContent>
                        <Typography variant="h1" sx={{ fontSize: 18 }} color="Black" gutterBottom>
                            {title}
                        </Typography>
                        <Typography variant="h5" component="div">
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            {domain}
                        </Typography>
                        <Typography variant="body2">
                            {desc}
                        </Typography>
                    </CardContent>
                    <CardActions style={{ justifyContent: 'center' }}>
                        <div style={{ minWidth: '100%' }}>
                            <ColorButton onClick={Click}>
                                Proceed
                            </ColorButton>
                        </div>
                    </CardActions>
                    {
                        status ? <CheckCircleIcon style={{color:'teal'}}/> : <HandymanTwoToneIcon style={{color:'crimson'}}></HandymanTwoToneIcon>
                    }
                </React.Fragment>
            </Card>
       
        </Box>
    );
}