import React, { Dispatch, SetStateAction } from 'react'
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import { Box,Button } from '@mui/material';

type RegisterProps={
  postalCode?:string|number
  setPostalCode:Dispatch<SetStateAction<string>>
  getZipCode:() => Promise<void>
}

const PostalCodeinput = (props:RegisterProps) => {

  return (
    <Box mt={5} >
      <label htmlFor="postalCode"></label>
      <TextField
        type="text"
        id="postalCode"
        label="郵便番号"
        variant="standard" fullWidth required
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          props.setPostalCode(e.target.value)
        }
      />
      <Button onClick={props.getZipCode}>郵便番号で住所を自動入力する</Button>
    </Box>
  );
}

export default PostalCodeinput