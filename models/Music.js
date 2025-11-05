import mongoose from "mongoose";

const musicSchema = new mongoose.Schema({
  title: { type: String, required: true },
  artist: { type: String, required: true },       // ✅ Make required
  cloudinaryUrl: { type: String, required: true }, // ✅ Changed from 'url'
  public_id: { type: String },                     // Optional
  createdAt: { type: Date, default: Date.now },   // ✅ Changed from 'uploadedAt'
});

export default mongoose.model("Music", musicSchema);