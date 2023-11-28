import React, {useEffect, useState} from 'react'
import { decryptToken } from '../../apis/auth/getUserType';
import {Button, Card, CardContent, Grid, Typography} from '@mui/material';
import SimpleBackdrop from '../../components/util-components/Loader';
import StudentNavbar from "../../components/Navbars/StudentNavbar";
import Attendance2 from '../../components/GuardianComponents/AttendanceTable2';
import { Paper } from '@mui/material';

const Attendance = () => {
  const [render, setRender] = useState(false);
  const [userid, setId] = useState("");

  useEffect(()=>{
    const checkUserType = async () =>{
      const token = sessionStorage.getItem("token");
      const decryptedToken = await decryptToken(token);
      const userType = decryptedToken.data["userType"];
      setId(decryptedToken.data.id)
      if( userType !== "STUDENT"){
        window.location.assign("/UNATHORIZEDACCESS");
      }
      else setRender(true);
    }
    
    checkUserType();
  });

  
  
  return (
    <>{render ? (
      <div className="div1">
        <StudentNavbar />
        <Paper sx={{m:2, height:"100%"}} elevation={24}> 
          <Attendance2 studentId={userid} />
        </Paper>
      </div>
      ): (<SimpleBackdrop currentOpenState={true} handleClose={() => {}}></SimpleBackdrop>)}</>
  )
}

export default Attendance






{/* <div className="S1">
      Your Attendance <br></br>
      Report
      </div>  
      <div className="S2">
      School Year: 2023/2024
      </div> 
      <Card sx={{ height:'100%', width:'90%', backgroundColor:'#F2F2F2', fontFamily:'Inter', marginTop:'1%', marginBottom:'1%', borderRadius: '15px' }}>
      <CardContent>
        <Typography sx={ { fontSize:36, fontWeight:800, textAlign:'start', fontFamily:'Arial, Helvetica, sans-serif', paddingLeft: '1%' } }>
          Musab's Attendance
        </Typography>
        <Grid container spacing={2} sx={{justifyContent:'space-between'}}>
          <Grid sx={{ textAlign:'start', pl:2, fontSize:24, fontWeight:800, paddingLeft: '3%' }}>
            <p>Total School Days: 65</p>
            <p>Present: 63 </p>
            <p>Absent: 02</p>
          </Grid>
          <Grid sx={{ textAlign:'start', fontSize:24, fontWeight:800, display:'flex', alignItems:'center'}}>
            <p>Classroom Teacher: Miss Asma</p>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
      </> */}