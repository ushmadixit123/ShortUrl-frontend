import axios from "axios";

const API = axios.create({
  baseURL: "https://miniurl-backend.onrender.com",
});

export const shortenUrl = (longUrl) =>
  API.post("/shorten", { longUrl });
