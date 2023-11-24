import { useEffect, useState } from 'react';
import AdminNavbar from '../../components/Navbars/AdminNavbar';
import SimpleBackdrop from '../../components/util-components/Loader';
import { decryptToken } from '../../apis/auth/getUserType';
import { FormControl, FormLabel, Button, Box, Select, TextField } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import Alert from '@mui/material/Alert';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import { AllCourses } from '../../apis/Admin/getBundle';
import { CLO } from '../../apis/Admin/createBundle';

const CreateCLO = () => {

    //System States
    const [render, setRender] = useState(false);

    //Form States
    const [course, setCourse] = useState('');
    const [id, setid] = useState('');
    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');

    //Map States
    const [courses, setCourses] = useState([]);

    const [verificado, setVerificado] = useState(
        {
            EC: 0,
            message: "Obie trice, real name, no gimmicks"
        }
    );


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
                {courses.length > 0 ?
                    <FormControl style={{ width: '100%', justifyContent: 'center', marginTop: '3%' }}>
                        <InputLabel id="class-select">Select Course</InputLabel>
                        <Select
                            value={course}
                            labelId="class-select"
                            label="Select Course"
                            onChange={(newvalue) => {
                                setCourse(newvalue.target.value);
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

    const handleCreateCLO = async () => {

        var req = {
            cloId: course+"-"+id,
            courseId: course,
            cloName:name,
            cloDesc: desc
        };

        setRender(false);
        let x = await CLO(req, sessionStorage.getItem('token'));
        setVerificado(x);
        setRender(true);

    }

    useEffect(() => {
        const checkUserType = async () => {

            const token = sessionStorage.getItem('token');
            const decryptedToken = await decryptToken(token);

            let y = await AllCourses(sessionStorage.getItem('token'));
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
                        <FormLabel>Create CLO</FormLabel>
                        <DrawLists></DrawLists>
                        <FormControl style={{ width: '100%', justifyContent: 'center', marginTop: '2%' }}>
                            {
                                course != '' ? <TextField label="CLO ID" value={course+"-"+id} inputProps={{ maxLength: 12 }} onChange={(data) => { setid(data.target.value.substring(course.length+1)) }} style={{ marginTop: "5%" }}></TextField> : <></>
                            }
                            {
                                id != '' ? <TextField label="CLO Name" value={name} inputProps={{ maxLength: 256 }} onChange={(data) => { setName(data.target.value) }} style={{ marginTop: "5%" }}></TextField> : <></>
                            }
                            {
                                name != '' ? <TextField label="CLO Description" value={desc} inputProps={{ maxLength: 1024 }}  onChange={(data) => { setDesc(data.target.value) }} style={{ marginTop: "5%" }}></TextField> : <></>
                            }
                        </FormControl>

                        {
                            course != '' && id != '' && name != '' && desc != "" ?
                                <Button variant='contained' style={{ marginTop: '3%', backgroundColor: "teal" }} onClick={handleCreateCLO}>Create CLO</Button>
                                : <Typography style={{ marginTop: "3%" }} color="gray">Some fields are missing a value!</Typography>
                        }
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

export default CreateCLO;