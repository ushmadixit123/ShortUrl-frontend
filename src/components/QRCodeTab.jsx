import React, { useRef, useState } from "react";
import {
    Card,
    CardContent,
    Typography,
    Button,
    Stack,
    IconButton,
    Tooltip,
    TextField,
    CircularProgress,
} from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DownloadIcon from "@mui/icons-material/Download";
import { QRCodeCanvas } from "qrcode.react";

import { useDispatch, useSelector } from "react-redux";
import { createURL } from "../redux/slices/urlSlice";



const QRCodeTab = () => {
    const dispatch = useDispatch();
    const { shortUrl, loading } = useSelector((state) => state.url);

    const [longUrl, setLongUrl] = useState("");
    const qrRef = useRef(null);

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: "Check this link",
                    text: "Here is the shortened link:",
                    url: shortUrl,
                });
            } catch (error) {
                console.error("Sharing failed", error);
            }
        } else {
            alert("Sharing not supported in this browser");
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!longUrl.trim()) return;

        dispatch(createURL(longUrl));
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(shortUrl);
    };

    const handleDownload = () => {
        const canvas = qrRef.current.querySelector("canvas");
        const pngUrl = canvas
            .toDataURL("image/png")
            .replace("image/png", "image/octet-stream");

        const link = document.createElement("a");
        link.href = pngUrl;
        link.download = "qr-code.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <Card
            sx={{
                maxWidth: 450,
                mx: "auto",
                mt: 4,
                borderRadius: 3,
                boxShadow: 3,
            }}
        >
            <CardContent>
                <Stack spacing={3}>
                    <Typography variant="h6" textAlign="center">
                        Generate QR Code
                    </Typography>

                    {/* Long URL Input */}
                    <form onSubmit={handleSubmit}>
                        <Stack spacing={2}>
                            <TextField
                                label="Enter Long URL"
                                variant="outlined"
                                fullWidth
                                value={longUrl}
                                onChange={(e) => setLongUrl(e.target.value)}
                            />

                            <Button
                                type="submit"
                                variant="contained"
                                disabled={loading}
                            >
                                {loading ? (
                                    <CircularProgress size={24} />
                                ) : (
                                    "Generate QR Code"
                                )}
                            </Button>
                        </Stack>
                    </form>

                    {/* Show QR only when shortUrl exists */}
                    {shortUrl && !loading && (
                        <Stack spacing={2} alignItems="center">
                            <div ref={qrRef}>
                                <QRCodeCanvas
                                    value={shortUrl}
                                    size={200}
                                    level="H"
                                    includeMargin={true}
                                />
                            </div>

                            <Typography
                                variant="body2"
                                sx={{ wordBreak: "break-all", textAlign: "center" }}
                            >
                                {shortUrl}
                            </Typography>

                            <Stack direction="row" spacing={2}>
                                <Tooltip title="Copy URL">
                                    <IconButton onClick={handleCopy}>
                                        <ContentCopyIcon />
                                    </IconButton>
                                </Tooltip>

                                <Button
                                    variant="outlined"
                                    startIcon={<DownloadIcon />}
                                    onClick={handleDownload}
                                >
                                    Download
                                </Button>
                                <Button
                                    variant="outlined"
                                    startIcon={<ShareIcon />}
                                    onClick={handleShare}
                                >
                                    Share
                                </Button>
                            </Stack>
                        </Stack>
                    )}
                </Stack>
            </CardContent>
        </Card>
    );
};

export default QRCodeTab;