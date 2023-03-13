import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Button,Link } from "@mui/material";
import {  useLocation } from "react-router-dom";
import { Items, CartType } from "../../types/type";
import { useEffect } from "react";
import { secretKey } from "../users/Login";
import CryptoJS from "crypto-js";

const Cart = () => {
  const [userCookieData, setUserCookieData] = useState<any>([]);
  const [cart, setCart] = useState<CartType[]>([]);
  const location = useLocation();
  const itemData = location.state;

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
  console.log(userCookieData);

  useEffect(() => {
    async function fetchCart() {
      try {
        const response = await fetch(
          `http://localhost:8000/cart/${userCookieData}`
        );
        const data = await response.json();
        console.log(data)
        setCart(data[Number(userCookieData)]===undefined?[]:data[Number(userCookieData)]);
        console.log(data[Number(userCookieData)]);
      } catch (err) {
        console.log("エラー", err);
      }
    }
    if (userCookieData) {
      fetchCart();
    }
  }, [userCookieData]);

  console.log(cart);

  const allPrice =
    cart.length>=1 &&
    cart.reduce((acc: number, item: Items) => acc + Number(item.price), 0);

  //カートに入っているアイテムの削除
  const onCartItemDelete = async (id: number | undefined) => {
    const res: any = await fetch(`http://localhost:8000/cart/${Number(id)}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).catch((err) => {
      console.log(err, "エラー");
    });
    const data = await res.json();
    console.log("削除", data);
    setCart(cart.filter((item: Items) => item.id !== id));
  };

  return (
    <Box mt={10}>
      {cart.length>=1 ? (
        <>
          <Box sx={{ borderBottom: 1 }}>購入内容の確認</Box>
          <TableContainer component={Paper} sx={{ marginTop: 5 }}>
            <Table sx={{ minWidth: 650 }} aria-label="spanning table">
              <TableHead>
                <TableRow sx={{ borderBottom: 1, color: "#E0E0E0" }}>
                  <TableCell sx={{ fontWeight: "bold" }}>
                    カートに入っている商品
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    金額
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cart.map((item: CartType) => {
                  return (
                    <TableRow key={item.id}>
                      <TableCell sx={{ display: "flex", alignItems: "center" }}>
                        <Link href={`/productdetail/${Number(item.product_id)}`} sx={{ mr: 2 }}>
                          <img
                            width={100}
                            height={100}
                            src={item.image}
                            alt={item.name}
                          />
                        </Link>
                        <Link href={`/productdetail/${Number(item.product_id)}`} sx={{ width: 200 }}>{item.name}</Link>
                      </TableCell>
                      <TableCell align="right">
                        ¥ {item.price?.toLocaleString()}
                      </TableCell>
                      <TableCell align="right">
                        <Button onClick={() => onCartItemDelete(item.id)}>
                          削除
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
                <TableRow>
                  <TableCell colSpan={2}>合計</TableCell>
                  <TableCell align="right" sx={{ fontSize: 20 }}>
                    ¥ {allPrice?.toLocaleString()}
                    <span style={{ fontSize: 12 }}>(税込)</span>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
 
          <Button variant="contained" disableElevation sx={{ marginTop: 5,ml:5 }}>
            カートに入れる
          </Button>

        </>
      ) : (
        <>
          <Box sx={{ m: 5, fontSize: 20 }}>
            現在カートの中に商品は入っていません
          </Box>
          <Link href="/">トップ場面へ</Link>
        </>
      )}
    </Box>
  );
};

export default Cart;
