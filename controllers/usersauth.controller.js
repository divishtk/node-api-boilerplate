import { User } from "../models/users.models.js";

const resgisterUser = async (req, res, next) => {
  const { name, email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res
      .status(400)
      .json({ message: "Email already exists", success: false });
  }

  const user = await User.create({ name, email, password });

  const userCreatedCheck = await User.findById(user._id).select("-password");
  if (!userCreatedCheck) {
    return res.status(500).json({
      message: "Something went wrong, user not created",
      success: false,
    });
  }

  const token = await user.createJWT();

  res.status(201).json({
    message: "User registered successfully",
    success: true,
    userCreatedCheck,
    token: token,
  });
};

const loginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;
  
    if (!email || !password) {
      return next("Please provide all fields");
    }
    const user = await User.findOne({email})
    console.log('user',user);
    if (!user) {
      return next("Email doesnt exists, please create account");
    }
  
    const isPasswordValid = await user.matchPassword(password);
    if (!isPasswordValid) return next("Password Incorrect");
    user.password = undefined;

    const token = await user.createJWT();
  
    return res.status(200).json({
      message: "Login Success",
      success: true,
      user,
      token,
    });
  } catch (error) {
    next(error);
  }
};
export { resgisterUser, loginController };
