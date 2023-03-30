import React, { Dispatch, MutableRefObject, RefObject, SetStateAction } from "react";
import { Box } from "@mui/system";
import { InputLabel, TextField } from "@mui/material";

type ItemNamePrps = {
  itemName: string;
  setItemName: Dispatch<SetStateAction<string>>;
};

const ItemNameInput = (props: ItemNamePrps) => {
  const { itemName, setItemName } = props;

  return (
    <Box>
      <InputLabel id="itemName" sx={{mt:2,fontWeight:"bold"}}>商品の名前</InputLabel>
      <TextField
        type="text"
        id="itemName"
        label="商品の名前はこちらに12文字未満で入力してください"
        variant="standard"
        fullWidth
        required
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setItemName(e.target.value)
        }
        sx={{ mb: 4 }}
      />
    </Box>
  );
};

export default ItemNameInput;
