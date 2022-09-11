const User = require("../Models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function createToken(value) {
  const token = await jwt.sign(
    {
      expiresIn: "3h",
      data: value,
    },
    process.env.JWTSECRET
  );
  return token;
}

exports.signUp = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  try {
    if (user) {
      // check if the email is already registered
      return res.status(409).json({
        message: "Email already registered, Please use another one",
      });
    }

    // check if the password is same as the confirm password
    if (req.body.password !== req.body.confirmPassword) {
      return res.status(403).json({ message: "Passwords do not match" });
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

    // 5. create a token
    const token = await createToken({ email: req.body.email });

    return res
      .status(201)
      .json({ message: "User Created Successfully", token });
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
    // 5. create a token
    const token = await createToken({ email: user.email, role: user.role });
    return res.status(200).send({ message: "Logged in", token });
  } catch (error) {
    res.status(404).json({ message: "error" });
  }
};

// Change password

exports.changePassword = async (req, res) => {
  try {
    const findUser = await User.findOne({ email: req.user.email });
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
      { email: findUser.email },
      { password: hashedPassword }
    );

    return res.status(200).json({ message: "Password Changed" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// get all users

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json({ result: users.length, users });
  } catch (error) {
    return res.status(500).json({
      error: `Sorry something went wrong please try again ${error.message}`,
    });
  }
};

exports.protect = (req, res, next) => {
  try {
    const token = req.headers.authentication;
    //1. token is empty
    if (!token) {
      return res.status(401).json({ message: "You're not Authorized" });
    }
    //2. token verify
    jwt.verify(token, process.env.JWTSECRET, function (err, result) {
      if (err) {
        return res.status(500).json({ message: "Loggin session expired" });
      }
      req.user = result.data;
    });
    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.checkUser = (req, res, next) => {
  try {
    const token = req.headers.authentication;
    if (!token) {
      return res.status(401).json({ message: "You're not Authorized" });
    }
    jwt.verify(token, process.env.JWTSECRET, function (err, result) {
      if (err) {
        return res.status(500).json({ message: "Loggin session expired" });
      }
    });
    return res.status(200).json({ message: "Authentication successful" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
