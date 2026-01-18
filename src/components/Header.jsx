import { AppBar, Toolbar, Typography } from "@mui/material";
import logo from "../assets/favicon.jpg";

const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <img
          src={logo}
          alt="logo"
          style={{ width: "4%", borderRadius: 10, marginRight: 10 }}
        />
        <Typography variant="h5" fontWeight="bold" color="white">
          ShortUrl.com
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
