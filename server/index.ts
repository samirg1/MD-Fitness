import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
require("dotenv").config();

import corsOptions from "./config/corsOptions";
import { mongoConnect } from "./api/mongoose";
import graphQlRoot from "./middlware/graphql";

import credentials from "./middlware/credentials";

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
