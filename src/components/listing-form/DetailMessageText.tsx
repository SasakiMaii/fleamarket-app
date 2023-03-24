import React, { Dispatch, SetStateAction } from "react";
import { Box } from "@mui/system";
import { InputLabel } from "@mui/material";
import { Textarea } from "@mui/joy";

type DetailMessageProps = {
  detailMessage: string;
  setDetailMessage: Dispatch<SetStateAction<string>>;
};

const DetailMessageText = (props: DetailMessageProps) => {
  const { detailMessage, setDetailMessage } = props;
  return (
    <Box>
      <InputLabel id="prefectuer" sx={{fontWeight:"bold"}}>商品の説明</InputLabel>
      <Textarea
        sx={{ my: 2 }}
        placeholder="色、素材、重さ、定価、注意点など"
        minRows={6}
        maxRows={6}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
          setDetailMessage(e.target.value)
        }
      ></Textarea>
    </Box>
  );
};

export default DetailMessageText;
