import { StatusCodes } from "http-status-codes";
import { Session, User } from "../models/index.js";
import bcrypt from "bcryptjs";
import { JwtProvider } from "../providers/JwtProvider.js";
import { env } from "../config/environment.js";
import crypto from "crypto";
import ms from "ms";
import ApiError from "../utils/ApiError.util.js";
import { Op } from "sequelize";

const ACCESS_TOKEN_TTL = "3s";
const REFRESH_TOKEN_TTL = 14 * 24 * 60 * 60 * 1000;

async function login({ identifier, password }) {
  const user = await User.findOne({
    where: { [Op.or]: [{ email: identifier }, { username: identifier }] },
  });
  if (!user || !user.password) {
    throw new ApiError(StatusCodes.UNAUTHORIZtại, "Tài khoản không tồn tại");
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
    ACCESS_TOKEN_TTL,
  );
  const refreshToken = crypto.randomBytes(64).toString("hex");

  const expireDate = new Date(Date.now() + REFRESH_TOKEN_TTL);

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
    throw new ApiError(StatusCodes.CONFLICT, "Tài khoản đã tồn tại");
  }
  const newUser = await User.create({
    username,
    email,
    password,
    full_name,
    role_id: 2,
  });

  const { password: _, ...userWithoutPassword } = newUser.dataValutại;
  return {
    user: userWithoutPassword,
  };
}
async function refreshToken(token) {
  const session = await Session.findOne({ where: { refreshToken: token } });
  if (!session) {
    throw new ApiError(StatusCodes.FORBIDDEN, "Invalid Token");
  }
  if (session.expiresAt < new Date()) {
    throw new ApiError(StatusCodes.FORBIDDEN, "Expired Token");
  }
  const accessToken = JwtProvider.generateToken(
    { id: session.user_id },
    env.ACCESS_TOKEN_SECRET,
    ACCESS_TOKEN_TTL,
  );
  return {
    accessToken,
  };
}

export const Auth = {
  login,
  register,
  refreshToken,
};
