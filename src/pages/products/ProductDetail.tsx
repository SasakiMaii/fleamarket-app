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
import { Items, Users, Likes, CartType } from "../../types/type";
import Box from "@mui/material/Box";
import Comment from "../../components/feature/Comment";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { secretKey } from "../users/Login";
import CryptoJS from "crypto-js";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import Card from '@mui/material/Card';

const ProductDetail = () => {
  const [detailItems, setDetailItems] = useState<Items[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [like, setLike] = useState(false);
  const [userCookieData, setUserCookieData] = React.useState<any>([]);
  const [likeItems, setLikeItems] = useState<Likes[]>([]);
  const [cartItems, setCartItems] = useState<CartType[]>([]);

  const { id } = useParams();
  const navigate = useNavigate();

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

  //lodingに関して
  useEffect(() => {
    setLoading(true);
    const controller = new AbortController();
    const signal = controller.signal;
    getDetailItem(signal);
    getlikeItem(signal);
    getCartItem(signal)
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

  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>{error.message}</p>;
  }

  //詳細商品取得
  const getDetailItem = async (signal: AbortSignal) => {
    try {
      const response = await fetch(`http://localhost:8000/items/${id}`, {
        signal,
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      // console.log(data);
      setDetailItems([data]);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };
  //お気に入りアイテム取得
  const getlikeItem = async (signal: AbortSignal) => {
    try {
      const response = await fetch(`http://localhost:8000/likes`, {
        signal,
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      // console.log(data);
      setLikeItems(data);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };
  //カート情報取得
  const getCartItem = async (signal: AbortSignal) => {
    try {
      const response = await fetch(`http://localhost:8000/cart`, {
        signal,
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setCartItems(data);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };
  //ログインしているユーザーがお気に入りしている商品
  const likeData = likeItems.filter((like) => {
    return (
      like.product_id === detailItems[0]?.id &&
      like.user_id === Number(userCookieData)
    );
  });
  const likeItemsID = likeItems.filter((like) => {
    return like.user_id === Number(userCookieData);
  });

  console.log(likeItemsID,"likeitemsid");
  console.log(
    document.cookie.indexOf(`like_product${detailItems[0]?.id}${userCookieData}`) !== -1
  );

  //「like_product」が存在していたらアイコン変える
  useEffect(() => {
    if (document.cookie.indexOf(`like_product${detailItems[0]?.id}${userCookieData}`) !== -1&&likeItemsID.length>=1) {
      setLike(true);
    } else {
      setLike(false);
    }
  }, [detailItems]);

  //お気に入りテーブルのIDを表示
  const likeId = likeData.map((item) => {
    return item.id;
  });

  //「like_product」cookie登録
  const setLikeCookie = (id: number | undefined, maxAge: number) => {
    document.cookie = `like_product${detailItems[0].id}${userCookieData}=${id};path=/; max-age=${maxAge}; secure`;
  };
  //「like_product」cookie消去
   const deleteLikeCookie = (id: number[] | undefined) => {
    document.cookie = `like_product${detailItems[0].id}${userCookieData}=${id};path=/; max-age=0; secure`;
  };
  //「like_product」のバリューを取得
  const cookie = document.cookie
    .split("; ")
    .find((cookie) => cookie.startsWith(`like_product${detailItems[0]?.id}${userCookieData}=`));
  const cookieValue = cookie ? cookie.split("=")[1] : null;

  console.log(cookieValue);

  //ハートをクリックしたとき
  const now = new Date();
  const onLikeFlag = async () => {
    if (
      like === false &&
      document.cookie.indexOf(`like_product${detailItems[0].id}${userCookieData}`) === -1
    ) {
      setLike(true);
      console.log(like);
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
      console.log(data.id, "成功");
      setLikeCookie(data.id, 100000);
      window.location.reload();
    } else {
      setLike(false);
      console.log("a");
      const res: any = await fetch(
        `http://localhost:8000/likes/${cookieValue}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      ).catch((err) => {
        console.log(err, "エラー");
      });
      deleteLikeCookie(likeId);
      const data = await res.json();
      console.log("削除", data);
    }
  };

  const cartId:any =cartItems.filter((item) => {
    return (detailItems.length>0&&detailItems&&item.product_id === detailItems[0].id)
  });
  console.log(cartId);


  const setCartClick = async () => {
    if (cartId.length>=1) {
      alert("こちらの商品は販売終了しました。");
    } else {
      navigate("/cart", { state: detailItems });
      const res = await fetch(`http://localhost:8000/cart`, {
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
      window.location.reload()
      console.log("＊＊＊＊＊＊成功＊＊＊＊＊", data);
    }
  };

  return (
    <Box mt={8} sx={{ textAlign: "center", maxWidth: 900 }}>
      {cartId.length>=1&& (
        <Box
          sx={{
            backgroundColor: "#dc143c",
            color: "white",
            py: 2,
            fontFamily: "Helvetica",
            fontSize: 30,
            fontWeight: "bold",
            width: "250px",
            borderRadius: 3,
            p: 2,
            m: "auto",
          }}
        >
          <LocalMallIcon sx={{ mr: 2 }} />
          SOLD OUT
          <LocalMallIcon sx={{ ml: 2 }} />
        </Box>
      )}
      {detailItems.map((item: Items) => (
        <Box
          key={item.id}
          sx={{
            marginBottom: 10,
            textAlign: "center",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <CardMedia
              sx={{
                height: 500,
                width: 450,
                backgroundSize:"93%"
              }}
              image={item.image}
            />
          </Box>
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
                  variant: "h4",
                  component: "p",
                  color: "primary.main",
                }}
                sx={{ textAlign: "center" }}
              />
              <Typography
                variant="body2"
                color="textSecondary"
              >
                (税込)
              </Typography>
            </ListItem>
          </List>
          <Card sx={{width:700,m:"auto",px:5,pb:5}}>
          <Divider sx={{ marginTop: 5, fontWeight: "bold" }}>
            商品の説明
          </Divider>
          <Typography sx={{width:600,m:"auto",mt:5}}>{item.description}</Typography>
          <Divider sx={{ marginTop: 5, fontWeight: "bold" }}>
            カテゴリー
          </Divider>
          <Typography sx={{ width:500,m:"auto",mt:5 }}>{item.category}</Typography>
          <Divider sx={{ marginTop: 5, fontWeight: "bold" }}>
            商品の状態
          </Divider>
          <Typography sx={{ width:500,m:"auto",mt:5 }}>{item.product_state}</Typography>
          <Divider sx={{ marginTop: 5, fontWeight: "bold" }}>ブランド</Divider>
          <Typography sx={{ width:500,m:"auto",mt:5  }}>{item.product_brand}</Typography>
          <Divider sx={{ marginTop: 5, fontWeight: "bold" }}>
            発送までの日数
          </Divider>
          <Typography sx={{ width:500,m:"auto",mt:5  }}>{item.product_days}</Typography>
          </Card>
          <Button
            variant="contained"
            onClick={setCartClick}
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
