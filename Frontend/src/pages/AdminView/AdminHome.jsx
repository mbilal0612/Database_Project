import { useEffect, useState } from 'react'
import { decryptToken } from '../../apis/auth/getUserType';
import SimpleBackdrop from '../../components/util-components/Loader';
import AdminNavbar from '../../components/Navbars/AdminNavbar';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { TextField } from '@mui/material';
import Kards from '../../components/ComponentHelpers/AdminHomeKardHelper'

const AdminHome = () => {
    const [render, setRender] = useState(false);
    const [inputText, setInputText] = useState("");

    let inputHandler = (e) => {
        //convert input text to lower case
        var lowerCase = e.target.value.toLowerCase();
        setInputText(lowerCase);
    };

    useEffect(() => {

        const checkUserType = async () => {
            const token = sessionStorage.getItem("token");
            const decryptedToken = await decryptToken(token);
            const userType = decryptedToken.data["userType"];
            console.log(userType);
            if (userType !== "ADMIN") {
                window.location.assign("/UNAUTHORIZEDACCESS");
            }
            else setRender(true);
        }

        checkUserType();
    });


    return (
        <>{render ? (
            <div className="div1">
                <div>
                    <AdminNavbar />
                </div>
                <div>
                    <Box sx={{ flexGrow: 1 }}>
                        <div style={{ marginTop: '1%', paddingLeft: '2%', paddingRight: '2%' }}>
                            <TextField
                                id="outlined-basic"
                                variant="outlined"
                                fullWidth
                                label="Search"
                                onChange={inputHandler}
                            />
                        </div>
                        <Grid container spacing={2} style={{ justifyContent: 'center', margin: '1% 0 0 0' }}>
                            <Kards input={inputText}></Kards>
                        </Grid>
                    </Box>
                </div>

            </div>
        ) : (<SimpleBackdrop currentOpenState={true} handleClose={() => { }}></SimpleBackdrop>)}</>

    )
}

export default AdminHome