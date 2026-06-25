import { StatusCodes } from "http-status-codes";
import { Session, User } from "../models/index.js";
import bcrypt from "bcryptjs";
import { JwtProvider } from "../providers/JwtProvider.js";
import { env } from "../config/environment.js";
import crypto from "crypto";
import ms from "ms";

async function login({ email, password }) {
  const user = await User.findOne({ where: { email } });
  if (!user || !user.password) {
    throw new ApiError(
      StatusCodes.UNAUTHORIZED,
      "Email hoặc mật khẩu không chính xác",
    );
  }

  const validatePassword = await bcrypt.compare(password, user.password);
  if (!validatePassword) {
    throw new ApiError(
      StatusCodes.UNAUTHORIZED,
      "Email hoặc mật khẩu không chính xác",
    );
  }
  const accessToken = JwtProvider.generateToken(
    { id: user.user_id },
    env.ACCESS_TOKEN_SECRET,
    "1h",
  );
  const refreshToken = crypto.randomBytes(64).toString("hex");

  const expireDate = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000);

  await Session.create({
    user_id: user.user_id,
    refreshToken,
    expiresAt: expireDate,
  });

  const { password: _, ...userWithoutPassword } = user.dataValues;

  return {
    user: userWithoutPassword,
    accessToken,
    refreshToken,
  };
}

async function register({ email, username, password, full_name }) {
  const existingUser = await User.findOne({ where: { email, username } });
  if (existingUser) {
    console.error("User existed!");
  }
  const newUser = await User.create({
    username,
    email,
    password,
    full_name,
    role_id: 2,
  });

  const { password: _, ...userWithoutPassword } = newUser.dataValues;
  return {
    user: userWithoutPassword,
  };
}

export const Auth = {
  login,
  register,
};
