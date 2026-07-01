import express from "express";
import apiRouter from "./routes/index.js";
import { env } from "./config/environment.js";
import { connectDB } from "./config/database.js";
import { errorHandling } from "./middlewares/errorHandling.middleware.js";
import cookieParser from 'cookie-parser'
import cors from 'cors'
import swaggerJsDoc from 'swagger-jsdoc'
import swaggerUI from 'swagger-ui-express'

const app = express();
const port = 3000;
app.use(cors({
  origin: `${env.CLIENT_URI}${env.CLIENT_PORT}`,
  credentials: true
}))
app.use(express.json());
app.use(cookieParser())


// 1. Cấu hình thông tin cơ bản cho Swagger
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Tài liệu API Dự án của tôi",
      version: "1.0.0",
      description: "Mô tả các API cho ứng dụng Node.js",
    },
    servers: [
      {
        url: "http://localhost:3000", // Đổi lại thành port bạn đang dùng
        description: "Local server",
      },
    ],
  },
  // 2. Chỉ đường dẫn tới các file chứa code API của bạn để thư viện quét comment
  apis: ["./*.js", "./src/routes/*.js", "./src/features/**/*.js"],
};

// 3. Khởi tạo docs
const specs = swaggerJsDoc(options);

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
app.use("/", apiRouter);
app.use(errorHandling);

connectDB();



app.listen(port, () => {
  console.log(`Server is listening at ${env.SERVER_URI}${env.SERVER_PORT}`);
});

export default app;
