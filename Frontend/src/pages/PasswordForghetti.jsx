import { useState } from 'react';
import { FormControl, FormLabel, TextField, Button, Box,} from '@mui/material';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import { createTFAKey } from '../apis/Admin/createBundle';
import { QueryTFA } from '../apis/Admin/patchBundle';
import SimpleBackdrop from '../components/util-components/Loader';
import Alert from '@mui/material/Alert';

function PasswordForghetti() {

    const [ID, setID] = useState("");
    const [Email, setEmail] = useState("");
    const [Securiti, setSecuriti] = useState(false);
    const [Securiti_2, setSecuriti_2] = useState(false);
    const [TFA, setTFA] = useState('');
    const [Password, setPassword] = useState('');
    const [render, setRender] = useState(true);
    const [Verificado, setVerificado] = useState({
        EC: 0,
        message: "Obie Trice, real names, no gimmicks"
    });
    const [Verificado_2, setVerificado_2] = useState({
        EC: 0,
        message: "Obie Trice, real names, no gimmicks"
    });



    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const DrawAlertVerification = () => {

        if (Verificado.EC == 1) {
            return (
                <Alert severity="success">{Verificado.message}</Alert>
            )
        } else if (Verificado.EC == 2) {
            return (
                <Alert severity="warning">{Verificado.message}</Alert>
            )
        } else if (Verificado.EC == -1) {
            return (
                <Alert severity="error">{Verificado.message}</Alert>
            )
        } else {
            return (<></>)
        }

    }

    const DrawAlertPassword = () => {

        if (Verificado_2.EC == 1) {
            return (
                <Alert severity="success">{Verificado_2.message}</Alert>
            )
        } else if (Verificado_2.EC == -1) {
            return (
                <Alert severity="error">{Verificado_2.message}</Alert>
            )
        } else if (Verificado_2.EC == 2) {
            return (
                <Alert severity="warning">{Verificado_2.message}</Alert>
            )
        }else {
            return (<></>)
        }

    }

    const handleVerify = async () => {

        var req = {
            id: ID,
            email: Email,
        }

        setRender(false);
        
        let x = await createTFAKey(req);
        console.log(x);


        if (x.data.EC == 1) {
            setSecuriti(true);
        }
        setVerificado(x.data);
        setRender(true);
    }

    const handlePasswordChange = async () => {

        var req = {
            id: ID,
            email: Email,
            password: Password,
            tfa: TFA
        }

        setRender(false);
        let y = await QueryTFA(req);
        console.log(y);

        if (y.data.EC == 1) {
            setSecuriti_2(true);
        }
        setVerificado_2(y.data);
        setRender(true);
    }

    return (render ? <div style={{ width: "100%", height: "100%", justifyContent: 'center' }}>
        <div style={{ justifyContent: 'center', display: 'flex' }}>
            <Box sx={{ display: 'flex', minWidth: '20%', marginTop: "12%", boxShadow: 3, borderRadius: 3, justifyContent: 'center' }}>
                <CardContent variant="outlined" style={{ justifyContent: 'space-between', minWidth: '60%' }}>
                    <div>
                        <FormLabel>Forgot Password</FormLabel>
                        <FormControl style={{ width: '85%', justifyContent: 'space-between', marginTop: '2%' }}>
                            <TextField label="User ID" style={{ marginTop: "4%" }} value={ID} type='number' onChange={(data) => {
                                if (data.target.value < 1) {
                                    data.target.value = '';
                                    setID(0);
                                } else {
                                    setID(data.target.value)
                                }

                            }} disabled={Securiti}></TextField>
                            <TextField label="Email" style={{ marginTop: "6%" }} value={Email} onChange={(data) => { setEmail(data.target.value) }} disabled={Securiti}></TextField>
                            {
                                ID > 0 && validateEmail(Email) ? <Button variant='contained' style={{ marginTop: '4%', backgroundColor: 'teal' }} onClick={handleVerify}>Verify</Button>
                                    : <Typography style={{ marginTop: "3%" }} color="teal">Empty UserID or invalid Email</Typography>
                            }
                            <div style={{ marginTop: '4%' }}>
                                <DrawAlertVerification></DrawAlertVerification>
                            </div>
                            {
                                Verificado.EC > 0 ?
                                    <>
                                        <TextField label="New Password" type='password' style={{ marginTop: "6%" }} value={Password} onChange={(data) => { setPassword(data.target.value) }} disabled={Securiti_2}></TextField>
                                        <TextField label="TFA Key" style={{ marginTop: "4%" }} type='number' value={TFA} onChange={(data) => { setTFA(data.target.value) }} disabled={Securiti_2}></TextField>
                                        {
                                            Password != '' && TFA > 99999 ? <Button variant='contained' style={{ marginTop: '4%', backgroundColor: 'teal' }} onClick={handlePasswordChange}  disabled={Securiti_2}>Reset Password</Button> : <></>
                                        }
                                    </>
                                    : <></>
                            }
                            <div style={{ marginTop: '4%' }}>
                                <DrawAlertPassword></DrawAlertPassword>
                            </div>
                        </FormControl>
                    </div>
                </CardContent>
            </Box>
        </div>
    </div> : (<SimpleBackdrop currentOpenState={true} handleClose={() => { }}></SimpleBackdrop>)
    )

}

export default PasswordForghetti;