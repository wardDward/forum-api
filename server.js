import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/dbConnect.js";
import cookieParser from "cookie-parser";
import multer from "multer";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler.js";
import { createServer } from "http";
import { Server } from "socket.io";

// routes
import postRoutes from "./routes/postRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import tokenRoutes from "./routes/tokenRoutes.js";
import tagRoutes from "./routes/tagRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";

dotenv.config();

connectDB();
const port = process.env.PORT || 3000;

const app = express();

let corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// socket io
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: ["http://localhost:5173"],
  },
});

io.on("connection", (socket) => {
  // receive event
  socket.on("send_notification", (about, type, socketId) => {
    io.emit("receive_notification", about, type);
    console.log(socketId, about, type);
  });

  socket.on("disconnect", () => {
    console.log(`${socket.id} is disconntectd`);
  });
});

// routes
app.use("/api/users", userRoutes);
app.use("/api/tokens", tokenRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/tags", tagRoutes);
app.use("/api/notifications", notificationRoutes);

// global middlewares
app.use(notFoundHandler);
app.use(errorHandler);

httpServer.listen(port, () => {
  console.log(`Connected to port ${port}`);
});

// function getExt(fileName) {
//   let extension = fileName.substring(fileName.lastIndexOf("."));
//   console.log(extension);
//   return extension;
// }

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./uploads");
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now().toString() + getExt(file.originalname));
//   },
// });

// const upload = multer({ storage });

// app.post("/profile", upload.array("files", 12), function (req, res, next) {
//   console.log(req);
// });
