import { Avatar, Box, Button, CardMedia, Link } from "@mui/material";
import React, { useEffect, useState } from "react";
import NickNameInput from "../../components/form/NickNameInput";
import { useNavigate } from "react-router-dom";
import { AddressResult, StylesProps, Users } from "../../types/type";
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
  const [userCookie, setUserCookie] = useState<any>([]);
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
  const [passwordError, setPasswordError] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [addressError, setAddressError] = useState("");
  const [userImageData, setUserImageData] = useState<any[]>([]);
  const [itemImage, setItemImage] = useState("");
  const [imageError, setImageError] = useState("");
  const [nickName, setNickName] = useState("");
  const [user, setUser] = useState<any>([]);
  const [itemImageName, setItemImageName] = useState<any>([]);

  const navigate = useNavigate();
  const { id } = useParams();

  //image
  useEffect(() => {
    (async () => {
      const res = await fetch(`http://localhost:8000/image/${id}`);
      const blob = await res.blob();
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onload = () => {
        const base64data = reader.result;
        setUserImageData([base64data]);
      };
    })();
  }, []);
  //user情報
  useEffect(() => {
    (async () => {
      const res = await fetch(`http://localhost:8000/user/${id}`);
      const data = await res.json();
      setUser(data);
    })();
  }, []);


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

  //郵便番号から住所取得するAPI
  const getZipCode = async () => {
    const response = await fetch(
      `https://zipcloud.ibsnet.co.jp/api/search?zipcode=${postalCode}`
    );
    const data = await response.json();
    setPostalCodeData(data.results[0]);
  };

  //cookieに入っているデータを復号してから、inputタブに表示
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
      console.log(user,"user")

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

  //プロフィール写真削除
  const clearImage = () => {
    setItemImage("");
  };

  // 暗号化
function encrypt(data: string | CryptoJS.lib.WordArray) {
  const encrypted = CryptoJS.AES.encrypt(data, secretKey).toString();
  return encrypted;
}

  //更新
  const submitEdit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    try {
      const data:Users = {
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
        bilding: building,
        // image: itemImageName[0].name || "",
      };
      const response = await fetch(`http://localhost:8000/user/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const resData = await response.json();
      console.log(resData)
      alert('更新が完了しました')
    } catch (error) {
      console.log("era", error);
    }
  };
  console.log(user.nick_name)

  return (
    <Box mt={10} mb={2}>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        {userImageData.length === 1 &&
          userImageData.map((iamgeData) => {
            return (
              <Box key={iamgeData}>
                <Avatar
                  sx={{ width: "90px", height: "90px", border: 1 }}
                  alt="profile_image"
                  src={iamgeData[0]}
                />
              </Box>
            );
          })}
      </Box>
          <Box mb={10}>{user.nick_name?user.nick_name:user.first_name}さん</Box>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          >
          <Typography>会員情報を変更する</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box>
            <>
              <NickNameInput
                nickName={nickName}
                setNickName={setNickName}
              />
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
              {/* <ItemImageSelect
  itemImage={itemImage}
  setItemImage={setItemImage}
  handleImageChange={handleImageChange}
  itemImageName={itemImageName}
  setItemImageName={setItemImageName}
  text="プロフィール画像"
  clearImage={clearImage}
/> */}
            </>

            <Box mt={3}>
              <Button
                type="submit"
                color="primary"
                variant="contained"
                fullWidth
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
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>売上金の確認</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography></Typography>
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
          <Typography></Typography>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default MembersInfoEdit;
