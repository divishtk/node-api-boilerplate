import { User } from "../models/users.models.js";

const updateUserController = async (req, res, next) => {
  try {
    const { name, email, location } = req.body;

    if (!name || !email || !location) {
      return next("Please provide all fields");
    }

    const user = await User.findOne({_id : req.user.userId});
    user.name = name;
    user.email = email;
    user.location = location;
    await user.save();

    const token = await user.createJWT();

    res.status(200).json({
      message: "User updated successfully",
      user,
      token
    });
  } catch (error) {
    next(error);
  }
};

export default updateUserController;
