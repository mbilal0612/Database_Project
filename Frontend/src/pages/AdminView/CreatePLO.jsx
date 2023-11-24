import { useEffect, useState } from 'react';
import AdminNavbar from '../../components/Navbars/AdminNavbar';
import SimpleBackdrop from '../../components/util-components/Loader';
import { decryptToken } from '../../apis/auth/getUserType';
import { FormControl, FormLabel, TextField, Button, Box } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import { PLO } from '../../apis/Admin/createBundle';
import Alert from '@mui/material/Alert';

const CreatePLO = () => {

    //System States
    const [render, setRender] = useState(false);

    //Form States
    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');

    const [verificado, setVerificado] = useState(
        {
            EC: 0,
            message: "Obie trice, real name, no gimmicks"
        }
    );

    const DrawAlert = () => {

        if (verificado.EC == 1) {
            return (<Alert severity='success'>{verificado.message}</Alert>);
        } else if (verificado.EC == -1) {
            return (<Alert severity='error'>{verificado.message}</Alert>);
        } else {
            return (<></>);
        }

    }

    const handleCreatePLO = async () => {

        var req = {
            ploName: name,
            ploDesc: desc
        };

        setRender(false);
        let x = await PLO(req, sessionStorage.getItem('token'));
        setVerificado(x);
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
            <Box sx={{ display: 'flex', minWidth: '30%', marginTop: "10%", boxShadow: 3, borderRadius: 3, justifyContent: 'center' }}>
                <CardContent variant="outlined" style={{ justifyContent: 'space-between', minWidth: '60%' }}>
                    <div>
                        <FormLabel>Create Course</FormLabel>
                        <FormControl style={{ width: '85%', justifyContent: 'space-between', marginTop: '2%' }}>
                            <TextField style={{ marginTop: '4%' }} label="PLO Name" value={name} inputProps={{ maxLength: 128}} onChange={(data) => { setName(data.target.value) }}></TextField>
                            <TextField style={{ marginTop: '4%' }} label="PLO Desc" value={desc} inputProps={{ maxLength: 512 }} onChange={(data) => { setDesc(data.target.value) }}></TextField>
                            {
                                (name != '' && desc != '') ? <Button variant='contained' style={{ marginTop: '2%' }} onClick={handleCreatePLO}>Submit</Button> : <></>
                            }
                            <div style={{ marginTop: "4%" }}>
                                <DrawAlert></DrawAlert>
                            </div>
                        </FormControl>
                    </div>
                </CardContent>
            </Box>
        </div>
    </div>
        : (<SimpleBackdrop currentOpenState={true} handleClose={() => { }}></SimpleBackdrop>)
    )

}

export default CreatePLO;