import React from "react";
import { useState } from "react";
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

const FirstNameInput = () => {
  const [firstName, setFirstName] = useState<String>("");
  return (
    <Box >
      <label htmlFor="firstName"></label>
      <TextField
        type="text"
        id="firstName"
        label="名"
        variant="standard" fullWidth required
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setFirstName(e.target.value)
        }
      />
    </Box>
  );
};

export default FirstNameInput;
