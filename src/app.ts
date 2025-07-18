import express, { Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';

//this is the main app.ts file 

import dotenv from "dotenv";
dotenv.config();
const app = express();
const swaggerDocument = YAML.load('./docs/swagger.yaml');
import cookieParser from "cookie-parser";
app.use(cookieParser());

import Routes from "./routes";
import connect from "./config/database.config";
import path from "path";

app.use(cors());
app.use(helmet());
app.use(express.json());
connect();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/story", express.static(path.resolve("story")));
app.use("/posts", express.static(path.resolve("posts")));
app.use("/media", express.static(path.resolve("media")));
app.use("/avatar", express.static(path.resolve("avatar")));

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.use("/api", Routes.commentRouter);
app.use("/api/auth", Routes.authRoute);
app.use("/api/users", Routes.userRoute);
app.use("/api/posts", Routes.postRouter);
app.use("/api/stories", Routes.storiesRouter);
app.use("/api/media", Routes.mediaRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
