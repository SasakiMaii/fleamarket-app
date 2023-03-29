import React, { Dispatch, SetStateAction } from "react";
import { useState } from "react";
import TextField from "@mui/material/TextField";

type EmailProps = {
  email?: string;
  setEmail:any;
};

const EmailInput = (props: EmailProps) => {
  const { email, setEmail} = props;
  return (
    <div>
          <label htmlFor="email" style={{color
          :"#fff"}}>email</label>
          <TextField
            type="email"
            id="email"
            label="メールアドレス"
            placeholder="メールアドレス"
            variant="standard"
            fullWidth
            value={email||""}
            required
            onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
              setEmail(e.target.value)
            }
          />
    </div>
  );
};

export default EmailInput;
