import { User } from "../models/users.models.js";

const resgisterUser = async (req, res, next) => {
  const { name, email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res
      .status(400)
      .json({ message: "Email already exists", success: false });
  }

  const user = await User.create({ name, email, password })

  const userCreatedCheck = await User.findById(user._id).select("-password");
  if(!userCreatedCheck) {
    return res.status(500).json({
      message: "Something went wrong, user not created",
      success: false
    });
  }

  const token = await user.createJWT();

  res.status(201).json({
    message: "User registered successfully",
    success: true,
    userCreatedCheck,
    token: token
  });
};

export default resgisterUser;
