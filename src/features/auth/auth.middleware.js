import { StatusCodes } from "http-status-codes";
import ApiError from "../../utils/ApiError.util.js";
import { JwtProvider } from "./JwtProvider.js";
import { env } from "../../config/environment.js";

const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, "Not Login or Invalid token");
  }

  const token = authHeader.split(" ")[1];

  try {
    const PAYLOAD_DECODED = JwtProvider.verifyToken(
      token,
      env.ACCESS_TOKEN_SECRET,
    );
    req.user = PAYLOAD_DECODED;
    next();
  } catch (error) {
    next(error);
  }
};

export const AuthMiddleware = {
  verifyToken,
};
