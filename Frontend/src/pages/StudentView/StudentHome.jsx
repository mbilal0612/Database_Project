import React, {useEffect, useState} from 'react'
import { decryptToken } from '../../apis/auth/getUserType';
import {Button, Card, CardContent, Grid, Typography} from '@mui/material';
import CircularWithValueLabel from "../../components/util-components/circularProgressWithLabel.jsx";
import CustomizedProgressBars from "../../components/util-components/FacebookCircularProgress.jsx";
import SimpleBackdrop from '../../components/util-components/Loader';
import StudentNavbar from "../../components/Navbars/StudentNavbar";
import StudentHomeCard from '../../components/util-components/StudentHomeCard';

const StudentHome = () => {
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
        StudentHome
      </div>
      <div className="S1">
        Welcome, <br></br>
        StudentName
      </div>  
      <div className="S2">
       Your Courses:
      </div> 
      <StudentHomeCard />

    <Card sx={{ height:'100%', width:'90%', backgroundColor:'#F2F2F2', fontFamily:'Inter', marginTop: '1%', marginBottom: "1%", borderRadius: '15px' }}>
      <CardContent>
        <Typography sx={ { fontSize:36, fontWeight:800, textAlign:'start', fontFamily:'Arial, Helvetica, sans-serif', paddingLeft: '1%' } }>
          Course#2 Name:
        </Typography>
        <Grid container spacing={2} sx={{justifyContent:'space-between'}}>
          <Grid sx={{ textAlign:'start', pl:2, fontSize:24, fontWeight:800, paddingLeft: '3%' }}>
            <p> Course ERP: 4286</p>
            <p>Teacher: Miss Ayesha</p>
            <p>Class: 10K</p>
          </Grid>
          <Grid sx={{ textAlign:'start', fontSize:24, fontWeight:800, display:'flex', alignItems:'center'}}>
            <p>Attendance:</p><CustomizedProgressBars value={90} sx={{ pr:2}}/>
            <p>Marks:</p><CustomizedProgressBars value={75}/>
          </Grid>
          <Grid  sx={{ display:'flex', flexDirection:'column-reverse'}}>
            <Button href="/Course" sx={{backgroundColor: 'black', color: 'white', borderRadius: '12px', fontSize:15}}>
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

export default StudentHome