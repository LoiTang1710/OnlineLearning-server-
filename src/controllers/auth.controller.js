import { StatusCodes } from "http-status-codes";
import { Auth } from "../services/auth.service.js";
import ms from "ms";

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { user, accessToken, refreshToken } = await Auth.login({
      email,
      password,
    });
    console.log("accessToken: ", accessToken);
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: ms("7 days"),
    });

    res.status(StatusCodes.OK).json({ message: "Login Success", accessToken });
  } catch (error) {
    next(error)
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
    res.status(StatusCodes.OK).json({ message: "Register success" });
  } catch (error) {
   next(error)
  }
};
