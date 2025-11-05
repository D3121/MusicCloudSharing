import React from "react";
import MusicItem from "./MusicItem";

export default function MusicList({ musics = [], audioRef, currentSong, setCurrentSong }) {
  if (!musics || musics.length === 0) {
    return (
      <div className="text-center text-gray-300 mt-10">
        <p className="text-lg animate-pulse">🎵 Chưa có bài hát nào được tải lên.</p>
      </div>
    );
  }

  return (
    <div className="mt-10 px-4 sm:px-6 lg:px-8">
      {/* Section heading with neon glow */}
      <h2 className="text-3xl font-extrabold text-white mb-6 text-center drop-shadow-[0_0_10px_purple]">
        Danh sách bài hát
      </h2>

      {/* Music list container with glassy background */}
      <div className="shadow-[0_0_100px_rgba(170,200,255,0.4)] space-y-5 bg-white/10 backdrop-blur-md rounded-3xl p-6 shadow-lg shadow-purple-500/30 border border-purple-400/20">
        {musics.map((music) => (
          <MusicItem
            key={music._id || music.public_id}
            music={music}
            audioRef={audioRef}
            currentSong={currentSong}
            setCurrentSong={setCurrentSong}
          />
        ))}
      </div>
    </div>
  );
}
