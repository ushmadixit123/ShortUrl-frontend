import React from "react";
import { Box, Card, CardContent, Typography, Button } from "@mui/material";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";

const SettingsPage = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 3,
      }}
    >
      <Card
        sx={{
          width: 400,
          textAlign: "center",
          p: 3,
          borderRadius: "20px",
          background: "rgba(255,255,255,0.8)",
          backdropFilter: "blur(12px)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
        }}
      >
        <CardContent>
          <PersonOutlineIcon
            sx={{
              fontSize: 60,
              color: "#1976d2",
              mb: 2,
            }}
          />

          <Typography variant="h5" fontWeight={600} gutterBottom>
            Settings Page
          </Typography>

          <Typography variant="body1" color="text.secondary" mb={3}>
            🚀 Coming Soon...
          </Typography>

          <Button
            variant="contained"
            sx={{
              borderRadius: "30px",
              textTransform: "none",
              px: 4,
            }}
            disabled
          >
            Under Development
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default SettingsPage;