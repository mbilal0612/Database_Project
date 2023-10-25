import React, { useState, useEffect } from "react";
import { decryptToken } from "../apis/auth/getUserType";

import SimpleBackdrop from "../components/util-components/Loader";

function NotFound() {
  const [render, setRender] = useState(false);
  const [link, setLink] = useState("http://localhost:5173/")
  useEffect(() => {
    const checkUserType = async () => {
      const token = sessionStorage.getItem("token");
      if (!token) setRender(true);
      else {
        const decryptedToken = await decryptToken(token);
        const userType = decryptedToken.data["userType"];
        if(userType==='STUDENT'){
          setLink("http://localhost:5173/StudentHome");
          setRender(true);
        }
        else if(userType==='FACULTY'){
          setLink("http://localhost:5173/FacultyHome");
          setRender(true);
        }
        else if(userType==='GUARDIAN'){
          setLink("http://localhost:5173/GuardianHome");
          setRender(true);
        }
        else if(userType==='ADMIN'){
          setLink("http://localhost:5173/AdminHome");
          setRender(true);
        }
      }
    };

    checkUserType();
  });

  return (
    <>
      {render ? (
        <section className="page_404">
          <div className="container">
            <div className="row">
              <div className="col-sm-12 ">
                <div className="col-sm-10 col-sm-offset-1  text-center">
                  <div className="four_zero_four_bg">
                    <h1 className="text-center ">404</h1>
                  </div>

                  <div className="contant_box_404">
                    <h3 className="h2">Look like you're lost</h3>

                    <p>the page you are looking for not available!</p>

                    <a href={link} className="link_404">
                      Go to Home
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <SimpleBackdrop
          currentOpenState={true}
          handleClose={() => {}}
        ></SimpleBackdrop>
      )}
    </>
  );
}

export default NotFound;
