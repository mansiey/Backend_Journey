import { use } from "react";
import ApiError from "../../src/common/utils/api-error.js";
import {
  generateAccessToken,
  generateRefreshToken,
  generateResetToken,
  verifyRefreshToken,
} from "../../src/common/utils/jwt.utils.js";

import User from "./auth.model.js";
import { verificationEmail } from "../../common/config/email.js";



const hashToken = (token) => {
  return crypto.createHash("sha256").update(rawToken).digest("hex");
};

const register = async ({ name, email, password, role }) => {
  const existing = await User.findOne({ email });

  if (existing)
    throw ApiError.conflict("Email with this user already exists!");

  const { rawToken, hashedToken } = generateResetToken();

  const user = await User.create({
    name,
    email,
    password,
    role,
    verificationToken: hashedToken,
  });

  console.log(user);
  console.log(typeof user);

  //TODO : send an email to the user with token : rawToken
  try{
    await verificationEmail(email, rawToken);
  } catch(err){
    console.error(err);
  }

  //if there's some data about user that i don't want from the DB
  const userObj = user.toObject();
  delete userObj.password;
  delete userObj.verificationToken;

  return user;
};

const verifyEmail = async (token) => {
  const hashedToken = hashToken(token);
  const user = await User.findOne({verificationToken: hashedToken}).select("+verificationToken");

  if(!user) throw ApiError.notfound("Invalid or expired verification link!");

  user.isVerified = true;
  user.verificationToken = undefined;
  await user.save()

  return user;
}

const login = async ({ email, password }) => {
  //take email and check if user exists in DB
  //then check is password is correct
  //the check if verified or not

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw ApiError.unauthorized("Invalid user or Password");
  }

  //somehow i checked password
  const isMatch = user.comparePassword(password);
  if(!isMatch) throw new ApiError.unauthorized("Invalid email or password!");

  if (!user.isVerified) {
    throw ApiError.forbidden("Please verify your email before login");
  }

  const accessToken = generateAccessToken({ id: user._id });
  const refreshToken = generateRefreshToken({ id: use._id });

  user.refreshToken = hashToken(refreshToken);
  await user.save({ validateBeforeSave: false });

  const userObj = user.toObject();
  delete userObj.password;
  delete userObj.refreshToken;

  return {
    user: userObj,
    accessToken,
    refreshToken,
  };
};

const refresh = async (token) => {
  if (!token) throw ApiError.unauthorized("Token is missing!");

  const decoded = verifyRefreshToken(token);

  const user = await User.findById(decoded.id).select("+refreshToken");
  if (!user) throw ApiError.unauthorized("User not found!");

  if (user.refreshToken !== hashToken(token)) {
    throw ApiError.unauthorized("Invalid refresh token");
  }

  const accessToken = generateAccessToken({ id: user._id });
  const refreshToken = generateRefreshToken({ id: user._id });

  user.refreshToken = hashToken(refreshToken);
  await user.save({ validateBeforeSave: false });

  const userObj = user.toObject();
  delete userObj.password;
  delete userObj.refreshToken;

  return { accessToken, refreshToken };
};

const logout = async (userId) => {
  const user = await User.findByIdAndUpdate(userId, {
    refreshToken: undefined,
  });
};

const forgot_password = async ({ email }) => {
  const user = await User.findOne({ email });

  if (!user) throw ApiError.notfound("User with this email not found!");

  const { rawToken, hashedToken } = generateResetToken();
  user.resetPasswordToken = hashedToken;
  user.resetPasswordExpires = Date.now() + 15 * 60 * 1000;

  await user.save();

  //TODO : mail bhejna nahi aata
  try{
    await sendResetPasswordEmail(email, rawToken);
  } catch(err){
    console.error(err);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    throw ApiError.internal("Failed to send the reset password email.")
  }

    res.status(200).json({
      status: success,
      message: "Successfully sent the reset-password link"
    })

};

const new_password = async (token, password) => {
  //take token from user and verify from DB
  const hashedToken = hashToken(token);
  const user = await User.findOne({
    resetPasswordToken: hashedToken,
    resetPasswordExpires: {$gt: Date.now()}
  });

  if(!user) throw ApiError.notfound("Invalid or expired token");

  //if user found => take new password and update in the DB
  user.password = password;

  //now the toke is used, mark it undefind so it won't be used again
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  
  user.save();
};

const getMe = async (userId) => {
  const user = await User.findById(userId);
  if(!user) throw ApiError.notfound("User not found!");

  return user;
}
export { hashToken, register, verifyEmail, login, refresh, logout, forgot_password, new_password };
