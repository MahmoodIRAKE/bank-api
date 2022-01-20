require("dotenv").config();
const express = require("express")
const cors = require("cors")
const app = express();
const apiRouter = require("../routes/apiRoutes");
const { corsConfig } = require("../config");

app.use(cors(corsConfig));
app.use(express.json());

app.use("/api", apiRouter);

module.exports = app;



