import express from "express";
import dotenv from "dotenv";
import postRoutes from "./routes/postRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import tokenRoutes from "./routes/tokenRoutes.js";
import connectDB from "./config/dbConnect.js";
import { errorHandler } from "./middleware/errorHandler.js";
import cookieParser from "cookie-parser";

dotenv.config();

const port = process.env.PORT || 3000;
connectDB();

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/tokens", tokenRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

app.use(errorHandler);

app.listen(5000, () => {
  console.log(`Connected to port ${port}`);
});
