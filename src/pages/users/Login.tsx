//rafce
import React from "react";
import EmailInput from "../../components/form/EmailInput";
import PasswordInput from "../../components/form/PasswordInput copy";
import { Avatar, Box, Button, Grid, Paper, Typography,Link } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { pink } from "@mui/material/colors";

const Login: React.FC = () => {
  const submit = (e: React.MouseEvent<HTMLElement, MouseEvent>): void => {
    e.preventDefault();
  };

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
            <div>
              <EmailInput />
              <PasswordInput />
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
