import React, { useState, useRef, useEffect } from "react";
import { Play, Pause, Download, Music, Volume2, VolumeX } from "lucide-react";

export default function MusicItem({ music, audioRef, currentSong, setCurrentSong }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  
  const isCurrentSong = currentSong?._id === music._id;
  const localAudioRef = useRef(null);

  
  const getAudioElement = () => {
    return isCurrentSong ? audioRef.current : localAudioRef.current;
  };

  useEffect(() => {
    const audio = getAudioElement();
    if (!audio) return;

    const updateTime = () => {
      if (!isDragging) {
        setCurrentTime(audio.currentTime);
      }
    };

    const updateDuration = () => {
      setDuration(audio.duration);
    };

    const handlePlay = () => {
      setIsPlaying(true);
      setCurrentSong(music);
    };

    const handlePause = () => {
      setIsPlaying(false);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [isCurrentSong, isDragging, music, setCurrentSong, audioRef]);

  const handlePlayPause = () => {
    const audio = getAudioElement();
    if (!audio) return;
  
    if (isPlaying) {
      audio.pause();
    } else {
      
      setCurrentSong(music);
  
      
      if (audioRef.current && audioRef.current !== localAudioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
  
      audio.play();
    }
  };
  

  const handleProgressChange = (e) => {
    const audio = getAudioElement();
    if (!audio) return;

    const newTime = parseFloat(e.target.value);
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleProgressMouseDown = () => {
    setIsDragging(true);
  };

  const handleProgressMouseUp = () => {
    setIsDragging(false);
  };

  const handleVolumeChange = (e) => {
    const audio = getAudioElement();
    if (!audio) return;

    const newVolume = parseFloat(e.target.value);
    audio.volume = newVolume;
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    const audio = getAudioElement();
    if (!audio) return;

    if (isMuted) {
      audio.volume = volume || 0.5;
      setVolume(volume || 0.5);
      setIsMuted(false);
    } else {
      audio.volume = 0;
      setIsMuted(true);
    }
  };

  const formatTime = (time) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const progressPercentage = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div className="mt-4 group relative rounded-3xl p-6 shadow-lg shadow-purple-500/30 border border-purple-400/30 hover:shadow-purple-500/60 transition-all duration-500">
      {/* Background neon glow decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full blur-3xl opacity-20 animate-pulse -z-10"></div>
  
      {/* Hidden audio element */}
      <audio
        ref={isCurrentSong ? audioRef : localAudioRef}
        src={music.cloudinaryUrl}
        preload="metadata"
      />
  
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
        {/* Album art */}
        <div className="flex-shrink-0 w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-2xl shadow-pink-400/50 group-hover:scale-110 transition-transform duration-300 self-center sm:self-auto">
          <Music className="w-12 h-12 text-white drop-shadow-lg" />
        </div>
  
        {/* Music info & controls */}
        <div className="flex-1 min-w-0 w-full">
          <h3 className="text-xl font-bold text-white mb-1 truncate group-hover:text-pink-400 transition-colors duration-300 text-center sm:text-left">
            {music.title}
          </h3>
          <p className="text-sm text-purple-200 mb-4 truncate text-center sm:text-left">
            {music.artist}
          </p>
  
          {/* Controls */}
          <div className="space-y-4">
            {/* Unified Control Row */}
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full flex-wrap">
              {/* Play/Pause button */}
              <button
                onClick={handlePlayPause}
                className="flex-shrink-0 flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-500 hover:from-pink-500 hover:to-purple-600 text-white rounded-full shadow-2xl shadow-pink-400/60 hover:scale-110 transition-all duration-300"
              >
                {isCurrentSong && isPlaying ? (
                  <Pause className="w-5 h-5" fill="white" />
                ) : (
                  <Play className="w-5 h-5 ml-0.5" fill="white" />
                )}
              </button>
  
              {/* Progress Section (time + progress + duration) */}
              <div className="flex flex-1 items-center gap-2 min-w-[200px]">
                {/* Current Time */}
                <span className="text-xs text-purple-200 font-medium min-w-[35px] text-center sm:text-left">
                  {formatTime(currentTime)}
                </span>
  
                {/* Progress Bar */}
                <div className="flex-1 relative group/progress">
                  <div className="h-1.5 bg-white/20 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-purple-400 to-pink-400 rounded-full shadow-[0_0_8px_purple] transition-all duration-150"
                      style={{ width: `${progressPercentage}%` }}
                    />
                  </div>
                  <input
                    type="range"
                    min="0"
                    max={duration || 0}
                    value={currentTime}
                    onChange={handleProgressChange}
                    onMouseDown={handleProgressMouseDown}
                    onMouseUp={handleProgressMouseUp}
                    onTouchStart={handleProgressMouseDown}
                    onTouchEnd={handleProgressMouseUp}
                    className="absolute inset-0 w-full opacity-0 cursor-pointer"
                    style={{ height: '100%' }}
                  />
                </div>
  
                {/* Duration */}
                <span className="text-xs text-purple-200 font-medium min-w-[35px] text-center sm:text-left">
                  {formatTime(duration)}
                </span>
              </div>
  
              {/* Volume Controls */}
              <div className="flex items-center gap-2 w-full sm:w-auto justify-center sm:justify-start mt-2 sm:mt-0">
                <button
                  onClick={toggleMute}
                  className="text-purple-200 hover:text-pink-400 transition-colors"
                  title={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted || volume === 0 ? (
                    <VolumeX className="w-4 h-4" />
                  ) : (
                    <Volume2 className="w-4 h-4" />
                  )}
                </button>
  
                {/* Volume slider */}
                <div className="relative w-24 sm:w-28 group/volume">
                  <div className="h-1.5 bg-white/20 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-purple-400 to-pink-400 rounded-full shadow-[0_0_6px_pink] transition-all duration-150"
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
                    style={{ height: '100%' }}
                  />
                </div>
              </div>
  
              {/* Download Button */}
              <a
                href={music.cloudinaryUrl}
                download
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 flex items-center justify-center w-10 h-10 bg-white/20 hover:bg-purple-500 text-purple-200 hover:text-white rounded-full shadow-lg hover:shadow-pink-400/50 transition-all duration-300 hover:scale-110 group/download mt-2 sm:mt-0"
                title="Download"
              >
                <Download className="w-4 h-4 group-hover/download:animate-bounce" />
              </a>
            </div>
          </div>
        </div>
      </div>
  
      {/* Playing indicator */}
      {isCurrentSong && isPlaying && (
        <div className="absolute top-3 right-3 flex items-center gap-1">
          <span className="w-1 h-3 bg-pink-400 rounded-full animate-pulse"></span>
          <span
            className="w-1 h-4 bg-purple-400 rounded-full animate-pulse"
            style={{ animationDelay: '0.2s' }}
          ></span>
          <span
            className="w-1 h-3 bg-pink-400 rounded-full animate-pulse"
            style={{ animationDelay: '0.4s' }}
          ></span>
        </div>
      )}
    </div>
  );
  
  
  
}