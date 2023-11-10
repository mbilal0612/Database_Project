import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText('#3c3c3c'),
    backgroundColor: '#3c3c3c',
    '&:hover': {
        backgroundColor: '#606060',
    },
}));

export default function OutlinedCard({ title = 'Outlined', domain = 'default content', desc = 'This card takes you some place', Click}) {
    return (
        <Box sx={{ minWidth: 275, maxWidth:275, minHeight:200, maxHeight:275 }}>
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
                    <CardActions style={{justifyContent:'center'}}>
                        <ColorButton onClick={Click}>
                            Proceed
                        </ColorButton>
                    </CardActions>
                </React.Fragment>
            </Card>
        </Box>
    );
}