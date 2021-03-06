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
  User.findByIdAndUpdate(req.params.id, req.body, { new: true }, function(
    err,
    updatedUser
  ) {
    if (err) console.log(err);
    console.log("we are doing something on the wrong route");
    res.status(200).json(updatedUser);
  });
}

function addCheeseToWine(req, res) {
  console.log("we are doing something");
  User.findByIdAndUpdate(req.params.id, req.body, { new: true }, function(
    err,
    updatedUser
  ) {
    if (err) console.log(err);
    console.log("hello world!", updatedUser);
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

/*--- helper functions ---*/

function createJWT(user) {
  return jwt.sign({ user }, SECRET, { expiresIn: "24h" });
}
