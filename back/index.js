import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./db.js";
import authRoutes from "./routes/auth.js";
import noteRoutes from "./routes/notes.js";

app.use(
  cors({
    origin: "https://mern-test-l7zg.onrender.com",
  })
);

dotenv.config();
const app = express();

app.use(cors({ origin: process.env.CLIENT_URL }));
app.use(express.json());

app.get("/api/health", (req, res) => res.json({ ok: true }));
app.use("/api/auth", authRoutes);
app.use("/api/notes", noteRoutes);
console.log("MONGO_URI =", process.env.MONGO_URI);

connectDB(process.env.MONGO_URI).then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`🚀 Server running on http://localhost:${process.env.PORT}`);
  });
});
