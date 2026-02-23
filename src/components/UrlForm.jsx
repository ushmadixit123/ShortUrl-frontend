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
import { useDispatch, useSelector } from "react-redux";
import { createURL } from "../redux/slices/urlSlice";
import LinkIcon from "@mui/icons-material/Link";
import ShortTextIcon from "@mui/icons-material/ShortText";

const UrlForm = () => {
  const [longUrl, setLongUrl] = useState("");
  const [copied, setCopied] = useState(false);

  const dispatch = useDispatch();

  // ✅ Get data from Redux
  const { shortUrl, loading } = useSelector((state) => state.url);

  const handleSubmit = (e) => {
    e.preventDefault();
    setCopied(false);

    dispatch(createURL(longUrl));  // 🔥 dispatch instead of API call
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
  };

  return (
  <div
    style={{
      minHeight: "70vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "transparent",
    }}
  >
    <Card
      sx={{
        width: 450,
        borderRadius: 4,
        p: 3,
        background: "linear-gradient(145deg, #f8fbff, #e6eef8)",
        boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
      }}
    >
      <CardContent>
        <Typography
          variant="h5"
          align="center"
          gutterBottom
          sx={{ fontWeight: 600 }}
        >
          Create Your Short URL
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
  fullWidth
  placeholder="Enter your long URL"
  margin="normal"
  value={longUrl}
  onChange={(e) => setLongUrl(e.target.value)}
  required
  disabled={loading}
  InputProps={{
    startAdornment: (
      <InputAdornment position="start">
        <LinkIcon fontSize="small" sx={{ color: "#64748b" }} />
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
  placeholder="Your short URL will appear here"
  margin="normal"
  value={shortUrl || ""}
  InputProps={{
    readOnly: true,
    startAdornment: (
      <InputAdornment position="start">
        <ShortTextIcon fontSize="small" sx={{ color: "#64748b" }} />
      </InputAdornment>
    ),
    endAdornment:
      shortUrl && (
        <InputAdornment position="end">
          <IconButton onClick={handleCopy}>
            <ContentCopyIcon
              sx={{
                color: copied ? "#16a34a" : "#64748b",
              }}
            />
          </IconButton>
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
              letterSpacing: 0.5,
              textTransform: "none",
              fontSize: "15px",
              background: "linear-gradient(90deg, #3b82f6, #2563eb)",
              boxShadow: "0 6px 18px rgba(37,99,235,0.35)",
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "translateY(-3px)",
                boxShadow:
                  "0 12px 25px rgba(37,99,235,0.5)",
                background:
                  "linear-gradient(90deg, #2563eb, #1d4ed8)",
              },
            }}
          >
            {loading ? (
              <>
                <CircularProgress
                  size={20}
                  sx={{ mr: 1 }}
                  color="inherit"
                />
                Generating...
              </>
            ) : (
              "Generate Short URL"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  </div>
);
};

export default UrlForm;
