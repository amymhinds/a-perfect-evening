const User = require("../models/user");
const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET;

module.exports = {
  signup,
  login,
  updateUserWines,
  addCheeseToWine
};

// async function updateUserWines(req, res) {
//   const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
//     new: true
//   });
//   console.log("update user ", updatedUser);
//   res.status(200).json(updatedUser);
//}

function updateUserWines(req, res) {
  User.findByIdAndUpdate(req.params.id, req.body, function(err, updatedUser) {
    if (err) console.log(err);
    res.status(200).json(updatedUser);
  });
}

async function login(req, res) {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(401).json({ err: "bad credentials" });
    user.comparePassword(req.body.pw, (err, isMatch) => {
      if (isMatch) {
        const token = createJWT(user);
        res.json({ token });
      } else {
        return res.status(401).json({ err: "bad credentials" });
      }
    });
  } catch (err) {
    return res.status(401).json(err);
  }
}

async function signup(req, res) {
  const user = new User(req.body);
  try {
    await user.save();
    const token = createJWT(user);
    res.json({ token });
  } catch (err) {
    // Probably a duplicate email
    res.status(400).json(err);
  }
}

function addCheeseToWine(req, res) {
  User.findById(req.params.id, function(err, user) {
    if (err) console.log(err);
    console.log(req.body);
    user.wines[req.params.wId].cheeses.push(req.body);
    user.save(function(err) {
      res.send({ message: "yoloswag" });
    });
  });
}

/*--- helper functions ---*/

function createJWT(user) {
  return jwt.sign({ user }, SECRET, { expiresIn: "24h" });
}
