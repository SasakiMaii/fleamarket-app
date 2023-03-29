import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { CartType, Items, Users } from "../types/type";
import { NavLink } from "react-router-dom";
import { secretKey } from "./users/Login";
import CryptoJS from "crypto-js";
import CategorySearch from "../components/feature/CategorySearch";

const Top = () => {
  const [items, setItems] = useState<Items[]>([]);
  const [userCookie, setUserCookie] = useState<Users[]>([]);
  const [user, setUser] = useState<Users[]>([]);
  const [cart, setCart] = useState<CartType[]>([]);
  const [itemCategory, setItemcategory] = useState("");

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
    if (document.cookie
      .split("; ")
      .find((cookie) =>
        cookie.startsWith(`data=`)
      )) {
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
        setCart(
          data[Number(userCookie)] === undefined ? [] : data[Number(userCookie)]
        );
      } catch (err) {
        console.log("エラー", err);
      }
    }
    if (userCookie) {
      fetchCart();
    }
  }, [userCookie]);


  //Item情報
  useEffect(() => {
    (async () => {
      const res = await fetch("http://localhost:8000/items");
      const data = await res.json();
      setItems(data);
    })();
  }, []);

  //user情報
  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/user/${userCookie}`
        );
        const userdata = await response.json();
        setUser(userdata);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  //cookieのユーザIdと一致したuserを取得
  const userMutch = user.filter((data) => {
    return data.id === Number(userCookie);
  });

  return (
    <Box sx={{ backgroundImage: "url(../public/beig.jpeg)" }}>
      <Box
        sx={{
          backgroundImage: "url(../public/fleamarket.png)",
          maxWidth: "100%",
          minWidth: "100%",
          height: 200,
        }}
      >
        &emsp;
      </Box>
      <Box
        sx={{
          marginRight: 0,
          textAlign: "rigth",
          flex: "right",
          mt: 7,
          pt: 2,
          mb: 3,
        }}
      >
        <CategorySearch
          items={items}
          setItems={setItems}
          setItemcategory={setItemcategory}
          itemCategory={itemCategory}
        />
      </Box>
      <Box
        mb={5}
        sx={{ borderBottom: 1, fontWeight: "bold", pb: 1.5, color: "#726F6A" }}
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
        {items.length >= 1 ? (
          items.map((item: Items) => {
            return (
              <Box mb={5} key={item.id} width="200px" mx={2}>
                <div key={item.id}>
                  <NavLink to={`productdetail/${item.id}`}>
                    <Card
                      sx={{
                        maxWidth: 200,
                        p: 2,
                        alignItems: "center",
                      }}
                    >
                      <CardMedia
                        sx={{
                          height: 110,
                          width: "100%",
                          flex: "1",
                          backgroundSize: 200,
                        }}
                        image={item.image}
                      />

                      <Box
                        sx={{ fontSize: 12, mb: 1, fontWeight: "bold", p: 1 }}
                      >
                        {item.name}
                      </Box>
                      {item.state === false ? (
                        <Box
                          sx={{
                            backgroundColor: "#fff",
                            borderBlockColor: "#000",
                            borderRadius: 3,
                            p: 1,
                            color: "#ff0000",
                          }}
                        >
                          SOLD
                        </Box>
                      ) : (
                        <Box
                          sx={{
                            backgroundColor: "#e7e7eb",
                            borderRadius: 3,
                            p: 1,
                          }}
                        >
                          ¥{item.price?.toLocaleString()}
                        </Box>
                      )}

                    </Card>
                  </NavLink>
                </div>
              </Box>
            );
          })
        ) : (
          <Box sx={{ p: 20 }}>一致する商品はありません</Box>
        )}
      </Box>
    </Box>
  );
};

export default Top;


