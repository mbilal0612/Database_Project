import React from "react";
import SimpleBackdrop from "../components/util-components/Loader";

function logout() {
  sessionStorage.removeItem("token");
  window.location.assign("/");

  return (
    <>
      <SimpleBackdrop
        currentOpenState={true}
        handleClose={() => {}}
      ></SimpleBackdrop>
    </>
  );
}
export default logout;
