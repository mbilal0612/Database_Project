import { useEffect, useState } from "react";
import { decryptToken } from "../../apis/auth/getUserType";
import SimpleBackdrop from "../../components/util-components/Loader";
import FacultyNavbar from "../../components/Navbars/FacultyNavbar";
import PerformanceCard from "../../components/FacultyComponents/PerformanceCard";
import TypographyTheme from "../../components/FacultyComponents/HeadingTheme";
import { getStudentPerformance } from "../../apis/Faculty/getStudentPerformance";
import { getAttendanceReport } from "../../apis/Faculty/getAttendanceReport";
import { getCloProgress } from "../../apis/Faculty/cloApi";

const StudentDetails = () => {
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState();
    const [performance, setPerformance] = useState([]);
    const [average, setAverage] = useState();
    const [hasMarks, setHasMarks] = useState(false);
    const [attendance, setAttendance] = useState({
        daysPresent: 0,
        totalDays: 10,
    });
    const [cloList, setCloList] = useState([]);
    var i = 0;
    useEffect(() => {
        const getDetail = async () => {
            const token = sessionStorage.getItem("token");
            if (!token) window.location.assign("/notfound");
            const decryptedToken = await decryptToken(token);
            if (decryptedToken.data.userType != "FACULTY") {
                window.location.assign("/notfound");
            }
            const res = await getStudentPerformance(
                sessionStorage.getItem("studentId"),
                sessionStorage.getItem("classId"),
                sessionStorage.getItem("courseId"),
                sessionStorage.getItem("token")
            );
            const res2 = await getAttendanceReport(
                sessionStorage.getItem("studentId"),
                sessionStorage.getItem("token")
            );
            const res3 = await getCloProgress(
                sessionStorage.getItem("studentId"),
                sessionStorage.getItem("courseId"),
                token
            );
            setAttendance(res2);
            setPerformance(res.details);
            setCloList(res3);
            console.log(res3);
            console.log(res.details);
            setName(res.details[0].FIRST_NAME + " " + res.details[0].LAST_NAME);
            if (res.details[0].MAX_MARKS) setHasMarks(true);
            setAverage(res.average);
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
                <div className="div1">
                    <FacultyNavbar />
                    <TypographyTheme label={name} />
                    <TypographyTheme
                        label={sessionStorage.getItem("classId")}
                    />
                    <TypographyTheme
                        label={sessionStorage.getItem("courseId")}
                    />
                    <div className="flexHorizontal">
                        <div
                            style={{
                                width: "100%",
                                display: "flex",
                                justifyContent: "center",
                            }}
                        >
                            {hasMarks ? (
                                performance.map((row) => {
                                    return (
                                        <div key={i++} className="spacingCards">
                                            <PerformanceCard
                                                label={row.ASSESSMENT_TYPE}
                                                percentage={parseInt(
                                                    (row.OBTAINED_MARKS /
                                                        row.MAX_MARKS) *
                                                        100
                                                )}
                                            />
                                        </div>
                                    );
                                })
                            ) : (
                                <div></div>
                            )}
                            <div className="spacingCards">
                                <PerformanceCard
                                    label={`Overall`}
                                    percentage={parseInt(average)}
                                />
                            </div>
                            <div className="spacingCards">
                                <PerformanceCard
                                    label={`Attendance`}
                                    percentage={parseInt(
                                        (attendance.daysPresent /
                                            attendance.totalDays) *
                                            100
                                    )}
                                />
                            </div>
                        </div>
                        <div
                            style={{
                                width: "100%",
                                display: "flex",
                                justifyContent: "center",
                                paddingTop: "1%",
                                paddingBottom: "1%",
                            }}
                        >
                            <TypographyTheme label={"CLO's"} />
                        </div>
                        {cloList.map((row) => {
                            return (
                                <div
                                    key={i++}
                                    style={{ paddingBottom: "2%" }}
                                    className="spacingCards"
                                >
                                    <PerformanceCard
                                        label={row.CLO_ID}
                                        percentage={parseInt(
                                            (row.OBTAINED /
                                                row.MAX_MARKS) *
                                                100
                                        )}
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </>
    );
};

export default StudentDetails;
