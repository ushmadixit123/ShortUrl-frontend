import { Grid, Typography, Box, Card } from "@mui/material";
import SpeedIcon from "@mui/icons-material/Speed";
import SecurityIcon from "@mui/icons-material/Security";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import UpdateIcon from "@mui/icons-material/Update";

const Features = () => {
  return (
    <Box
      sx={{
        width: "70%",
        mt: 10,
        px: { xs: 10, md: 25 },
      }}
    >
      <Typography
        variant="h4"
        align="center"
        fontWeight={700}
        sx={{ mb: 6 }}
      >
        Why Choose URLMinify?
      </Typography>

      <Grid container spacing={2} width={"100%"} sx={{display : "flex" , justifyContent:"space-between"}}>
        <Feature
          icon={<SpeedIcon sx={{ fontSize: 40 }} />}
          title="Super Fast"
          desc="Built on high-speed infrastructure for instant redirection."
          color="#3b82f6"
        />

        <Feature
          icon={<SecurityIcon sx={{ fontSize: 40 }} />}
          title="Safe & Secure"
          desc="Your links are encrypted and protected with HTTPS."
          color="#9c27b0"
        />

        
      </Grid>
      <Grid container spacing={2} width={"100%"} mt={6}  sx={{display : "flex" , justifyContent:"space-between"}}>
        <Feature
          icon={<AutoFixHighIcon sx={{ fontSize: 40 }} />}
          title="Smart Suggestions"
          desc="Auto-generates readable, unique aliases using AI."
          color="#f59e0b"
        />

        <Feature
          icon={<UpdateIcon sx={{ fontSize: 40 }} />}
          title="Link History"
          desc="Track and manage all your shortened URLs anytime."
          color="#10b981"
        />
      </Grid>
    </Box>
  );
};

const Feature = ({ icon, title, desc, color }) => (
  <Grid item xs={12} sm={6} md={3} width={"45%"} >
    <Card
      sx={{
        p: 4,
        textAlign: "center",
        borderRadius: 4,
        background: "rgba(255,255,255,0.75)",
        backdropFilter: "blur(12px)",
        boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow: "0 16px 35px rgba(0,0,0,0.15)",
        },
      }}
    >
      <Box
        sx={{
          width: 60,
          height: 60,
          borderRadius: "50%",
          background: `${color}15`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto 16px auto",
          color: color,
        }}
      >
        {icon}
      </Box>

      <Typography fontWeight={600} sx={{ mb: 1 }}>
        {title}
      </Typography>

      <Typography variant="body2" color="text.secondary">
        {desc}
      </Typography>
    </Card>
  </Grid>
);

export default Features;