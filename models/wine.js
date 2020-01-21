const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var wineSchema = new Schema(
  {
    name: {
      type: String
    },
    type: {
      type: String
    },
    vintage: {
      type: String
    },
    score: {
      type: String
    },
    regions: {
      type: String
    },
    cheese: [
      {
        type: Schema.Types.ObjectId,
        ref: "Cheese"
      }
    ]
  },
  {
    timestamps: true
  }
);
module.exports = mongoose.model("Wine", wineSchema);
