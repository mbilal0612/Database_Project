import { Box, TextField, InputAdornment, IconButton} from "@mui/material";
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useState } from "react";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export default function PasswordField({onChange, value, onKeyDown}){
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };



    return(

        <Box sx={{ '& .MuiTextField-root': { m: 1, width: '45ch' }, }}>
            <TextField
                
                type={showPassword ? "text" : "password"}
                label="Password"
                value={value}
                InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                        >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    
                    </InputAdornment>
                ),
                }}
                onChange={onChange}
                onKeyDown={onKeyDown}
                variant="outlined"
            />
        </Box>
    )

}