var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var cheeseSchema = new Schema(
  {
    name: {
      type: String
    },
    rating: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Cheese", cheeseSchema);
