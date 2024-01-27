const router = require("express").Router();
const User = require("../models/user");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

//Register a user
router.post("/register", async (req, res) => {
  //first we need to build the object
  const newUser = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASSWORD_SECRET
    ).toString(),
  });

  try {
    const savedUser = await newUser.save();
    const token = jwt.sign({ email: savedUser.email }, process.env.JWT_SECRET, {
      expiresIn: "5m",
    });

    res.cookie("token", token, {
      httpOnly: true,
      expires: new Date(Date.now() + 60000),
    });

    res.status(200).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    !user && res.status(401).json("wrong email address");

    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASSWORD_SECRET
    );

    const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
    if (originalPassword !== req.body.password) {
      res.status(401).json("wrong password");
    } else {
      res.status(200).json("User is authenticated!!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
