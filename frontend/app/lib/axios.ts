import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:8080",
  headers: { "Content-Type": "application/json" },
});

export const axiosAuth = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "multipart/form-data;",
    "Access-Control-Allow-Origin": "*",
  },
});
