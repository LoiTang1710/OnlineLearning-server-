import 'dotenv/config'

export const env = {
  SERVER_PORT: process.env.SERVER_PORT,
  SERVER_URI: process.env.SERVER_URI,
  BUILD_MODE: process.env.BUILD_MODE,
}
