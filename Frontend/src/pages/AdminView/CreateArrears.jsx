import { useEffect, useState } from 'react';
import { ClassesForArrears, AcademicYears, AllClasses } from '../../apis/Admin/getBundle'
import AdminNavbar from '../../components/Navbars/AdminNavbar';
import SimpleBackdrop from '../../components/util-components/Loader';
import { decryptToken } from '../../apis/auth/getUserType';
import React from 'react';
import { FormControl, FormLabel, TextField, Button, Box, Select, Checkbox, FormGroup, FormControlLabel } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';

const CreateArrears = () => {

    //System States
    const [render, setRender] = useState(false);

    //Form States
    const [grade, setGrade] = useState('');
    const [academicYear, setAcademicYear] = useState('');
    const [amount, setAmount] = useState(0);
    const [freq, setFreq] = useState('E');
    const [studentID, setStudentID] = useState('');
    const [xclass, setClass] = useState('');

    //Mapping States
    const [years, setYears] = useState([]);
    const [grades, setGrades] = useState([]);
    const [classes, setClasses] = useState([]);

    const handleCreateArrears = async () => {

    }

    useEffect(() => {
        const checkUserType = async () => {

            const token = sessionStorage.getItem('token');

            const decryptedToken = await decryptToken(token);
            const Y = await AcademicYears(token);
            const G = await ClassesForArrears(token);
            const C = await AllClasses(token);
            
            // console.log(G);
            //console.log(Y);
            //console.log(C);

            setYears(Y);
            setGrades(G);
            setClasses(C);

            if (decryptedToken.data["userType"] !== 'ADMIN') {
                window.location.assign("/UNAUTHORIZEDACCESS");
            } else {
                setRender(true);
            }
        }

        checkUserType();

    }, []);

    return (
        render ?
            <div style={{ width: "100%", height: "100%", justifyContent: 'center' }}>
                <div>
                    <AdminNavbar />
                </div>
                <div style={{ justifyContent: 'center', display: 'flex' }}>
                    <Box sx={{ display: 'flex', minWidth: '50%', marginTop: "1%", boxShadow: 3, borderRadius: 3, justifyContent: 'center' }}>
                        <CardContent variant="outlined" style={{ justifyContent: 'space-between', minWidth: '60%' }}>
                            <div>
                                <FormLabel>Create Arrears</FormLabel>
                            </div>

                            <FormControl style={{ width: '85%', justifyContent: 'space-between', marginTop: '2%' }}>
                                <InputLabel id="arrear-select">Arrear Type</InputLabel>
                                <Select
                                    value={freq}
                                    labelId="arrear-select"
                                    label="Arrear Type"
                                    onChange={(newvalue) => {
                                        setFreq(newvalue.target.value);
                                    }}
                                >
                                    <MenuItem value={'A'}>By Class</MenuItem>
                                    <MenuItem value={'B'}>By ClassID</MenuItem>
                                    <MenuItem value={'C'}>By Academic Term</MenuItem>
                                    <MenuItem value={'D'}>By StudentID</MenuItem>
                                    <MenuItem value={'E'}>None</MenuItem>
                                </Select>
                                <TextField style={{ marginTop: '3%' }} label='Arrear Name'></TextField>
                                <TextField style={{ marginTop: '3%' }} type='Number'
                                    label="Amount" size='large' onChange={(data) => {
                                        if (data.target.value < 1) {
                                            data.target.value = '1';
                                        }
                                        setAmount(data.target.value)
                                    }}></TextField>
                            </FormControl>


                            {freq == 'D' ?
                                <FormControl style={{ width: '85%', justifyContent: 'space-between', marginTop: '3%' }}>
                                    <TextField style={{ marginTop: '3%' }} type='Number'
                                        label="StudentID" size='large' onChange={(data) => {
                                            if (data.target.value < 1) {
                                                data.target.value = '';
                                            }
                                            setStudentID(data.target.value)
                                        }}></TextField>
                                </FormControl> :
                                <></>}

                            {freq == 'B' ?
                                <FormControl style={{ width: '85%', justifyContent: 'space-between', marginTop: '3%' }}>
                                <InputLabel id="class-select">ClassID</InputLabel>
                                    <Select
                                        value={xclass}
                                        labelId="class-select"
                                        label="ClassID"
                                        onChange={(newvalue) => {
                                            setClass(newvalue.target.value);
                                        }}
                                    >
                                        {
                                            classes.results.map(
                                                (item) => (
                                                    <MenuItem value={item.CLASS_ID}>{item.CLASS_ID}</MenuItem>
                                                )
                                            )
                                        }
                                    </Select>
                                </FormControl> :
                                <></>}

                            {freq == 'A' ?
                                <FormControl style={{ width: '85%', justifyContent: 'space-between', marginTop: '3%' }}>
                                    <InputLabel id="grade-select">Grade</InputLabel>
                                    <Select
                                        value={grade}
                                        labelId="grade-select"
                                        label="Grade"
                                        onChange={(newvalue) => {
                                            setGrade(newvalue.target.value);
                                        }}
                                    >
                                        {
                                            grades.results.map(
                                                (item) => (
                                                    <MenuItem value={item.YEAR}>{item.YEAR + " | " + item.START_YEAR}</MenuItem>
                                                )
                                            )
                                        }
                                    </Select>
                                </FormControl> :
                                <></>}

                            {freq == 'C' ?
                                <FormControl style={{ width: '85%', justifyContent: 'space-between', marginTop: '3%' }}>
                                    <InputLabel id="year-select">Term</InputLabel>
                                    <Select
                                        value={academicYear}
                                        labelId="year-select"
                                        label="Term"
                                        onChange={(newvalue) => {
                                            setAcademicYear(newvalue.target.value);
                                        }}
                                    >
                                        {
                                            years.map(
                                                (item) => (
                                                    <MenuItem value={item.START_YEAR}>{item.AcademicDesc}</MenuItem>
                                                )
                                            )
                                        }
                                    </Select>
                                </FormControl> :
                                <></>}

                        </CardContent>
                    </Box>
                </div>
            </div>
            : (<SimpleBackdrop currentOpenState={true} handleClose={() => { }}></SimpleBackdrop>)
    )

}

export default CreateArrears;