const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var wineSchema = new Schema(
  {
    name: {
      type: String
    },
    type: {
      type: String
    }
  },
  {
    timestamps: true
  }
);
module.exports = mongoose.model("Wine", wineSchema);
