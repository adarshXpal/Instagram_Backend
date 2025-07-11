import express, { Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import Routes from "./routes";
import connect from "./config/database.config";
import dotenv from "dotenv";

dotenv.config({ path: "./.env.example" });
const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
connect();

app.get("/", (req: Request, res: Response) => {
    res.send("Hello World!");
});

app.use("/api/auth", Routes.authRoute);
app.use("/api/users", Routes.userRoute);
app.use("/api/posts", Routes.postRouter);
app.use("/api/posts", Routes.postCommentRouter);
app.use("/api/comments", Routes.commentRouter);
app.use("/api/stories", Routes.storiesRouter);
app.use("/api/media", Routes.mediaRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});
