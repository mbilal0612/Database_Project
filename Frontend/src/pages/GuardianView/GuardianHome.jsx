import React, { useEffect, useState } from "react";
import { decryptToken } from "../../apis/auth/getUserType";
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

        <div className="div1"> 
          <GuardianNavbar />
          GuardianHome</div>
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
