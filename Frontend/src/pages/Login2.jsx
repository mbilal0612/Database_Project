import SchoolLogo from "../components/util-components/SchoolLogo";
import { login } from "../apis/auth/auth";
import BasicAlerts from "../components/util-components/AlertMessages";
import UsernameField from "../components/util-components/UsernameField";
import PasswordField from "../components/util-components/PasswordField";
import { useState } from "react";
import React from "react";
import { Button } from "@mui/material";
import SimpleBackdrop from "../components/util-components/Loader";

function Login2() {
  const [open, setOpen] = useState(false);
  const [ERP, setERP] = useState("");
  const [pword, setPword] = useState("");
  const [response, setResponse] = useState("");
  const [isAlert, setIsAlert] = useState(false);

  
  const handleERPchange = (event) => {
    setERP(event.target.value);
  };
  const handlePwordchange = (event) => {
    setPword(event.target.value);
  };

  

  const handleEntry = async () => {
    setOpen(true);
    const res = await login(ERP, pword);
    if (res.status === 200) {
      sessionStorage.setItem("token", res.data.token);
      
      if (res.data.userType == "STUDENT")

        window.location.assign("/StudentHome");
        
      else if (res.data.userType == "FACULTY")
        window.location.assign("/FacultyHome");
      else if (res.data.userType == "ADMIN")
        window.location.assign("/AdminHome");
      else if (res.data.userType == "GUARDIAN")
        window.location.assign("GuardianHome");
    } else {
      setIsAlert(true);
      console.log(res);
      setResponse(res.response.data.message);
    }
    setOpen(false);
  };


  const handleKeyDown = (event) => {
    // console.log(event.key);
    // console.log(event.code);
    if (event.keyCode === 13 && ERP && pword) {
      console.log("enter pressed");
      handleEntry();
      
    }
  };

  return (
    <>
      <center>
        <div id="login-card" className="card">
          <SchoolLogo id="big-logo"></SchoolLogo>
          <cred-label>Enter Credentials</cred-label>
          <div className="LoginInputField">
            
            <UsernameField  onChange={handleERPchange}/>
            <PasswordField onChange={handlePwordchange} onKeyDown={handleKeyDown}/>

            
            {isAlert ? (
              <BasicAlerts errormessage={response}></BasicAlerts>
            ) : (
              <div></div>
            )}
            {ERP && pword ? (
              <Button
                variant="contained"
                onClick={handleEntry}
                
                fullWidth
                sx={{
                  marginTop: "2%",
                  backgroundColor: "black",
                  ":hover": {
                    bgcolor: "#999",
                    color: "white",
                  },
                }}
              >
                {" "}
                Login{" "}
              </Button>
            ) : (
              <Button
                disabled={true}
                onClick={handleEntry}
                fullWidth
                variant="contained"
                sx={{ mt: '2%', backgroundColor: "black" }}
                >
                {" "}
                Login{" "}
              </Button>
            )}
          </div>

          <SimpleBackdrop currentOpenState={open} handleClose={() => {}} />
        </div>
      </center>
    </>
  );
}

export default Login2;