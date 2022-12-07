import axios from "axios";

export default axios.create({
    baseURL: window.location.hostname === "localhost" ? "http://localhost:3001/api" : "http://192.168.8.199:3001/api",
});