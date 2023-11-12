import React, { useEffect } from "react";
import SimpleBackdrop from "../components/util-components/Loader";

function logout() {
  useEffect(() => {
    sessionStorage.clear();
    window.location.assign("/");
  }, []);

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
