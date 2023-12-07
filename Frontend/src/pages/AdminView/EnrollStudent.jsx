import { useEffect, useState } from 'react';
import AdminNavbar from '../../components/Navbars/AdminNavbar';
import SimpleBackdrop from '../../components/util-components/Loader';
import { decryptToken } from '../../apis/auth/getUserType';
import { FormControl, FormLabel, Button, Box, Select, TextField } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import { StudentToClass } from '../../apis/Admin/createBundle';
import Alert from '@mui/material/Alert';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import { AllClasses } from '../../apis/Admin/getBundle';

const EnrollStudent = () => {

    //System States
    const [render, setRender] = useState(false);

    //Form States
    const [xclass, setxClass] = useState('');
    const [studentID, setStudentID] = useState('');

    //Map States
    const [classes, setClasses] = useState([]);

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
                {classes.length > 0 ?
                    <FormControl style={{ width: '100%', justifyContent: 'center', marginTop: '3%' }}>
                        <InputLabel id="class-select">ClassID</InputLabel>
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
            </div>
        )

    }

    const handleAssignClassTeacher = async () => {

        var req = {
            studentID: studentID,
            classID: xclass
        };

        setRender(false);
        let x = await StudentToClass(req, sessionStorage.getItem('token'));
        setVerificado(x);
        setRender(true);

    }

    useEffect(() => {
        const checkUserType = async () => {

            const token = sessionStorage.getItem('token');
            const decryptedToken = await decryptToken(token);

            let y = await AllClasses(sessionStorage.getItem('token'));
            setClasses(y.results);

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
                        <FormLabel>Enroll Student</FormLabel>
                        <div>
                            <DrawLists></DrawLists>
                            <FormControl style={{minWidth:"100%"}}>
                                <TextField style={{ marginTop: '3%' }} type='Number'
                                    label="StudentID" size='large' onChange={(data) => {
                                        if(data.target.value<1){
                                            data.target.value = '';
                                        }
                                        setStudentID(data.target.value)
                                    }}></TextField>
                            </FormControl>
                        </div>

                        {
                            xclass != '' && studentID != '' ?
                                <Button variant='contained' style={{ marginTop: '2%' }} onClick={handleAssignClassTeacher}>Submit</Button>
                                : <Typography style={{ marginTop: "3%" }} color="grey">Student & Class not selected</Typography>
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


export default EnrollStudent;