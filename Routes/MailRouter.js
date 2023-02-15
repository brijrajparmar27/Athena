const express = require("express");
const sendMail = require("../Controllers/MailController");

const Router = express();

Router.post("/", sendMail);

module.exports = Router;
