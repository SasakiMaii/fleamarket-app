import React, { Dispatch } from "react";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

type PassProps = {
  password: string;
  setPassword: Dispatch<React.SetStateAction<string>>;
  editPass?: string | undefined;
};

const PasswordInput = (props: PassProps) => {
  const { password, setPassword, editPass } = props;
  return (
    <Box>
      {editPass ? (
        <>
          <label htmlFor="password"></label>
          <TextField
            type="password"
            id="password"
            fullWidth
            required
            label="パスワード"
            variant="standard"
            value={editPass}
            onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
              setPassword(e.target.value)
            }
          />
        </>
      ) : (
        <>
          <label htmlFor="password"></label>
          <TextField
            type="password"
            id="password"
            fullWidth
            required
            label="パスワード"
            variant="standard"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
              setPassword(e.target.value)
            }
          />{" "}
        </>
      )}
    </Box>
  );
};

export default PasswordInput;
