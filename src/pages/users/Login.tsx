import { useEffect, useState } from "react";
import React from "react";
import EmailInput from "../../components/form/EmailInput";
import PasswordInput from "../../components/form/PasswordInput";
import {
  Avatar,
  Box,
  Button,
  Grid,
  Paper,
  Typography,
  Link,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { pink } from "@mui/material/colors";
import { Users } from "../../types/type";
import { useNavigate } from "react-router-dom";

import CryptoJS from "crypto-js";

export const secretKey = "your-secret-key";

// 暗号化
function encrypt(data: string | CryptoJS.lib.WordArray) {
  const encrypted = CryptoJS.AES&&CryptoJS.AES.encrypt(data, secretKey).toString();
  return encrypted;
}


const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState<string[]>([]);
  const [loginData, setLoginData] = useState<Users[]>([]);

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/user");
        const data = await response.json();
        setLoginData(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const emailMatch = loginData.some((data) => data.email === email);
  const passMatch = loginData.some((data) => data.password === password);
  const emailFilter = loginData.filter((data) => data.email === email);
  const id = emailFilter[0]?.id;

  const save: any = JSON.stringify(id);
  const encryptedData = encrypt(save);

  const submit = async (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setErr([]);
    e.preventDefault();
    if (emailMatch === true && passMatch === true) {
      document.cookie = `data=${encryptedData}; path=/; max-age=1000000000; secure`;
      navigate("/");
      window.location.reload()
    } else if (emailMatch === false || passMatch === false) {
      setErr(["＊入力内容を確認してください＊"]);
    }
  };
  return (
    <>
      <Grid>
        <Paper
          elevation={3}
          sx={{
            p: 4,
            height: "60vh",
            width: "280px",
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
              <LockOutlinedIcon />
            </Avatar>
            <Typography variant={"h5"} sx={{ m: "30px" }}>
              ログイン
            </Typography>
          </Grid>
          <div>
            {err.map((er, index) => {
              return (
                <Box key={index} sx={{ color: "#dc143c", fontSize: 14, mb: 1 }}>
                  {er}
                </Box>
              );
            })}
            <div>
              <EmailInput email={email} setEmail={setEmail} />
              <PasswordInput password={password} setPassword={setPassword} />
            </div>
            <Box mt={3}>
              <Button
                type="submit"
                color="primary"
                variant="contained"
                fullWidth
                onClick={submit}
              >
                ログイン
              </Button>
            </Box>
            <Box mt={5}>
              <Link href="/register">新規登録する</Link>
            </Box>
          </div>
        </Paper>
      </Grid>
    </>
  );
};

export default Login;
