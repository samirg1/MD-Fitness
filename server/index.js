const express = require("express");
const app = express();
const mongoose = require("mongoose");
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
const PORT = process.env.PORT || 3001;


// connect to db
mongoose.connect(process.env.DB_CONNECTION_URL, () => {
    console.log("Connected to database");
});

//routes
const authenticationRoute = require('./routes/authentication');

// middles
app.use('/api/user', authenticationRoute);

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
