import express from "express";
import dotenv from "dotenv";

dotenv.config({path: "./config/config.env"});
const app = express();
const PORT = process.env.PORT || 8080; // default port to listen

// define a route handler for the default home page
app.get("/", (req, res) => {
  res.send("Hello user");
});

app.get("/api/v1/invitee", (req, res) => {
  res.status(200).json([{name: "sam"}, {name: "karen"}]);
})

app.get("/api/v1/invitee/:id", (req, res) => {
  res.status(200).json({id: req.params.id, name: "sam"});
})

app.post("/api/v1/invitee", (req, res) => {
  res.status(200).json({"created invitee" : {name: "sam"}});
})

app.put("/api/v1/invitee/:id", (req, res) => {
  res.status(200).json({"modified invitee" : {id: req.params.id, name: "sam"}});
})

app.delete("/api/v1/invitee/:id", (req, res) => {
  res.status(200).json({"deleted invitee" : {id: req.params.id, name: "sam"}});
})
// start the Express server
app.listen(PORT, () => {
  // tslint:disable-next-line:no-console
  console.log(`server started at http://localhost:${PORT}`);
});
