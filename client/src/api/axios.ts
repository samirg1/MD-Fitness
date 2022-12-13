import axios from "axios";

// base url depending on which device app is running on
const BASE_URL =
    window.location.hostname === "localhost"
        ? "http://localhost:3001/api"
        : "http://192.168.8.199:3001/api";

// default axios instance
export default axios.create({
    baseURL: BASE_URL,
});

// private axios instance
export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
});
