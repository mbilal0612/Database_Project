import { Button } from "@mui/material";
import { useState } from "react";
import React from "react";
import Textbox from "../components/util-components/Textbox";
import SimpleBackdrop from "../components/util-components/Loader";

function Login() {
  //   const [number, setNumber] = React.useState(0);

  //   var increment = function () {
  //     setNumber(number + 1);
  //     console.log(number);
  //   };
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <React.Fragment>
      <div className="card">
        <cred-label>Enter Credentials</cred-label>
        <div classname="textField">
          <Textbox Label="Username"></Textbox>
          <Textbox Label="Password" Type="password"></Textbox>
        </div>
        <Button onClick={handleOpen}> Login </Button>
        <SimpleBackdrop currentOpenState={open} handleClose={handleClose} />
      </div>
    </React.Fragment>
  );
}

export default Login;
