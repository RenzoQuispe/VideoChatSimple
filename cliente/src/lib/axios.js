import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://videochat.local/api",
  withCredentials: true,
});