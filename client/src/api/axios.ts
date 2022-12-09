import axios from "axios";

const BASE_URL = window.location.hostname === "localhost" ? "http://localhost:3001/api" : "http://192.168.8.199:3001/api"

export default axios.create({
    baseURL: BASE_URL,
});

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
});