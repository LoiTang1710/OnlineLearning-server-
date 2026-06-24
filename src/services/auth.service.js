import { StatusCodes } from "http-status-codes";
import { User } from "../models/index.js";
import bcrypt from "bcryptjs";


async function login({ email, password }) {
  const user = await User.findOne({ where: { email } })
  if (!user || !user.password) {
    throw new Error(StatusCodes.UNAUTHORIZED)
  }

  const validatePassword = await bcrypt.compare(password, user.password)
  if (!validatePassword) {
    throw new Error(StatusCodes.UNAUTHORIZED, 'Email or password incorrect')
  }
  const { password: _, userWithoutPassword } = user
  return {
    user: userWithoutPassword
  }
}

async function register({ email, username, password, full_name }) {
  const existingUser = await User.findOne({ where: { email, username } })
  if (existingUser) {
    console.error('User existed!')
  }
  const newUser = await User.create({
    username,
    email,
    password,
    full_name,
    role_id: 2
  })

  const { password: _, ...userWithoutPassword } = newUser.dataValues
  return {
    user: userWithoutPassword
  }
}


export const Auth = {
  login,
  register
}

