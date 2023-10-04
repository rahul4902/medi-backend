const generateToken = require("../helper/generateToken");
const {
  successResponse,
  errorResponse,
  validationResponse,
} = require("../helper/response");
const User = require("../models/user");
const bcrypt = require("bcrypt");

exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return validationResponse(res, "Email already exists.", {
        email: "Email already exists.",
      });
    }
    const newUser = await User.create({
      name,
      email,
      password,
    });
    return successResponse(res, "User registered successfully", []);
  } catch (error) {
    console.error(error);
    return errorResponse(res, "User registration failed.");
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    var existingUser = await User.findOne({ where: { email } });
    if (!existingUser) {
      return validationResponse(res, "Invalid Credentials.", {
        email: "Invalid Credentials.",
      });
    }
    bcrypt.compare(password, existingUser.password, async (err, result) => {
      if (err) {
        return errorResponse(res, "Invalid Credentials");
      } else if (result) {
        const token = await generateToken({
          id: existingUser.id,
          name: existingUser.name,
          email: existingUser.email,
        });

        existingUser
          .update({ token: `Bearer ${token}` })
          .then((updatedUser) => {
            return successResponse(res, "Login successfully", updatedUser);
          });
        // return successResponse(res, "Login successfully", existingUser);
      } else {
        return errorResponse(res, "Invalid Credentials");
      }
    });
  } catch (error) {
    console.error(error);
    return errorResponse(res, "Invalid Credentials.");
  }
};

exports.logout = async (req, res) => {
  const { token } = req.body;

  try {
    const existingUser = await User.findOne({ where: { token } });
    if (!existingUser) {
      return errorResponse(res, "User Not Found.");
    }
    existingUser.update({ token: "" }).then((existingUser) => {
      return successResponse(res, "User logout successfully", existingUser);
    });
  } catch (error) {
    console.error(error);
    return errorResponse(res, "User logout failed.");
  }
};
