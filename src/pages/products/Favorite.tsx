import {
  Box,
  CardMedia,
  Link,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { useState } from "react";
import { CartType, Likes } from "../../types/type";
import { useEffect } from "react";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { secretKey } from "../users/Login";
import CryptoJS from "crypto-js";

const Favorite = () => {
  const [likes, setLikes] = useState<Likes[]>([]);
  const [userCookieData, setUserCookieData] = useState<any>([]);
  const [cartItems, setCartItems] = useState<CartType[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const res = await fetch("http://localhost:8000/likes");
      const data = await res.json();
      setLikes(data);
    })();
  }, []);

  //お気に入りから削除
  const deleteLikes = async (deletelike:any) => {
    const res = await fetch(`http://localhost:8000/likes/${deletelike.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    document.cookie = `like_product${deletelike.product_id}${deletelike.user_id}=${deletelike.id};path=/; max-age=0; secure`;
    console.log(data, "削除成功");
    setLikes(likes.filter((like: Likes) => like.id !== deletelike.id));
  };

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

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(`http://localhost:8000/cart`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        setCartItems(data);
      } catch (error) {
        console.error("An error occurred:", error);
      }
    })();
  }, []);

  const setCartClick = async (like: any) => {
    const now = new Date();
    const cartId = cartItems.filter((cart) => {
      return cart.product_id === like.product_id;
    });
    if (cartId.length >= 1) {
      alert("こちらの商品は販売終了しました。");
    } else {
      navigate("/cart");
      const res = await fetch(`http://localhost:8000/cart`, {
        method: "POST",
        body: JSON.stringify({
          name: like.name,
          price: Number(like.price),
          image: like.image || "",
          like_date: now,
          user_id: Number(userCookieData),
          category: "",
          product_id: like.product_id,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      window.location.reload();
      console.log("＊＊＊＊＊＊成功＊＊＊＊＊", data);
      deleteLikes(like)
      document.cookie = `like_product${like.product_id}${like.user_id}=${like.id};path=/; max-age=0; secure`;
    }
  };

  const userId = likes.filter((like) => {
    return like.user_id===userCookieData;
  });

  console.log(typeof userId);
  return (
    <>
      <Box my={10} sx={{ fontSize: "23px" }}>
        お気に入りされた商品
      </Box>
      {likes.length >= 1 && userId ? (
        userId.map((like: Likes) => {
          return (
            <>
              <List
                key={like.id}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#e7e7eb",
                  maxWidth: "100%",
                  mb: 5,
                }}
              >
                <Box sx={{ width: 500 }}>
                  <Link href={`productdetail/${like.product_id}`}>
                    <ListItem>
                      <ListItemText>{like.name}</ListItemText>
                      <CardMedia
                        sx={{ height: 100, width: 100 }}
                        image={like.image}
                      />
                    </ListItem>
                  </Link>
                </Box>
                <Box sx={{ width: 200, ml: 5 }}>
                  <ListItem>
                    <ListItemText>{like.price}円</ListItemText>
                  </ListItem>
                </Box>
                <Button
                  onClick={() => setCartClick(like)}
                  sx={{ width: 200, fontWeight: "bold" }}
                >
                  カートに入れる
                </Button>
                <Button
                  sx={{ width: 100, fontWeight: "bold" }}
                  onClick={() => deleteLikes(like)}
                >
                  削除
                </Button>
              </List>
            </>
          );
        })
      ) : (
        <Box>お気に入りされた商品はありません</Box>
      )}
    </>
  );
};

export default Favorite;
