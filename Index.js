const express = require("express");
const fileupload = require("express-fileupload");
const cors = require("cors");
const mongoose = require("mongoose");
const Imgrouter = require("./Routes/ImgRouter");
const MailRouter = require("./Routes/MailRouter");

const app = express();

app.use(express.json());
app.use(fileupload());
app.use(cors());

app.use("/api", Imgrouter);
app.use("/api/mailer", MailRouter);

mongoose
  .connect(
    "mongodb+srv://brijraj:rockman@mernapp.ubptawq.mongodb.net/athena?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(4000, () => {
      console.log("listening on port 4000");
    });
  });
