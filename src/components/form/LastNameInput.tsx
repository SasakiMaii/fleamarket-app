import React from "react";
import { useState } from "react";
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

const LastNameInput = () => {
  const [lastName, setLastName] = useState<String>("");
  return (
    <Box mt={5}>
      <label htmlFor="lastName"></label>
      <TextField
        type="text"
        id="lastName"
        label="性"
        variant="standard" fullWidth required
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setLastName(e.target.value)
        }
      />
    </Box>
  );
};

export default LastNameInput;
