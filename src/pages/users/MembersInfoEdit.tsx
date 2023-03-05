import { Avatar, Box, Button, Link } from "@mui/material";
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
  const [userData, setUserData] = useState<Users[]>([]);
  const [itemImage, setItemImage] = useState("");
  const [imageError, setImageError] = useState("");
  const [itemImageName, setItemImageName] = useState<any>([]);
  //  const [EditShow, setEditShow] = useState(false);

  const [nickName, setNickName] = useState(userCookie[0]?.nick_name);

  const navigate = useNavigate();

  const cookieData = document.cookie
    .split(";")
    .find((cookie) => cookie.trim().startsWith("data="));
  const encryptedData = cookieData ? cookieData.split("=")[1] : "";

  //cookie復号
  const decrypts = (data: string | CryptoJS.lib.CipherParams) => {
    const bytes = CryptoJS.AES.decrypt(String(data), secretKey);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    return decrypted;
  };

  const getZipCode = async () => {
    const response = await fetch(
      `https://zipcloud.ibsnet.co.jp/api/search?zipcode=${postalCode}`
    );
    const data = await response.json();
    setPostalCodeData(data.results[0]);
  };

  useEffect(() => {
    if (document.cookie) {
      const decording = decrypts(encryptedData);
      // console.log(decording);
      const Cookiedata = JSON.parse(decording);
      setUserCookie(Cookiedata);
      setPassword(Cookiedata[0]?.password);
      setCity(Cookiedata[0]?.city);
      setStreet(Cookiedata[0]?.street);
      setBuilding(Cookiedata[0]?.bilding);
      setPhone(Cookiedata[0]?.phone);
      setPrefectuer(Cookiedata[0]?.prefecture);
      setNickName(Cookiedata[0]?.nick_name);
      setFirstName(Cookiedata[0]?.first_name);
      setLastName(Cookiedata[0]?.last_name);
      setProfile(Cookiedata[0]?.profile);
      setEmail(Cookiedata[0]?.email);
      setPostalCode(Cookiedata[0]?.postal_code);
      console.log(Cookiedata[0]?.postal_code);
    }
  }, []);

  const handleImageChange = (event: any) => {
    const selectedFile = event.target.files[0];
    const reader: any = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onloadend = () => {
      setItemImage(reader.result);
    };
    setItemImageName([selectedFile]);
  };

  const clearImage = () => {
    setItemImage("");
  };

  const submitEdit = (e: any) => {
    e.preventDefault();
    setEmail(userCookie[0]?.email);
  };

  console.log(nickName);
  console.log(userCookie[0]?.nick_name);
  console.log(userCookie[0]?.image)
  return (
    <Box mt={10}  mb={2}>
      <Box sx={{display: 'flex', justifyContent: 'center',}}>
      <Avatar sx={{ width: '90px', height: '90px', border:1 }} alt="profile_image" src={userCookie[0]?.image}/>
      </Box>
      <Box mb={10}>{userCookie[0]?.nick_name}さん</Box>
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
            <NickNameInput nickName={nickName} setNickName={setNickName} />
            <LastNameInput
              lastName={lastName}
              setLastName={setLastName}
              editLastName={userCookie[0]?.last_name}
            />
            <FirstNameInput firstName={firstName} setFirstName={setFirstName} />
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
          <Typography>
          </Typography>
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
          <Typography>
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default MembersInfoEdit;
