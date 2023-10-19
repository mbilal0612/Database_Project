import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function BasicTextFields({Label, Type}) {
  return (
    
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '45ch' },
      }}
      noValidate
      autoComplete="off"
      
    >
      <TextField type = {Type} id="outlined-basic" label={Label} variant="outlined" />
      
    </Box>
  );
}
