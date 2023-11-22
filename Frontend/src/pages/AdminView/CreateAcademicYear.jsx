import { useEffect, useState } from 'react';
import AdminNavbar from '../../components/Navbars/AdminNavbar';
import SimpleBackdrop from '../../components/util-components/Loader';
import { decryptToken } from '../../apis/auth/getUserType';
import { FormControl, FormLabel, TextField, Button, Box } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import { createAcademicYearWithDays} from '../../apis/Admin/createBundle';

const CreateAcademicYear = () => {

    //System States
    const [render, setRender] = useState(false);

    //Form States
    const [startYear, setStartYear] = useState(1947);
    const [desc, setDesc] = useState('');
    const [days, setDays] = useState(0);

    const handleCreateAcademicYear = async () => {

        const req = {
            "startYear" : startYear,
            "academicDesc": desc,
            "days":days
        }

        setRender(false);
        await createAcademicYearWithDays(req, sessionStorage.getItem('token'));
        setRender(true);
    }

    useEffect(() => {
        const checkUserType = async () => {

            const token = sessionStorage.getItem('token');
            const decryptedToken = await decryptToken(token);

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
            <Box sx={{ display: 'flex', minWidth: '30%', marginTop: "1%", boxShadow: 3, borderRadius: 3, justifyContent: 'center' }}>
                <CardContent variant="outlined" style={{ justifyContent: 'space-between', minWidth: '60%' }}>
                    <div>
                        <FormLabel>Create Academic Year</FormLabel>
                        <FormControl style={{ width: '85%', justifyContent: 'space-between', marginTop: '2%' }}>

                        </FormControl>
                        <FormControl style={{ width: '85%', justifyContent: 'space-between', marginTop: '2%' }}>
                            <TextField style={{ marginTop: '3%' }} type='Number'
                                value={startYear}
                                label="Start Year" size='large' onChange={(data) => {
                                    setStartYear(data.target.value)
                                }}></TextField>
                            <TextField style={{ marginTop: '3%' }} label="Description" size='large' onChange={(newvalue) => setDesc(newvalue.target.value)}></TextField>
                            <TextField style={{ marginTop: '3%' }} type='Number'
                                value={days}
                                label="Term Duration in Days" size='large' onChange={(data) => {
                                    if (data.target.value < 0) {
                                        data.target.value = 0;
                                    }
                                    setDays(data.target.value)
                                }}></TextField>
                            {
                                startYear >= 0 ? <Button variant='contained' style={{ marginTop: '2%' }} onClick={handleCreateAcademicYear}>Submit</Button> : <></>
                            }
                        </FormControl>
                    </div>
                </CardContent>
            </Box>
        </div>
    </div>
        : (<SimpleBackdrop currentOpenState={true} handleClose={() => { }}></SimpleBackdrop>)
    )
}

export default CreateAcademicYear;