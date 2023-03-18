import axios from "axios";
export const serverSocketAddress = "http://localhost:8080";
export const serverAddress = "http://localhost:3000";

export default axios.create({
  baseURL: serverAddress,
  headers: {
    "Content-Type": "application/json",
    accept: '"*/*"',
    "Access-Control-Allow-Origin": "http://localhost:3000",
    "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
  },
});
