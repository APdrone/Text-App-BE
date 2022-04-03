const express = require("express");
const cors = require("cors");

const wordRouter = require("./routes/wordRouter");

const app = express();

app.use(express.json());

app.use(cors());

app.use("/api/v1/words", wordRouter);

module.exports = app;
