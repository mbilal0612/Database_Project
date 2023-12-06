import React, { useEffect, useState } from "react";
import { decryptToken } from "../../apis/auth/getUserType";
import { Paper } from "@mui/material";
import SimpleBackdrop from "../../components/util-components/Loader";
import GuardianNavbar from "../../components/Navbars/GuardianNavbar";
import OutlinedCard from "../../components/CardV2";

import { getAllChildren } from "../../apis/guardian/getAllChildren";

const GuardianHome = () => {
    const [render, setRender] = useState(false);
    const [children, setChildren] = useState([]);
    const [userid, setId] = useState("");
    useEffect(() => {
        const checkUserType = async () => {
            const token = sessionStorage.getItem("token");
            const decryptedToken = await decryptToken(token);
            const userType = decryptedToken.data["userType"];
            setId(decryptedToken.data.id);
            console.log(userType);
            
            if (userType !== "GUARDIAN") {
                window.location.assign("/UNATHORIZEDACCESS");
            } else setRender(true);
        };

        checkUserType().then((r) => {
            console.log("TypeChecked");
        });
    });
    console.log("userId", userid);

    useEffect(() => {
        const handleChildren = async ()=> {
            getAllChildren(userid).then((res)=>{
                setChildren(res.data.results);
            })     
        };
      
            handleChildren();
        
        
    },[userid]);



    console.log("children",children)

    return (
        <>
            {render ? (
                <>
                    <div className="div1">
                        <GuardianNavbar />
                    </div>
                    {/* <Card variant="outlined" sx={{ height:'100%', width:'90%', backgroundColor:'#F2F2F2', fontFamily:'Inter', marginTop: '3%', borderRadius: '15px', maxHeight:'25%' }}>
                <CardContent>
                  <Typography sx={ { fontSize:36, fontWeight:800, textAlign:'start', fontFamily:'Arial, Helvetica, sans-serif', paddingLeft: '1%' } }>
                    Bilal
                  </Typography>
                  <Grid container spacing={2} sx={{justifyContent:'space-between'}}>
                    <Grid sx={{ textAlign:'start', pl:2, fontSize:24, fontWeight:800, paddingLeft: '3%' }}>
                      <p>ERP: 9</p>
                      <p>DOB: 06/12/2002</p>
                      <p>Class: 10K</p>
                    </Grid>
                    <Grid sx={{ textAlign:'start', fontSize:24, fontWeight:800, display:'flex', alignItems:'center', flexWrap:'wrap'}}>
                      <p>Attendance:</p><CustomizedProgressBars value={90} sx={{ pr:2}}/>
                      <p>Marks:</p><CustomizedProgressBars value={75}/>
                      <p>FeePaid:</p><CustomizedProgressBars value={100}/>
                    </Grid>
                    <Grid  sx={{ display:'flex', flexDirection:'column-reverse'}}>
                      
                    </Grid>
                  </Grid>
                </CardContent>
                <CardActions sx={{ flexDirection:'row-reverse', py:3, px:3 }}>
                  <Button href="/Ledger" sx={{backgroundColor: 'black', color: 'white', borderRadius: '12px', fontSize:15}}>
                        View More
                  </Button>
                </CardActions>
              </Card> */}
              {children.map((child)=>(
                <Paper  sx={{ minWidth: "90%", mt: 2, display: "block" }}  elavation={24}>
                <OutlinedCard name={child.FIRST_NAME+ " "+ child.LAST_NAME} 
                dob={new Date(child.DOB.substring(0,10)).toDateString()}
                id={child.STUDENT_ID}
                classId={child.CLASS_ID}
                nationality= {child.NATIONALITY}
                email= {child.EMAIL_ADDRESS}
                gender= {child.GENDER}
                emergencyContact = {child.EMERGENCY_CONTACT}
                
                />
                </Paper>
              ))}
                    {/* <OutlinedCard /> */}
                </>
            ) : (
                <SimpleBackdrop
                    currentOpenState={true}
                    handleClose={() => {}}
                ></SimpleBackdrop>
            )}
        </>
    );
};

export default GuardianHome;
