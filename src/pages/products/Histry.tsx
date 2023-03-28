import { Textarea } from "@mui/joy";
import {
  Box,
  Button,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Link,
  List,
  ListItem,
  ListItemText,
  Rating,
  Typography,
} from "@mui/material";
import { Likes } from "@prisma/client";
import React, { useState } from "react";
import { useEffect } from "react";
import { Orders, Review } from "../../types/type";
import { secretKey } from "../users/Login";
import CryptoJS from "crypto-js";
import { useParams } from 'react-router-dom';

const Histry = () => {
  const [orders, setOrders] = useState<Orders[]>([]);
  const [dates, setDates] = useState<Orders[]>([]);
  const [open, setOpen] = useState(false);
  const [ster, setSter] = useState(3);
  const [comment, setComment] = useState("");
  const [userCookieData, setUserCookieData] = useState<any>([]);
  const [review, setReview] = useState<Review[]>([]);
  const [productId, setProductId] = useState(0);
  const {id}=useParams()

  //cookieのuserIDを復号して取得
  useEffect(() => {
    const cookieData = document.cookie
      .split(";")
      .find((cookie) => cookie.trim().startsWith("data="));
    const encryptedData = cookieData ? cookieData.split("=")[1] : "";
    const decrypts = (data: string | CryptoJS.lib.CipherParams) => {
      const bytes = CryptoJS.AES.decrypt(String(data), secretKey);
      const decrypted = bytes.toString(CryptoJS.enc.Utf8);
      return decrypted;
    };
    if (document.cookie) {
      const decording = decrypts(encryptedData);
      const Cookiedata = JSON.parse(decording);
      setUserCookieData(Cookiedata);
    }
  }, []);

  //購入履歴を取得
  useEffect(() => {
    (async () => {
      const res = await fetch(`http://localhost:8000/orders/${id}`);
      const data = await res.json();
      const newOrders = data.map(
        (order: { orderedAt: string | number | Date }) => {
          return {
            ...order,
            orderedAt: new Date(order.orderedAt),
          };
        }
      );
      const newDates = newOrders.map(
        (order: { orderedAt: { toLocaleDateString: () => any } }) =>
          order.orderedAt.toLocaleDateString()
      );
      setOrders(newOrders);
      setDates(newDates);
    })();
  }, []);

  //既存のレビューを取得
  useEffect(() => {
    (async () => {
      const res = await fetch(`http://localhost:8000/review/${userCookieData}`);
      const data = await res.json();
      setReview(data);
    })();
  }, []);

  //前にその製品のレビューを書いている場合
  const reviewMatch: number[] = review.map((data) => {
    return data.product_id;
  });

  //レビューを送信
  const onReview = async () => {
    const now = new Date();


    const res = await fetch(`http://localhost:8000/review`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        comment: comment,
        user_id: Number(userCookieData),
        product_id: productId,
        rating: ster,
        createdAt: now,
      }),
    });
    const data = await res.json();
    setOpen(false);
    window.location.reload();
  };

  const handleClickOpen = (product_id:number) => {
    setOpen(true);
    setProductId(product_id);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box>
      <Box my={10} sx={{ fontSize: "23px" }}>
        購入履歴
      </Box>
      {orders.length >= 1 ? (
        orders.map((order) => (
          <Box key={order.id} sx={{maxWidth:900}}>
            {order.carts && order.carts.map((cart) => (
              <List
                key={cart.id}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#e7e7eb",
                  maxWidth: "100%",
                  margin: "auto",
                  mb: 5,
                }}
              >
                <Box sx={{ p: 2, maxWidth: 100 }}>
                  {order.orderedAt.toLocaleDateString()}
                </Box>
                <Box sx={{ maxWidth: 400 }}>
                  <Link href={`http://127.0.0.1:5173/productdetail/${cart.product_id}`}>
                    <ListItem>
                      <ListItemText sx={{ textAlign: "center" }}>
                        {cart.name}
                      </ListItemText>
                      <CardMedia
                        sx={{ height: 100, width: 100, ml: 1 }}
                        image={cart.image}
                      />
                    </ListItem>
                  </Link>
                </Box>
                
                {cart.product_id && reviewMatch.includes(cart.product_id) ? (
                  <Box sx={{ fontSize: "15px", maxWidth: 400,mx:5 }}>レビュー済</Box>
                ) : (
                  <Button
                  sx={{ maxWidth: 500, fontWeight: "bold" }}
                  onClick={()=>cart.product_id&&handleClickOpen(cart.product_id)}
                  >
                    取引のレビューをする
                  </Button>
                )}
                <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                >
                  <DialogTitle
                    id="alert-dialog-title"
                    sx={{ mt: 2, maxWidth: 300, textAlign: "center" }}
                    >
                    {"評価をしてください"}
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText
                      id="alert-dialog-description"
                      sx={{ textAlign: "center" }}
                      >
                      <Rating
                        name="simple-controlled"
                        value={ster}
                        onChange={(event, newValue: any) => {
                          setSter(newValue);
                        }}
                        sx={{ mt: 2, fontSize: "40px", mb: 0 }}
                        />
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions sx={{ display: "table-column" }}>
                    <Box sx={{ mb: 3 }}>
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
                    </Box>
                    <Box sx={{ textAlign: "center" }}>
                      <Button onClick={handleClose}>戻る</Button>
                      <Button
                        onClick={onReview}
                        autoFocus
                        >
                        送信する
                      </Button>
                    </Box>
                  </DialogActions>
                </Dialog>
              </List>
            ))}
          </Box>
        ))
      ) : (
        <Box>履歴はありません</Box>
      )}
    </Box>
  );
};

export default Histry;
