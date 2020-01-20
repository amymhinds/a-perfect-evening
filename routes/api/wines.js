const express = require("express");
const router = express.Router();
const winesCtrl = require("../../controllers/wines");

/*---------- Public Routes ----------*/
router.post("/wines", winesCtrl.getAllWines);

/*---------- Protected Routes ----------*/

module.exports = router;
