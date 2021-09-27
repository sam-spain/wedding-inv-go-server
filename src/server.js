const express = require("express");
const dotenv = require("dotenv");
const inviteeRouter = require("./routes/inviteeRouter");
const errorHandler = require("./middleware/error");
const allowClient = require("./middleware/allowClient");
const morgan = require("morgan");

dotenv.config({ path: "./src/config/config.env" });

const app = express();
app.use(express.json());
app.use(morgan("dev"));

app.use(allowClient);
app.use("/api/v1/invitee", inviteeRouter);
app.use(errorHandler);
module.exports = app;