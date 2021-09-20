import express from "express";
import dotenv from "dotenv";
import inviteeRouter from "./routes/inviteeRouter";
import morgan from 'morgan';

dotenv.config({ path: "./src/config/config.env" });

const app = express();
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/v1/invitee", inviteeRouter);

export default app;