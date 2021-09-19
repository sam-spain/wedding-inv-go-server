import express from "express";
import dotenv from "dotenv";

dotenv.config({path: "./config/config.env"});
const app = express();
const PORT = process.env.PORT || 8080; // default port to listen

// define a route handler for the default home page
app.get("/", (req, res) => {
  res.send("Hello user");
});

// start the Express server
app.listen(PORT, () => {
  // tslint:disable-next-line:no-console
  console.log(`server started at http://localhost:${PORT}`);
});
