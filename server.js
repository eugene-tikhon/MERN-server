import express from "express";
import cors from "cors";
import notFound from "./middleware/not-found.js";
import errorHandle from "./middleware/error-handle.js";
import dotenv from "dotenv";
import authRouter from "./routes/auth.js";
import jobsRouter from "./routes/jobs.js";
import morgan from "morgan";
import { connectDB } from "./db/connect.js";
import { auth } from "./middleware/auth.js";

const app = express();

dotenv.config();
if (process.env.NODE_ENV !== "production") app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

app.get("/", cors(), (req, res, next) => {
  res.status(200).json({ msg: "Xyu" });
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", auth, jobsRouter);

app.use(notFound);

app.use(errorHandle);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`);
}); 

const startDB = async () => {
  console.log("Connection started")
  try {
    await connectDB(process.env.MONGO_URL);
    console.log("Connected to MongoDB")
  } catch (error) {
    console.log("MongoDB error:", error)
  }
};

startDB();

