const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const corsOptions = require("./config/corsOptions");
const { mongoConnect } = require("./api/mongoose");

const credentials = require("./middles/credentials");
const verifyTokenMiddleware = require("./middles/verifyAccessToken");

const authenticationRoute = require("./routes/authentication");
const refreshRoute = require("./routes/refresh");
const usersRoute = require("./routes/users");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(credentials);
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use("/api/user", authenticationRoute);
app.use("/api/refresh", refreshRoute);

app.use(verifyTokenMiddleware);
app.use("/api/users", usersRoute);

// connect to database
mongoConnect(() => console.log("Connected to database"));

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
