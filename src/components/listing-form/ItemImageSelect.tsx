import React, { Dispatch, SetStateAction } from "react";
import { Box } from "@mui/system";
import { InputLabel, TextField } from "@mui/material";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";

type ItemImageProps = {
  itemImage: string;
  setItemImage: Dispatch<SetStateAction<string>>;
  handleImageChange: any;
  itemImageName: string;
  setItemImageName: Dispatch<SetStateAction<string>>;
};

const ItemImageSelect = (props: ItemImageProps) => {
  const {
    itemImage,
    setItemImage,
    handleImageChange,
    itemImageName,
    setItemImageName,
  } = props;
  return (
    <Box>
      <InputLabel id="itemImage">商品の画像</InputLabel>
      <TextField
        type="file"
        id="itemImage"
        fullWidth
        required
        onChange={handleImageChange}
        sx={{ mb: 4 }}
      />
      {itemImage && (
        <img width={200} height={200} src={itemImage} alt="uploaded image" />
      )}
    </Box>
  );
};

export default ItemImageSelect;
