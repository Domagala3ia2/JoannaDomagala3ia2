var express = require("express");
var app = express()
const PORT = 3000;

const pool = [];
function handlePoll(req, res) {
    pool.push(res);
}

function emitMessage(message) {
    for (let res of pool) res.end(message);
    pool.length = 0;
}

function handleMessage(req, res) {
    let message = "";
    req.on("data", (chunk) => {
        message += chunk;
    });
    req.on("end", () => {
        emitMessage(message);
        res.end();
    });
}

app.use(express.static("static"));

app.get("/poll", function (req, res) {
    handlePoll(req, res);
})
app.post("/message", function (req, res) {
    handleMessage(req, res);
})

app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})