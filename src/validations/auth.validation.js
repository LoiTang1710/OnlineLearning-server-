import ApiError from "../utils/ApiError.util.js";
import { StatusCodes } from "http-status-codes";
import Joi from "joi";

const login = async (req, res, next) => {
  const correctInput = Joi.object({
    identifier: Joi.alternatives()
      .try(Joi.string().email(), Joi.string())
      .required(),
    password: Joi.string().required(),
  });
  try {
    await correctInput.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (error) {
    next(
      new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message),
    );
  }
};
const register = async (req, res, next) => {
  const correctInput = Joi.object({
    username: Joi.string().max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{8,30}$")),
    full_name: Joi.string().required(),
  });
  try {
    await correctInput.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (error) {
    next(
      new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message),
    );
  }
};
export const authValidation = { login, register };
