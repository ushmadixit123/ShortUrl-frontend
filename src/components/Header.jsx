import { AppBar, Toolbar, Button, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

const Header = () => {
  const navigate = useNavigate();
  return (
    <AppBar position="static" sx={{backgroundColor : "#7cafe9"}}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        
        {/* Left side: Logo + Title */}
        {!localStorage.getItem("token") && 
        <Box display="flex" alignItems="center">
          <img
          onClick={()=>navigate('/')}
            src={logo}
            alt="logo"
            style={{ width: "100px", borderRadius: 8, marginRight: 10 , cursor:"pointer" }}
          />
          
        </Box> }
        

        {/* Right side: Auth Buttons */}
        {!localStorage.getItem("token") && <Box>
          <Button
            component={Link}
            to="/login"
            color="inherit"
            sx={{ mr: 1 }}
          >
            Login
          </Button>

          <Button
            component={Link}
            to="/signup"
            variant="outlined"
            color="inherit"
          >
            Sign Up
          </Button>
        </Box> }
        
      </Toolbar>
    </AppBar>
  );
};

export default Header;
