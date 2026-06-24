import { StatusCodes } from "http-status-codes"
import { Auth } from "../services/auth.service.js"

export const login = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await Auth.login({ email, password })
    res.status(StatusCodes.OK).json({ message: 'Login Success' })
  } catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: error.message })
  }
}


export const register = async (req, res) => {
  try {
    const { email, username, password, full_name } = req.body
    const { user } = await Auth.register({ email, username, password, full_name })
    res.status(StatusCodes.OK).json({ message: 'Register success' })
  }
  catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: error.message })
  }
}

