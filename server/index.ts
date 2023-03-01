import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
require("dotenv").config();

import { mongoConnect } from "./api/mongoose";
import corsOptions from "./config/corsOptions";
import graphQlRoot from "./middlware/graphql";

import credentials from "./middlware/credentials";
import { getProductById } from "./api/stripe";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(credentials);
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use("/graphql", graphQlRoot);

getProductById("1");

// connect to database
mongoConnect(() => console.log("Connected to database"));

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
