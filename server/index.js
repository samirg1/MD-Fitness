const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const corsOptions = require("./config/corsOptions");
const { mongoConnect } = require("./api/mongoose");
const graphQlRoot = require("./middlware/graphql");

const credentials = require("./middlware/credentials");

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
