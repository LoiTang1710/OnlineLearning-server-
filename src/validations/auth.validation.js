import ApiError from "../utils/ApiError.util.js";
import { StatusCodes } from "http-status-codes";
import Joi from "joi";

const login = async (req, res, next) => {
  const correctInput = Joi.object({
    identifier: Joi.alternatives()
      .try(
        Joi.string()
          .email()
          .messages({ "string.email": "Định dạng Email không hợp lệ" }),
        Joi.string()
          .min(3)
          .messages({ "string.min": "Tên đăng nhập phải từ 3 ký tự trở lên" }),
      )
      .required()
      .messages({
        "any.required": "Tên đăng nhập hoặc Email là bắt buộc",
        "string.empty": "Tên đăng nhập hoặc Email không được để trống",
      }),
    password: Joi.string().required().messages({
      "any.required": "Mật khẩu là bắt buộc",
      "string.empty": "Mật khẩu không được để trống",
    }),
  });
  try {
    await correctInput.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (error) {
    //  Gộp toàn bộ thông báo chi tiết của Joi thành chuỗi text gửi về Client
    const customMessage = error.details.map((item) => item.message).join(", ");
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, customMessage));
  }
};

const register = async (req, res, next) => {
  const correctInput = Joi.object({
    username: Joi.string().min(3).max(50).required().messages({
      "string.min": "Tên đăng nhập phải có ít nhất 3 ký tự",
      "string.max": "Tên đăng nhập không được vượt quá 50 ký tự",
      "any.required": "Tên đăng nhập là bắt buộc",
      "string.empty": "Tên đăng nhập không được để trống",
    }),
    email: Joi.string().email().required().messages({
      "string.email": "Định dạng Email không hợp lệ",
      "any.required": "Email là bắt buộc",
      "string.empty": "Email không được để trống",
    }),
    password: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9]{8,30}$"))
      .required()
      .messages({
        "string.pattern.base":
          "Mật khẩu phải từ 8-30 ký tự, chỉ chứa chữ cái và chữ số",
        "any.required": "Mật khẩu là bắt buộc",
        "string.empty": "Mật khẩu không được để trống",
      }),
    full_name: Joi.string().required().messages({
      "any.required": "Họ và tên là bắt buộc",
      "string.empty": "Họ và tên không được để trống",
    }),
  });
  try {
    await correctInput.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (error) {
    const customMessage = error.details.map((item) => item.message).join(", ");
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, customMessage));
  }
};

export const authValidation = { login, register };
