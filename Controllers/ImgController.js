const ImageModel = require("../Models/ImgModel");

const uploadImage = (req, res) => {
  ImageModel.create({ Image: req.files.image.data })
    .then((doc) => {
      res.json(doc).status(200);
    })
    .catch((err) => {
      res.json(err).status(400);
    });
};
module.exports = { uploadImage };
