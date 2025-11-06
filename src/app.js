// import React, { useEffect, useState, useRef } from "react";
// import io from "socket.io-client";
// import axios from "axios";

// import UploadForm from "./components/UploadForm";
// import MusicList from "./components/MusicList";
// import NowPlayingBar from "./components/NowPlayingBar";

// const socket = io("http://localhost:5000");

// export default function App() {
//   // States
//   const [musics, setMusics] = useState([]);
//   const [title, setTitle] = useState("");
//   const [artist, setArtist] = useState("");
//   const [file, setFile] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [progress, setProgress] = useState(0);

//   const [currentSong, setCurrentSong] = useState(null);
//   const [currentTime, setCurrentTime] = useState(0);
//   const [duration, setDuration] = useState(0);
//   const [isPlaying, setIsPlaying] = useState(false); // trạng thái play/pause

//   const audioRef = useRef(null);

//   // 🔹 Fetch nhạc + realtime
//   useEffect(() => {
//     axios.get("http://localhost:5000/api/music").then(({ data }) => setMusics(data));

//     socket.on("newMusic", (newSong) => setMusics((prev) => [newSong, ...prev]));

//     return () => socket.off("newMusic");
//   }, []);

//   // 🔹 Theo dõi nhạc đang phát + play/pause
//   useEffect(() => {
//     const audio = audioRef.current;
//     if (!audio) return;

//     const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
//     const handleLoadedMetadata = () => setDuration(audio.duration);
//     const handlePlay = () => setIsPlaying(true);
//     const handlePause = () => setIsPlaying(false);

//     audio.addEventListener("timeupdate", handleTimeUpdate);
//     audio.addEventListener("loadedmetadata", handleLoadedMetadata);
//     audio.addEventListener("play", handlePlay);
//     audio.addEventListener("pause", handlePause);

//     return () => {
//       audio.removeEventListener("timeupdate", handleTimeUpdate);
//       audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
//       audio.removeEventListener("play", handlePlay);
//       audio.removeEventListener("pause", handlePause);
//     };
//   }, [currentSong]);

//   // 🔹 Upload nhạc
//   const handleUpload = async (e) => {
//     e.preventDefault();

//     if (!file || !title || !artist) {
//       alert("Vui lòng nhập tên bài hát, nghệ sĩ và chọn file MP3!");
//       return;
//     }

//     setLoading(true);
//     setProgress(0);

//     const formData = new FormData();
//     formData.append("title", title);
//     formData.append("artist", artist);
//     formData.append("music", file);

//     try {
//       await axios.post("http://localhost:5000/api/music/upload", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//         onUploadProgress: (event) =>
//           setProgress(Math.round((event.loaded * 100) / event.total)),
//       });

//       // Reset form
//       setFile(null);
//       setTitle("");
//       setArtist("");
//       setProgress(0);
//     } catch (err) {
//       console.error("Upload lỗi:", err.response?.data || err.message);
//       alert("Lỗi upload file!");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (

//     <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white font-inter py-10 px-4">

//       {/* Background glow orbs */}

//       <div className="absolute inset-0 overflow-hidden">

//         <div className="absolute top-[-150px] left-[-150px] w-[300px] h-[300px] bg-purple-500 opacity-40 blur-3xl rounded-full animate-pulse"></div>

//         <div className="absolute bottom-[-120px] right-[-150px] w-[350px] h-[350px] bg-pink-500 opacity-30 blur-3xl rounded-full animate-pulse"></div>

//       </div>



//       {/* HEADER SECTION */}

//       <div className="relative max-w-3xl mx-auto text-center mb-12">

//         {/* Glassmorphism card */}

//         <div className="relative inline-block px-8 py-6 rounded-3xl backdrop-blur-xl bg-white/10 border border-white/20 shadow-[0_0_30px_rgba(168,85,247,0.4)] hover:shadow-[0_0_45px_rgba(236,72,153,0.6)] transition-all duration-500">

//           <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-fuchsia-500 drop-shadow-[0_0_15px_rgba(236,72,153,0.8)] animate-neon">

//             Welcome to the music sharing app 🎵

//           </h1>

//           <p className="mt-2 text-sm sm:text-base text-gray-300 tracking-wide">

//             Upload, share, and vibe together with your favorite tracks.

//           </p>

//         </div>



//         {/* Decorative neon underline */}

//         <div className="mt-6 flex justify-center">

//           <div className="w-40 h-[3px] bg-gradient-to-r from-purple-500 via-pink-500 to-fuchsia-500 rounded-full blur-sm shadow-[0_0_20px_rgba(236,72,153,0.7)]"></div>

//         </div>

//       </div>



//       {/* Upload form */}

//       <UploadForm

//         title={title}

//         artist={artist}

//         file={file}

//         loading={loading}

//         progress={progress}

//         setTitle={setTitle}

//         setArtist={setArtist}

//         setFile={setFile}

//         handleUpload={handleUpload}

//       />



//       {/* Music list */}

//       <MusicList

//         musics={musics}

//         audioRef={audioRef}

//         currentSong={currentSong}

//         setCurrentSong={setCurrentSong}

//       />



//       {/* Now Playing Bar */}

//       {currentSong && isPlaying && (

//         <NowPlayingBar

//           currentSong={currentSong}

//           currentTime={currentTime}

//           duration={duration}

//           audioRef={audioRef}

//         />

//       )}

//     </div>

//   );
// }




import React, { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import axios from "axios";

// ⚠️ LƯU Ý: Bạn cần đảm bảo các component này đã được tạo ra trong thư mục ./components
import UploadForm from "./components/UploadForm";
import MusicList from "./components/MusicList";
import NowPlayingBar from "./components/NowPlayingBar";
// Import SuccessModal nếu bạn đã tách nó ra thành một component riêng
// Nếu chưa, tôi sẽ tích hợp lại vào UploadForm hoặc App.js

const socket = io("https://musicsharingcloudbackend-production.up.railway.app");

export default function App() {
  // States
  const API_URL = process.env.REACT_APP_API_URL;
  const [musics, setMusics] = useState([]);
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [successInfo, setSuccessInfo] = useState(null); // Thêm state cho SuccessModal

  const [currentSong, setCurrentSong] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const audioRef = useRef(null);

  // 🔹 Fetch nhạc + realtime
  useEffect(() => {
    // Tải danh sách nhạc ban đầu
    axios
      .get("https://musicsharingcloudbackend-production.up.railway.app/api/music")
      .then(({ data }) => setMusics(data))
      .catch((err) => {
        console.error("Error fetching music:", err);
        setError("Không thể tải danh sách nhạc. Vui lòng kiểm tra server.");
      });

    // Lắng nghe sự kiện nhạc mới từ server
    socket.on("newMusic", (newSong) => setMusics((prev) => [newSong, ...prev]));

    return () => socket.off("newMusic");
  }, []);

  // 🔹 Theo dõi nhạc đang phát + play/pause
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleLoadedMetadata = () => setDuration(audio.duration);
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => {
        setIsPlaying(false);
        setCurrentTime(0);
        // Tùy chọn: Tự động phát bài tiếp theo
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [currentSong]);

  // 🔹 Upload nhạc
  const handleUpload = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessInfo(null); // Reset success info

    if (!file || !title.trim() || !artist.trim()) {
      setError("Vui lòng nhập tên bài hát, nghệ sĩ và chọn file MP3!");
      return;
    }
    if (file.type !== "audio/mpeg" && !file.name.endsWith('.mp3')) {
      setError("Chỉ hỗ trợ file MP3!");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setError("File quá lớn! Vui lòng chọn file dưới 10MB");
      return;
    }

    setLoading(true);
    setProgress(0);

    const formData = new FormData();
    formData.append("title", title.trim());
    formData.append("artist", artist.trim());
    formData.append("music", file); // Đảm bảo key này khớp với backend (vd: `music`)

    try {
      // ⚠️ Tạm thời bỏ qua Cloudinary cho ví dụ này, chỉ gọi backend trực tiếp
      // Nếu backend của bạn đã xử lý Cloudinary, thì không cần đổi
      const uploadRes = await axios.post("https://musicsharingcloudbackend-production.up.railway.app/api/music/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (event) =>
          setProgress(Math.round((event.loaded * 100) / event.total)),
      });

      console.log("Upload Success:", uploadRes.data);
      setSuccessInfo({ title: title.trim(), artist: artist.trim() }); // Lưu thông tin để hiển thị modal

      // Reset form
      setFile(null);
      setTitle("");
      setArtist("");
      setProgress(0);
    } catch (err) {
      const errMsg = err.response?.data?.message || err.message || "Lỗi upload file!";
      console.error("Upload lỗi:", errMsg);
      setError(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white font-inter py-10 px-4">
      {/* Background glow orbs & starfield */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Orbs */}
        <div className="absolute top-[-150px] left-[-150px] w-[300px] h-[300px] bg-purple-500 opacity-40 blur-3xl rounded-full animate-pulse-slow"></div>
        <div className="absolute bottom-[-120px] right-[-150px] w-[350px] h-[350px] bg-pink-500 opacity-30 blur-3xl rounded-full animate-pulse-slow delay-500"></div>
        {/* Starfield effect for depth */}
        <div className="starfield"></div> 
      </div>

      <div className="relative max-w-4xl mx-auto z-10 space-y-12">
        {/* CẢNH BÁO LỖI (Neon Style) */}
        {error && (
            <div className="p-4 bg-red-900/40 border border-red-500/80 rounded-xl flex items-center gap-3 backdrop-blur-md shadow-lg shadow-red-500/10 animate-fade-in-fast">
                <svg className="w-6 h-6 text-red-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                <p className="text-sm text-red-300 font-medium">{error}</p>
                <button
                    onClick={() => setError(null)}
                    className="text-red-400 hover:text-white transition-colors ml-auto"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
            </div>
        )}
        
        {/* 2. Upload Form */}
        <UploadForm
            title={title}
            artist={artist}
            file={file}
            loading={loading}
            progress={progress}
            error={error} 
            setTitle={setTitle}
            setArtist={setArtist}
            setFile={setFile}
            setError={setError} 
            handleUpload={handleUpload}
        />

        {/* 3. Music List */}
        <MusicList
            musics={musics}
            audioRef={audioRef}
            currentSong={currentSong}
            setCurrentSong={setCurrentSong}
        />
      </div>

      {/* 4. Now Playing Bar (Sticky Bottom) */}
      <div className="sticky bottom-0 left-0 right-0 z-40">
        {currentSong && isPlaying && (
          <NowPlayingBar
            currentSong={currentSong}
            currentTime={currentTime}
            duration={duration}
            audioRef={audioRef}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
          />
        )}
      </div>


      <style jsx global>{`
        /* Global CSS for Neon Effects */
        @keyframes fade-in-fast {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse-slow {
            0%, 100% { transform: scale(1); opacity: 0.4; }
            50% { transform: scale(1.1); opacity: 0.5; }
        }
        @keyframes shine {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
        }
        @keyframes neon-glow {
            0% { text-shadow: 0 0 5px #f0abfc, 0 0 10px #f0abfc, 0 0 20px #c084fc; }
            100% { text-shadow: 0 0 8px #f0abfc, 0 0 15px #f0abfc, 0 0 30px #c084fc; }
        }
        @keyframes star-move {
            from { background-position: 0 0; }
            to { background-position: -10000px 5000px; } /* Điều chỉnh giá trị này nếu sao di chuyển quá nhanh/chậm */
        }

        .animate-fade-in-fast { animation: fade-in-fast 0.3s ease-out; }
        .animate-pulse-slow { animation: pulse-slow 6s infinite ease-in-out; }
        .animate-shine { animation: shine 3s infinite linear; }
        .animate-neon { 
            animation: neon-glow 1.5s infinite alternate;
        }

        .starfield {
            background: transparent;
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
            opacity: 0.5;
            /* Tạo các lớp sao với hiệu ứng parallax nhẹ */
            background-image:
                radial-gradient(1px 1px at 20% 30%, #eee, rgba(0,0,0,0)), /* Sao nhỏ */
                radial-gradient(1.5px 1.5px at 40% 70%, #fff, rgba(0,0,0,0)), /* Sao vừa */
                radial-gradient(1px 1px at 70% 10%, #ddd, rgba(0,0,0,0)), /* Sao nhỏ */
                radial-gradient(2px 2px at 90% 40%, #fff, rgba(0,0,0,0)), /* Sao lớn hơn */
                radial-gradient(1.5px 1.5px at 10% 80%, #ddd, rgba(0,0,0,0)); /* Sao vừa */
            background-repeat: repeat;
            background-size: 200px 200px; /* Kích thước lặp lại của mẫu sao */
            animation: star-move 200s linear infinite; /* Điều chỉnh thời gian nếu muốn nhanh/chậm */
        }
      `}</style>
      
      {/* Thêm Audio element ẩn để điều khiển nhạc */}
      <audio ref={audioRef} src={currentSong?.cloudinaryUrl} hidden />
    </div>
  );
}