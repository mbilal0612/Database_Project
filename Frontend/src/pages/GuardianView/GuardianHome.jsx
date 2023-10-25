import React, { useEffect, useState } from "react";
import { decryptToken } from "../../apis/auth/getUserType";
import {Button, Card, CardContent, Grid, Typography} from '@mui/material';
import CircularWithValueLabel from "../../components/util-components/circularProgressWithLabel.jsx";
import CustomizedProgressBars from "../../components/util-components/FacebookCircularProgress.jsx";
import SimpleBackdrop from "../../components/util-components/Loader";
import GuardianNavbar from "../../components/Navbars/GuardianNavbar";


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

      <>
        {render ? (
        <>
              <div className="div1">
                <GuardianNavbar />
                GuardianHome</div>
              <Card sx={{ height:'100%', width:'90%', backgroundColor:'#F2F2F2', fontFamily:'Inter', marginTop: '3%', borderRadius: '15px' }}>
                <CardContent>
                  <Typography sx={ { fontSize:36, fontWeight:800, textAlign:'start', fontFamily:'Arial, Helvetica, sans-serif', paddingLeft: '1%' } }>
                    Children#1 Name:
                  </Typography>
                  <Grid container spacing={2} sx={{justifyContent:'space-between'}}>
                    <Grid sx={{ textAlign:'start', pl:2, fontSize:24, fontWeight:800, paddingLeft: '3%' }}>
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
                      <Button href="/Ledger" sx={{backgroundColor: 'black', color: 'white', borderRadius: '12px', fontSize:15}}>
                        View More
                      </Button>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>

        </>
        ) : (
            <SimpleBackdrop
                currentOpenState={true}
                handleClose={() => {}}
            ></SimpleBackdrop>
        )}
      </>



  )
}




export default GuardianHome;
