import { v2 as cloudinary } from "cloudinary";
import Music from "../models/Music.js";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
});

// ✅ Upload nhạc (sau khi Cloudinary đã upload thành công)
export const uploadMusic = (io) => async (req, res) => {
  try {
    console.log("🎵 Body nhận được từ frontend:", req.body);

    const { title, artist, url, public_id } = req.body;

    if (!title || !url) {
      return res.status(400).json({ error: "Thiếu tiêu đề hoặc URL!" });
    }

    // ✅ Lưu vào MongoDB
    const newMusic = new Music({
      title,
      artist,
      url,         // Cloudinary URL
      public_id,   // ID để xoá hoặc sửa sau
      uploadedAt: new Date(),
    });

    await newMusic.save(); // Lưu vào database

    io.emit("newMusic", newMusic); // Realtime event

    res.status(201).json({ success: true, music: newMusic });
  } catch (err) {
    console.error("❌ Upload error:", err);
    res.status(500).json({ error: err.message });
  }
};

// ✅ Lấy danh sách nhạc
export const getAllMusic = async (req, res) => {
  try {
    const musics = await Music.find().sort({ createdAt: -1 });
    res.json(musics);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
