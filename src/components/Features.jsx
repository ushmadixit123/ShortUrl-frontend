import { Card, Grid, Typography, Box } from "@mui/material";
import SpeedIcon from "@mui/icons-material/Speed";
import SecurityIcon from "@mui/icons-material/Security";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import UpdateIcon from "@mui/icons-material/Update";

const Features = () => {
  return (
    <Card
      sx={{
        width: "85%",
        p: { xs: 3, md: 6 },
        mt: 6,
        boxShadow: 3,
        borderRadius: 3,
      }}
    >
      <Typography
        variant="h5"
        align="center"
        fontWeight="bold"
        gutterBottom
        sx={{ mb: 4 }}
      >
        Why Choose ShortUrl?
      </Typography>

      <Grid container spacing={6} justifyContent="center">
        <Feature
          icon={<SpeedIcon sx={{ fontSize: 42, color: "#1976d2" }} />}
          title="Super Fast"
          desc="Built on high-speed infrastructure for instant redirection."
        />

        <Feature
          icon={<SecurityIcon sx={{ fontSize: 42, color: "#9c27b0" }} />}
          title="Safe & Secure"
          desc="Your links are encrypted and protected with HTTPS."
        />

        <Feature
          icon={<AutoFixHighIcon sx={{ fontSize: 42, color: "#ff9800" }} />}
          title="Smart Suggestions"
          desc="Auto-generates readable, unique aliases using AI."
        />

        <Feature
          icon={<UpdateIcon sx={{ fontSize: 42, color: "#4caf50" }} />}
          title="Link History"
          desc="Track and manage all your shortened URLs anytime."
        />
      </Grid>
    </Card>
  );
};

const Feature = ({ icon, title, desc }) => (
  <Grid item xs={12} sm={6} md={6}>
    <Box
      textAlign="center"
      px={3}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box mb={1}>{icon}</Box>

      <Typography fontWeight="bold" sx={{ mb: 1 }}>
        {title}
      </Typography>

      <Typography variant="body2" color="text.secondary">
        {desc}
      </Typography>
    </Box>
  </Grid>
);

export default Features;
