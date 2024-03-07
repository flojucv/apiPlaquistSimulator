const express = require("express");
const cors = require('cors');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 3000;

const actualiteRouter = require("./router/actualite");

const options = {
    "origin": "http://localhost:4200",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
}

app.use(express.json());
app.use(cors(options));
app.use(express.urlencoded({
    extended: true
}));

app.get("/", (req, res) => {
    res.json({ message: "ok" });
})

app.use("/actualite", actualiteRouter);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    console.error(err.message, err.stack);
    res.status(statusCode).json({success: false, message: err.message });
    return;
})

app.listen(PORT, () => {
    console.log(`Server Listening on PORT: ${PORT}`);
})
