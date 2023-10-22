import { Box, TextField} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import InputAdornment from '@mui/material/InputAdornment';

export default function UsernameField({onChange,value}){

    return(

        <Box sx={{ '& .MuiTextField-root': { m: 1, width: '50ch' }, }}>
            <TextField
                
                label="Username"
                variant="outlined"
                value={value}
                onChange={onChange}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                          <AccountCircle />
                        </InputAdornment>
                      )
                }}
            />
        </Box>
    )

}