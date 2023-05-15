import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import dotenv from "dotenv";
dotenv.config();

import { mongoConnect } from "./api/mongoose.js";
import corsOptions from "./config/corsOptions.js";
import graphQlRoot from "./middlware/graphql.js";

import credentials from "./middlware/credentials.js";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(credentials);
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use("/graphql", graphQlRoot);

// connect to database
mongoConnect(() => console.log("Connected to database"));

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
