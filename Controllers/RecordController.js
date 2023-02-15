const RecordModel = require("../Models/RecordModel");
const ImageModel = require("../Models/ImgModel");

const PunchIn = async (req, res) => {
  const exists = await RecordModel.findOne({ name: req.query["name"] });

  if (exists) {
    let updateOpened = exists.opened;
    console.log(exists);
    updateOpened.push(new Date());
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
    let opened = [new Date()];

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
  RecordModel.find({})
    .then((records) => {
      res.json(records).status(200);
    })
    .catch((error) => {
      res.json(error).status(400);
    });
};

module.exports = { PunchIn, fetchRecords };
