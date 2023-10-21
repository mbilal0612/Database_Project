import { Button } from "@mui/material";
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useState } from "react";
import React from "react";
import Textbox from "../components/util-components/Textbox";
import SimpleBackdrop from "../components/util-components/Loader";
import SchoolLogo from "../components/util-components/SchoolLogo";
import { login } from "../apis/auth/auth";
import BasicAlerts from "../components/util-components/AlertMessages";

function Login() {
  const [open, setOpen] = useState(false);
  const [ERP, setERP] = useState("");
  const [pword, setPword] = useState("");
  const [response, setResponse] = useState("");
  const [isAlert, setIsAlert] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const handleShowPass = ()=>{
    setShowPass(!showPass);
  }

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
      sessionStorage.setItem("userType", res.data.userType);
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
  return (
    <React.Fragment>
      <center>
        <div id="login-card" className="card">
          <SchoolLogo id="big-logo"></SchoolLogo>
          <cred-label>Enter Credentials</cred-label>
          <div classname="textField">
            <Textbox
              value={ERP}
              onChange={handleERPchange}
              Label="ERP-ID"
            ></Textbox>

            <Textbox
               endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleShowPass}
                    edge="end"
                  >
                    {showPass ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              onChange={handlePwordchange}
              Label="Password"
              Type={showPass ? 'text' : 'password'}
            ></Textbox>
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
    </React.Fragment>
  );
}

export default Login;
