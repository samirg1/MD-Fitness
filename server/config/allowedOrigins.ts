import dotenv from "dotenv";
dotenv.config();

/**
 * The allowed origins to call the server from.
 */

const allowedOrigins =
    process.env.NODE_ENV === "production"
        ? ["https://md-fitness.onrender.com"]
        : ["http://localhost:3000", process.env.DEV_IP_ADDRESS as string];

export default allowedOrigins;
