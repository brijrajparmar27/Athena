const RecordModel = require("../Models/RecordModel");
const nodemailer = require("nodemailer");

const createRecord = async (name, email) => {
  let opened = [];

  let record = {
    name,
    opened,
    email,
  };

  const created = await RecordModel.create(record);
  console.log(created);
  return created;
};

const handleMail = async (email, content, id) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: false,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASS,
    },
  });

  let mailOptions = {
    from: "brijrajparmaromegab32@gmail.com",
    to: email,
    subject: "Hello ✔",
    text: "Hello world?",
    html: `<div>
    <p>${content}</p>
    <img src='${process.env.BASE_URL}/api/image/${id}'/>
    </div>`,
  };

  let info = await transporter.sendMail(mailOptions, function (err, info) {
    if (err) {
      console.log(err);
    } else {
      console.log("Message sent: %s", info.messageId);
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    }
  });
};

const sendMail = async (req, res) => {
  const { name, email, content } = req.body;
  const record = await createRecord(name, email);
  console.log(record);
  await handleMail(email, content, record._id);
  res.json(record).status(200);
};

module.exports = sendMail;
