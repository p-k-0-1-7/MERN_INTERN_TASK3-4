import router from "./src/routes/routes.mjs";
import authRoutes from "./src/routes/authRoutes.mjs";
import blogRoutes from "./src/routes/blogRoutes.mjs";
import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: (origin, callback) => {
      const allowedOrigins = [
        "http://localhost:5173",
        "https://mern-intern-task-3-4.vercel.app",
      ];
      if (
        !origin ||
        allowedOrigins.includes(origin) ||
        origin.endsWith("--mern-intern-task-3-4.vercel.app/")
      ) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());
app.use("/api/tasks", router);
app.use("/api/auth", authRoutes);
app.use("/api/blogs", blogRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to database"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.status(200).send({ msg: "Hello I'm MERN Intern" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
