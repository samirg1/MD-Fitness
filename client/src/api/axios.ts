import axios from "axios";

// default axios instance
export default axios.create({
    baseURL: "https://md-fitness-api.onrender.com/graphql",
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
});
