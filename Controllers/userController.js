const User = require("../Models/userModel");
const bcrypt = require("bcrypt");

exports.signUp = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  try {
    if (user) {
      // check if the email is already registered
      return res.status(200).json({
        message: "Email already registered, Please use another one",
      });
    }

    // check if the password is same as the confirm password
    if (req.body.password !== req.body.confirmPassword) {
      return res.status(403).json({ message: "Passwrds do not match" });
    }

    // check if the password is less then 7 characters
    if (req.body.password.length < 7) {
      return res.status.json({
        message: "password must be not less than 7 characters",
      });
    }

    // encrypt password
    const saltRounds = 10;
    let myPassword = req.body.password;
    const hashedPassword = await bcrypt.hash(myPassword, saltRounds);
    req.body.password = hashedPassword;
    await User.create(req.body);
    return res.status(200).json({ message: "User Created Successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `something went wrong ${error.message}` });
  }
};

/// Login function

exports.login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    // check if the entered email is already registered
    if (!user) {
      return res.status(404).json({ message: "Wrong credentials" });
    }
    // check if the passwords are matched
    let myPassword = req.body.password;
    let hashedPassword = user.password;
    const checkedPassword = await bcrypt.compare(myPassword, hashedPassword);
    if (checkedPassword == false) {
      return res.status(404).json({ message: "Wrong credentials" });
    }
    return res.status(200).send({ message: "Logged in" });
  } catch (error) {
    res.status(404).json({ message: "error" });
  }
};
