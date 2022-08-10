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

// Change password

exports.changePassword = async (req, res) => {
  try {
    const findUser = await User.findOne({ email: req.body.email });
    if (!findUser) {
      return res.status(404).json({ message: "User not found" });
    }
    let compare = await bcrypt.compare(req.body.oldPassword, findUser.password);
    if (compare == false) {
      return res.status(400).json({ message: "Password is incorrect" });
    }
    if (req.body.newPassword.length < 7) {
      return res
        .status(400)
        .json({ message: "Password is less than 7 characters" });
    }
    if (req.body.newPassword === req.body.oldPassword) {
      return res
        .status(400)
        .json({ message: "New Password cannot be same as old password" });
    }
    if (req.body.newPassword != req.body.confirmNewPassword) {
      return res
        .status(400)
        .json({ message: "New password and confirm password does not match" });
    }
    const hashedPassword = await bcrypt.hash(req.body.newPassword, 10);
    await User.findOneAndUpdate(
      { email: req.body.email },
      { password: hashedPassword }
    );
    return res.status(200).json({ message: "Password Changed" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
