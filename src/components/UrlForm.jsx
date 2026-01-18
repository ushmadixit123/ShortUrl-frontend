import { useState } from "react";
import {
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  IconButton,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { shortenUrl } from "../services/api";

const UrlForm = () => {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCopied(false);
    setLoading(true);

    try {
      const res = await shortenUrl(longUrl);
      setShortUrl(res.data.shortUrl);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
  };

  return (
    <Card sx={{ width: 400, p: 3, boxShadow: 5 }}>
      <CardContent>
        <Typography variant="h4" align="center" gutterBottom>
          Create Your Short URL
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Enter Long URL"
            margin="normal"
            value={longUrl}
            onChange={(e) => setLongUrl(e.target.value)}
            required
            disabled={loading}
          />

          <TextField
            fullWidth
            label="Short URL"
            margin="normal"
            value={shortUrl}
            InputProps={{
              readOnly: true,
              endAdornment: shortUrl && (
                <InputAdornment position="end">
                  <IconButton onClick={handleCopy}>
                    <ContentCopyIcon color={copied ? "success" : "action"} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Button
            fullWidth
            variant="contained"
            type="submit"
            sx={{ mt: 2 }}
            disabled={loading}
          >
            {loading ? (
              <>
                <CircularProgress size={20} sx={{ mr: 1 }} color="inherit" />
                Generating...
              </>
            ) : (
              "Generate Short URL"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default UrlForm;
