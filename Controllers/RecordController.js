const RecordModel = require("../Models/RecordModel");
const ImageModel = require("../Models/ImgModel");

const PunchIn = async (req, res) => {
  const exists = await RecordModel.findOne({ name: req.query["name"] });

  if (exists) {
    let updateOpened = exists.opened;
    console.log(exists);
    updateOpened.push(Date.now());
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
    let opened = [Date.now()];

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

module.exports = PunchIn;
