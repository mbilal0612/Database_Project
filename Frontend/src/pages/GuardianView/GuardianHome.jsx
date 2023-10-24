import React, { useEffect, useState } from "react";
import { decryptToken } from "../../apis/auth/getUserType";
import {Button, Card, CardContent, Grid, Typography} from '@mui/material';
import CircularWithValueLabel from "../../components/util-components/circularProgressWithLabel.jsx";
import CustomizedProgressBars from "../../components/util-components/FacebookCircularProgress.jsx";


const GuardianHome = () => {
  const [render, setRender] = useState(false);
  useEffect(() => {
    const checkUserType = async () => {
      const token = sessionStorage.getItem("token");
      const decryptedToken = await decryptToken(token);
      const userType = decryptedToken.data["userType"];
      console.log(userType);
      if (userType !== "GUARDIAN") {
        window.location.assign("/UNATHORIZEDACCESS");
      } else setRender(true);
    };

    checkUserType();
  });

  return (

      <Card sx={{ height:'100%', width:'100%', backgroundColor:'#F2F2F2', fontFamily:'Inter' }}>
        <CardContent>
          <Typography sx={ { fontSize:36, fontWeight:800, textAlign:'start', fontFamily:'Inter' } }>
            Children#1 Name:
          </Typography>
          <Grid container spacing={2} sx={{justifyContent:'space-between'}}>
            <Grid sx={{ textAlign:'start', pl:2, fontSize:24, fontWeight:800}}>
              <p>ERP: Muhammad Bilal</p>
              <p>DOB: 06/12/2002</p>
              <p>Class: 10K</p>
            </Grid>
            <Grid sx={{ textAlign:'start', fontSize:24, fontWeight:800, display:'flex', alignItems:'center'}}>
              <p>Attendance:</p><CustomizedProgressBars value={90} sx={{ pr:2}}/>
              <p>Marks:</p><CustomizedProgressBars value={75}/>
              <p>FeePaid:</p><CustomizedProgressBars value={100}/>
            </Grid>
            <Grid  sx={{ display:'flex', flexDirection:'column-reverse'}}>
              <Button href="/Ledger">View More</Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

  )
}

export default GuardianHome;
