const Wine = require("../models/wine");
const User = require("../models/user");
const request = require("request");
const BASE_URL =
  "https://api.globalwinescore.com/globalwinescores/latest/?wine=justin/";

module.exports = {
  create
};
async function create(req, res) {
  console.log(req.user);
  try {
    await Wine.create(req.body);
    // Use the highScores action to return the list
  } catch (err) {
    res.json({ err });
  }
}
