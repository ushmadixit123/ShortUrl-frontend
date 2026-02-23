import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box sx={{ textAlign: "center", py: 2, bgcolor: "black", color: "white", width:"100%" }}>
      <Typography variant="body2">
        Made with ❤️ and lots of ☕ by <strong>Ushma Dixit</strong>
      </Typography>
    </Box>
  );
};

export default Footer;
