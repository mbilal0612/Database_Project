import { useEffect, useState } from 'react';
import AdminNavbar from '../../components/Navbars/AdminNavbar';
import SimpleBackdrop from '../../components/util-components/Loader';
import { decryptToken } from '../../apis/auth/getUserType';
import { FormControl, FormLabel, Button, Box, Select } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import { CourseTeacher } from '../../apis/Admin/createBundle';
import Alert from '@mui/material/Alert';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import { Faculty, Courses, AllClasses } from '../../apis/Admin/getBundle';
import { StaticTimePicker } from '@mui/x-date-pickers/StaticTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import OutlinedInput from '@mui/material/OutlinedInput';
import Chip from '@mui/material/Chip';

const AssignCourseTeacher = () => {

    //System States
    const [render, setRender] = useState(false);

    //Form States
    const [xclass, setxClass] = useState('');
    const [xcourse, setxCourse] = useState('');
    const [id, setid] = useState('');
    const [stime, setstime] = useState(0);
    const [etime, setetime] = useState(0);
    const [days, setDays] = useState([]);

    //Map States
    const [classes, setClasses] = useState([]);
    const [faculty, setFaculty] = useState([]);
    const [courses, setCourses] = useState([]);

    const [verificado, setVerificado] = useState(
        {
            EC: 0,
            message: "Obie trice, real name, no gimmicks"
        }
    );


    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setDays(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const DrawAlert = () => {

        if (verificado.EC == 1) {
            return (<Alert severity='success'>{verificado.message}</Alert>);
        } else if (verificado.EC == 2) {
            return (<Alert severity='warning'>{verificado.message}</Alert>);
        } else if (verificado.EC == -1) {
            return (<Alert severity='error'>{verificado.message}</Alert>);
        } else {
            return (<></>);
        }

    }

    const DrawLists = () => {

        return (
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignContent: "center" }}>
                {classes.length > 0 ?
                    <FormControl style={{ width: '100%', justifyContent: 'center', marginTop: '3%' }}>
                        <InputLabel id="class-select">Class</InputLabel>
                        <Select
                            value={xclass}
                            labelId="class-select"
                            label="ClassID"
                            onChange={(newvalue) => {
                                setxClass(newvalue.target.value);
                            }}
                        >
                            {
                                classes.map(
                                    (item) => (
                                        <MenuItem key={item.CLASS_ID} value={item.CLASS_ID}>{item.CLASS_ID}</MenuItem>
                                    )
                                )
                            }
                        </Select>
                    </FormControl> : <Typography style={{ marginTop: "3%" }} color="grey"> No Classes Exist! </Typography>}
                {faculty.length > 0 ?
                    <FormControl style={{ width: '100%', justifyContent: 'space-between', marginTop: '3%' }}>
                        <InputLabel id="class-select">Faculty ID</InputLabel>
                        <Select
                            value={id}
                            labelId="class-select"
                            label="Faculty ID"
                            onChange={(newvalue) => {
                                setid(newvalue.target.value);
                                console.log(newvalue.target.value);
                            }}
                        >
                            {
                                faculty.map(
                                    (item) => (
                                        <MenuItem key={item.USER_ID} value={item.USER_ID}>{item.NAME + ` [${item.USER_ID}]`}</MenuItem>
                                    )
                                )
                            }
                        </Select>
                    </FormControl> : <Typography style={{ marginTop: "3%" }} color="grey"> No Teachers Exist! </Typography>}
                {courses.length > 0 ?
                    <FormControl style={{ width: '100%', justifyContent: 'center', marginTop: '3%' }}>
                        <InputLabel id="class-select">Course</InputLabel>
                        <Select
                            value={xcourse}
                            labelId="class-select"
                            label="ClassID"
                            onChange={(newvalue) => {
                                setxCourse(newvalue.target.value);
                            }}
                        >
                            {
                                courses.map(
                                    (item) => (
                                        <MenuItem key={item.COURSE_ID} value={item.COURSE_ID}>{item.COURSE_NAME + ` [${item.COURSE_ID}]`}</MenuItem>
                                    )
                                )
                            }
                        </Select>
                    </FormControl> : <Typography style={{ marginTop: "3%" }} color="grey"> No Courses Exist! </Typography>}
            </div>
        )

    }

    const handleAssignCourseTeacher = async () => {

        setRender(false);
        for(var i =0; i<days.length;i++){
            var req = {
                courseID: xcourse,
                classID:xclass,
                facultyID: faculty[0].USER_ID,
                startTime:stime,
                endTime:etime,
                day: days[i]
            };
            console.log(req);
            let x = await CourseTeacher(req, sessionStorage.getItem('token'));
            console.log(x);
            setVerificado(x);
        }

        setRender(true);

    }

    useEffect(() => {
        const checkUserType = async () => {

            const token = sessionStorage.getItem('token');
            const decryptedToken = await decryptToken(token);

            let x = await Faculty(sessionStorage.getItem('token'));
            let y = await Courses(sessionStorage.getItem('token'));
            let z = await AllClasses(sessionStorage.getItem('token'));
            setClasses(z.results);
            setFaculty(x.results);
            setCourses(y);

            if (decryptedToken.data["userType"] !== 'ADMIN') {
                window.location.assign("/UNAUTHORIZEDACCESS");
            } else {
                setRender(true);
            }
        }

        checkUserType();

    }, []);


    return (render ? <div style={{ width: "100%", height: "100%", justifyContent: 'center' }}>
        <div>
            <AdminNavbar />
        </div>

        <div style={{ justifyContent: 'center', display: 'flex' }}>
            <Box sx={{ display: 'flex', minWidth: '30%', marginTop: "10%", boxShadow: 3, borderRadius: 3, justifyContent: 'center' }}>
                <CardContent variant="outlined" style={{ justifyContent: 'space-between', minWidth: '60%' }}>
                    <div>
                        <FormLabel>Create Program</FormLabel>
                        <DrawLists></DrawLists>
                        {
                            xclass != '' && id != '' && xcourse != '' ?
                                <div style={{ display: "flex" }}>
                                    <div>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <Typography style={{ marginTop: "5%" }} color="grey">Start Time</Typography>
                                            <StaticTimePicker onChange={(data) => {
                                                setstime(data.$H * 3600 + data.$m * 60);
                                                console.log(data.$H * 3600 + data.$m * 60);
                                            }}
                                                defaultValue={dayjs('2022-04-17T12:00')} />
                                        </LocalizationProvider>
                                    </div>
                                    <div>
                                        <Typography style={{ marginTop: "5%" }} color="grey">End Time</Typography>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <StaticTimePicker onChange={(data) => {
                                                setetime(data.$H * 3600 + data.$m * 60);
                                            }}
                                                defaultValue={dayjs('2022-04-17T12:00')} />
                                        </LocalizationProvider>
                                    </div>

                                    {/* <Button variant='contained' style={{ marginTop: '2%' }} onClick={handleAssignCourseTeacher}>Submit</Button> */}
                                </div>

                                : <Typography style={{ marginTop: "3%" }} color="grey">Class, Course & Faculty not selected</Typography>
                        }
                        <div>
                            <FormControl sx={{ m: 1, width: 300 }}>
                                <InputLabel id="demo-multiple-chip-label">Chip</InputLabel>
                                <Select
                                    labelId="demo-multiple-chip-label"
                                    id="demo-multiple-chip"
                                    multiple
                                    value={days}
                                    onChange={handleChange}
                                    input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                                    renderValue={(selected) => (
                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                            {selected.map((value) => (
                                                <Chip key={value} label={value} />
                                            ))}
                                        </Box>
                                    )}
                                >
                                    <MenuItem value={"Monday"} key={"Monday"}>{"Monday"}</MenuItem>
                                    <MenuItem value={"Tuesday"} key={"Tuesday"}>{"Tuesday"}</MenuItem>
                                    <MenuItem value={"Wednesday"} key={"Wednesday"}>{"Wednesday"}</MenuItem>
                                    <MenuItem value={"Thursday"} key={"Thursday"}>{"Thursday"}</MenuItem>
                                    <MenuItem value={"Friday"} key={"Friday"}>{"Friday"}</MenuItem>
                                    <MenuItem value={"Saturday"} key={"Saturday"}>{"Saturday"}</MenuItem>
                                    <MenuItem value={"Sunday"} key={"Sunday"}>{"Sunday"}</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                        <div>
                            {
                                days != [] && stime < etime ? <Button variant='contained' style={{ marginTop: '2%' }} onClick={handleAssignCourseTeacher}>Submit</Button> : <></>
                            }
                        </div>
                        <div style={{ marginTop: '3%' }}>
                            <DrawAlert></DrawAlert>
                        </div>
                    </div>
                </CardContent>
            </Box>
        </div>
    </div>
        : (<SimpleBackdrop currentOpenState={true} handleClose={() => { }}></SimpleBackdrop>)
    )

}


export default AssignCourseTeacher;