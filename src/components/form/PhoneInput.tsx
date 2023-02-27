import React from 'react'
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

const PhoneInput = () => {
  const [phone, setPhone] = useState<number>(0);
  return (
    <Box mt={5}>
      <label htmlFor="phone"></label>
      <TextField
        type="tel"
        id="phone"
        label="電話番号"
        variant="standard" fullWidth required
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setPhone(Number(e.target.value))
        }
      />
    </Box>
  );
}

export default PhoneInput