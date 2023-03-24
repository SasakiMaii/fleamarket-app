import React, { Dispatch, SetStateAction } from "react";
import { Box } from "@mui/system";
import { InputLabel, TextField } from "@mui/material";

type BrandProps = {
  brand: string;
  setBrand: Dispatch<SetStateAction<string>>;
};

const BrandInput = (props: BrandProps) => {
  const {brand,setBrand}=props
  return (
    <Box>
      <InputLabel id="brand-label"  sx={{mt:2,fontWeight:"bold"}}>ブランド名(任意)</InputLabel>
      <TextField
        type="text"
        id="brand"
        label="ブランド名"
        variant="standard"
        fullWidth
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setBrand(e.target.value)
        }
        aria-labelledby="brand-label"
        sx={{ mb: 4 }}
      />
    </Box>
  );
};

export default BrandInput;
