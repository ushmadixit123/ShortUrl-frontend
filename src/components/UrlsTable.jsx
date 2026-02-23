import React, { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
  Tooltip,
  CircularProgress,
  Box,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch, useSelector } from "react-redux";
import { getUserURLs } from "../redux/slices/urlSlice";

const UrlsTable = ({ onDelete, onEdit }) => {
  const dispatch = useDispatch();
  const { urls, error, loading } = useSelector((state) => state.url);

  useEffect(() => {
    dispatch(getUserURLs());
  }, [dispatch]);

  const handleCopy = (shortUrl) => {
    navigator.clipboard.writeText(shortUrl);
  };

  if (loading) {
    return (
      <Box textAlign="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box textAlign="center" mt={4}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <TableContainer component={Paper} sx={{ mt: 4 }}>
      <Table sx={{borderRadius :"20%"}}>
        <TableHead sx={{backgroundColor :"#7cafe9"}}>
          <TableRow >
            <TableCell sx={{color :"#fff"}}><strong>Short URL</strong></TableCell>
            <TableCell sx={{color :"#fff"}}><strong>Original URL</strong></TableCell>
            <TableCell sx={{color :"#fff"}}><strong>Created</strong></TableCell>
            <TableCell sx={{color :"#fff"}}><strong>Clicks</strong></TableCell>
            <TableCell align="center" sx={{color :"#fff"}}><strong>Actions</strong></TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {urls?.length > 0 ? (
            urls.map((url) => (
              <TableRow key={url._id}>
                <TableCell>
                  <Typography color="primary">
                    <a href={`https://miniurl-backend.onrender.com/url/${url.shortCode}`} target="_blank" rel="noreferrer">
                    https://miniurl-backend.onrender.com/url/{url.shortCode}
                    </a>
                  </Typography>
                </TableCell>

                <TableCell
                  sx={{
                    maxWidth: 250,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {url.longUrl}
                </TableCell>

                <TableCell>
                  {new Date(url.createdAt).toLocaleDateString()}
                </TableCell>

                <TableCell>{url.clicks}</TableCell>

                <TableCell align="center">
                  <Tooltip title="Edit">
                    <IconButton
                      color="primary"
                      onClick={() => onEdit(url)}
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Delete">
                    <IconButton
                      color="error"
                      onClick={() => onDelete(url._id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Copy">
                    <IconButton
                      size="small"
                      onClick={() => handleCopy(`https://miniurl-backend.onrender.com/url/${url.shortCode}`)}
                    >
                      <ContentCopyIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} align="center">
                No URLs found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {/* <QRCodeTab shortUrl={`https://miniurl-backend.onrender.com/${url.shortCode}`} /> */}
    </TableContainer>
  );
};

export default UrlsTable;