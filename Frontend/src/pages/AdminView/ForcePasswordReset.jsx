import { useEffect, useState } from 'react';
import { } from '../../apis/Admin/getBundle'
import AdminNavbar from '../../components/Navbars/AdminNavbar';
import SimpleBackdrop from '../../components/util-components/Loader';
import { decryptToken } from '../../apis/auth/getUserType';
import { FormControl, FormLabel, TextField, Button, Box, } from '@mui/material';
import Alert from '@mui/material/Alert';
import CardContent from '@mui/material/CardContent';
import { UserPasswordReset } from '../../apis/Admin/patchBundle';

const ForcePasswordReset = () => {

    //System States
    const [render, setRender] = useState(false);

    //Form States
    const [userEmail, setUserEmail] = useState('');
    const [password, setPassword] = useState('');

    //Data States
    const [data, setData] = useState({EC:0});

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const handleForcePasswordReset = async () => {

        var req = {
            email: userEmail
        };

        if (password != '') {
            req.password = password;
        }

        setRender(false);
        let x = await UserPasswordReset(req, sessionStorage.getItem('token'));
        setData(x.data);
        console.log(x);
        setUserEmail('');
        setPassword('');
        setRender(true);

    }

    const DrawAlert = () => {
        if (data.EC == 1) {
            return (
                <>
                    <div style={{ justifyContent: 'center', display: 'flex', marginTop: "1.5%" }}>
                        <Alert severity="success">{data.message}</Alert>
                    </div>
                </>
            )
        } else if(data.EC == -1) {
            return (
                <>
                    <div style={{ justifyContent: 'center', display: 'flex', marginTop: "1.5%" }}>
                        <Alert severity="error">{data.message}</Alert>
                    </div>
                </>
            )
        }else{
            <></>
        }
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
            <Box sx={{ display: 'flex', minWidth: '30%', marginTop: "15%", boxShadow: 3, borderRadius: 3, justifyContent: 'center' }}>
                <CardContent variant="outlined" style={{ justifyContent: 'space-between', minWidth: '60%' }}>
                    <div>
                        <FormLabel>Force Reset Password</FormLabel>
                        <FormControl style={{ width: '85%', justifyContent: 'space-between', marginTop: '4%' }}>
                            <TextField style={{ marginTop: '3%' }}
                                label="User Email" size='large' onChange={(data) => {
                                    setUserEmail(data.target.value)
                                }}></TextField>
                            {validateEmail(userEmail) ?
                                <div style={{ display: 'flex', flexDirection:'column' }} >
                                    <TextField style={{ marginTop: '3%' }}
                                        label="Password" size='large' onChange={(data) => {
                                            setPassword(data.target.value)
                                        }}></TextField>
                                    {
                                        password != '' ?
                                            <Button variant='contained' style={{ marginTop: '4%' }} onClick={handleForcePasswordReset}>Update Password</Button>
                                            :
                                            <Button variant='contained' style={{ marginTop: '4%' }} onClick={handleForcePasswordReset}>Update Random Password</Button>
                                    }
                                </div>
                                :
                                <></>}
                        </FormControl>
                    </div>
                </CardContent>
            </Box>
            
        </div>
        <DrawAlert></DrawAlert>
    </div>
        : (<SimpleBackdrop currentOpenState={true} handleClose={() => { }}></SimpleBackdrop>)
    )

}


export default ForcePasswordReset;