import React, { useEffect, useState } from "react";
import { decryptToken } from "../../apis/auth/getUserType";
import SimpleBackdrop from "../../components/util-components/Loader";
import GuardianNavbar from "../../components/Navbars/GuardianNavbar";
import CustomizedTables from "../../components/GuardianComponents/GuardianAttendanceTable";
import GuardianTabs from "../../components/GuardianComponents/GuardianAttendanceTabs";
import { getAllChildren } from "../../apis/guardian/getAllChildren";
import GuardianGradeTabs from "../../components/GuardianComponents/GuardianGradeTabs";

const GuardianGrade = () => {
    const [render, setRender] = useState(false);
    const [children, setChildren] = useState([]);
    const [userid, setId] = useState("");
    

    useEffect(() => {
        const checkUserType = async () => {
            const token = sessionStorage.getItem("token");
            const decryptedToken = await decryptToken(token);
            const userType = decryptedToken.data["userType"];
            setId(decryptedToken.data.id);
            console.log(userType);
            if (userType !== "GUARDIAN") {
                window.location.assign("/UNATHORIZEDACCESS");
            } else setRender(true);
        };

        checkUserType();
    });

    useEffect(() => {
        const handleChildren = async () => {
            getAllChildren(userid).then((res) => {
                setChildren(res.data.results);
            });
            // console.log(children);
        };

        handleChildren();
    },[userid]);

    return (
        <>
            {render && children.length !== 0 ? (
                <div className="div1">
                    <GuardianNavbar />
                    <GuardianGradeTabs children={children}/>
                </div>
            ) : (
                <SimpleBackdrop
                    currentOpenState={true}
                    handleClose={() => {}}
                ></SimpleBackdrop>
            )}
        </>
    );
};

export default GuardianGrade;
