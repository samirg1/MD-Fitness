import axios from "axios";

const BASE_URL =
    process.env.NODE_ENV === "production"
        ? "https://md-fitness-api.onrender.com/graphql"
        : window.location.hostname === "localhost"
        ? "http://localhost:3001/graphql"
        : (process.env.REACT_APP_DEV_IP as string);

// default axios instance
export default axios.create({
    baseURL: BASE_URL,
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
});
