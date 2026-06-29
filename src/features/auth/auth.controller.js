import { StatusCodes } from "http-status-codes";
import { Auth } from "./auth.service.js";
import ms from "ms";

export const login = async (req, res, next) => {
  try {
    const { identifier, password } = req.body;
    const { user, accessToken, refreshToken } = await Auth.login({
      identifier,
      password,
    });
    console.log("accessToken: ", accessToken);
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: ms("7 days"),
    });

    return res
      .status(StatusCodes.OK)
      .json({ message: "Login Success", accessToken });
  } catch (error) {
    next(error);
  }
};

export const register = async (req, res, next) => {
  try {
    const { email, username, password, full_name } = req.body;
    const { user } = await Auth.register({
      email,
      username,
      password,
      full_name,
    });
    return res.status(StatusCodes.OK).json({ message: "Register success" });
  } catch (error) {
    next(error);
  }
};

export const refreshToken = async (req, res, next) => {
  try {
    const token = req.cookie?.refreshToken;
    const { accessToken } = await Auth.refreshToken(token);
    console.log("accessToken-refresh: ", accessToken);
    return res.status(StatusCodes.OK).json({ accessToken });
  } catch (error) {
    next(error);
  }
};
