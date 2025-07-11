import express, { Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
