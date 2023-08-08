import * as React from "react";
import { Link } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import "../App.css";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import backend_link from "../links";

const pages = [
  {
    name: "Home",
    to: "/",
  },
  {
    name: "My Orders",
    to: "/myorders",
  },
  {
    name: "About Us",
    to: "/aboutus",
  },
];

const logo = "/images/LOGO.png";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  border: "2px solid",
  borderColor: "#2A88DF",
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(1),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "20%",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "#282828",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const Header = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  //  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  const [loggedIn, setLoggedIn] = React.useState(0);

  const checkstatus = async () => {
    console.log("status clicked");
    const token = localStorage.getItem('token');
    fetch(`https://dotrestros.com/users/status`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `BEARER:${token}`
      }
    })
      .then((res) => res.json())
      .then((user) => { setLoggedIn(user.loggedIn); })
      .catch((error) => { console.log(error.message); })
  };


  React.useEffect(() => {
    checkstatus();
  }, []);

  //  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  // the commented parts below are to show profile section of customer on nav bar.........dont touch right now
  // const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar
      style={{
        zIndex: 99999,
        backgroundColor: "#fff",
        color: "#2A88DF",
        boxShadow: "none",
      }}
      className="header_main"
      position="fixed"
    >
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            className="dosrestros_logo_big"
            src={logo}
            alt="dotrestrosLogo"
            style={{
              width: "7%",
              height: "6%",
              marginLeft: "5.5%",
              marginRight: "4%",
              //we have to change display to none for mobile version using media queries
            }}
          />

          {/* search bar */}
          <Search
            className="search_box"
            sx={{ display: { xs: "none", md: "flex" }, height: "30px" }}
          >
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search location.."
              inputProps={{ "aria-label": "search" }}
            />
          </Search>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
              sx={{ padding: "0px" }}
            >
              <MenuIcon sx={{ transform: "scale(1.5)" }} />
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
                <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                  <Link style={{ textDecoration: "none" }} to={page.to}>
                    <Typography color="#282828" textAlign="center">
                      {page.name}
                    </Typography>
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <img
            className="dosrestros_logo_phone"
            src={logo}
            alt="dotrestrosLogo"
            style={{
              width: "80px",
              height: "40px",
              //we have to change display to none for mobile version using media queries
            }}
          />

          <Box
            sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, ml: "10%" }}
          >
            {pages.map((page) => (
              <MenuItem
                key={page.name}
                onClick={handleCloseNavMenu}
                sx={{ m: 2, display: "block" }}
              >
                <Link style={{ textDecoration: "none" }} to={page.to}>
                  <Typography color="#282828" fontWeight="700">
                    {page.name}
                  </Typography>
                </Link>
              </MenuItem>
            ))}
          </Box>
          {loggedIn ? <MenuItem
            className="logsin_big"
            sx={{
              backgroundColor: "#2A88DF",
              borderRadius: "20px",
              padding: "8px 20px 8px 20px",
              fontFamily: "Jost",
              fontWeight: "700",
              transition: "0.5s",
              mr: "5.5%",
              "&:hover": {
                backgroundColor: "#257CCC",
              },
            }}
          >
            <Link
              style={{ textDecoration: "none", color: "#fff" }}
              onClick={() => {
                localStorage.clear('token');
                window.location.reload();
              }}
            >
              Sign out
            </Link>
          </MenuItem> :
            <MenuItem
              className="logsin_big"
              sx={{
                backgroundColor: "#2A88DF",
                borderRadius: "20px",
                padding: "8px 20px 8px 20px",
                fontFamily: "Jost",
                fontWeight: "700",
                transition: "0.5s",
                mr: "5.5%",
                "&:hover": {
                  backgroundColor: "#257CCC",
                },
              }}
            >
              <Link
                style={{ textDecoration: "none", color: "#fff" }}
                to={
                  `${backend_link}/auth/google`
                }
              >
                Login/Signup
              </Link>
            </MenuItem>
          }

          {loggedIn ?
            <MenuItem
              className="logsin_small"
              sx={{
                color: "#fff",
                backgroundColor: "#2A88DF",
                borderRadius: "20px",
                fontFamily: "Jost",
                fontWeight: "700",
                mr: "0%",
                "&:hover": {
                  backgroundColor: "#2475bf",
                },
              }}
            >
              <Link
                style={{ textDecoration: "none", color: "#fff" }}
                onClick={() => {
                  localStorage.clear('token');
                  window.location.reload();
                }}
              >
                Sign out
              </Link>
            </MenuItem> :
            <MenuItem
              className="logsin_small"
              sx={{
                color: "#fff",
                backgroundColor: "#2A88DF",
                borderRadius: "20px",
                fontFamily: "Jost",
                fontWeight: "700",
                mr: "0%",
                "&:hover": {
                  backgroundColor: "#2475bf",
                },
              }}
            >
              <Link
                onClick={checkstatus}
                style={{ textDecoration: "none", color: "#fff" }}
                to={
                  `${backend_link}/auth/google`
                }
              >
                Login
              </Link>
            </MenuItem>
          }
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;