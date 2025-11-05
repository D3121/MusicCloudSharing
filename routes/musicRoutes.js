import express from "express";
import { uploadMusic, getAllMusic } from "../controllers/musicController.js";

export default (io) => {
  const router = express.Router();
  router.post("/upload", uploadMusic(io));  // ✅ JSON, không multer
  router.get("/", getAllMusic);
  return router;
};
