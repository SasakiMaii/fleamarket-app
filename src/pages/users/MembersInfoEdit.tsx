import {
  Avatar,
  Box,
  Button,
  Card,
  CardMedia,
  Grid,
} from "@mui/material";
import React, { useEffect, useState, lazy, Suspense } from "react";
import NickNameInput from "../../components/form/NickNameInput";
import { useNavigate } from "react-router-dom";
import {
  AddressResult,
  Users,
  Items,
} from "../../types/type";
import CryptoJS from "crypto-js";
import { secretKey } from "./Login";
import FirstNameInput from "../../components/form/FirstNameInput";
import LastNameInput from "../../components/form/LastNameInput";
import PostalCodeinput from "../../components/form/PostalCodeinput";
import AddressInput from "../../components/form/AddressInput";
import EmailInput from "../../components/form/EmailInput";
import PhoneInput from "../../components/form/PhoneInput";
import PasswordInput from "../../components/form/PasswordInput";
import ProfileTextarea from "../../components/form/ProfileTextarea";
import ItemImageSelect from "../../components/listing-form/ItemImageSelect";
import { useParams } from "react-router-dom";
//アコーディオン
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const MembersInfoEdit = () => {
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
  const [profile, setProfile] = useState("");
  const [userImageData, setUserImageData] = useState<any[]>([]);
  const [itemImage, setItemImage] = useState("");
  const [nickName, setNickName] = useState("");
  const [user, setUser] = useState<any>([]);
  const [itemImageName, setItemImageName] = useState<any>([]);
  const [userCookieData, setUserCookeData] = useState<any>([]);
  const [items, setItems] = useState<Items[]>([]);
  const [review, setReview] = useState<Items[]>([]);
  const { id } = useParams();

  //cookie復号

  const cookieData = document.cookie
    .split(";")
    .find((cookie) => cookie.trim().startsWith("data="));
  const encryptedData = cookieData ? cookieData.split("=")[1] : "";
  useEffect(() => {
    const decrypts = (data: string | CryptoJS.lib.CipherParams) => {
      const bytes = CryptoJS.AES.decrypt(String(data), secretKey);
      const decrypted = bytes.toString(CryptoJS.enc.Utf8);
      return decrypted;
    };
    if (document.cookie) {
      const decording = decrypts(encryptedData);
      const Cookiedata = JSON.parse(decording);
      setUserCookeData(Cookiedata);
    }
  }, []);

  //image
  useEffect(() => {
    (async () => {
      const res = await fetch(`http://localhost:8000/image/${id}`);
      const data = await res.json();
      setUserImageData(data);
    })();
  }, [setUserImageData]);

  console.log(userImageData[0]);

  //user情報
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`http://localhost:8000/user/${id}`);
      const data = await res.json();
      setUser(data);
    };
    fetchData();
  }, [userCookieData]);

  //出品したアイテムの表示
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`http://localhost:8000/item/${userCookieData}`);
      const data = await res.json();
      setItems(data);
    };
    fetchData();
  }, [userCookieData]);
  console.log(items);

  //レビューの表示
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `http://localhost:8000/itemreview/${userCookieData}`
      );
      const data = await res.json();
      setReview(data);
    };
    fetchData();
  }, [userCookieData]);
  console.log(review, "re");

  //郵便番号から住所取得するAPI
  const getZipCode = async () => {
    const response = await fetch(
      `https://zipcloud.ibsnet.co.jp/api/search?zipcode=${postalCode}`
    );
    const data = await response.json();
    setPostalCodeData(data.results[0]);
  };

  useEffect(() => {
    setPassword(user.password);
    setCity(user.city);
    setStreet(user.street);
    setBuilding(user.bilding);
    setPhone(user.phone);
    setPrefectuer(user.prefecture);
    setNickName(user.nick_name);
    setFirstName(user.first_name);
    setLastName(user.last_name);
    setProfile(user.profile);
    setEmail(user.email);
    setPostalCode(user.postal_code);
  }, [user]);

  //プロフィール写真
  const handleImageChange = (event: any) => {
    const selectedFile = event.target.files[0];
    const reader: any = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onloadend = () => {
      setItemImage(reader.result);
    };
    setItemImageName([selectedFile]);
  };

  console.log(items);
  //プロフィール写真削除
  const clearImage = () => {
    setItemImage("");
  };

  //出品商品を削除
  const deleteItem = async (d: number | undefined) => {
    const res = await fetch(`http://localhost:8000/items/${d}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    console.log(data, "削除成功");
    setItems(items.filter((item: Items) => item.id !== d));
  };

  //更新
  const submitEdit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    try {
      const data: Users = {
        nick_name: nickName || "",
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: password,
        profile: profile || "",
        phone: Number(phone),
        postal_code: postalCode,
        prefecture: prefectuer || postalCodeData.address1,
        city: city || postalCodeData.address2,
        street: street || postalCodeData.address3,
        bilding: building || "",
        image: itemImage || "",
      };
      const response = await fetch(`http://localhost:8000/user/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const resData = await response.json();
      window.location.reload();
      alert("更新が完了しました");
    } catch (error) {
      console.log("era", error);
    }
  };

  const reviewmatch = review
    .map((item: any) => {
      return item.reviews.map((review: any) => review.comment);
    })
    .flat();
  console.log(reviewmatch);
  return (
    <Box mt={10} mb={2}>
      <>
        <Suspense fallback={<div>Loading...</div>}>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            {userImageData.length === 1 &&
              userImageData.map((image, index) => {
                return (
                  <Box key={index}>
                    <Avatar
                      sx={{
                        width: "200px",
                        height: "200px",
                        backgroundSize: "200px",
                      }}
                      alt="profile_image"
                      src={image.image}
                    />
                  </Box>
                );
              })}
          </Box>
          <Box mb={10}>
            {user.nick_name ? user.nick_name : user.first_name}さん
          </Box>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel-content"
              id="panel-header"
            >
              <Typography>会員情報を変更する</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box sx={{ m: "auto" }}>
                <NickNameInput nickName={nickName} setNickName={setNickName} />
                <LastNameInput lastName={lastName} setLastName={setLastName} />
                <FirstNameInput
                  firstName={firstName}
                  setFirstName={setFirstName}
                />
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
                <PhoneInput phone={phone} setPhone={setPhone} />
                <EmailInput setEmail={setEmail} email={email} />
                <PasswordInput password={password} setPassword={setPassword} />
                <ProfileTextarea profile={profile} setProfile={setProfile} />
                <ItemImageSelect
                  itemImage={itemImage}
                  setItemImage={setItemImage}
                  handleImageChange={handleImageChange}
                  itemImageName={itemImageName}
                  setItemImageName={setItemImageName}
                  text="プロフィール画像"
                  clearImage={clearImage}
                />
                <Box mt={3}>
                  <Button
                    type="submit"
                    color="primary"
                    variant="contained"
                    fullWidth
                    data-testid="submit-button"
                    onClick={submitEdit}
                  >
                    登録内容の変更
                  </Button>
                </Box>
              </Box>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>出品した商品</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box
                display="flex"
                justifyContent="center"
                flexWrap="wrap"
                alignItems="center"
              >
                {items.length >= 1 ? (
                  items.map((item) => {
                    return (
                      <Card sx={{ width: "180px", m: 2 }}>
                        <CardMedia
                          sx={{
                            height: 180,
                            width: "100%",
                            flex: "1",
                            backgroundSize: 200,
                          }}
                          image={item.image}
                        />
                        <Box>{item.name}</Box>
                        <Box>¥{item.price}</Box>
                        <Button ata-testid="delete-button" onClick={() => deleteItem(item.id)}>
                          出品を削除
                        </Button>
                      </Card>
                    );
                  })
                ) : (
                  <Box
                    sx={{
                      fontSize: "13px",
                      m: "auto",
                      textAlign: "center",
                      pb: 2,
                    }}
                  >
                    ＊出品した商品はありません＊
                  </Box>
                )}
              </Box>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>自分の評価を確認する</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {reviewmatch.length >= 1 ? (
                review.map((data) => {
                  return (
                    <Grid>
                      {data.reviews.map((review: any) => (
                        <Card
                          sx={{
                            textAlign: "left",
                            p: 2,
                            m: 2,
                            backgroundColor: "#eedcb3",
                          }}
                        >
                          <Box>商品名:{data.name}</Box>
                          <Box>評価:★{review.rating}</Box>
                          <Box>コメント:{review.comment}</Box>
                        </Card>
                      ))}
                    </Grid>
                  );
                })
              ) : (
                <>
                  <Box>評価はありません。</Box>
                </>
              )}
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography>設定</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Button ata-testid="tuuti-button" sx={{ textAlign: "center" }}>通知をオンにする</Button>
            </AccordionDetails>
          </Accordion>
        </Suspense>
      </>
    </Box>
  );
};

export default MembersInfoEdit;
