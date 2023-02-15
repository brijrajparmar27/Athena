const mongoose = require("mongoose");

const RecordSchema = mongoose.Schema(
  {
    name: String,
    opened: {
      type: [],
      default: [],
    },
    email: String,
  },
  { collection: "Record" }
);

module.exports = mongoose.model("Record", RecordSchema);
