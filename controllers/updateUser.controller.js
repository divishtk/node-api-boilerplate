import { User } from "../models/users.models.js";

const updateUserController = async (req, res, next) => {
    console.log('called');
  try {
    const { name, email, location } = req.body;

    if (!name || !email || !location) {
      return next("Please provide all fields");
    }

    const user = await User.findOne({ _id: req.user.userId });
    user.name = name;
    user.email = email;
    user.location = location;
    await user.save();

    const token = await user.createJWT();

    res.status(200).json({
      message: "User updated successfully",
      user,
      token,
    });
  } catch (error) {
    next(error);
  }
};

const updatePasswordController = async (req, res, next) => {
  try {
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
      return next("Please provide all fields");
    }
    const user = await User.findOne({ _id: req.user.userId });
    console.log('user' , user);
    console.log('oldPassword' , oldPassword);
    const isoldPasswordMatchWithHasedPassword = await user.matchPassword(
      oldPassword
    );
    console.log('isoldmatchwith new' , isoldPasswordMatchWithHasedPassword);

    if (!isoldPasswordMatchWithHasedPassword) {
      return next("Old password is incorrect, please provide correct password");
    }

    user.password = newPassword;
    await user.save();
    res.status(200).json({
      message: "Password updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

export { updateUserController, updatePasswordController };
