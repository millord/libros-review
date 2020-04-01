const router = require("express").Router();
const User = require("../models/User");
const { signupValidation, signinValidation } = require("./validation");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// auth middleware
const auth = require("./verify");

// create a user
router.post("/signup", async (req, res) => {
  try {
    // validate the data
    const { error } = signupValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // avoid the same user to signup
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) return res.status(400).send("User already in the system");

    // hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword
    });
    const newUser = await user.save();
    res.status(201).send(newUser);
  } catch (err) {
    res.status(400).send({ message: err });
  }
});

// signin the user
router.post("/signin", async (req, res) => {
  try {
    // validate the data
    const { error } = signinValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // make use the user is in the db
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("Wrong user or Password");
    // check if you have the same password
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send("Invalid Password");

    // create an asign the token
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
    res.header("auth-token", token).send(token);
  } catch (err) {
    res.status(400).send({ message: err });
  }
});

module.exports = router;
