import { Textarea } from "@mui/joy";
import { Box, Button, IconButton, Typography } from "@mui/material";
import React, { Dispatch, SetStateAction, useState } from "react";

type CommentProps={
  comment:string,
  setComment:any;
  onCommmentSending:any;
}

const Comment = (props:CommentProps) => {
  const {comment,setComment,onCommmentSending}=props

  return (
    <>
      <Box sx={{fontWeight:"bold"}}>商品へのコメント</Box>
      <Box>
        <Textarea
          name="comment"
          id="comment"
          value={comment}
          placeholder="コメントする"
          minRows={2}
          maxRows={4}
          onChange={(e:React.ChangeEvent<HTMLTextAreaElement>) =>
            setComment(e.target.value)
          }
        ></Textarea>
        <Button onClick={onCommmentSending} sx={{marginTop:3}}>コメントを送信する</Button>
        <Typography sx={{ marginTop: 3}}>
          ＊相手のことを考え丁寧なコメントを心がけましょう。不快な言葉遣いなどは利用制限や退会処分となることがあります。
        </Typography>
      </Box>
    </>
  );
};

export default Comment;
