import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CartType, Items, Users } from "../types/type";
import { Link, NavLink } from "react-router-dom";
import { useContext } from "react";
import { SessionContext } from "../App";
import { secretKey } from "./users/Login";
import CryptoJS from "crypto-js";

const Top = () => {
  const [items, setItems] = useState<Items[]>([]);
  const [userCookie, setUserCookie] = useState<Users[]>([]);
  const [user, setUser] = useState<Users[]>([]);
  const { session, setSession } = useContext(SessionContext);
  const [cart, setCart] = useState<CartType[]>([]);

  //cookie復号
  const cookieData = document.cookie
    .split(";")
    .find((cookie) => cookie.trim().startsWith("data="));
  const encryptedData = cookieData ? cookieData.split("=")[1] : "";
  const decrypts = (data: string | CryptoJS.lib.CipherParams) => {
    const bytes = CryptoJS.AES.decrypt(String(data), secretKey);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    return decrypted;
  };
  useEffect(() => {
    if (document.cookie) {
      const decording = decrypts(encryptedData);
      const Cookiedata = JSON.parse(decording);
      setUserCookie(Cookiedata);
    }
  }, []);

  //ログイン中ユーザのカートの中身
  useEffect(() => {
    async function fetchCart() {
      try {
        const response = await fetch(
          `http://localhost:8000/cart/${userCookie}`
        );
        const data = await response.json();
        console.log(data);
        setCart(
          data[Number(userCookie)] === undefined
            ? []
            : data[Number(userCookie)]
        );
        console.log(data[Number(userCookie)]);
      } catch (err) {
        console.log("エラー", err);
      }
    }
    if (userCookie) {
      fetchCart();
    }
  }, [userCookie]);

  console.log(cart);

//Item情報
  useEffect(() => {
    (async () => {
      const res = await fetch("http://localhost:8000/items");
      const data = await res.json();
      setItems(data);
    })();
  }, []);

  console.log(items, "item");



//user情報
  useEffect(() => {
    ( async() => {
      try {
        const response = await fetch(
          `http://localhost:8000/user/${userCookie}`
        );
        const userdata = await response.json();
        console.log("user", userdata);
        setUser(userdata);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  const userMutch =user.filter(data=>{
    return data.id===Number(userCookie)
  })
console.log(userMutch)

const cartState=cart.length>=1&&cart.filter((item)=>{
  return item.state===false
})

console.log(cartState)

  return (
    <Box sx={{backgroundImage:"url(../public/TopImage.png)",}}>
      {document.cookie ? (
        <Box mt={8} mb={5} pt={5} >
          {userMutch.length === 1 &&
            userMutch.map((data) => <Box key={data.id}>{data.nick_name?data.nick_name:data.first_name}さんようこそ</Box>)}
        </Box>
      ) : (
        <Box mt={10} mb={5}>
          現在ログインしていません
          <Link to={"/login"}>ログインページへ移動</Link>
        </Box>
      )}
      <Box
        mt={10}
        mb={5}
        sx={{ borderBottom: 1, fontWeight: "bold" }}
        textAlign="center"
      >
        出品商品一覧
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        flexWrap="wrap"
        alignItems="center"
      >
        {items.map((item: Items) => {
          return (
            <Box mb={5} key={item.id} width="200px" mx={2}>
              <div key={item.id}>
                <NavLink to={`productdetail/${item.id}`}>
                  <Card
                    sx={{
                      maxWidth: 200,
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <CardMedia
                      sx={{
                        height: 180,
                        width: "100%",
                        flex: "1",
                        backgroundSize: 110,
                      }}
                      image={item.image}
                      />
                    <CardContent sx={{ flex: "1" }}>
                      <Typography
                        gutterBottom
                        component="div"
                        sx={{ fontSize: 12, mb: 1,fontWeight:"bold" }}
                      >
                        {item.name}
                      </Typography>
                      {item.state===false ? (
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  sx={{
                    backgroundColor: "#fff",
                    borderBlockColor:"#000",
                    borderRadius: 3,
                    p: 1,
                    color: "#ff0000",
                  }}
                >
                  SOLD
                </Typography>
              ) : (
                <Typography
                  gutterBottom
                  variant="h6"
                  component="div"
                  sx={{ backgroundColor: "#e7e7eb", borderRadius: 3, p: 1 }}
                >
                  ¥{item.price?.toLocaleString()}
                </Typography>
              )}
            </CardContent>
          </Card>
        </NavLink>
              </div>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
    };

export default Top;
