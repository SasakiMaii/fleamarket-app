import React, { useEffect, useState } from "react";
import EmailInput from "../../components/form/EmailInput";
import NickNameInput from "../../components/form/NickNameInput";
import PasswordInput from "../../components/form/PasswordInput";
import Box from "@mui/material/Box";
import LastNameInput from "../../components/form/LastNameInput";
import FirstNameInput from "../../components/form/FirstNameInput";
import ProfileTextarea from "../../components/form/ProfileTextarea";
import PostalCodeinput from "../../components/form/PostalCodeinput";
import AddressInput from "../../components/form/AddressInput";
import { Avatar, Button, Grid, Paper, Typography, Link } from "@mui/material";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import { pink } from "@mui/material/colors";
import PhoneInput from "../../components/form/PhoneInput";
import { AddressResult, Users } from "../../types/type";
import { useNavigate } from "react-router-dom";
import ItemImageSelect from "../../components/listing-form/ItemImageSelect";

const Register = () => {
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
  const [nickName, setNickName] = useState("");
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
  const navigate = useNavigate();

  const getZipCode = async () => {
    const response = await fetch(
      `https://zipcloud.ibsnet.co.jp/api/search?zipcode=${postalCode}`
    );
    const data = await response.json();
    setPostalCodeData(data.results[0]);
  };

  useEffect(() => {
    (async () => {
      const response = await fetch("http://localhost:8000/user");
      const data = await response.json();
      setUserData([data[0]]);
    })();
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

  const emailMatch = userData.some((data) => data.email === email);


  const validateImage = () => {
    const imageSizeLimit = 5 * 1024 * 1024; // ??????5MB
    const allowedImageTypes = ["image/png", "image/jpeg", "image/jpg"];
    if (itemImageName[0].size > imageSizeLimit) {
      setImageError("*????????????????????????????????????");
      return false;
    }
    if (!allowedImageTypes.includes(itemImageName[0].type)) {
      setImageError("*?????????????????????????????????????????????.jpeg/.jpg/.png????????????");
      return false;
    }
    setImageError("");
    return true;
  };

  const validateEmail = () => {
    if (!email) {
      setEmailError("*????????????????????????????????????????????????");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("*?????????????????????????????????????????????????????????");
      return false;
    }
    if (emailMatch) {
      setEmailError("*??????????????????????????????????????????????????????");
      return false;
    }
    setEmailError("");
    return true;
  };

  const validatePhone = () => {
    if (!phone) {
      setPhoneError("*???????????????????????????????????????");

      return false;
    }
    if (!/^[0-9-+]+$/.test(phone)) {
      setPhoneError("*????????????????????????????????????????????????");

      return false;
    }
    setPhoneError("");
    return true;
  };

  const validateName = () => {
    if (!lastName && !firstName) {
      setNameError("*????????????????????????????????????");

      return false;
    }
    setNameError("");
    return true;
  };

  const validatePass = () => {
    if (!password) {
      setPasswordError("*??????????????????????????????????????????");
      return false;
    }
    if (!/^[a-zA-Z0-9.?/-]{8,24}$/.test(password)) {
      setPasswordError(
        "*???????????????????????????????????????(??????????????????)??????????????????????????????(.)??????????????????(/)??????????????????????????????(?)???????????????(-)????????????????????????????????????????????????????????????"
      );
      return false;
    }
    setPasswordError("");
    return true;
  };

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
      setAddressError("*?????????????????????????????????");
      return false;
    }
    setAddressError("");
    return true;
  };

  const submitRegister = async (e: any) => {
    e.preventDefault();
    const isPassValid = validatePass();
    const isEmailValid = validateEmail();
    const isPhoneValid = validatePhone();
    const isAddressValid = validateAddress();
    const isNameValid = validateName();
    const isImageValid = validateImage();

    if (
      isEmailValid &&
      isPhoneValid &&
      isAddressValid &&
      isPassValid &&
      isNameValid &&
      isImageValid
    ) {
      try {
        const data = {
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
          image: itemImage || "",
          order:""
        };
        const response = await fetch("http://localhost:8000/user", {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const responseData = await response.json();
        console.log(responseData)
        navigate("/login");
      } catch (err) {
        console.log(err, "?????????");
      }
    }
  };
  return (
    <Box mt={10}>
      <Grid>
        <Grid
          container
          direction="column"
          justifyContent="flex-start"
          alignItems="center"
        >
          <Avatar sx={{ bgcolor: pink[400] }}>
            <HowToRegIcon />
          </Avatar>
          <Typography variant={"h5"} sx={{ m: "30px" }}>
            ????????????
          </Typography>
        </Grid>
        <form onSubmit={submitRegister}>
          <Box flexDirection="column">
            <NickNameInput nickName={nickName} setNickName={setNickName} />
            {nameError && (
              <p style={{ color: "red", fontSize: 13 }}>{nameError}</p>
            )}
            <LastNameInput lastName={lastName} setLastName={setLastName} />
            <FirstNameInput firstName={firstName} setFirstName={setFirstName} />
            {addressError && (
              <p style={{ color: "red", fontSize: 13 }}>{addressError}</p>
            )}
            <PostalCodeinput
              postalCode={postalCode}
              setPostalCode={setPostalCode}
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
            {emailError && (
              <p style={{ color: "red", fontSize: 13 }}>{emailError}</p>
            )}
            <EmailInput email={email} setEmail={setEmail} />
            {passwordError && (
              <p style={{ color: "red", fontSize: 13 }}>{passwordError}</p>
            )}
            <PasswordInput password={password} setPassword={setPassword} />
            <ProfileTextarea profile={profile} setProfile={setProfile} />
            {imageError && (
              <p style={{ color: "red", fontSize: 13 }}>{imageError}</p>
            )}
            <ItemImageSelect
              itemImage={itemImage}
              setItemImage={setItemImage}
              handleImageChange={handleImageChange}
              itemImageName={itemImageName}
              setItemImageName={setItemImageName}
              text="????????????????????????"
              clearImage={clearImage}
            />
          </Box>
          <Box mt={3}>
            <Button
              type="submit"
              color="primary"
              variant="contained"
              fullWidth
              onClick={submitRegister}
            >
              ??????
            </Button>
          </Box>
          <Box mt={5}>
            <Link href="/login">????????????????????????????????????</Link>
          </Box>
        </form>
      </Grid>
    </Box>
  );
};

export default Register;
