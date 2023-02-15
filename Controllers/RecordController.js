const RecordModel = require("../Models/RecordModel");
const ImageModel = require("../Models/ImgModel");
const moment = require("moment");

const PunchIn = async (req, res) => {
  console.log("requested acess");
  const { id } = req.params;
  const exists = await RecordModel.findById(id);

  if (exists) {
    console.log("exists");
    let updateOpened = exists.opened;
    console.log(exists);
    updateOpened.push(moment().local().format("dddd, MMMM Do YYYY, h:mm:ss a"));
    let newRecord = await RecordModel.findByIdAndUpdate(exists._id, {
      opened: updateOpened,
    });
    console.log(newRecord);
    ImageModel.findById("63eb8080fcb60d7408051cba", { Image: 1 }).then(
      (image) => {
        res.send(image.Image).status(200);
        // console.log(image);
      }
    );
  } else {
    console.log("is new");
    let opened = [moment().local().format("dddd, MMMM Do YYYY, h:mm:ss a")];

    let record = {
      name: req.query["name"],
      opened: opened,
    };

    RecordModel.create(record).then(() => {
      ImageModel.findById("63eb8080fcb60d7408051cba", { Image: 1 }).then(
        (image) => {
          res.send(image.Image).status(200);
          // console.log(image);
        }
      );
    });
  }
};

const fetchRecords = (req, res) => {
  const { id } = req.params;
  RecordModel.findById(id, { opened: 1 })
    .then((records) => {
      res.json(records).status(200);
    })
    .catch((error) => {
      res.json(error).status(400);
    });
};

module.exports = { PunchIn, fetchRecords };
