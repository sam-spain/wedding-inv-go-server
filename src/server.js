const express = require("express");
const dotenv = require("dotenv");
const inviteeRouter = require("./routes/inviteeRouter");
const authRouter = require("./routes/authRouter");
const cookieParser = require("cookie-parser");
const errorHandler = require("./middleware/error");
const morgan = require("morgan");
const cors = require("cors");

dotenv.config({ path: "./src/config/config.env" });

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

const clientAddress = process.env.CLIENT_ADDRESS || "http://localhost:8080";
const corsOptions = {
  origin: clientAddress,
  credentials: true,
};
app.use(cors(corsOptions));
app.use("/api/v1/invitee", inviteeRouter);
app.use("/api/v1/auth", authRouter);
app.use(errorHandler);
module.exports = app;
