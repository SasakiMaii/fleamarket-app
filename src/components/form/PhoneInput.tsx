import React, { Dispatch, SetStateAction } from 'react'
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

type PhoneProps={
  phone:string
  setPhone:Dispatch<SetStateAction<string>>;
}

const PhoneInput = (props:PhoneProps) => {
  const {phone,setPhone}=props
  return (
    <Box mt={5}>
      <label htmlFor="phone"></label>
      <TextField
        type="tel"
        id="phone"
        label="電話番号"
        value={phone}
        variant="standard" fullWidth required
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setPhone(e.target.value)
        }
      />
    </Box>
  );
}

export default PhoneInput