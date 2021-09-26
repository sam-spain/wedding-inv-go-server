const express = require("express");
const dotenv = require("dotenv");
const inviteeRouter = require("./routes/inviteeRouter");
const morgan = require('morgan');

dotenv.config({ path: "./src/config/config.env" });

const app = express();
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/v1/invitee", inviteeRouter);

module.exports = app;