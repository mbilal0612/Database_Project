import { useEffect, useState } from "react";
import { decryptToken } from "../../apis/auth/getUserType";
import SimpleBackdrop from "../../components/util-components/Loader";
import FacultyNavbar from "../../components/Navbars/FacultyNavbar";
import PerformanceCard from "../../components/FacultyComponents/PerformanceCard";
import TypographyTheme from "../../components/FacultyComponents/HeadingTheme";
import { getStudentPerformance } from "../../apis/Faculty/getStudentPerformance";
import { getAttendanceReport } from "../../apis/Faculty/getAttendanceReport";

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
            setAttendance(res2);
            setPerformance(res.details);
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
                    handleClose={() => { }}
                ></SimpleBackdrop>
            ) : (
                <div className="div1">
                    <FacultyNavbar />
                    <TypographyTheme label={name} />
                    <TypographyTheme label={sessionStorage.getItem("classId")} />
                    <TypographyTheme label={sessionStorage.getItem("courseId")} />
                    <div className="flexHorizontal">
                        {hasMarks ? (performance.map((row) => {
                            return (
                                <div key={i++} className="spacingCards">
                                    <PerformanceCard
                                        label={row.ASSESSMENT_TYPE}
                                        percentage={parseInt((row.OBTAINED_MARKS / row.MAX_MARKS) * 100)}
                                    />
                                </div>
                            );
                        })) : (<div></div>)}
                        <div className="spacingCards">
                            <PerformanceCard label={`Overall`} percentage={parseInt(average)} />
                        </div>
                        <div className="spacingCards">
                            <PerformanceCard
                                label={`Attendance`}
                                percentage={
                                    parseInt((attendance.daysPresent / attendance.totalDays) * 100)
                                }
                            />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default StudentDetails;
