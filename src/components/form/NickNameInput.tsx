import React, { Dispatch, SetStateAction } from "react";
import { useState } from "react";
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

type NicknameProps= {
  nickName:string
  setNickName: Dispatch<SetStateAction<string>>;
}

const NickNameInput = (props:NicknameProps) => {
  const {nickName,setNickName}=props

  return (
    <Box>
      <label htmlFor="nickName"></label>
      <TextField
        type="text"
        id="nickName"
        variant="standard"
        fullWidth
        value={nickName}
        label="ニックネーム"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setNickName(e.target.value)
        }
      />
    </Box>
  );
};

export default NickNameInput;
