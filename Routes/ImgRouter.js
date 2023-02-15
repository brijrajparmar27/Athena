const express = require("express");
const { uploadImage } = require("../Controllers/ImgController");
const { PunchIn, fetchRecords } = require("../Controllers/RecordController");

const Router = express.Router();

Router.post("/image/", uploadImage);
Router.get("/image/", PunchIn);
Router.get("/records/", fetchRecords);
Router.get("/", (req, res) => {
  res.json({ msg: "hello" });
});

module.exports = Router;
