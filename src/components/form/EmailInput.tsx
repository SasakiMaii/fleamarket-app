import React, { Dispatch, SetStateAction } from "react";
import { useState } from "react";
import TextField from "@mui/material/TextField";

type EmailProps = {
  email?: string;
  setEmail: Dispatch<SetStateAction<string>>;
  editEmail?: string | undefined;
};

const EmailInput = (props: EmailProps) => {
  const { email, setEmail, editEmail } = props;
  return (
    <div>
      {editEmail ? (
        <>
          <label htmlFor="email"></label>
          <TextField
            type="email"
            id="email"
            value={editEmail}
            label="メールアドレス"
            variant="standard"
            fullWidth
            required
            onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
              setEmail(e.target.value)
            }
          />
        </>
      ) : (
        <>
          <label htmlFor="email"></label>
          <TextField
            type="email"
            id="email"
            value={email}
            label="メールアドレス"
            variant="standard"
            fullWidth
            required
            onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
              setEmail(e.target.value)
            }
          />
        </>
      )}
    </div>
  );
};

export default EmailInput;
