import React from "react";
import { useState } from "react";
import TextField from '@mui/material/TextField';

const EmailInput = () => {
  const [email, setEmail] = useState<string | number>("");

  return (
    <div>
      <label htmlFor="email"></label>
      <TextField
        type="email"
        id="email"
        value={email}
        label="メールアドレス"
        variant="standard" fullWidth required
        onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
          setEmail(e.target.value)
        }
      />
    </div>
  );
};

export default EmailInput;
