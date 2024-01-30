import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoute from "./routes/user.route.js";
import authRoute from "./routes/auth.route.js";
import postRoute from "./routes/post.route.js";
import commentRoute from "./routes/comment.route.js";
// import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";



const __dirname=path.resolve();
dotenv.config();
const app = express();
app.use(express.json());
// app.use(cors());
app.use(cookieParser());
const PORT = process.env.PORT || 3000;

mongoose.set("strictQuery", true);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

mongoose
  .connect(process.env.db_Url)
  .then(() => {
    console.log("Connected to MongoDB database");
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB database", error);
  });


app.use("/api/user", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/post", postRoute);
app.use("/api/comment", commentRoute);

app.use(express.static(path.join(__dirname,'/client/dist')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
  });

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";
  res.status(statusCode).json({
    success: false,
    statusCode: statusCode,
    message: message,
  });
});
