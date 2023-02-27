import React from "react";
import { useState } from "react";
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

const NickNameInput = () => {
  const [nickName, setNickName] = useState<String>("");
  return (
    <Box>
      <label htmlFor="nickName"></label>
      <TextField
        type="text"
        id="nickName"
        variant="standard"
        fullWidth
        label="ニックネーム"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setNickName(e.target.value)
        }
      />
    </Box>
  );
};

export default NickNameInput;
