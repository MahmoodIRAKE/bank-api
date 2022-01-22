require("dotenv").config();
const express = require("express")
const cors = require("cors")
const app = express();
const apiRouter = require("../routes/apiRoutes");
const { corsConfig, rootPath } = require("../config");
const path = require("path");

const publicPath = path.join(rootPath, "client/build")

app.use(cors(corsConfig));
app.use(express.static(publicPath))

app.use(express.json());

app.use("/api", apiRouter);

app.get("*", (req, res) => {
    res.sendFile(publicPath)
} )

module.exports = app;



