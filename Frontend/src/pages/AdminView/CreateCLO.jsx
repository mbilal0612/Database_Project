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
import { AllCourses, CLOByCourse, AllPlos } from '../../apis/Admin/getBundle';
import { CLO } from '../../apis/Admin/createBundle';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import MultipleSelectChip from '../../components/AdminComponents/MultipleSelectChip';

const CreateCLO = () => {

    //System States
    const [render, setRender] = useState(false);

    //Form States
    const [course, setCourse] = useState('');
    const [id, setid] = useState('');
    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');
    const [splos, setsplos] = useState('');

    //Map States
    const [courses, setCourses] = useState([]);
    const [clos, setClos] = useState([]);
    const [plos, setPlos] = useState([]);

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
            cloId: course + "-" + id,
            courseId: course,
            cloName: name,
            cloDesc: desc,
            ploIds: splos
        };

        console.log(req);

        setRender(false);
        let x = await CLO(req, sessionStorage.getItem('token'));
        setVerificado(x);
        if (x.EC == 2) {
            let y = await CLOByCourse(sessionStorage.getItem('token'), course);
            setClos(y);
        }
        setRender(true);

    }

    useEffect(() => {
        const checkUserType = async () => {

            const token = sessionStorage.getItem('token');
            const decryptedToken = await decryptToken(token);

            let y = await AllCourses(sessionStorage.getItem('token'));
            setCourses(y);

            let x = await AllPlos(sessionStorage.getItem('token'));
            setPlos(x);
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
                                course != '' ? <TextField label="CLO ID" value={course + "-" + id} inputProps={{ maxLength: 12 }} onChange={(data) => { setid(data.target.value.substring(course.length + 1)) }} style={{ marginTop: "5%" }}></TextField> : <></>
                            }
                            {
                                id != '' ? <TextField label="CLO Name" value={name} inputProps={{ maxLength: 256 }} onChange={(data) => { setName(data.target.value) }} style={{ marginTop: "5%" }}></TextField> : <></>
                            }
                            {
                                name != '' ? <TextField label="CLO Description" value={desc} inputProps={{ maxLength: 1024 }} onChange={(data) => { setDesc(data.target.value) }} style={{ marginTop: "5%" }}></TextField> : <></>
                            }
                            {
                                desc != '' ? <MultipleSelectChip plos={plos} setter = {setsplos}></MultipleSelectChip> : <></>
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
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            {

                verificado.EC == 2 ?
                    <Box sx={{ display: 'flex', minWidth: '30%', marginTop: "4%", boxShadow: 3, borderRadius: 3, justifyContent: 'center' }}>
                        <CardContent variant="outlined" style={{ justifyContent: 'space-between', minWidth: '60%' }}>
                            <FormLabel>
                                <Typography style={{ marginTop: "1%" }} color="gray">{`CLOs of ${course}`}</Typography>
                            </FormLabel>
                            <div>
                                <TableContainer component={Paper} style={{ marginTop: '2%' }}>
                                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                        <TableHead style={{ backgroundColor: 'darkgray' }}>
                                            <TableRow>
                                                <TableCell align="right"><Typography style={{ marginTop: "3%" }} color="white">CLO ID</Typography></TableCell>
                                                <TableCell align="right"><Typography style={{ marginTop: "3%" }} color="white">CLO Name</Typography></TableCell>
                                                <TableCell align="right"><Typography style={{ marginTop: "3%" }} color="white">CLO Description</Typography></TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {clos.map((row) => (
                                                <TableRow
                                                    key={row.CLO_ID}
                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                >
                                                    <TableCell align="right">{row.CLO_ID}</TableCell>
                                                    <TableCell align="right">{row.CLO_NAME}</TableCell>
                                                    <TableCell align="right">{row.CLO_DESC}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </div>
                        </CardContent>
                    </Box>
                    : <></>
            }
        </div>
    </div>
        : (<SimpleBackdrop currentOpenState={true} handleClose={() => { }}></SimpleBackdrop>)
    )

}

export default CreateCLO;