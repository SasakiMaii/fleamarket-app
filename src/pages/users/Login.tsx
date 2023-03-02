//rafce
import React, { useEffect, useState } from "react";
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


const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState<string[]>([]);
  const [loginData, setLoginData] = useState<Users[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/user");
        const data = await response.json();
        setLoginData(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const emailMatch = loginData.some((data) => data.email === email);
  const passMatch = loginData.some((data) => data.password === password);

  const submit = (e: React.MouseEvent<HTMLElement, MouseEvent>): void => {
    setErr([]);
    e.preventDefault();
    if (emailMatch === true && passMatch === true) {
      navigate("/");
    } else if (emailMatch === false || passMatch === false) {
      setErr(["＊入力内容を確認してください＊"]);
      console.log(err)
    }
  };
  console.log(err);
  return (
    <>
      <Grid>
        <Paper
          elevation={3}
          sx={{
            p: 4,
            height: "50vh",
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
              return <Box key={index}  sx={{ color: "#dc143c", fontSize: 14 ,mb:1 }}>{er}</Box>;
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
