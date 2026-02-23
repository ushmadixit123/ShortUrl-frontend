import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  InputAdornment,
  Link,
} from "@mui/material";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/login.png"


const SignupForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await dispatch(signupUser({ name, email, password })).unwrap();
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        // background: "linear-gradient(135deg, #dbeafe, #e0f2fe)",
      }}
    >
      <Card
        sx={{
          width: 400,
          borderRadius: 4,
          p: 3,
          background: "linear-gradient(145deg, #f8fbff, #e6eef8)",
          boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
        }}
      >
        <CardContent>
          <Box textAlign="center" mb={2}>
            {/* Replace with your logo */}
            <img src={logo} alt="logo"></img>
          </Box>

          <Typography
            variant="h6"
            align="center"
            gutterBottom
            sx={{ fontWeight: 500 }}
          >
            Create Your Account
          </Typography>

          <form onSubmit={handleSignup}>
            <TextField
              fullWidth
              placeholder="Enter your name"
              margin="normal"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonOutlineIcon fontSize="small" />
                  </InputAdornment>
                ),
              }}
              sx={{
                backgroundColor: "#f3f6fb",
                borderRadius: 2,
              }}
            />

            <TextField
              fullWidth
              placeholder="Enter your email"
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailOutlinedIcon fontSize="small" />
                  </InputAdornment>
                ),
              }}
              sx={{
                backgroundColor: "#f3f6fb",
                borderRadius: 2,
              }}
            />

            <TextField
              fullWidth
              placeholder="Enter your password"
              type="password"
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOutlinedIcon fontSize="small" />
                  </InputAdornment>
                ),
              }}
              sx={{
                backgroundColor: "#f3f6fb",
                borderRadius: 2,
              }}
            />

            {/* Premium Button */}
            <Button
              fullWidth
              variant="contained"
              type="submit"
              disabled={loading}
              sx={{
                mt: 3,
                borderRadius: "12px",
                py: 1.3,
                fontWeight: 700,
                letterSpacing: 1,
                textTransform: "none",
                fontSize: "15px",
                background: "linear-gradient(90deg, #3b82f6, #2563eb)",
                boxShadow: "0 6px 18px rgba(37,99,235,0.35)",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-3px)",
                  boxShadow: "0 12px 25px rgba(37,99,235,0.5)",
                  background: "linear-gradient(90deg, #2563eb, #1d4ed8)",
                },
              }}
            >
              {loading ? "Creating Account..." : "Sign Up"}
            </Button>

            <Typography variant="body2" align="center" sx={{ mt: 3 }}>
              Already have an account?{" "}
              <Link href="/login" underline="hover">
                Login
              </Link>
            </Typography>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default SignupForm;