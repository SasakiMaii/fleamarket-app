import React, { useState } from "react";
import { useEffect } from "react";
import { AddressResult, CartType, Items } from "../../types/type";
import { secretKey } from "../users/Login";
import CryptoJS from "crypto-js";
import {
  Box,
  Button,
  Divider,
  Grid,
  Link,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import PaymentMethods from "../../components/cart-form/PaymentMethods";
import AddressInput from "../../components/form/AddressInput";
import FirstNameInput from "../../components/form/FirstNameInput";
import LastNameInput from "../../components/form/LastNameInput";
import PhoneInput from "../../components/form/PhoneInput";
import PostalCodeinput from "../../components/form/PostalCodeinput";
import { useNavigate, useParams } from "react-router-dom";
import CheckoutForm from "../../components/cart-form/CheckoutForm";

const PurchaseConfirmation = () => {
  const [userCookieData, setUserCookieData] = useState<any>([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [postalCodeData, setPostalCodeData] = useState<AddressResult>({});
  const [prefectuer, setPrefectuer] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [building, setBuilding] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [cart, setCart] = useState<CartType[]>([]);
  const [user, setUser] = useState<any>([]);
  const [nameError, setNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [selectedError, setSelectedError] = useState("");
  const [addressError, setAddressError] = useState("");
  const [items, setItems] = useState<Items[]>([]);

  // const [loading, setLoading] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();
  // const stripePromise = loadStripe(
  //   "pk_test_51MlMrOB3V27vlWJWlPWsfkQet7REEO553Sw8PKjllmqPucZZvoUBUrY9YzqykxH6HQRhshMUc8s0lF684DJJjKDt00P4HYw7xz"
  // );

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

  //ログイン中ユーザのカート内容
  useEffect(() => {
    async function fetchCart() {
      try {
        const response = await fetch(
          `http://localhost:8000/cart/${userCookieData}`
        );
        const data = await response.json();
        setCart(data[Number(userCookieData)]);
        console.log(data[Number(userCookieData)]);
      } catch (err) {
        console.log("エラー", err);
      }
    }
    if (userCookieData) {
      fetchCart();
    }
  }, [userCookieData]);

  //商品の取得
  useEffect(() => {
    async function fetchCart() {
      try {
        const response = await fetch(`http://localhost:8000/items`);
        const data = await response.json();
        setItems(data);
        console.log(data);
      } catch (err) {
        console.log("エラー", err);
      }
    }
    if (userCookieData) {
      fetchCart();
    }
  }, []);

  //住所検索API
  const getZipCode = async () => {
    const response = await fetch(
      `https://zipcloud.ibsnet.co.jp/api/search?zipcode=${postalCode}`
    );
    const data = await response.json();
    setPostalCodeData(data.results[0]);
  };

  //user情報
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`http://localhost:8000/user/${id}`);
      const data = await res.json();
      setUser(data);
    };
    fetchData();
  }, [setUser]);

  useEffect(() => {
    setCity(user.city);
    setStreet(user.street);
    setBuilding(user.bilding);
    setPhone(user.phone);
    setPrefectuer(user.prefecture);
    setFirstName(user.first_name);
    setLastName(user.last_name);
    setEmail(user.email);
    setPostalCode(user.postal_code);
  }, [user]);

  //バリデーション
  const validatePhone = () => {
    if (!phone) {
      setPhoneError("*電話番号を入力してください");

      return false;
    }
    if (!/^[0-9-+]+$/.test(phone)) {
      setPhoneError("*有効な電話番号を入力してください");

      return false;
    }
    setPhoneError("");
    return true;
  };
  //名前バリデーション
  const validateName = () => {
    if (!lastName && !firstName) {
      setNameError("*性・名を入力してください");

      return false;
    }
    setNameError("");
    return true;
  };
  //支払い方法
  const validatePayment = () => {
    if (!selectedOption) {
      setSelectedError("*支払い方法を選択してください");

      return false;
    }
    setSelectedError("");
    return true;
  };
  //住所バリデーション
  const validateAddress = () => {
    if (
      !postalCode &&
      !prefectuer &&
      !city &&
      !street &&
      !postalCodeData.address1 &&
      !postalCodeData.address2 &&
      !postalCodeData.address3
    ) {
      setAddressError("*住所を入力してください");
      return false;
    }
    setAddressError("");
    return true;
  };
  console.log(typeof cart, "カート", cart);

  function compareArrays(arr1: string[], arr2: string[]): string[] {
    const matchingData: string[] = [];
    for (let i = 0; i < arr1.length; i++) {
      if (arr2.includes(arr1[i])) {
        matchingData.push(arr1[i]);
      }
    }
    return matchingData;
  }

  const cartProductId: any =
    cart.length >= 1 &&
    cart.map((data) => {
      return Number(data.product_id);
    });
  const cartItemId: any =
    items.length >= 1 &&
    items.map((data) => {
      return Number(data.id);
    });
    console.log(cartItemId,111)
    console.log(cartProductId,111)
  const matchingData = compareArrays(cartProductId, cartItemId);
  const matchingDataInt = matchingData.map((id) => parseInt(id, 10));

  //購入処理
  const submitRegister = async (e: any) => {
    e.preventDefault();
    const isPhoneValid = validatePhone();
    const isAddressValid = validateAddress();
    const isNameValid = validateName();
    const isPayment = validatePayment();

    if (
      isPhoneValid &&
      isAddressValid &&
      isNameValid &&
      isPayment&&
      selectedOption==="コンビニ払い"
    ) {
       console.log("a")
      const data = {
        price: allPrice,
        orderedAt: new Date(),
        user_id: Number(userCookieData),
        carts: cart,
      };

      const response = await fetch("http://localhost:8000/orders", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const responseData = await response.json();
      console.log(responseData, "dataaaa");
      const res: any = await fetch(
        `http://localhost:8000/cartstate/${Number(id)}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            state: false,
          }),
        }
      ).catch((err) => {
        console.log(err, "エラー2");
      });
      const result = await res.json();
      console.log("///state変更完了///", result);
      //購入したID
      const res2: any = await fetch(
        `http://localhost:8000/itemstate/${userCookieData}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            state: false,
          }),
        }
      ).catch((err) => {
        console.log(err, "エラー2");
      });
      const result2 = await res2.json();
      console.log("///state2変更完了///", result2);
      setCart(cart.filter((item: Items) => item.id !== id));
      navigate("/paymentcompletion");
    } else if (selectedOption === "クレジットカード払い") {
      const data = {
        price: allPrice,
        orderedAt: new Date(),
        user_id: Number(userCookieData),
        carts: cart
      };

      const response = await fetch("http://localhost:8000/orders", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const responseData = await response.json();
      console.log(responseData, "dataaaa");
      const res: any = await fetch(
        `http://localhost:8000/cartstate/${Number(id)}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            state: false,
          }),
        }
      ).catch((err) => {
        console.log(err, "エラー2");
      });
      const result = await res.json();
      console.log("///state変更完了///", result);
      //購入したID
      const res2: any = await fetch(
        `http://localhost:8000/itemstate/${userCookieData}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            state: false,
          }),
        }
      ).catch((err) => {
        console.log(err, "エラー2");
      });
      const result2 = await res2.json();
      console.log("///state2変更完了///", result2);
      setCart(cart.filter((item: Items) => item.id !== id));
      navigate("/creditpayment",{state:allPrice});
    }
  };

  const cartState: any =
    cart.length >= 1 &&
    cart.filter((item) => {
      return item.state === true;
    });

  const allPrice =
    cartState.length >= 1 &&
    cartState.reduce((acc: number, item: Items) => acc + Number(item.price), 0);

  console.log(cartState);
  console.log(selectedOption);

  return (
    <>
      <Grid item xs={12}>
        <Divider sx={{ marginTop: 10, fontWeight: "bold" }}>購入内容</Divider>
        <Table sx={{ maxWidth: 800 }} aria-label="spanning table">
          <TableHead>
            <TableRow sx={{ borderBottom: 1, color: "#E0E0E0" }}>
              <TableCell>カートに入っている商品</TableCell>
              <TableCell></TableCell>
              <TableCell align="center">金額</TableCell>
            </TableRow>
          </TableHead>
          {cartState.length >= 1 && (
            <TableBody>
              {cartState.map((item: CartType) => {
                return (
                  <TableRow key={item.id}>
                    <TableCell sx={{ display: "flex", alignItems: "center" }}>
                      <Link
                        href={`/productdetail/${Number(item.product_id)}`}
                        sx={{ mr: 2 }}
                      >
                        <img
                          width={100}
                          height={100}
                          src={item.image}
                          alt={item.name}
                        />
                      </Link>
                      <Link
                        href={`/productdetail/${Number(item.product_id)}`}
                        sx={{maxWidth: 200 }}
                      >
                        {item.name}
                      </Link>
                    </TableCell>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center">
                      ¥ {item.price?.toLocaleString()}
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
          )}
        </Table>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Paper sx={{ px: 4 }}>
          <Divider sx={{ marginTop: 5, fontWeight: "bold" }}>
            支払い方法
          </Divider>
          {selectedError && (
            <p style={{ color: "red", fontSize: 13 }}>{selectedError}</p>
          )}
          <PaymentMethods
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
          />
          <Typography sx={{ maxWidth: 500, m: "auto", mt: 5 }}></Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Paper sx={{ px: 4, pb: 4 }}>
          <Divider sx={{ marginTop: 5, fontWeight: "bold" }}>
            配送先情報
          </Divider>
          <Box
            sx={{
              maxWidth: 500,
              m: "auto",
              mt: 1,
              fontSize: "12px",
            }}
          >
            *配送先が登録と別住所の場合は入力内容を変更してください。
          </Box>

          <Box>
            {nameError && (
              <p style={{ color: "red", fontSize: 13 }}>{nameError}</p>
            )}
            <LastNameInput lastName={lastName} setLastName={setLastName} />
            <FirstNameInput firstName={firstName} setFirstName={setFirstName} />
            {addressError && (
              <p style={{ color: "red", fontSize: 13 }}>{addressError}</p>
            )}
            <PostalCodeinput
              setPostalCode={setPostalCode}
              postalCode={postalCode}
              getZipCode={getZipCode}
            />
            <AddressInput
              postalCodeData={postalCodeData}
              prefectuer={prefectuer}
              setPrefectuer={setPrefectuer}
              city={city}
              setCity={setCity}
              street={street}
              setStreet={setStreet}
              building={building}
              setBuilding={setBuilding}
            />
            {phoneError && (
              <p style={{ color: "red", fontSize: 13 }}>{phoneError}</p>
            )}
            <PhoneInput phone={phone} setPhone={setPhone} />
          </Box>
        </Paper>
      </Grid>
      <Button
        type="submit"
        color="primary"
        variant="contained"
        onClick={submitRegister}
        sx={{maxWidth: 200, my: 8 }}
      >
        購入する
      </Button>
    </>
  );
};

export default PurchaseConfirmation;
