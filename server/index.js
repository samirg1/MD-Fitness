const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;

//routes
const authenticationRoute = require('./routes/authentication');

// middles
app.use('/api/user', authenticationRoute);

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
