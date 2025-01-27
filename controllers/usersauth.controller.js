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
    res.status(201).json({
      message: "User registered successfully",
      success: true,
      user,
    });
   
};

export default resgisterUser;
