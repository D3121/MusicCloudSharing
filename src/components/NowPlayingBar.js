// import React from "react";

// export default function NowPlayingBar({ currentSong, currentTime, duration, audioRef }) {
//   if (!currentSong) return null;

//   const togglePlay = () => {
//     if (!audioRef?.current) return;
//     if (audioRef.current.paused) audioRef.current.play();
//     else audioRef.current.pause();
//   };

//   const formatTime = (time) => {
//     const minutes = Math.floor(time / 60) || 0;
//     const seconds = Math.floor(time % 60) || 0;
//     return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
//   };

//   return (
//     <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, backgroundColor: "#1e1e2f", color: "white", padding: 10, textAlign: "center", boxShadow: "0 -2px 10px rgba(0,0,0,0.5)", zIndex: 1000 }}>
//       <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
//         <strong>🎧 Now playing:</strong> {currentSong.title} - {currentSong.artist}
//         <button onClick={togglePlay} style={{ marginLeft: 15, padding: "4px 10px", borderRadius: 5, border: "none", background: "#6c63ff", color: "white", cursor: "pointer" }}>
//           {audioRef.current?.paused ? "▶️ Play" : "⏸️ Pause"}
//         </button>
//       </div>

//       <div style={{ height: 6, width: "80%", background: "#555", borderRadius: 3, margin: "10px auto", overflow: "hidden" }}>
//         <div style={{ height: "100%", width: `${(currentTime / duration) * 100 || 0}%`, background: "#6c63ff", transition: "width 0.2s linear" }} />
//       </div>

//       <p style={{ fontSize: 13 }}>{formatTime(currentTime)} / {formatTime(duration)}</p>
//     </div>
//   );
// }



// import React, { useState, useEffect, useCallback } from "react";
// // Đã thêm import Music icon bị thiếu
// import { Pause, Play, Volume2, VolumeX, SkipBack, SkipForward, Music } from "lucide-react"; 

// // Hàm tiện ích để định dạng thời gian
// const formatTime = (time) => {
//   if (isNaN(time) || time < 0) return "0:00";
//   const minutes = Math.floor(time / 60);
//   const seconds = Math.floor(time % 60);
//   return `${minutes.toString().padStart(1, "0")}:${seconds.toString().padStart(2, "0")}`;
// };

// export default function NowPlayingBar({ currentSong, audioRef }) {
  
//   // --- TẤT CẢ HOOKS PHẢI NẰM Ở ĐÂY (TRƯỚC MỌI RETURN) ---
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [currentTime, setCurrentTime] = useState(0);
//   const [duration, setDuration] = useState(0);
//   const [volume, setVolume] = useState(audioRef.current?.volume || 0.8);
//   const [isMuted, setIsMuted] = useState(audioRef.current?.muted || false);
//   const [isDragging, setIsDragging] = useState(false);
  
//   // HÀM XỬ LÝ THANH PROGRESS (SEEK)
//   const handleProgressChange = useCallback((e) => {
//     const audio = audioRef.current;
//     if (!audio) return;
//     const newTime = parseFloat(e.target.value);
//     audio.currentTime = newTime;
//     setCurrentTime(newTime);
//   }, [audioRef]);

//   // HÀM XỬ LÝ ÂM LƯỢNG
//   const handleVolumeChange = useCallback((e) => {
//     const audio = audioRef.current;
//     if (!audio) return;
//     const newVolume = parseFloat(e.target.value);
//     audio.volume = newVolume;
//     setVolume(newVolume);
//     setIsMuted(newVolume === 0);
//   }, [audioRef]);

//   // HÀM ĐỒNG BỘ HÓA
//   useEffect(() => {
//     // Chỉ chạy nếu có audioRef và currentSong
//     if (!audioRef.current || !currentSong) return; 
    
//     const audio = audioRef.current;

//     // Đặt state ban đầu khi component mount/song thay đổi
//     setIsPlaying(!audio.paused);
//     setDuration(audio.duration || 0);
//     setCurrentTime(audio.currentTime || 0);
//     setVolume(audio.volume);
//     setIsMuted(audio.muted);

//     // Các hàm xử lý sự kiện
//     const handleTimeUpdate = () => {
//       if (!isDragging) setCurrentTime(audio.currentTime);
//     };
//     const handleLoadedMetadata = () => setDuration(audio.duration);
//     const handlePlay = () => setIsPlaying(true);
//     const handlePause = () => setIsPlaying(false);
//     const handleVolumeChangeFromAudio = () => setVolume(audio.volume);
//     const handleMuteChange = () => setIsMuted(audio.muted);
    
//     audio.addEventListener('timeupdate', handleTimeUpdate);
//     audio.addEventListener('loadedmetadata', handleLoadedMetadata);
//     audio.addEventListener('play', handlePlay);
//     audio.addEventListener('pause', handlePause);
//     audio.addEventListener('volumechange', handleVolumeChangeFromAudio);
//     audio.addEventListener('volumechange', handleMuteChange);
    
//     return () => {
//       audio.removeEventListener('timeupdate', handleTimeUpdate);
//       audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
//       audio.removeEventListener('play', handlePlay);
//       audio.removeEventListener('pause', handlePause);
//       audio.removeEventListener('volumechange', handleVolumeChangeFromAudio);
//       audio.removeEventListener('volumechange', handleMuteChange);
//     };
//   }, [audioRef, currentSong, isDragging]);


//   // HÀM ĐIỀU KHIỂN
//   const handleTogglePlay = () => {
//     if (!audioRef.current) return;
//     // setIsPlaying sẽ được cập nhật tự động qua event listener
//     isPlaying ? audioRef.current.pause() : audioRef.current.play(); 
//   };
  
//   const toggleMute = () => {
//     const audio = audioRef.current;
//     if (!audio) return;
    
//     // Tạm thời lưu volume cũ nếu chưa mute
//     const oldVolume = audio.volume > 0 ? audio.volume : (volume || 0.8);

//     if (audio.muted) {
//       audio.muted = false;
//       audio.volume = oldVolume;
//     } else {
//       audio.muted = true;
//     }
//     // State sẽ được cập nhật qua event listener 'volumechange'
//   };

//   // --- RETURN SỚM CHỈ KHI TẤT CẢ HOOKS ĐÃ ĐƯỢC GỌI ---
//   if (!currentSong) return null; 

//   const progressPercentage = duration ? (currentTime / duration) * 100 : 0;
  
//   return (
//     <div className="fixed bottom-0 left-0 right-0 bg-white shadow-2xl border-t border-purple-200 p-3 md:p-4 z-[1000] transition-transform duration-300">
//       <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
        
//         {/* 1. Album Info (30%) */}
//         <div className="flex items-center gap-3 w-1/4">
//           <div className="flex-shrink-0 w-12 h-12 bg-purple-400 rounded-lg flex items-center justify-center">
//             <Music className="w-6 h-6 text-white" /> {/* Đã sửa lỗi thiếu Music icon */}
//           </div>
//           <div className="min-w-0">
//             <p className="font-bold text-gray-800 text-sm truncate">{currentSong.title}</p>
//             <p className="text-xs text-gray-500 truncate">{currentSong.artist}</p>
//           </div>
//         </div>

//         {/* 2. Main Controls & Progress Bar (50%) */}
//         <div className="flex-1 flex flex-col items-center max-w-lg">
          
//           {/* Controls: Play/Pause/Skip */}
//           <div className="flex items-center gap-6 mb-2">
//             <button className="text-gray-500 hover:text-purple-600 transition-colors" title="Previous">
//               <SkipBack className="w-5 h-5" />
//             </button>
//             <button
//               onClick={handleTogglePlay}
//               className="w-10 h-10 bg-purple-500 hover:bg-purple-600 text-white rounded-full flex items-center justify-center shadow-md transition-colors hover:scale-105"
//               aria-label={isPlaying ? "Pause" : "Play"}
//             >
//               {isPlaying ? (
//                 <Pause className="w-5 h-5" fill="white" />
//               ) : (
//                 <Play className="w-5 h-5 ml-0.5" fill="white" />
//               )}
//             </button>
//             <button className="text-gray-500 hover:text-purple-600 transition-colors" title="Next">
//               <SkipForward className="w-5 h-5" />
//             </button>
//           </div>
          
//           {/* Progress Bar */}
//           <div className="flex items-center w-full gap-2">
//             <span className="text-xs text-gray-500 font-medium min-w-[35px] text-left">
//               {formatTime(currentTime)}
//             </span>
            
//             <div className="flex-1 relative">
//               <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
//                 <div 
//                   className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-150"
//                   style={{ width: `${progressPercentage}%` }}
//                 />
//               </div>
//               <input
//                 type="range"
//                 min="0"
//                 max={duration || 0}
//                 value={currentTime}
//                 onChange={handleProgressChange}
//                 onMouseDown={() => setIsDragging(true)}
//                 onMouseUp={() => setIsDragging(false)}
//                 className="absolute inset-0 w-full opacity-0 cursor-pointer"
//                 style={{ height: '100%' }}
//               />
//             </div>

//             <span className="text-xs text-gray-500 font-medium min-w-[35px] text-right">
//               {formatTime(duration)}
//             </span>
//           </div>

//         </div>

//         {/* 3. Volume Control (20%) */}
//         <div className="flex items-center gap-2 w-1/4 justify-end">
//           <button
//             onClick={toggleMute}
//             className="text-gray-500 hover:text-purple-500 transition-colors"
//             title={isMuted ? "Unmute" : "Mute"}
//           >
//             {isMuted || volume === 0 ? (
//               <VolumeX className="w-5 h-5" />
//             ) : (
//               <Volume2 className="w-5 h-5" />
//             )}
//           </button>

//           {/* Volume slider */}
//           <div className="relative w-24">
//             <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
//               <div 
//                 className="h-full bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"
//                 style={{ width: `${isMuted ? 0 : volume * 100}%` }}
//               />
//             </div>
//             <input
//               type="range"
//               min="0"
//               max="1"
//               step="0.01"
//               value={isMuted ? 0 : volume}
//               onChange={handleVolumeChange}
//               className="absolute inset-0 w-full opacity-0 cursor-pointer"
//               style={{ height: '100%' }}
//             />
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// }













import React, { useState, useEffect, useCallback } from "react";
import { Pause, Play, Volume2, VolumeX, SkipBack, SkipForward, Music } from "lucide-react";

const formatTime = (time) => {
  if (isNaN(time) || time < 0) return "0:00";
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes.toString().padStart(1, "0")}:${seconds.toString().padStart(2, "0")}`;
};

export default function NowPlayingBar({ currentSong, audioRef }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(audioRef.current?.volume || 0.8);
  const [isMuted, setIsMuted] = useState(audioRef.current?.muted || false);
  const [isDragging, setIsDragging] = useState(false);
  const [isVisible, setIsVisible] = useState(true); // For pop-up animation

  const handleProgressChange = useCallback((e) => {
    const audio = audioRef.current;
    if (!audio) return;
    const newTime = parseFloat(e.target.value);
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  }, [audioRef]);

  const handleVolumeChange = useCallback((e) => {
    const audio = audioRef.current;
    if (!audio) return;
    const newVolume = parseFloat(e.target.value);
    audio.volume = newVolume;
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  }, [audioRef]);

  useEffect(() => {
    if (!audioRef.current || !currentSong) return;

    const audio = audioRef.current;

    setIsPlaying(!audio.paused);
    setDuration(audio.duration || 0);
    setCurrentTime(audio.currentTime || 0);
    setVolume(audio.volume);
    setIsMuted(audio.muted);

    
    const handleTimeUpdate = () => {
      if (!isDragging) setCurrentTime(audio.currentTime);
    };
    const handleLoadedMetadata = () => setDuration(audio.duration);
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleVolumeChangeFromAudio = () => setVolume(audio.volume);
    const handleMuteChange = () => setIsMuted(audio.muted);

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('volumechange', handleVolumeChangeFromAudio);
    audio.addEventListener('volumechange', handleMuteChange);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('volumechange', handleVolumeChangeFromAudio);
      audio.removeEventListener('volumechange', handleMuteChange);
    };
  }, [audioRef, currentSong, isDragging]);

  const handleTogglePlay = () => {
    if (!audioRef.current) return;
    isPlaying ? audioRef.current.pause() : audioRef.current.play(); 
    setIsVisible(!isVisible); // Trigger animation
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    const oldVolume = audio.volume > 0 ? audio.volume : (volume || 0.8);
    if (audio.muted) {
      audio.muted = false;
      audio.volume = oldVolume;
    } else {
      audio.muted = true;
    }
  };

  if (!currentSong) return null; 

  const progressPercentage = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div
      className={`fixed bottom-4 left-1/2 -translate-x-1/2 z-[1000] transition-all duration-500 transform
        ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-4 px-4 py-3
        bg-white/10 backdrop-blur-lg rounded-3xl border border-purple-400/20 shadow-lg shadow-purple-500/30"
      >
        {/* 1. Album Info */}
        <div className="flex items-center gap-3 w-1/4">
          <div className="flex-shrink-0 w-12 h-12 bg-purple-400/60 backdrop-blur-sm rounded-lg flex items-center justify-center shadow-lg shadow-purple-500/50">
            <Music className="w-6 h-6 text-white" />
          </div>
          <div className="min-w-0">
            <p className="font-bold text-white text-sm truncate drop-shadow-[0_0_5px_purple]">{currentSong.title}</p>
            <p className="text-xs text-purple-300 truncate">{currentSong.artist}</p>
          </div>
        </div>

        {/* 2. Controls */}
        <div className="flex-1 flex flex-col items-center max-w-lg">
          <div className="flex items-center gap-6 mb-2">
            <button
              onClick={handleTogglePlay}
              className="w-12 h-12 bg-purple-500/70 hover:bg-purple-600 text-white rounded-full flex items-center justify-center shadow-[0_0_20px_purple] transition-all hover:scale-110"
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
            </button>
          </div>

          {/* Progress Bar */}
          <div className="flex items-center w-full gap-2">
            <span className="text-xs text-purple-300 font-medium min-w-[35px] text-left">{formatTime(currentTime)}</span>
            <div className="flex-1 relative">
              <div className="h-1 bg-purple-200/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-150"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
              <input
                type="range"
                min="0"
                max={duration || 0}
                value={currentTime}
                onChange={handleProgressChange}
                onMouseDown={() => setIsDragging(true)}
                onMouseUp={() => setIsDragging(false)}
                className="absolute inset-0 w-full opacity-0 cursor-pointer"
              />
            </div>
            <span className="text-xs text-purple-300 font-medium min-w-[35px] text-right">{formatTime(duration)}</span>
          </div>
        </div>

        {/* 3. Volume */}
        <div className="flex items-center gap-2 w-1/4 justify-end">
          <button
            onClick={toggleMute}
            className="text-purple-300 hover:text-purple-500 transition-colors"
            title={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted || volume === 0 ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          </button>
          <div className="relative w-24">
            <div className="h-1 bg-purple-200/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"
                style={{ width: `${isMuted ? 0 : volume * 100}%` }}
              />
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              className="absolute inset-0 w-full opacity-0 cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
