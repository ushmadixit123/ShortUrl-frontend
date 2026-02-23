import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  InputAdornment,
  Link,Alert
} from "@mui/material";
import { Snackbar } from "@mui/material";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/login.png"

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
const [toast, setToast] = useState({
  open: false,
  message: "",
  severity: "success", // success | error | warning | info
});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);

  const handleLogin = async (e) => {
  e.preventDefault();

  try {
    await dispatch(loginUser({ email, password })).unwrap();

    setToast({
      open: true,
      message: "Login successful! Redirecting...",
      severity: "success",
    });

    setTimeout(() => {
      navigate("/dashboard");
    }, 1200);

  } catch (err) {
    setToast({
      open: true,
      message: err?.message || "Invalid email or password",
      severity: "error",
    });
  }
};

  return (
    <>
    <Snackbar
  open={toast.open}
  autoHideDuration={3000}
  onClose={() => setToast({ ...toast, open: false })}
  anchorOrigin={{ vertical: "top", horizontal: "right" }}
>
  <Alert
    onClose={() => setToast({ ...toast, open: false })}
    severity={toast.severity}
    variant="filled"
    sx={{ borderRadius: 2 }}
  >
    {toast.message}
  </Alert>
</Snackbar>

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
          {/* Logo Placeholder */}
          <Box textAlign="center" >
            {/* Replace this with your own logo */}
            {/* <Typography variant="h6" fontWeight={700} color="#1976d2"> */}
            <img src={logo} ></img>

          </Box>

          <Typography
            variant="h6"
            align="center"
            gutterBottom
            sx={{ fontWeight: 500 }}
          >
            Login to Your Account
          </Typography>

          <form onSubmit={handleLogin}>
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

            <Box textAlign="right" mt={1}>
              <Link
                href="#"
                underline="hover"
                sx={{ fontSize: 13 }}
              >
                Forgot Password?
              </Link>
            </Box>

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
              {loading ? "Logging in..." : "Login"}
            </Button>

            <Typography
              variant="body2"
              align="center"
              sx={{ mt: 3 }}
            >
              Don't have an account?{" "}
              <Link href="/signup" underline="hover">
                Sign Up
              </Link>
            </Typography>
          </form>
        </CardContent>
      </Card>
    </Box>
    </>
    
  );
};

export default LoginForm;