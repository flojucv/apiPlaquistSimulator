const express = require("express");
const cors = require('cors');
const fs = require('fs');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 3000;


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

fs.readdir("./router/", (error, f) => {
    if (error) console.log(error);
    console.log(`┌────────────────────────────────┐\n│             ROUTE              │\n├───────────────────────────┬────┤`)

    f.forEach((f) => {
        const fileRouter = require(`./router/${f}`);
        const nameRoute = f.split(".")[0];
        let fName = ""
        if (f.length > 27)
            fName = `${f.substring(0, 25)}...`
        else {
            fName = `${f}`;
            for (let i = f.length; i < 27; i++) {
                fName += ' ';
            }
        }
        console.log(`│${fName}│ ✔  │`)
        app.use(`/${nameRoute}`, fileRouter);
    });
    console.log("└───────────────────────────┴────┘")
});


app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    console.error(err.message, err.stack);
    res.status(statusCode).json({success: false, message: err.message });
    return;
})

app.listen(PORT, () => {
    console.log(`┌────────────────────────────────┐\n│             SERVER             │\n├────────────────────────────────┤`);
    console.log(`│Starting                     OK │`);
    console.log(`│Listening on PORT          ${PORT} │`);
    console.log("└────────────────────────────────┘")
})
