//rafce
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import StorefrontIcon from "@mui/icons-material/Storefront";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
// import { SessionContext } from "../../App";
import CryptoJS from "crypto-js";
import { secretKey } from "../../pages/users/Login";
import useState from "react";
import { Users } from "../../types/type";
import { Link } from "@mui/material";

const pages = [
  { id: 1, category: "出品" },
  { id: 2, category: "いいね一覧" },
  { id: 3, category: "購入履歴" },
  { id: 4, category: "カート" },
];
const settings = [
  { id: 1, category: "マイページ" },
  { id: 2, category: "ログアウト" },
];

function Header() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const [userCookieData, setUserCookeData] = React.useState<any>([]);
  const navigate = useNavigate();
  // const { session, setSession } = useContext(SessionContext);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  console.log(userCookieData===1)
  const handleCloseNavMenu = (id: number) => {
    if (id === 1) {
      navigate("/productregistration");
    } else if (id === 2) {
      navigate("/favorite");
    } else if (id === 3) {
      navigate("/histry");
    } else if (id === 4) {
      navigate("/cart");
      window.location.reload()
    } else {
      setAnchorElNav(null);
    }
  };
  //cookie復号

  React.useEffect(() => {
    const cookieData = document.cookie
      .split(";")
      .find((cookie) => cookie.trim().startsWith("data="));
    const encryptedData = cookieData ? cookieData.split("=")[1] : "";
    const decrypts = (data: string | CryptoJS.lib.CipherParams) => {
      const bytes = CryptoJS.AES.decrypt(String(data), secretKey);
      const decrypted = bytes.toString(CryptoJS.enc.Utf8);
      return decrypted;
    };
    if (document.cookie) {
      const decording = decrypts(encryptedData);
      const Cookiedata = JSON.parse(decording);
      setUserCookeData(Cookiedata);
      // const idData=userCookieData.map((user:any)=>{
      //   return user.id
      // })
    }
  }, []);
   console.log(userCookieData)

  const handleCloseUserMenu = (id: number) => {
    if (id === 1) {
      window.location.reload()
      navigate(`/membersinfoedit/${userCookieData}`);
      window.location.reload()
      window.location.reload()
    } else if (id === 2) {
      document.cookie = "data=; max-age=0; path=/;";
      // setSession(null);
      navigate("/login");
    } else {
      setAnchorElUser(null);
    }
  };

  return (
    <AppBar sx={{backgroundColor:"#e198b4"}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <StorefrontIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href={"/"}
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            FURIMA
          </Typography>
            {userCookieData&&
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page.id}
                  onClick={() => handleCloseNavMenu(page.id)}
                >
                  <Typography textAlign="center">{page.category}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
}
          <StorefrontIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            href={"/"}
            component="a"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            FURIMA
          </Typography>
          {userCookieData&&

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page.id}
                onClick={() => handleCloseNavMenu(page.id)}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page.category}
              </Button>
            ))}
          </Box>
}

            {userCookieData&&
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem
                key={setting.id}
                onClick={() => handleCloseUserMenu(setting.id)}
                >
                  <Typography textAlign="center">{setting.category}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
            }
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;
