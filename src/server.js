const express = require("express");
const dotenv = require("dotenv");
const inviteeRouter = require("./routes/inviteeRouter");
const errorHandler = require("./middleware/error");
const morgan = require('morgan');

dotenv.config({ path: "./src/config/config.env" });

const app = express();
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/v1/invitee", inviteeRouter);
// Add headers before the routes are defined
app.use(errorHandler);
module.exports = app;