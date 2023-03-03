import React, { Dispatch, SetStateAction } from "react";
import { Box } from "@mui/system";
import { InputLabel, TextField } from "@mui/material";

type PriceProps = {
  price: string;
  setPrice: Dispatch<SetStateAction<string>>;
};

const PriceInput = (props: PriceProps) => {
  const { price, setPrice } = props;
  return (
    <Box>
      <InputLabel id="price-label">金額</InputLabel>
      <TextField
        type="text"
        id="price"
        label="金額"
        variant="standard"
        fullWidth
        required
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setPrice(e.target.value)
        }
        aria-labelledby="price-label"
        sx={{ mb: 4 }}
      />
    </Box>
  );
};

export default PriceInput;
