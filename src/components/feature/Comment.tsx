import { Textarea } from "@mui/joy";
import { Box, Button, Typography } from "@mui/material";
import React from "react";

type CommentProps = {
  comment: string;
  setComment: any;
  onCommmentSending: any;
};

const Comment = (props: CommentProps) => {
  const { comment, setComment, onCommmentSending } = props;

  // const [commentData, setCommentData] = useState<CommentType[]>([]);

  // const [userCookieData, setUserCookieData] = useState<any>([]);
  // //cookieのuserIDを復号して取得
  // useEffect(() => {
  //   const cookieData = document.cookie
  //     .split(";")
  //     .find((cookie) => cookie.trim().startsWith("data="));
  //   const encryptedData = cookieData ? cookieData.split("=")[1] : "";
  //   const decrypts = (data: string | CryptoJS.lib.CipherParams) => {
  //     const bytes = CryptoJS.AES.decrypt(String(data), secretKey);
  //     const decrypted = bytes.toString(CryptoJS.enc.Utf8);
  //     return decrypted;
  //   };
  //   if (document.cookie) {
  //     const decording = decrypts(encryptedData);
  //     const Cookiedata = JSON.parse(decording);
  //     setUserCookieData(Cookiedata);
  //   }
  // }, []);

  // console.log(typeof userCookieData)

  // //ユーザ情報取得
  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const response = await fetch(`http://localhost:8000/users/${userCookieData}`);
  //       if (!response.ok) {
  //         throw new Error(`HTTP error! status: ${response.status}`);
  //       }
  //       const data = await response.json();
  //       setUsers(data);
  //     } catch (error) {
  //       console.error("An error occurred:", error);
  //     }
  //   })();
  // }, []);
  // console.log(users,"users")

  //   //コメント取得
  //   useEffect(() => {
  //     (async () => {
  //     try {
  //       const response = await fetch(`http://localhost:8000/comment`);
  //       if (!response.ok) {
  //         throw new Error(`HTTP error! status: ${response.status}`);
  //       }
  //       const data = await response.json();
  //       setCommentData(data);
  //     } catch (error) {
  //       console.error("An error occurred:", error);
  //     }
  //   })();
  // }, []);

  return (
    <>
      <Box sx={{ fontWeight: "bold", mt: 5 }}>商品へのコメント</Box>
      <Box>
        <Textarea
          name="comment"
          id="comment"
          value={comment}
          placeholder="コメントする"
          minRows={2}
          maxRows={4}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setComment(e.target.value)
          }
        ></Textarea>
        <Button onClick={onCommmentSending} sx={{ marginTop: 3, border: 1 }}>
          コメントを送信する
        </Button>
        <Typography sx={{ marginTop: 1, fontSize: "11px", mb: 5 }}>
          ＊相手のことを考え丁寧なコメントを心がけましょう。不快な言葉遣いなどは利用制限や退会処分となることがあります。
        </Typography>
      </Box>
    </>
  );
};

export default Comment;
