import React, { useEffect, useState } from "react";
import { decryptToken } from "../../apis/auth/getUserType";
import { getDetails } from "../../apis/Faculty/getDetails";
import SimpleBackdrop from "../../components/util-components/Loader";
import FacultyNavbar from "../../components/Navbars/FacultyNavbar";

const FacultyHome = () => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState();

  useEffect(() => {
    const getDetail = async () => {
      const token = sessionStorage.getItem("token");
      const decryptedToken = await decryptToken(token);
      const res = await getDetails(
        decryptedToken.data.id,
        sessionStorage.getItem("token")
      );
      
      setName(res.data.FIRST_NAME + " " + res.data.LAST_NAME);
      setLoading(false);
    };

    setLoading(true);
    getDetail();
  }, []);

  return (
    <>
      {loading ? (
        <SimpleBackdrop
          currentOpenState={true}
          handleClose={() => {}}
        ></SimpleBackdrop>
      ) : (
        <div className="temp">
          <div className="div1">
            <FacultyNavbar />
            <h1 className="S1">
              Welcome, <br></br>
              {name}{" "}
            </h1>
          </div>
        </div>
      )}
    </>
  );
};

export default FacultyHome;
