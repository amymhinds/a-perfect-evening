const Wine = require("../models/wine");
const User = require("../models/user");
const request = require("request");
const BASE_URL =
  "https://api.globalwinescore.com/globalwinescores/latest/?wine=justin/";

module.exports = {
  getAllWines
};

function getAllWines(req, res) {
  const options = {
    url: `${BASE_URL}`,
    headers: {
      Authorization: "Token beef4bd81234e85c6343623eb0da47c5cf55ed65",
      Accept: "application/json"
      //"Access-Control-Allow-Origin": "http://127.0.0.1:3000"
    }
  };
  request(options, (err, response, body) => {
    let data = JSON.parse(body);
    console.log("this is the data" + data);
  });
}
