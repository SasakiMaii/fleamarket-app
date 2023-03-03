import { Box, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import NickNameInput from "../../components/form/NickNameInput";
import { useNavigate } from "react-router-dom";
import { AddressResult, Users } from "../../types/type";
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
  const [passwordError, setPasswordError] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [addressError, setAddressError] = useState("");
  const [userData, setUserData] = useState<Users[]>([]);
  const [itemImage, setItemImage] = useState("");
  const [imageError, setImageError] = useState("");
  const [itemImageName, setItemImageName] = useState<any>([]);
  const [userCookie, setUserCookie] = useState<Users[]>([]);
  const [nickName, setNickName] = useState("");
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
      console.log(decording);
      const Cookiedata = JSON.parse(decording);
      console.log(Cookiedata[0].nick_name);
      setUserCookie(Cookiedata);
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
  };

  console.log(nickName);
  console.log(userCookie[0]?.nick_name);
  return (
    <Box my={10}>
      <Box>会員情報</Box>
      <NickNameInput
        nickName={nickName}
        setNickName={setNickName}
        editNickName={userCookie[0]?.nick_name}
      />
      <LastNameInput
        lastName={lastName}
        setLastName={setLastName}
        editLastName={userCookie[0]?.last_name}
      />
      <FirstNameInput firstName={firstName} setFirstName={setFirstName}         editFirstName={userCookie[0]?.first_name}/>
      <PostalCodeinput setPostalCode={setPostalCode} getZipCode={getZipCode}  editPostalCode={userCookie[0]?.postal_code}/>
      <AddressInput
        postalCodeData={postalCodeData}
        prefectuer={prefectuer}
        setPrefectuer={setPrefectuer}
        editPrefecture={userCookie[0]?.prefecture}
        city={city}
        setCity={setCity}
        editCity={userCookie[0]?.city}
        street={street}
        setStreet={setStreet}
        editStreet={userCookie[0]?.street}
        building={building}
        setBuilding={setBuilding}
        editBilding={userCookie[0]?.bilding}
      />
      <PhoneInput phone={phone} setPhone={setPhone} editPhone={userCookie[0]?.phone} />
      <EmailInput setEmail={setEmail} editEmail={userCookie[0]?.email}/>
      <PasswordInput password={password} setPassword={setPassword} editPass={userCookie[0]?.password}/>
      <ProfileTextarea profile={profile} setProfile={setProfile} editProfile={userCookie[0]?.profile} />
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
  );
};

export default MembersInfoEdit;
