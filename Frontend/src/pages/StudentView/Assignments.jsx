import React, {useEffect, useState} from 'react'
import { decryptToken } from '../../apis/auth/getUserType';
import {Button, Card, CardContent, Grid, Typography} from '@mui/material';
import CircularWithValueLabel from "../../components/util-components/circularProgressWithLabel.jsx";
import CustomizedProgressBars from "../../components/util-components/FacebookCircularProgress.jsx";
import SimpleBackdrop from '../../components/util-components/Loader';
import StudentNavbar from "../../components/Navbars/StudentNavbar";

const Assignments = () => {
  const [render, setRender] = useState(false);
  useEffect(()=>{

    const checkUserType = async () =>{
      const token = sessionStorage.getItem("token");
      const decryptedToken = await decryptToken(token);
      const userType = decryptedToken.data["userType"];
      // console.log(userType);
      if( userType !== "STUDENT"){
        window.location.assign("/UNATHORIZEDACCESS");
      }
      else setRender(true);
    }
    
    checkUserType();
  });

  
  return (
    <>{render ? (
      <>
        <div className="div1">
          <StudentNavbar />
        </div>
        <div className="S1">
          Your Assignments:
        </div>  
        <div className="S2">
        Assignments Due:
        </div> 
        <Card sx={{ height:'100%', width:'90%', backgroundColor:'#F2F2F2', fontFamily:'Inter', marginTop:'1%', marginBottom:'1%', borderRadius: '15px' }}>
      <CardContent>
        <Typography sx={ { fontSize:36, fontWeight:800, textAlign:'start', fontFamily:'Arial, Helvetica, sans-serif', paddingLeft: '1%' } }>
          Mathematics Assignment 1
        </Typography>
        <Grid container spacing={2} sx={{justifyContent:'space-between'}}>
          <Grid sx={{ textAlign:'start', pl:2, fontSize:24, fontWeight:800, paddingLeft: '3%' }}>
            <p>Course: Mathematics</p>
            <p>Course ERP: math1</p>
            <p>Teacher: Miss Sana</p>
          </Grid>
          <Grid sx={{ textAlign:'start', fontSize:24, fontWeight:800, display:'flex', alignItems:'center'}}>
            <p>Due Date: 12/04/23</p>
          </Grid>
          <Grid  sx={{ display:'flex', flexDirection:'column-reverse'}}>
            <Button href="/AssignmentPage" sx={{backgroundColor: 'black', color: 'white', borderRadius: '12px', fontSize:15}}>
              View More
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>

    <Card sx={{ height:'100%', width:'90%', backgroundColor:'#F2F2F2', fontFamily:'Inter', marginTop:'1%', marginBottom:'1%', borderRadius: '15px' }}>
      <CardContent>
        <Typography sx={ { fontSize:36, fontWeight:800, textAlign:'start', fontFamily:'Arial, Helvetica, sans-serif', paddingLeft: '1%' } }>
          Physics Assignment 1
        </Typography>
        <Grid container spacing={2} sx={{justifyContent:'space-between'}}>
          <Grid sx={{ textAlign:'start', pl:2, fontSize:24, fontWeight:800, paddingLeft: '3%' }}>
            <p>Course: Physics</p>
            <p>Course ERP: phys1</p>
            <p>Teacher: Sir Tariq</p>
          </Grid>
          <Grid sx={{ textAlign:'start', fontSize:24, fontWeight:800, display:'flex', alignItems:'center'}}>
            <p>Due Date: 01/12/23</p>
          </Grid>
          <Grid  sx={{ display:'flex', flexDirection:'column-reverse'}}>
            <Button href="/AssignmentPage" sx={{backgroundColor: 'black', color: 'white', borderRadius: '12px', fontSize:15}}>
              View More
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
    <div className="S2">
        Assignments Completed:
        </div>   
        <Card sx={{ height:'100%', width:'90%', backgroundColor:'#F2F2F2', fontFamily:'Inter', marginTop:'1%', marginBottom:'1%', borderRadius: '15px' }}>
      <CardContent>
        <Typography sx={ { fontSize:36, fontWeight:800, textAlign:'start', fontFamily:'Arial, Helvetica, sans-serif', paddingLeft: '1%' } }>
          English Assignment 1
        </Typography>
        <Grid container spacing={2} sx={{justifyContent:'space-between'}}>
          <Grid sx={{ textAlign:'start', pl:2, fontSize:24, fontWeight:800, paddingLeft: '3%' }}>
            <p>Course: English</p>
            <p>Course ERP: eng1</p>
            <p>Teacher: Miss Ayesha</p>
          </Grid>
          <Grid sx={{ textAlign:'start', fontSize:24, fontWeight:800, display:'flex', alignItems:'center'}}>
            <p>Due Date: 05/11/23</p>
          </Grid>
          <Grid  sx={{ display:'flex', flexDirection:'column-reverse'}}>
            <Button href="/AssignmentPage" sx={{backgroundColor: 'black', color: 'white', borderRadius: '12px', fontSize:15}}>
              View More
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
      </>
      
      ): (<SimpleBackdrop currentOpenState={true} handleClose={() => {}}></SimpleBackdrop>)}</>
    
  )
}

export default Assignments