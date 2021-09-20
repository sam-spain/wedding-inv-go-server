import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./config/db";
import inviteeRouter from "./routes/inviteeRouter";
import morgan from 'morgan';


dotenv.config({ path: "./src/config/config.env" });
connectDb();

const app = express();
const PORT = process.env.PORT || 8080; // default port to listen

app.use(express.json());
app.use(morgan("dev"));

app.use((req, res, next) => {
  // tslint:disable-next-line:no-console
  console.log(req.body);
  next();
});


app.use("/api/v1/invitee", inviteeRouter);

// start the Express server
const server = app.listen(PORT, () => {
  // tslint:disable-next-line:no-console
  console.log(`server started at http://localhost:${PORT}`);
});

process.on("unhandledRejection", (err: any, promise) => {
  // tslint:disable-next-line:no-console
  console.log(`Error: ${err.message}`);
  server.close(() => process.exit(1));
});
