import React, { Dispatch, SetStateAction } from "react";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

type FirstNameProps = {
  firstName: string;
  setFirstName: Dispatch<SetStateAction<string>>;
  editFirstName?: string | undefined;
};

const FirstNameInput = (props: FirstNameProps) => {
  const { firstName, setFirstName, editFirstName } = props;

  return (
    <Box>
      {editFirstName ? (
        <>
          <label htmlFor="firstName"></label>
          <TextField
            type="text"
            id="firstName"
            label="名"
            variant="standard"
            fullWidth
            value={editFirstName}
            required
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setFirstName(e.target.value)
            }
          />
        </>
      ) : (
        <>
          <label htmlFor="firstName"></label>
          <TextField
            type="text"
            id="firstName"
            label="名"
            variant="standard"
            fullWidth
            required
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setFirstName(e.target.value)
            }
          />
        </>
      )}
    </Box>
  );
};

export default FirstNameInput;
