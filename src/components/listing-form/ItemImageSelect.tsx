import React, { Dispatch, SetStateAction } from "react";
import { Box } from "@mui/system";
import { Button, InputLabel, TextField } from "@mui/material";

type ItemImageProps = {
  itemImage: string;
  setItemImage: Dispatch<SetStateAction<string>>;
  handleImageChange: any;
  itemImageName: string;
  setItemImageName: Dispatch<SetStateAction<string>>;
  text:string
  clearImage:() => void
};

const ItemImageSelect = (props: ItemImageProps) => {
  const {
    itemImage,
    setItemImage,
    handleImageChange,
    itemImageName,
    setItemImageName,
    text,
    clearImage
  } = props;
  return (
    <Box mb={5}>
      <InputLabel id="itemImage" sx={{mb:1,fontWeight:"bold"}}>{text}</InputLabel>
      <TextField
        type="file"
        id="itemImage"
        fullWidth
        required
        onChange={handleImageChange}
        sx={{ mb: 4,backgroundColor:"#fffffc" }}
      />
      {itemImage && (
        <img width={200} height={200} src={itemImage} alt="uploaded image" />
      )}
      <Button onClick={clearImage}>選択されている画像をクリア</Button>
      <Box>※最大5MB</Box>
    </Box>
  );
};

export default ItemImageSelect;
