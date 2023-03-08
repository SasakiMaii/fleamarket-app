import {
  Button,
  CardMedia,
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Items, Users } from "../../types/type";
import Box from "@mui/material/Box";
import Comment from "../../components/feature/Comment";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Link } from "@mui/material";
import { secretKey } from "../users/Login";
import CryptoJS from "crypto-js";

const ProductDetail = () => {
  const [detailItems, setDetailItems] = useState<Items[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [like, setLike] = useState(false);
  const [userCookieData, setUserCookeData] = React.useState<any>([]);
  const { id } = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {
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
      setUserCookeData(Cookiedata);
      // const idData=userCookieData.map((user:any)=>{
      //   return user.id
      // })
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    const controller = new AbortController();
    const signal = controller.signal;
    getDetailItem(signal)
      .then(() => {
        setLoading(false);
      })
      .catch((err) => {
        if (err.name === "AbortError") return;
        setError(err);
        setLoading(false);
      });

    return () => {
      controller.abort();
    };
  }, []);

  const getDetailItem = async (signal: AbortSignal) => {
    try {
      const response = await fetch(`http://localhost:8000/items/${id}`, {
        signal,
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);
      setDetailItems([data]);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error.message}</p>;
  }


  const now = new Date();
  
  const onLikeFlag = async () => {
    if (like === false) {
      setLike(true);
      const res = await fetch("http://localhost:8000/likes", {
        method: "POST",
        body: JSON.stringify({
          name: detailItems[0].name,
          price: Number(detailItems[0].price),
          image: detailItems[0].image || "",
          like_date: now,
          user_id: Number(userCookieData),
          category: "",
          product_id: detailItems[0].id,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      console.log(data);
    } else {
      setLike(false);
      const res:any = await fetch(
        `http://localhost:8000/likes/${detailItems[0]?.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      ).catch((err) => {
        console.log(err, "エラー");
      });
      const data = await res.json();
      console.log(data)
    }
  };


  return (
    <Box mt={10} sx={{ textAlign: "center", maxWidth: 800 }}>
      {detailItems.map((item: Items) => (
        <Box
          key={item.id}
          sx={{
            marginBottom: 10,
            textAlign: "center",
          }}
        >
          <CardMedia
            sx={{ height: 500, width: 500, textAlign: "center" }}
            image={item.image}
          />
          <List>
            <ListItem>
              <ListItemText
                primary={item.name}
                primaryTypographyProps={{
                  variant: "h4",
                  component: "h2",
                  gutterBottom: true,
                }}
                sx={{
                  textAlign: "center",
                  borderBottom: 1,
                  fontWeight: "bold",
                }}
              />
            </ListItem>

            <Box sx={{ textAlign: "right", fontWeight: "bold", color: "#000" }}>
              <Button sx={{ color: "#000" }} onClick={onLikeFlag}>
                お気に入りに登録
                {like ? <FavoriteIcon /> : <FavoriteBorderIcon />}
              </Button>
            </Box>
            <ListItem>
              <ListItemText
                primary={`¥${item.price?.toLocaleString()}`}
                primaryTypographyProps={{
                  variant: "h5",
                  component: "p",
                  color: "primary.main",
                }}
                sx={{ textAlign: "center" }}
              />
              <Typography
                variant="body2"
                color="textSecondary"
                sx={{ marginLeft: 1 }}
              >
                (税込)
              </Typography>
            </ListItem>
          </List>
          <Divider sx={{ marginTop: 5, fontWeight: "bold" }}>
            商品の説明
          </Divider>
          <Typography sx={{ marginTop: 5 }}>{item.description}</Typography>
          <Divider sx={{ marginTop: 5, fontWeight: "bold" }}>
            カテゴリー
          </Divider>
          <Typography sx={{ marginTop: 5 }}>{item.category}</Typography>
          <Divider sx={{ marginTop: 5, fontWeight: "bold" }}>
            商品の状態
          </Divider>
          <Typography sx={{ marginTop: 5 }}>{item.product_state}</Typography>
          <Divider sx={{ marginTop: 5, fontWeight: "bold" }}>ブランド</Divider>
          <Typography sx={{ marginTop: 5 }}>{item.product_brand}</Typography>
          <Divider sx={{ marginTop: 5, fontWeight: "bold" }}>
            発送までの日数
          </Divider>
          <Typography sx={{ marginTop: 5 }}>{item.product_days}</Typography>
          <Divider sx={{ marginTop: 5 }}></Divider>
          <Button
            variant="contained"
            href="/cart"
            disableElevation
            sx={{ marginTop: 10 }}
          >
            カートに入れる
          </Button>
        </Box>
      ))}
      <Comment />
    </Box>
  );
};

export default ProductDetail;
