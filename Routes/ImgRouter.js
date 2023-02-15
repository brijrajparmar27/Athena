const express = require("express");
const { uploadImage } = require("../Controllers/ImgController");
const PunchIn = require("../Controllers/RecordController");

const Router = express.Router();

Router.post("/image/", uploadImage);
Router.get("/image/", PunchIn);
Router.get("/", (req, res) => {
  res.json({ msg: "hello" });
});

module.exports = Router;
