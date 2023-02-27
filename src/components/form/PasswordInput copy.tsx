import React from "react";
import { useState } from "react";
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';


const PasswordInput = () => {
  const [pass, setPass] = useState<string | number>("");

  return (
    <Box >
      <label htmlFor="password"></label>
      <TextField
        type="password"
        id="password"
        fullWidth
        required
        label="パスワード"
        variant="standard"
        value={pass}
        onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
          setPass(e.target.value)
        }
      />
    </Box>
  );
};

export default PasswordInput;
