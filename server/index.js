const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const corsOptions = require("./config/corsOptions");
const { mongoConnect } = require("./api/mongoose");
const credentials = require("./middles/credentials");

const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 3001;

app.use(credentials);
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use("/api/user", require("./routes/authentication"));
app.use("/api/refresh", require("./routes/refresh"));

app.use(require("./middles/verifyJWT"));
app.use("/api/users", require("./routes/users"));

// connect to db
mongoConnect(() => console.log("Connected to database"));

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
