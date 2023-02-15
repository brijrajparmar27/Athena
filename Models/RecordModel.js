const mongoose = require("mongoose");

const RecordSchema = mongoose.Schema(
  {
    name: String,
    opened: [],
  },
  { collection: "Record" }
);

module.exports = mongoose.model("Record", RecordSchema);
