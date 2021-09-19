import express from "express";
import dotenv from "dotenv";

import inviteeRouter from "./routes/invitee";

dotenv.config({ path: "./src/config/config.env" });
const app = express();
const PORT = process.env.PORT || 8080; // default port to listen

app.use("/api/v1/invitee", inviteeRouter);

// start the Express server
app.listen(PORT, () => {
  // tslint:disable-next-line:no-console
  console.log(`server started at http://localhost:${PORT}`);
});
