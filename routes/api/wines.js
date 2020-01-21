const express = require("express");
const router = express.Router();
const winesCtrl = require("../../controllers/wines");

//router.get('/', winesCtrl.create);

/*--- protected routes ---*/
router.use(require("../../config/auth"));
router.post("/", checkAuth, winesCtrl.create);

module.exports = router;

/*--- helper function ---*/

function checkAuth(req, res, next) {
  if (req.user) return next();
  return res.status(401).json({ msg: "Not Authorized" });
}
