import { useEffect, useState } from 'react';
import AdminNavbar from '../../components/Navbars/AdminNavbar';
import SimpleBackdrop from '../../components/util-components/Loader';
import { decryptToken } from '../../apis/auth/getUserType';
import { FormControl, FormLabel, TextField, Button, Box } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { StudentInfo, StudentLedger, StudentFee } from '../../apis/Admin/getBundle';
import Alert from '@mui/material/Alert';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StudentFeeInquiry = () => {

    //System States
    const [render, setRender] = useState(false);

    //Form States
    const [studentID, setStudentID] = useState('');

    //DisplayState
    const [studentData, setStudentData] = useState(0);
    const [balance, setBalance] = useState(0);
    const [transactions, setTransactions] = useState([]);

    const handleStudentExists = async () => {

        setRender(false);
        let x = await StudentInfo(sessionStorage.getItem('token'), studentID);
        let y = await StudentLedger(sessionStorage.getItem('token'), studentID);
        let z = await StudentFee(sessionStorage.getItem('token'), studentID);
        setStudentData(x);
        if (!z.Fee) {
            setBalance(0);
        } else {
            setBalance(z.Fee);
        }

        if (!y.entities) {
            setTransactions(0);
        } else {
            setTransactions(y.entities);
        }
        setStudentID('');
        setRender(true);
    }

    const DrawAlert = () => {

        if (studentData.EC == 1) {
            return (
                <>
                    <div style={{ justifyContent: 'center', display: 'flex', marginTop: "1.5%" }}>
                        <Alert severity="success">Success in fetching student!</Alert>
                    </div>
                    <div style={{ justifyContent: 'center', display: 'flex' }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', minWidth: '20%', maxWidth: '40%', marginTop: "1.5%", boxShadow: 3, borderRadius: 3, justifyContent: 'center', padding: '1% 1.5% 1% 1.5%' }}>
                            <FormLabel>Student Information</FormLabel>
                            <div style={{ display: 'flex', paddingTop: '2%' }}>
                                <Typography variant="h1" style={{ marginTop: '2%' }} sx={{ fontSize: 18 }} color="Gray" gutterBottom>
                                    {"Name :"}
                                </Typography>
                                <Typography variant="h1" style={{ marginTop: '2%', paddingLeft: '2%' }} sx={{ fontSize: 18 }} color="Black" gutterBottom>
                                    {studentData.data.FIRST_NAME + " " + studentData.data.LAST_NAME}
                                </Typography>
                            </div>
                            <div style={{ display: 'flex' }}>
                                <Typography variant="h1" style={{ marginTop: '2%' }} sx={{ fontSize: 18 }} color="Gray" gutterBottom>
                                    {"Class :"}
                                </Typography>
                                <Typography variant="h1" style={{ marginTop: '2%', paddingLeft: '2%' }} sx={{ fontSize: 18 }} color="Black" gutterBottom>
                                    {!studentData.class.CLASS_ID ? "No Class" : studentData.class.CLASS_ID}
                                </Typography>
                            </div>
                            <div style={{ display: 'flex' }}>
                                <Typography variant="h1" style={{ marginTop: '2%' }} sx={{ fontSize: 18 }} color="Gray" gutterBottom>
                                    {"Phone :"}
                                </Typography>
                                <Typography variant="h1" style={{ marginTop: '2%', paddingLeft: '2%' }} sx={{ fontSize: 18 }} color="Black" gutterBottom>
                                    {studentData.data.PHONE}
                                </Typography>
                            </div>
                            <div style={{ display: 'flex' }}>
                                <Typography variant="h1" style={{ marginTop: '2%' }} sx={{ fontSize: 18 }} color="Gray" gutterBottom>
                                    {"Join Date :"}
                                </Typography>
                                <Typography variant="h1" style={{ marginTop: '2%', paddingLeft: '2%' }} sx={{ fontSize: 18 }} color="Black" gutterBottom>
                                    {studentData.data.JOIN_DATE.slice(0, 10)}
                                </Typography>
                            </div>
                            <div style={{ display: 'flex' }}>
                                <Typography variant="h1" style={{ marginTop: '2%' }} sx={{ fontSize: 18 }} color="Gray" gutterBottom>
                                    {"Email :"}
                                </Typography>
                                <Typography variant="h1" style={{ marginTop: '2%', paddingLeft: '2%' }} sx={{ fontSize: 18 }} color="Black" gutterBottom>
                                    {studentData.data.EMAIL_ADDRESS}
                                </Typography>
                            </div>
                            <div style={{ display: 'flex' }}>
                                {
                                    balance > 0 ? <>
                                        <Typography variant="h1" style={{ marginTop: '2%' }} sx={{ fontSize: 18 }} color="Gray" gutterBottom>
                                            {"Fee Remaining :"}
                                        </Typography>
                                        <Typography variant="h1" style={{ marginTop: '2%', paddingLeft: '2%' }} sx={{ fontSize: 18 }} color="Red" gutterBottom>
                                            {"PKR " + balance}
                                        </Typography></> : <>
                                        <Typography variant="h1" style={{ marginTop: '2%' }} sx={{ fontSize: 18 }} color="Gray" gutterBottom>
                                            {"Current Balance:"}
                                        </Typography>
                                        <Typography variant="h1" style={{ marginTop: '2%', paddingLeft: '2%' }} sx={{ fontSize: 18 }} color="Green" gutterBottom>
                                            {"PKR " + balance}
                                        </Typography>
                                    </>
                                }
                            </div>
                        </Box>
                    </div>

                    {transactions != 0 ? <div style={{ justifyContent: 'center', display: 'flex' }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', minWidth: '40%', maxWidth: '50%', marginTop: "1.5%", boxShadow: 3, borderRadius: 3, justifyContent: 'center', padding: '1% 1.5% 1% 1.5%' }}>
                            <FormLabel>Student Ledger</FormLabel>

                            <div>
                                <TableContainer component={Paper} style={{ marginTop: '2%' }}>
                                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell align="right">ID</TableCell>
                                                <TableCell align="right">Name&nbsp;</TableCell>
                                                <TableCell align="right">Amount&nbsp;</TableCell>
                                                <TableCell align="right">Date&nbsp;</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {transactions.map((row) => (
                                                <TableRow
                                                    key={row.id}
                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                >
                                                    <TableCell align="right">{row.id}</TableCell>
                                                    <TableCell align="right">{row.T_NAME}</TableCell>
                                                    <TableCell align="right">{row.T_AMOUNT}</TableCell>
                                                    <TableCell align="right">{row.T_DATE.slice(0, 10)}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </div>
                        </Box>
                    </div> : <Typography variant="h1" style={{ marginTop: '2%' }} sx={{ fontSize: 18 }} color="Gray" gutterBottom>
                        {"Fee Ledger is Empty"}
                    </Typography>
                    }
                </>
            )
        } else if (studentData.EC == -1) {
            return (
                <div style={{ justifyContent: 'center', display: 'flex', marginTop: "1.5%" }}>
                    <Alert severity="error">Not a valid Student ID!</Alert>
                </div>
            )
        } else {
            return (
                <></>
            )
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
            <Box sx={{ display: 'flex', minWidth: '20%', marginTop: "1%", boxShadow: 3, borderRadius: 3, justifyContent: 'center' }}>
                <CardContent variant="outlined" style={{ justifyContent: 'space-between', minWidth: '50%' }}>
                    <div>
                        <FormLabel>Student Fee Inquiry</FormLabel>
                        <div style={{ justifyContent: 'center', display: 'flex' }}>
                            <FormControl style={{ width: '85%', justifyContent: 'space-between', marginTop: '4%' }}>
                                <TextField style={{ marginTop: '3%' }} type='Number'
                                    label="StudentID" size='large' onChange={(data) => {
                                        if (data.target.value < 1) {
                                            data.target.value = '';
                                        }
                                        setStudentID(data.target.value)
                                    }}></TextField>
                                {studentID != '' ? <Button variant='contained' style={{ marginTop: '4%' }} onClick={handleStudentExists}>Inquire</Button> : <></>}
                            </FormControl>
                        </div>
                    </div>
                </CardContent>
            </Box>
        </div>
        <DrawAlert></DrawAlert>
    </div>
        : (<SimpleBackdrop currentOpenState={true} handleClose={() => { }}></SimpleBackdrop>)
    )

}
export default StudentFeeInquiry;