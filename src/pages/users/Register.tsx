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
// import ImageRegistration from "../../components/form/ImageRegistration";


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
  // const [file, setFile] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [addressError, setAddressError] = useState("");
  const [userData, setUserData] = useState<Users[]>([]);

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
      setUserData([data]);
    })();
  }, []);

  // console.log(userData)

  // const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];
  //   if (!file) return;

  //   const reader = new FileReader();
  //   reader.onload = (event) => {
  //     const imageUrl = event.target?.result;
  //     if (typeof imageUrl === "string") {
  //       setFile(imageUrl);
  //     }
  //   };

  //   reader.readAsDataURL(file);
  // };
  const emailMatch = userData.length!==0&&userData[0].some((data) => data.email === email);

  console.log(emailMatch);
  console.log(email);

  const validateEmail = () => {
    if (!email) {
      setEmailError("*メールアドレスを入力してください");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("*有効なメールアドレスを入力してください");
      return false;
    }
    if (emailMatch) {
      setEmailError("*このメールアドレスは登録されています");
      return false;
    }
    setEmailError("");
    return true;
  };

  const validatePhone = () => {
    console.log("前");
    if (!phone) {
      setPhoneError("*電話番号を入力してください");
      console.log("OK");
      return false;
    }
    if (!/^[0-9-+]+$/.test(phone)) {
      setPhoneError("*有効な電話番号を入力してください");
      console.log("OK");
      return false;
    }
    setPhoneError("");
    return true;
  };

  const validateName = () => {
    if (!lastName && !firstName) {
      setNameError("*性・名を入力してください");
      console.log("OK");
      return false;
    }
    setNameError("");
    return true;
  };

  const validatePass = () => {
    if (!password) {
      setPasswordError("*パスワードを入力してください");
      return false;
    }
    if (!/^[a-zA-Z0-9.?/-]{8,24}$/.test(password)) {
      setPasswordError(
        "*８文字以上２４字以下で、英(大文字小文字)、数、記号「ピリオド(.)、スラッシュ(/)、クエスチョンマーク(?)、ハイフン(-)」を使用したパスワードを入力してください"
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
      setAddressError("*住所を入力してください");
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
    // const blob = await fetch(file).then((r) => r.blob());
    // const formData = new FormData();
    // formData.append("image", blob, );

    if (
      isEmailValid &&
      isPhoneValid &&
      isAddressValid &&
      isPassValid &&
      isNameValid
    ) {
      console.log("OK");
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
          image: "",
        };
        const response = await fetch("http://localhost:8000/user", {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const responseData = await response.json();
        navigate("/login")
      } catch (err) {
        console.log(err, "エラー");
      }
    }
  };
  return (
    <Box mt={10}>
      <Grid>
        <Paper
          elevation={3}
          sx={{
            p: 4,
            height: "168vh",
            width: "450px",
            m: "20px auto",
          }}
        >
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
              新規登録
            </Typography>
          </Grid>
          <form onSubmit={submitRegister}>
            <Box flexDirection="column">
              <NickNameInput nickName={nickName} setNickName={setNickName} />
              {nameError && (
                <p style={{ color: "red", fontSize: 13 }}>{nameError}</p>
              )}
              <LastNameInput lastName={lastName} setLastName={setLastName} />
              <FirstNameInput
                firstName={firstName}
                setFirstName={setFirstName}
              />
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
              {/* <ImageRegistration
                file={file}
                setFile={setFile}
                handleFileSelect={handleFileSelect}
              /> */}
            </Box>
            <Box mt={3}>
              <Button
                type="submit"
                color="primary"
                variant="contained"
                fullWidth
                onClick={submitRegister}
              >
                登録
              </Button>
            </Box>
            <Box mt={5}>
              <Link href="/login">ログインページへ移動する</Link>
            </Box>
          </form>
        </Paper>
      </Grid>
    </Box>
  );
};

export default Register;
