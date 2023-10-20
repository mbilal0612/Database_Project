import { Button } from "@mui/material";
import { useState } from "react";
import React from "react";
import Textbox from "../components/util-components/Textbox";
import SimpleBackdrop from "../components/util-components/Loader";
import SchoolLogo from "../components/util-components/SchoolLogo";
import axios from "axios";

function Login() {
  //   const [number, setNumber] = React.useState(0);

  //   var increment = function () {
  //     setNumber(number + 1);
  //     console.log(number);
  //   };
  const [open, setOpen] = useState(false);
  const [ERP, setERP] = useState("");
  const [pword, setPword] = useState("");
  const handleERPchange = (event) => {
    setERP(event.target.value);
  };
  const handlePwordchange = (event) => {
    setPword(event.target.value);
  };
  const handleOpen = () => {
    setOpen(true);
    axios
      .post("http://localhost:8080/admin/queryLogin", {
        id: ERP,
        password: pword,
      })
      .then(function (res) {
        console.log(res);
        handleClose();
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <React.Fragment>
      <div id="login-card" className="card">
        <SchoolLogo id="big-logo"></SchoolLogo>
        <cred-label>Enter Credentials</cred-label>
        <entry-boxes classname="textField">
          <Textbox onChange={handleERPchange} Label="ERP-ID"></Textbox>
          <Textbox
            onChange={handlePwordchange}
            Label="Password"
            Type="password"
          ></Textbox>
        </entry-boxes>
        <Button onClick={handleOpen}> Login </Button>
        <SimpleBackdrop currentOpenState={open} handleClose={handleClose} />
      </div>
    </React.Fragment>
  );
}

export default Login;
