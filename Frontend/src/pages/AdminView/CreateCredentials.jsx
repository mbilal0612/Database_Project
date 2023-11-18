import { useEffect, useState } from 'react';
import React from 'react';
import { decryptToken } from '../../apis/auth/getUserType';
import SimpleBackdrop from '../../components/util-components/Loader';
import AdminNavbar from '../../components/Navbars/AdminNavbar';
import { FormControl, FormLabel, TextField, Button, Box, Select, Checkbox, FormGroup, FormControlLabel } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { getNat } from "../../apis/Admin/nationality";
import { getReligions } from "../../apis/Admin/religions";
import { createUser } from '../../apis/Admin/createBundle.js';

const CreateCredentials = () => {
    var i = 0;
    //System States
    const [render, setRender] = useState(false);
    const [response, setResponse] = useState('');

    //Form States
    const [role, setRole] = useState('ADMIN');
    const [nat, setNat] = useState('');
    const [rel, setRel] = useState('');
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [e_phone, setEmergencyPhone] = useState('');
    const [joindate, setJoindate] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [gender, setGender] = useState('Male');
    const [CNIC, setCNIC] = useState('Male');
    const [salary, setSalary] = useState(1);
    const [fullTime, setFulltime] = useState(false);
    const [occupation, setOccupation] = useState('');

    //Mapping States
    const [nationalities, setNationalities] = useState([]);
    const [religions, setReligions] = useState([]);

    const handleCreateUser = async () => {
        var req = {
            roleID: role,
            firstName: firstname,
            lastName: lastname,
            email: email,
            address: address,
            phone: phone,
            emergencyContact: e_phone,
            DOB: birthdate.$y + '-' + birthdate.$M + '-' + birthdate.$D,
            joinDate: joindate.$y + '-' + joindate.$M + '-' + joindate.$D,
            nationality: nat,
            religion: rel,
            gender: gender,
            CNIC: CNIC,
            salary: salary,
            occupation: occupation,
            fulltime: fullTime,
        };

        console.log(req);

        setRender(false);
        let x = await createUser(req, sessionStorage.getItem('token'));
        setRender(true);
    };

    const handleRoleChange = (event) => {
        setRole(event.target.value);
    };

    const handleNatChange = (event) => {
        setNat(event.target.value);
    };

    const handleRelChange = (event) => {
        setRel(event.target.value);
    };

    const handleFirstNameChange = (event) => {
        setFirstName(event.target.value);
    };

    const handleLastNameChange = (event) => {
        setLastName(event.target.value);
    };

    const handleAddressChange = (event) => {
        setAddress(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handleEmergencyPhoneChange = (event) => {
        setEmergencyPhone(event.target.value);
    };

    const handlePhoneChange = (event) => {
        setPhone(event.target.value);
    };

    const handleGenderChange = (event) => {
        setGender(event.target.value);
    };

    useEffect(() => {

        const checkUserType = async () => {
            const token = sessionStorage.getItem("token");
            const decryptedToken = await decryptToken(token);
            const datas = await getNat();
            const datas2 = await getReligions();
            setNationalities(datas);
            setReligions(datas2)
            const userType = decryptedToken.data["userType"];
            if (userType !== "ADMIN") {
                window.location.assign("/UNAUTHORIZEDACCESS");
            }
            else setRender(true);
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
                                <FormLabel>Create Credentials</FormLabel>
                            </div>

                            <FormControl style={{ width: '85%', justifyContent: 'space-between', marginTop: '2%' }}>
                                <InputLabel id="role-select">Role</InputLabel>
                                <Select
                                    value={role}
                                    labelId="role-select"
                                    label="Role"
                                    onChange={handleRoleChange}
                                >
                                    <MenuItem  value={'GUARDIAN'}>Guardian</MenuItem>
                                    <MenuItem value={'STUDENT'}>Student</MenuItem>
                                    <MenuItem value={'ADMIN'}>Admin</MenuItem>
                                    <MenuItem value={'STAFF'}>Staff</MenuItem>
                                    <MenuItem value={'FACULTY'}>Faculty</MenuItem>
                                </Select>
                                <TextField style={{ marginTop: '1.5%' }} label="First Name" size='large' onChange={handleFirstNameChange}></TextField>
                                <TextField style={{ marginTop: '1.5%' }} label="Last Name" size='large' onChange={handleLastNameChange}></TextField>
                                <TextField style={{ marginTop: '1.5%' }} label="CNIC/B-Form" size='large' onChange={(newvalue) => setCNIC(newvalue.target.value)}></TextField>
                            </FormControl>

                            <FormControl style={{ width: '85%', justifyContent: 'space-between', marginTop: '2%' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <InputLabel id="gender-select" style={{ marginTop: '0.125%' }}>Gender</InputLabel>
                                    <Select labelId="gender-select" label="Gender" value={gender} onChange={handleGenderChange} style={{ minWidth: '35%', paddingTop: '8px' }}>
                                        <MenuItem value={'Male'}>Male</MenuItem>
                                        <MenuItem value={'Female'}>Female</MenuItem>
                                        <MenuItem value={'Other'}>Other</MenuItem>
                                    </Select>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DemoContainer components={['DatePicker']}>
                                            <DatePicker label="Date of Birth" onChange={(newvalue) => setBirthdate(newvalue)} />
                                        </DemoContainer>
                                    </LocalizationProvider>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DemoContainer components={['DatePicker']}>
                                            <DatePicker label="Join Date" onChange={(newvalue) => setJoindate(newvalue)} />
                                        </DemoContainer>
                                    </LocalizationProvider>
                                </div>
                            </FormControl>

                            <FormControl style={{ width: '85%', justifyContent: 'space-between', marginTop: '2%' }}>
                                <InputLabel id="nat-select">Nationality</InputLabel>
                                <Select
                                    value={nat}
                                    labelId="nat-select"
                                    label="Nationality"
                                    onChange={handleNatChange}
                                >
                                    {
                                        nationalities.map(
                                            (item) => (
                                                <MenuItem key = {i++} value={item.NAT_ID}>{item.NAT_ID}</MenuItem>
                                            )
                                        )
                                    }
                                </Select>
                            </FormControl>

                            <FormControl style={{ width: '85%', justifyContent: 'space-between', marginTop: '2%' }}>
                                <InputLabel id="rel-select">Religion</InputLabel>
                                <Select
                                    value={rel}
                                    labelId="rel-select"
                                    label="Religion"
                                    onChange={handleRelChange}
                                >
                                    {
                                        religions.map(
                                            (item) => (
                                                <MenuItem key = {i++} value={item.RELIGION_ID}>{item.RELIGION_ID}</MenuItem>
                                            )
                                        )
                                    }
                                </Select>
                                <TextField style={{ marginTop: '1.5%' }} label="Email Address" size='large' onChange={handleEmailChange}></TextField>
                                <TextField style={{ marginTop: '1.5%' }} label="Residental Address" size='large' onChange={handleAddressChange}></TextField>
                                <TextField style={{ marginTop: '1.5%' }} label="Phone" size='large' onChange={handlePhoneChange}></TextField>
                                <TextField style={{ marginTop: '1.5%' }} label="Emergency Phone" size='large' onChange={handleEmergencyPhoneChange}></TextField>
                                {
                                    (role != "STUDENT" && role != "GUARDIAN") ?
                                        <React.Fragment>
                                            <TextField style={{ marginTop: '1.5%' }} type='Number'
                                                label="Salary" size='large' onChange={(data) => {
                                                    if(data.target.value < 1){
                                                        data.target.value = '1';
                                                    }
                                                    setSalary(data.target.value)
                                                }}></TextField>
                                            <FormGroup style={{ justifyContent: 'center' }}>
                                                <FormControlLabel style={{ justifyContent: 'center' }} control={<Checkbox defaultChecked onChange={(event)=>{setFulltime(event.target.value)}}/>} label="Fulltime Employee?" />
                                            </FormGroup>
                                        </React.Fragment> : <></>
                                }
                                {
                                    (role == "GUARDIAN") ?
                                        <React.Fragment>
                                            <TextField style={{ marginTop: '1.5%' }} label="Occupation" size='large' onChange={(newvalue) => setOccupation(newvalue.target.value)}></TextField>
                                        </React.Fragment> : <></>
                                }
                                <Button variant='contained' style={{ marginTop: '2%' }} onClick={handleCreateUser}>Submit</Button>
                            </FormControl>

                        </CardContent>
                    </Box>
                </div>
            </div>
            : (<SimpleBackdrop currentOpenState={true} handleClose={() => { }}></SimpleBackdrop>)
    )

}

export default CreateCredentials;