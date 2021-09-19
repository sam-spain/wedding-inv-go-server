import express from "express";
const inviteeRouter = express.Router();

inviteeRouter.get("/", (req, res) => {
  res.status(200).json([{ name: "sam" }, { name: "karen" }]);
});

inviteeRouter.get("/:id", (req, res) => {
  res.status(200).json({ id: req.params.id, name: "sam" });
});

inviteeRouter.post("/", (req, res) => {
  res.status(200).json({ "created invitee": { name: "sam" } });
});

inviteeRouter.put("/:id", (req, res) => {
  res
    .status(200)
    .json({ "modified invitee": { id: req.params.id, name: "sam" } });
});

inviteeRouter.delete("/:id", (req, res) => {
  res
    .status(200)
    .json({ "deleted invitee": { id: req.params.id, name: "sam" } });
});

export default inviteeRouter;
