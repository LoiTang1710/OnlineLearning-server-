import express from "express";
import apiRouter from "./routes/index.js";
import { env } from "./config/environment.js";
import { connectDB } from "./config/database.js";
import { errorHandling } from "./middlewares/errorHandling.middleware.js";
import cookieParser from 'cookie-parser'
import cors from 'cors'

const app = express();
const port = 3000;
app.use(cors({
  origin: `${env.CLIENT_URI}${env.CLIENT_PORT}`,
  credentials: true
}))
app.use(express.json());
app.use(cookieParser())
app.use("/", apiRouter);

app.use(errorHandling);

connectDB();

app.listen(port, () => {
  console.log(`Server is listening at ${env.SERVER_URI}${env.SERVER_PORT}`);
});

export default app;
