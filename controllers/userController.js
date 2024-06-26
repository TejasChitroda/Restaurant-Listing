const { status } = require("init");
const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");

// get user
const getUserController = async (req, res) => {
  try {
    //find user
    const user = await userModel.findById({ _id: req.body.id });

    //validation
    if (!user) {
      return res.status(404).json({
        status: 404,
        message: "user is not found",
      });
    }
    //hide password
    user.password = undefined;

    res.status(200).json({
      status: 200,
      message: "user found",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 500,
      message: "Something went wrong",
    });
  }
};

//update user
const updateUserController = async (req, res) => {
  try {
    //find user
    const user = await userModel.findById({ _id: req.body.id });
    //validation
    if (!user) {
      return res.status(404).json({
        status: 404,
        message: "User Not Found",
      });
    }

    //update
    const { userName, address, phone } = req.body;
    if (userName) user.userName = userName;
    if (address) user.address = address;
    if (phone) user.phone = phone;

    // save the user
    await user.save();

    res.status(200).json({
      status: 200,
      message: "User Updated Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "fail",
      message: "Error In Update Page",
    });
  }
};

//Update User Password
const updatePasswordController = async (req, res) => {
  try {
    //find User
    const user = await userModel.findById({ _id: req.body.id });
    // validation
    if (!user) {
      return res.status(404).json({
        status: 404,
        message: "404 Not Found",
      });
    }
    // get data from user
    const { oldPassword, newPassword } = req.body;
    // validation
    if (!oldPassword || !newPassword) {
      return res.status(500).json({
        status: 500,
        message: "Pleas provide Old or New Password",
      });
    }
    //check user password to compare password
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(500).json({
        status: 500,
        message: "Invalid Password",
      });
    }
    //hashing the password
    var salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword;
    await user.save();
    return res.status(200).json({
      status: 200,
      message: "Password Updated",
      newPassword,
      oldPassword,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "false",
      message: "Error in Update Password page",
      error,
    });
  }
};

//Reset Password
const resetPasswordController = async (req, res) => {
  try {
    const { email, newPassword, answer } = req.body;
    if (!email || !newPassword || !answer) {
      return res.status(500).send({
        success: false,
        message: "Please Provide all fields",
      });
    }
    const user = await userModel.findOne({ email, answer });
    if (!user) {
      return res.status(500).send({
        success: false,
        message: "User Not Found or Invalid Answer",
      });
    }

    //hashing password
    var salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword;
    await user.save();
    res.status(200).send({
      success: true,
      message: "Password Reset SUccessfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "eror in PASSWORD RESET API",
      error,
    });
  }
};

// Delete PRofile
const deleteProfileController = async (req, res) => {
  try {
    await userModel.findByIdAndDelete(req.params.id);
    return res.status(200).send({
      success: true,
      message: "Your Accound is deleted successfully",
      error,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr In Delete Profile API",
      error,
    });
  }
};

module.exports = {
  getUserController,
  updateUserController,
  updatePasswordController,
  resetPasswordController,
  deleteProfileController,
};
