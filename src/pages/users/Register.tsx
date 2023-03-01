import React, { useState } from "react";
import EmailInput from "../../components/form/EmailInput";
import NickNameInput from "../../components/form/NickNameInput";
import PasswordInput from "../../components/form/PasswordInput copy";
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
import { AddressResult } from "../../types/type";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [postalCodeData, setPostalCodeData] = useState<AddressResult>({});

  const getZipCode = async () => {
    const response = await fetch(
      `https://zipcloud.ibsnet.co.jp/api/search?zipcode=${postalCode}`
    );
    const data = await response.json();
    setPostalCodeData(data.results[0]);
  };

  const submit = (e: React.MouseEvent<HTMLElement, MouseEvent>): void => {
    e.preventDefault();
    console.log("a");
  };
  return (
    <Box mt={10}>
      <Grid>
        <Paper
          elevation={3}
          sx={{
            p: 4,
            height: "145vh",
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
          <div>
            <Box flexDirection="column">
              <NickNameInput />
              <LastNameInput />
              <FirstNameInput />
              <PostalCodeinput
                postalCode={postalCode}
                setPostalCode={setPostalCode}
                getZipCode={getZipCode}
              />
              <AddressInput postalCodeData={postalCodeData} />
              <PhoneInput />
              <EmailInput email={email} setEmail={setEmail}/>
              <PasswordInput password={password} setPassword={setPassword} />
              <ProfileTextarea />
            </Box>
            <Box mt={3}>
              <Button
                type="submit"
                color="primary"
                variant="contained"
                fullWidth
                onClick={submit}
              >
                登録
              </Button>
            </Box>
            <Box mt={5}>
              <Link href="/login">ログインページへ移動する</Link>
            </Box>
          </div>
        </Paper>
      </Grid>
    </Box>
  );
};

export default Register;
