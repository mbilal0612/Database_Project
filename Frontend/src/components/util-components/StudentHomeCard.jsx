import React from 'react'
import {Button, Card, CardContent, Grid, Typography, CardActions, Box} from '@mui/material';

export default function StudentHomeCard({ subject_code, subject, grade, Teacher, marks}) {
  return (
    <Card sx={{ height:'100%', width:'90%', backgroundColor:'#F2F2F2', fontFamily:'Inter',marginTop: '1%', marginBottom: "1%", borderRadius: '15px' }}>
      <CardContent>
        <Typography sx={ { fontSize:36, fontWeight:800, textAlign:'start', fontFamily:'Arial, Helvetica, sans-serif', paddingLeft: '1%' } }>
          {subject}:
        </Typography>
        <Grid container spacing={2} sx={{justifyContent:'space-between'}}>
          <Grid sx={{ textAlign:'start', pl:2, fontSize:24, fontWeight:800, paddingLeft: '3%' }}>
            <p> Course ERP: {subject_code}</p>
            <p>Teacher: {Teacher}</p>
            <p>Class: {grade}</p>
          </Grid>
          <Grid sx={{ textAlign:'start', fontSize:24, fontWeight:800, display:'flex', alignItems:'center'}}>
            <p>Marks: {marks}</p>
          </Grid>
          <Grid  sx={{ display:'flex', flexDirection:'column-reverse'}}>
            <Button href="/Course" sx={{backgroundColor: 'black', color: 'white', borderRadius: '12px', fontSize:15}}>
              View More
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}
