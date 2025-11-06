import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import http from "http";
import { Server } from "socket.io";
import musicRoutes from "./routes/musicRoutes.js";
import Music from "./models/Music.js";

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" },
});

// Middleware
app.use(cors());
app.use(express.json());

// 🔹 Connect MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB error:", err.message));

// 🔹 Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


// ✅ API ROUTES

// 📌 GET all music
app.get("/api/music", async (req, res) => {
  try {
    const musics = await Music.find().sort({ createdAt: -1 });
    res.json(musics);
  } catch (err) {
    console.error("❌ Fetch music error:", err);
    res.status(500).json({ message: "Error fetching music" });
  }
});

app.post("/api/music/upload", async (req, res) => {
  try {
    const { title, artist, cloudinaryUrl, public_id } = req.body;

    console.log("📥 Incoming upload data:", req.body);

    if (!title || !artist || !cloudinaryUrl || !public_id) {
      console.log("⚠️ Missing fields detected");
      return res.status(400).json({ message: "Missing fields" });
    }

    // Lưu vào MongoDB
    const newMusic = await Music.create({
      title,
      artist,
      cloudinaryUrl,
      createdAt: new Date(),
    });

    console.log("✅ Saved music:", newMusic);
    
    // 🔥 BROADCAST to all connected clients via Socket.IO
    io.emit("newMusic", newMusic);
    
    res.status(200).json({ message: "Music saved successfully", music: newMusic });

  } catch (err) {
    console.error("❌ Save music error:", err);
    res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
});

io.on("connection", (socket) => {
  console.log("🔌 Client connected:", socket.id);
  socket.on("disconnect", () => console.log("❎ Client disconnected:", socket.id));
});

app.use("/api/music", musicRoutes(io));

const PORT = process.env.PORT || 5000;
server.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
