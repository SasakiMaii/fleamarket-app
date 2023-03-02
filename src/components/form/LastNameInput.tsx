import React, { Dispatch, SetStateAction } from "react";
import { useState } from "react";
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

type LastNameProps={
  lastName:string;
  setLastName: Dispatch<SetStateAction<string>>;
}

const LastNameInput = (props:LastNameProps) => {
const{lastName,setLastName}=props

  return (
    <Box mt={1}>
      <label htmlFor="lastName"></label>
      <TextField
        type="text"
        id="lastName"
        label="性"
        value={lastName}
        variant="standard" fullWidth required
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setLastName(e.target.value)
        }
      />
    </Box>
  );
};

export default LastNameInput;
