import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Button, Link } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { Items, CartType } from "../../types/type";
import { useEffect } from "react";
import { secretKey } from "../users/Login";
import CryptoJS from "crypto-js";

const Cart = () => {
  const [userCookieData, setUserCookieData] = useState<any>([]);
  const [cart, setCart] = useState<CartType[]>([]);
  const navigate=useNavigate()
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

//ログイン中ユーザのカートの中身
  useEffect(() => {
    (async()=>{
      try {
        const response = await fetch(
          `http://localhost:8000/cart/${userCookieData}`
        );
        const data = await response.json();
        setCart(
          data[Number(userCookieData)] === undefined
            ? []
            : data[Number(userCookieData)]
        );
      } catch (err) {
        console.log("エラー", err);
      }
    })()
  }, [userCookieData]);

  //カートに入っているアイテムの削除
  const onCartItemDelete = async (id: number | undefined,cartProductId:number|undefined) => {
    const res: any = await fetch(`http://localhost:8000/cart/${Number(id)}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).catch((err) => {
      console.log(err, "エラー");
    });
    const data = await res.json();
    const res2: any = await fetch(
      `http://localhost:8000/orderitems/${cartProductId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          order_id:0,
        }),
      }
    ).catch((err) => {
      console.log(err, "エラー2");
    });
    const result2 = await res2.json();
    setCart(cart.filter((item: Items) => item.id !== id));
  };

  const onPurchaseConfirm=()=>{
    navigate(`/purchaseconfirmation/${userCookieData}`)
    window.location.reload()
  }

  
  //売り切れじゃない商品
  const cartState:any=cart.length>=1&&cart.filter((item)=>{
    return item.state===true
  })
  const allPrice =
  cartState.length >= 1 &&
  cartState.reduce((acc: number, item: Items) => acc + Number(item.price), 0);

  return (
    <Box mt={10}>
      {cartState.length >= 1 ? (
        <>
          <Box sx={{ borderBottom: 1 }}>カートの確認</Box>
          <TableContainer component={Paper} sx={{ marginTop: 5 }}>
            <Table sx={{ maxWidth: 650 }} aria-label="spanning table">
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
                {cartState.map((cart: CartType) => {
                  return (
                    <TableRow key={cart.id}>
                      <TableCell sx={{ display: "flex", alignItems: "center" }}>
                        <Link
                          href={`/productdetail/${Number(cart.product_id)}`}
                          sx={{ mr: 2 }}
                        >
                          <img
                            width={100}
                            height={100}
                            src={cart.image}
                            alt={cart.name}
                          />
                        </Link>
                        <Link
                          href={`/productdetail/${Number(cart.product_id)}`}
                          sx={{ maxWidth: 200 }}
                        >
                          {cart.name}
                        </Link>
                      </TableCell>
                      <TableCell align="right">
                        ¥ {cart.price?.toLocaleString()}
                      </TableCell>
                      <TableCell align="right">
                        <Button onClick={() => onCartItemDelete(cart.id,cart.product_id)}>
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

          <Button
            variant="contained"
            disableElevation
            sx={{ marginTop: 5, ml: 5 }}
            onClick={onPurchaseConfirm}>
            購入手続きへ
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
