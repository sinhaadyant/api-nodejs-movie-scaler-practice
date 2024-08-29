import User, { IUser } from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../config";
export const registerUser = async (
  username: string,
  email: string,
  password: string
): Promise<IUser> => {
  // check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) throw new Error("User Already Exists");
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({
    username,
    email,
    password: hashedPassword,
  });
  return await user.save();
};
export const loginUser = async (
  email: string,
  password: string
): Promise<{ token: string; user: IUser }> => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("User Not found");

  const isMatched = await bcrypt.compare(password, user.password);
  if (!isMatched) throw new Error("Invalid Credentails");

  const token = jwt.sign(
    { id: user._id },
    config.jwtSecret
    //     {
    //     expiresIn: "1d",
    //   }
  );
  return { token, user };
};
