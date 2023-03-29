import React, { Dispatch, SetStateAction } from "react";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { Users } from "../../types/type";

type NicknameProps = {
  nickName: string ;
  setNickName: Dispatch<SetStateAction<string>>;
  editNickName?: string | undefined;
};

const NickNameInput =(props: NicknameProps) => {
  const { nickName, setNickName,editNickName  } = props;

  return (
    <Box>
      <label htmlFor="nickName"></label>
        <TextField
          type="text"
          id="nickName"
          variant="standard"
          fullWidth
          value={nickName||""}
          label="ニックネーム"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setNickName(e.target.value)
          }
        />
    </Box>
  );
};

export default NickNameInput;
