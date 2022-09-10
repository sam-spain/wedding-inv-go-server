const express = require("express");
const dotenv = require("dotenv");
const inviteeRouter = require("./routes/inviteeRouter");
const authRouter = require("./routes/authRouter");
const cookieParser = require("cookie-parser");
const errorHandler = require("./middleware/error");
const morgan = require("morgan");
const cors = require("cors");
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const xssClean = require("xss-clean");
const rateLimit = require('express-rate-limit');
const hpp = require("hpp");

dotenv.config({ path: "./src/config/config.env" });

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(mongoSanitize());
app.use(helmet());
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})
app.use(limiter);
app.use(hpp());
app.use(xssClean());

const clientAddress = process.env.CLIENT_ADDRESS || "http://localhost:8080";
const corsOptions = {
  origin: [clientAddress, "http://localhost:5173", "http://192.168.1.126:5173", "77.86.108.133"],
  credentials: true,
};
app.use(cors(corsOptions));
app.use("/api/v1/invitee", inviteeRouter);
app.use("/api/v1/auth", authRouter);
app.use(errorHandler);
module.exports = app;
