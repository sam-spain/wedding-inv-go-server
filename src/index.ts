import Server from './server';
import dotenv from "dotenv";
import express from "express";
const PORT = process.env.PORT || 8080; // default port to listen
import { connectDb } from "./config/db";
dotenv.config({ path: "./src/config/config.env" });

connectDb();


Server.use((req, res, next) => {
  // tslint:disable-next-line:no-console
  console.log(req.body);
  next();
});

// start the Express server
const server = Server.listen(PORT, () => {
  // tslint:disable-next-line:no-console
  console.log(`server started at http://localhost:${PORT}`);
});

process.on("unhandledRejection", (err: any, promise) => {
  // tslint:disable-next-line:no-console
  console.log(`Error: ${err.message}`);
  server.close(() => process.exit(1));
});
