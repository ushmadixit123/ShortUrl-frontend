import React, { useState } from 'react';
import axios from 'axios';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  IconButton,
  InputAdornment,
  Grid,
  Container,
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import SecurityIcon from '@mui/icons-material/Security';
import UpdateIcon from '@mui/icons-material/Update';
import SpeedIcon from '@mui/icons-material/Speed';
import logo from "./favicon.jpg"

function App() {
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCopied(false);
    try {
      const res = await axios.post('https://miniurl-backend.onrender.com/shorten', { longUrl });
      setShortUrl(res.data.shortUrl);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
  };

  return (
    <>
      {/* Top Heading */}
      <AppBar position="static" sx={{ bgcolor: 'linear-gradient(to right, #4b6cb7, #182848)' }}>
        <Toolbar>
          <img src={logo} alt='logo' style={{ width: "4%", borderRadius: "10px", marginRight: "10px" }}></img>
          <Typography variant="h5" fontWeight="bold" color="white">
            ShortUrl.com
          </Typography>
        </Toolbar>
      </AppBar>

      {/* URL Shortener Section */}
      <Box
        minHeight="90vh"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        bgcolor="#f4f6f8"
        p={2}
      >
        <Card sx={{ width: 400, p: 3, boxShadow: 5 }}>
          <CardContent>
            <Typography variant="h4" gutterBottom align="center" fontWeight="bold">
              Create Your Short URL
            </Typography>

            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Enter Long URL"
                variant="outlined"
                margin="normal"
                value={longUrl}
                onChange={(e) => setLongUrl(e.target.value)}
                required
              />

              <TextField
                fullWidth
                label="Short URL"
                variant="outlined"
                margin="normal"
                value={shortUrl}
                InputProps={{
                  readOnly: true,
                  endAdornment: shortUrl && (
                    <InputAdornment position="end">
                      <IconButton onClick={handleCopy} edge="end">
                        <ContentCopyIcon color={copied ? 'success' : 'action'} />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Button fullWidth variant="contained" color="primary" type="submit" sx={{ mt: 2 }}>
                Generate Short URL
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Static Feature Section */}
        <Card
          sx={{
            width: '80%',
            m: '30px 30px',
            p: 10,
            bgcolor: '#ffffff',
            boxShadow: 3,
          }}
        >
          <Typography variant="h5" align="center" gutterBottom fontWeight="bold">
            Why Choose ShortUrl?
          </Typography>
          <Grid container spacing={4} mt={1} justifyContent="center">
            <Grid item xs={12} sm={6} md={3}>
              <Box textAlign="center">
                <SpeedIcon fontSize="large" color="primary" />
                <Typography variant="subtitle1" fontWeight="bold">
                  Super Fast
                </Typography>
                <Typography variant="body2">
                  Built on high-speed infrastructure for instant redirection.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Box textAlign="center">
                <SecurityIcon fontSize="large" color="secondary" />
                <Typography variant="subtitle1" fontWeight="bold">
                  Safe & Secure
                </Typography>
                <Typography variant="body2">
                  Your links are encrypted and protected with HTTPS.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Box textAlign="center">
                <AutoFixHighIcon fontSize="large" sx={{ color: '#FF9800' }} />
                <Typography variant="subtitle1" fontWeight="bold">
                  Smart Suggestions
                </Typography>
                <Typography variant="body2">
                  Auto-generates readable, unique aliases using AI.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Box textAlign="center">
                <UpdateIcon fontSize="large" sx={{ color: '#4CAF50' }} />
                <Typography variant="subtitle1" fontWeight="bold">
                  Link History
                </Typography>
                <Typography variant="body2">
                  Track and manage all your shortened URLs anytime.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Card>
        <Box
          component="footer"
          sx={{
            width:"100%",
            textAlign: 'center',
            py: 2,
            px: 1,
            bgcolor: 'black',
            color: 'white',
            mt: 6,
            borderTop: '1px solid #ddd',
          }}
        >
          <Typography variant="body2">
            Made with <span style={{ color: 'red' }}>❤️</span> and lots of ☕ by <strong>Ushma Dixit</strong>
          </Typography>
        </Box>

      </Box>
    </>
  );
}

export default App;
