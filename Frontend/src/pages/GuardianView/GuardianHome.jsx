import React, { useEffect, useState } from "react";
import { decryptToken } from "../../apis/auth/getUserType";


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
    <div>GuardianHome</div>
  )
}

export default GuardianHome;
