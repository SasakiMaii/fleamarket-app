import { Box, Button, InputLabel, TextField } from "@mui/material";
import React, { Dispatch, SetStateAction, useState } from "react";

type ImageProps = {
  file:any;
  setFile: any;
  handleFileSelect: any;
};

const ImageRegistration = (props: ImageProps) => {
  const { file, setFile, handleFileSelect } = props;

  return (
    <>
      <InputLabel sx={{ marginTop: 2, textAlign: "left" }} id="prefectuer">
        プロフィール画像
      </InputLabel>
      <TextField
        fullWidth
        sx={{ marginBottom:2 ,}}
        type="file"
        value={file||""}
        onChange={handleFileSelect}
      />
    </>
  );
};

export default ImageRegistration;
