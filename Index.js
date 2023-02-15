const express = require("express");
const fileupload = require("express-fileupload");
const cors = require("cors");
const mongoose = require("mongoose");
const Imgrouter = require("./Routes/ImgRouter");
require("dotenv").config();
const MailRouter = require("./Routes/MailRouter");

const app = express();

app.use(express.json());
app.use(fileupload());
app.use(cors());

app.use("/api", Imgrouter);
app.use("/api/mailer", MailRouter);

mongoose.connect(process.env.MONGO).then(() => {
  app.listen(process.env.PORT, () => {
    console.log("listening on port 4000");
  });
});
