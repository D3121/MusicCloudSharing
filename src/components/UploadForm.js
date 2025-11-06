// // // import React, { useRef, useEffect, useState } from "react";
// // // import { Upload, Music, User, File, CheckCircle, AlertCircle, X } from "lucide-react";
// // // import axios from "axios";
// // // function UploadForm({
// // //   title,
// // //   artist,
// // //   file,
// // //   loading,
// // //   progress,
// // //   error,
// // //   setTitle,
// // //   setArtist,
// // //   setFile,
// // //   setError,
// // //   handleUpload,
// // // }) {
// // //   const dropRef = useRef(null);
// // //   const [isDragging, setIsDragging] = useState(false);

// // //   useEffect(() => {
// // //     const dropArea = dropRef.current;
// // //     if (!dropArea) return;

// // //     const prevent = (e) => e.preventDefault();
    
// // //     const handleDragEnter = (e) => {
// // //       e.preventDefault();
// // //       setIsDragging(true);
// // //     };
    
// // //     const handleDragLeave = (e) => {
// // //       e.preventDefault();
// // //       if (!dropArea.contains(e.relatedTarget)) {
// // //         setIsDragging(false);
// // //       }
// // //     };
    
// // //     const handleDrop = (e) => {
// // //       e.preventDefault();
// // //       setIsDragging(false);
// // //       const dropped = e.dataTransfer.files[0];
      
// // //       if (!dropped) return;
      
// // //       if (dropped.type !== "audio/mpeg" && !dropped.name.endsWith('.mp3')) {
// // //         setError("Chỉ hỗ trợ file MP3!");
// // //         return;
// // //       }
      
// // //       // Kiểm tra kích thước file (giới hạn 10MB)
// // //       if (dropped.size > 10 * 1024 * 1024) {
// // //         setError("File quá lớn! Vui lòng chọn file dưới 10MB");
// // //         return;
// // //       }
      
// // //       setError(null);
// // //       setFile(dropped);
// // //     };

// // //     ["dragenter", "dragover"].forEach((evt) =>
// // //       dropArea.addEventListener(evt, prevent)
// // //     );
// // //     dropArea.addEventListener("dragenter", handleDragEnter);
// // //     dropArea.addEventListener("dragleave", handleDragLeave);
// // //     dropArea.addEventListener("drop", handleDrop);

// // //     return () => {
// // //       ["dragenter", "dragover"].forEach((evt) =>
// // //         dropArea.removeEventListener(evt, prevent)
// // //       );
// // //       dropArea.removeEventListener("dragenter", handleDragEnter);
// // //       dropArea.removeEventListener("dragleave", handleDragLeave);
// // //       dropArea.removeEventListener("drop", handleDrop);
// // //     };
// // //   }, [setFile, setError]);

// // //   const handleFileSelect = (e) => {
// // //     const selected = e.target.files[0];
// // //     if (!selected) return;
    
// // //     if (selected.type !== "audio/mpeg" && !selected.name.endsWith('.mp3')) {
// // //       setError("Chỉ hỗ trợ file MP3!");
// // //       return;
// // //     }
    
// // //     if (selected.size > 10 * 1024 * 1024) {
// // //       setError("File quá lớn! Vui lòng chọn file dưới 10MB");
// // //       return;
// // //     }
    
// // //     setError(null);
// // //     setFile(selected);
// // //   };

// // //   const removeFile = () => {
// // //     setFile(null);
// // //     setError(null);
// // //     document.getElementById("fileInput").value = "";
// // //   };

// // //   const onSubmit = (e) => {
// // //     e.preventDefault();
    
// // //     if (!title.trim()) {
// // //       setError("Vui lòng nhập tên bài hát!");
// // //       return;
// // //     }
    
// // //     if (!artist.trim()) {
// // //       setError("Vui lòng nhập tên nghệ sĩ!");
// // //       return;
// // //     }
    
// // //     if (!file) {
// // //       setError("Vui lòng chọn file nhạc!");
// // //       return;
// // //     }
    
// // //     setError(null);
// // //     handleUpload(e);
// // //   };

// // //   const formatFileSize = (bytes) => {
// // //     if (bytes < 1024) return bytes + ' B';
// // //     if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
// // //     return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
// // //   };

// // //   return (
// // //     <div className="mb-8">
// // //       <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 shadow-lg border border-gray-100">
// // //         <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
// // //           <Upload className="w-6 h-6 text-purple-500" />
// // //           Upload Music
// // //         </h2>

// // //         {/* Error Message */}
// // //         {error && (
// // //           <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
// // //             <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
// // //             <div className="flex-1">
// // //               <p className="text-sm text-red-700 font-medium">{error}</p>
// // //             </div>
// // //             <button
// // //               onClick={() => setError(null)}
// // //               className="text-red-400 hover:text-red-600 transition-colors"
// // //             >
// // //               <X className="w-4 h-4" />
// // //             </button>
// // //           </div>
// // //         )}

// // //         {/* Input tên bài hát */}
// // //         <div className="mb-4">
// // //           <label className="block text-sm font-medium text-gray-700 mb-2">
// // //             <Music className="w-4 h-4 inline mr-1" />
// // //             Tên bài hát <span className="text-red-500">*</span>
// // //           </label>
// // //           <input
// // //             type="text"
// // //             placeholder="Nhập tên bài hát..."
// // //             value={title}
// // //             onChange={(e) => {
// // //               setTitle(e.target.value);
// // //               if (error && e.target.value.trim()) setError(null);
// // //             }}
// // //             disabled={loading}
// // //             className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-100 outline-none transition-all bg-white disabled:bg-gray-100 disabled:cursor-not-allowed"
// // //           />
// // //         </div>

// // //         {/* Input tên nghệ sĩ */}
// // //         <div className="mb-6">
// // //           <label className="block text-sm font-medium text-gray-700 mb-2">
// // //             <User className="w-4 h-4 inline mr-1" />
// // //             Tên nghệ sĩ <span className="text-red-500">*</span>
// // //           </label>
// // //           <input
// // //             type="text"
// // //             placeholder="Nhập tên nghệ sĩ..."
// // //             value={artist}
// // //             onChange={(e) => {
// // //               setArtist(e.target.value);
// // //               if (error && e.target.value.trim()) setError(null);
// // //             }}
// // //             disabled={loading}
// // //             className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-100 outline-none transition-all bg-white disabled:bg-gray-100 disabled:cursor-not-allowed"
// // //           />
// // //         </div>

// // //         {/* Drag & Drop Zone */}
// // //         <div
// // //           ref={dropRef}
// // //           onClick={() => !loading && document.getElementById("fileInput").click()}
// // //           className={`
// // //             relative rounded-2xl text-center p-12 transition-all duration-300
// // //             ${loading ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
// // //             ${isDragging 
// // //               ? 'border-2 border-purple-500 bg-purple-50' 
// // //               : 'border-2 border-dashed border-gray-300 bg-gradient-to-br from-gray-50 to-purple-50/30 hover:border-purple-400 hover:bg-purple-50/50'
// // //             }
// // //           `}
// // //         >
// // //           <input
// // //             id="fileInput"
// // //             type="file"
// // //             accept="audio/mpeg,.mp3"
// // //             className="hidden"
// // //             onChange={handleFileSelect}
// // //             disabled={loading}
// // //           />
          
// // //           {!file ? (
// // //             <div className="space-y-4">
// // //               <div className="w-20 h-20 mx-auto bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center shadow-lg">
// // //                 <Upload className="w-10 h-10 text-white" />
// // //               </div>
// // //               <div>
// // //                 <p className="text-lg font-semibold text-gray-800 mb-1">
// // //                   Click to upload or drag and drop
// // //                 </p>
// // //                 <p className="text-sm text-gray-500">Only MP3 files (Max 10MB)</p>
// // //               </div>
// // //             </div>
// // //           ) : (
// // //             <div className="space-y-4">
// // //               <div className="w-20 h-20 mx-auto bg-gradient-to-br from-green-400 to-emerald-400 rounded-full flex items-center justify-center shadow-lg">
// // //                 <CheckCircle className="w-10 h-10 text-white" />
// // //               </div>
              
// // //               <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
// // //                 <div className="flex items-start gap-3 text-left">
// // //                   <File className="w-5 h-5 text-purple-500 mt-0.5 flex-shrink-0" />
// // //                   <div className="flex-1 min-w-0">
// // //                     <p className="text-sm text-gray-500 mb-1">File đã chọn:</p>
// // //                     <p className="font-semibold text-gray-800 truncate">{file.name}</p>
// // //                     <p className="text-xs text-gray-400 mt-1">{formatFileSize(file.size)}</p>
// // //                   </div>
// // //                   {!loading && (
// // //                     <button
// // //                       onClick={(e) => {
// // //                         e.stopPropagation();
// // //                         removeFile();
// // //                       }}
// // //                       className="text-gray-400 hover:text-red-500 transition-colors"
// // //                     >
// // //                       <X className="w-5 h-5" />
// // //                     </button>
// // //                   )}
// // //                 </div>
                
// // //                 {(title || artist) && (
// // //                   <div className="mt-3 pt-3 border-t border-gray-100 space-y-2 text-left">
// // //                     {title && (
// // //                       <div className="flex items-center gap-2">
// // //                         <Music className="w-4 h-4 text-purple-500" />
// // //                         <span className="text-sm text-gray-600">
// // //                           Bài hát: <strong className="text-gray-800">{title}</strong>
// // //                         </span>
// // //                       </div>
// // //                     )}
// // //                     {artist && (
// // //                       <div className="flex items-center gap-2">
// // //                         <User className="w-4 h-4 text-purple-500" />
// // //                         <span className="text-sm text-gray-600">
// // //                           Nghệ sĩ: <strong className="text-gray-800">{artist}</strong>
// // //                         </span>
// // //                       </div>
// // //                     )}
// // //                   </div>
// // //                 )}
// // //               </div>
// // //             </div>
// // //           )}
// // //         </div>

// // //         {/* Thanh tiến trình upload */}
// // //         {loading && (
// // //           <div className="mt-6">
// // //             <div className="flex items-center justify-between mb-2">
// // //               <span className="text-sm font-medium text-gray-700">Đang upload...</span>
// // //               <span className="text-sm font-bold text-purple-600">{progress}%</span>
// // //             </div>
// // //             <div className="h-3 w-full bg-gray-200 rounded-full overflow-hidden shadow-inner">
// // //               <div
// // //                 className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-300 ease-out relative overflow-hidden"
// // //                 style={{ width: `${progress}%` }}
// // //               >
// // //                 <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
// // //               </div>
// // //             </div>
// // //           </div>
// // //         )}

// // //         {/* Button Upload */}
// // //         <button
// // //           onClick={onSubmit}
// // //           disabled={loading || !file || !title.trim() || !artist.trim()}
// // //           className={`
// // //             w-full mt-6 py-4 rounded-xl font-semibold text-white text-lg
// // //             transition-all duration-300 flex items-center justify-center gap-2
// // //             ${loading || !file || !title.trim() || !artist.trim()
// // //               ? 'bg-gray-300 cursor-not-allowed'
// // //               : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]'
// // //             }
// // //           `}
// // //         >
// // //           {loading ? (
// // //             <>
// // //               <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
// // //               Uploading... {progress}%
// // //             </>
// // //           ) : (
// // //             <>
// // //               <Upload className="w-5 h-5" />
// // //               Upload Music
// // //             </>
// // //           )}
// // //         </button>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // // Demo component với logic upload cải tiến
// // // export default function UploadDemo() {
// // //   const [title, setTitle] = useState("");
// // //   const [artist, setArtist] = useState("");
// // //   const [file, setFile] = useState(null);
// // //   const [loading, setLoading] = useState(false);
// // //   const [progress, setProgress] = useState(0);
// // //   const [error, setError] = useState(null);
// // //   const [success, setSuccess] = useState(false);

// // //   const handleUpload = async (e) => {
// // //   e.preventDefault();
// // //   setLoading(true);
// // //   setProgress(0);
// // //   setError(null);
// // //   setSuccess(false);

// // //   try {
// // //     const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/djdectxct/auto/upload";
// // //     const UPLOAD_PRESET = "ml_default";

// // //     const formData = new FormData();
// // //     formData.append("file", file);
// // //     formData.append("upload_preset", UPLOAD_PRESET);

// // //     // ✅ Sử dụng axios để có progress
// // //     const cloudRes = await axios.post(CLOUDINARY_URL, formData, {
// // //       onUploadProgress: (event) => {
// // //         const percent = Math.round((event.loaded * 100) / event.total);
// // //         setProgress(percent);
// // //       },
// // //     });

// // //     const cloudData = cloudRes.data;
// // //     console.log("✅ Cloudinary upload success:", cloudData);

// // //     // Lưu metadata vào MongoDB
// // //     const saveRes = await fetch("http://localhost:5000/api/music/upload", {
// // //       method: "POST",
// // //       headers: { "Content-Type": "application/json" },
// // //       body: JSON.stringify({
// // //         title: title.trim(),
// // //         artist: artist.trim() || "Unknown Artist", // Provide default if empty
// // //         cloudinaryUrl: cloudData.secure_url,       // ✅ Changed from 'url'
// // //         public_id: cloudData.public_id,
// // //       }),
// // //     });

// // //     if (!saveRes.ok) {
// // //       throw new Error(`Backend save failed: ${saveRes.statusText}`);
// // //     }

// // //     const saveData = await saveRes.json();
// // //     console.log("✅ Saved to MongoDB:", saveData);

// // //     setProgress(100);
// // //     setSuccess(true);
// // //     alert("🎵 Upload thành công!");

// // //     setTitle("");
// // //     setArtist("");
// // //     setFile(null);
// // //   } catch (err) {
// // //     console.error("❌ Upload error:", err);
// // //     setError("Lỗi upload hoặc lưu dữ liệu!");
// // //     setProgress(0);
// // //   } finally {
// // //     setLoading(false);
// // //   }
// // // };


// // //   return (
// // //     <div className=" bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 p-8">
// // //       <div className="max-w-2xl mx-auto">
// // //         {success && (
// // //           <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3">
// // //             <CheckCircle className="w-6 h-6 text-green-500" />
// // //             <p className="text-green-700 font-medium">Upload thành công! 🎉</p>
// // //           </div>
// // //         )}
        
// // //         <UploadForm
// // //           title={title}
// // //           artist={artist}
// // //           file={file}
// // //           loading={loading}
// // //           progress={progress}
// // //           error={error}
// // //           setTitle={setTitle}
// // //           setArtist={setArtist}
// // //           setFile={setFile}
// // //           setError={setError}
// // //           handleUpload={handleUpload}
// // //         />
        
// // //         <div className="mt-8 p-4 bg-white rounded-xl shadow-sm border border-gray-200">
// // //           <h3 className="font-semibold text-gray-800 mb-2">💡 Tips:</h3>
// // //           <ul className="text-sm text-gray-600 space-y-1">
// // //             <li>• File MP3 dưới 10MB</li>
// // //             <li>• Nhập đầy đủ tên bài hát và nghệ sĩ</li>
// // //             <li>• Có thể kéo thả file vào vùng upload</li>
// // //           </ul>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // }



// // import React, { useRef, useEffect, useState } from "react";
// // import { 
// //     Upload, Music, User, File, CheckCircle, AlertCircle, X,
// //     CheckCircle as ModalCheckCircle, // Đổi tên để tránh xung đột
// //     Music as ModalMusic,           // Đổi tên để tránh xung đột
// //     User as ModalUser,             // Đổi tên để tránh xung đột
// //     X as ModalX                    // Đổi tên để tránh xung đột
// // } from "lucide-react";
// // import axios from "axios";

// // function UploadForm({
// //   title,
// //   artist,
// //   file,
// //   loading,
// //   progress,
// //   error,
// //   setTitle,
// //   setArtist,
// //   setFile,
// //   setError,
// //   handleUpload,
// // }) {
// //   const dropRef = useRef(null);
// //   const fileInputRef = useRef(null);
// //   const [isDragging, setIsDragging] = useState(false);

// //   useEffect(() => {
// //     if (file === null && fileInputRef.current) {
// //       fileInputRef.current.value = "";
// //     }
// //   }, [file]);

// //   useEffect(() => {
// //     const dropArea = dropRef.current;
// //     if (!dropArea) return;

// //     const prevent = (e) => e.preventDefault();
    
// //     const handleDragEnter = (e) => {
// //       e.preventDefault();
// //       setIsDragging(true);
// //     };
    
// //     const handleDragLeave = (e) => {
// //       e.preventDefault();
// //       if (!dropArea.contains(e.relatedTarget)) {
// //         setIsDragging(false);
// //       }
// //     };
    
// //     const handleDrop = (e) => {
// //       e.preventDefault();
// //       setIsDragging(false);
// //       const dropped = e.dataTransfer.files[0];
      
// //       if (!dropped) return;
      
// //       if (dropped.type !== "audio/mpeg" && !dropped.name.endsWith('.mp3')) {
// //         setError("Chỉ hỗ trợ file MP3!");
// //         return;
// //       }
      
// //       if (dropped.size > 10 * 1024 * 1024) {
// //         setError("File quá lớn! Vui lòng chọn file dưới 10MB");
// //         return;
// //       }
      
// //       setError(null);
// //       setFile(dropped);
// //     };

// //     ["dragenter", "dragover"].forEach((evt) =>
// //       dropArea.addEventListener(evt, prevent)
// //     );
// //     dropArea.addEventListener("dragenter", handleDragEnter);
// //     dropArea.addEventListener("dragleave", handleDragLeave);
// //     dropArea.addEventListener("drop", handleDrop);

// //     return () => {
// //       ["dragenter", "dragover"].forEach((evt) =>
// //         dropArea.removeEventListener(evt, prevent)
// //       );
// //       dropArea.removeEventListener("dragenter", handleDragEnter);
// //       dropArea.removeEventListener("dragleave", handleDragLeave);
// //       dropArea.removeEventListener("drop", handleDrop);
// //     };
// //   }, [setFile, setError]);

// //   const handleFileSelect = (e) => {
// //     const selected = e.target.files?.[0];
// //     if (!selected) return;
    
// //     if (selected.type !== "audio/mpeg" && !selected.name.endsWith('.mp3')) {
// //       setError("Chỉ hỗ trợ file MP3!");
// //       setFile(null);
// //       if (fileInputRef.current) fileInputRef.current.value = "";
// //       return;
// //     }
    
// //     if (selected.size > 10 * 1024 * 1024) {
// //       setError("File quá lớn! Vui lòng chọn file dưới 10MB");
// //       setFile(null);
// //       if (fileInputRef.current) fileInputRef.current.value = "";
// //       return;
// //     }
    
// //     setError(null);
// //     setFile(selected);
// //   };

// //   const removeFile = () => {
// //     setFile(null);
// //     setError(null);
// //     if (fileInputRef.current) {
// //       fileInputRef.current.value = "";
// //     }
// //   };

// //   const onSubmit = (e) => {
// //     e.preventDefault();
    
// //     if (!title.trim()) {
// //       setError("Vui lòng nhập tên bài hát!");
// //       return;
// //     }
    
// //     if (!artist.trim()) {
// //       setError("Vui lòng nhập tên nghệ sĩ!");
// //       return;
// //     }
    
// //     if (!file) {
// //       setError("Vui lòng chọn file nhạc!");
// //       return;
// //     }
    
// //     setError(null);
// //     handleUpload(e);
// //   };

// //   const formatFileSize = (bytes) => {
// //     if (bytes < 1024) return bytes + ' B';
// //     if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
// //     return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
// //   };

// //   return (
// //     <div className="mb-8">
// //       <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 shadow-lg border border-gray-100">
// //         <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
// //           <Upload className="w-6 h-6 text-purple-500" />
// //           Upload Music
// //         </h2>

// //         {/* Error Message */}
// //         {error && (
// //           <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
// //             <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
// //             <div className="flex-1">
// //               <p className="text-sm text-red-700 font-medium">{error}</p>
// //             </div>
// //             <button
// //               onClick={() => setError(null)}
// //               className="text-red-400 hover:text-red-600 transition-colors"
// //             >
// //               <X className="w-4 h-4" />
// //             </button>
// //           </div>
// //         )}

// //         {/* Input tên bài hát */}
// //         <div className="mb-4">
// //           <label className="block text-sm font-medium text-gray-700 mb-2">
// //             <Music className="w-4 h-4 inline mr-1" />
// //             Tên bài hát <span className="text-red-500">*</span>
// //           </label>
// //           <input
// //             type="text"
// //             placeholder="Nhập tên bài hát..."
// //             value={title}
// //             onChange={(e) => {
// //               setTitle(e.target.value);
// //               if (error && e.target.value.trim()) setError(null);
// //             }}
// //             disabled={loading}
// //             className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-100 outline-none transition-all bg-white disabled:bg-gray-100 disabled:cursor-not-allowed"
// //           />
// //         </div>

// //         {/* Input tên nghệ sĩ */}
// //         <div className="mb-6">
// //           <label className="block text-sm font-medium text-gray-700 mb-2">
// //             <User className="w-4 h-4 inline mr-1" />
// //             Tên nghệ sĩ <span className="text-red-500">*</span>
// //           </label>
// //           <input
// //             type="text"
// //             placeholder="Nhập tên nghệ sĩ..."
// //             value={artist}
// //             onChange={(e) => {
// //               setArtist(e.target.value);
// //               if (error && e.target.value.trim()) setError(null);
// //             }}
// //             disabled={loading}
// //             className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-100 outline-none transition-all bg-white disabled:bg-gray-100 disabled:cursor-not-allowed"
// //           />
// //         </div>

// //         {/* Drag & Drop Zone */}
// //         <div
// //           ref={dropRef}
// //           onClick={() => !loading && fileInputRef.current?.click()}
// //           className={`
// //             relative rounded-2xl text-center p-12 transition-all duration-300
// //             ${loading ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
// //             ${isDragging 
// //               ? 'border-2 border-purple-500 bg-purple-50' 
// //               : 'border-2 border-dashed border-gray-300 bg-gradient-to-br from-gray-50 to-purple-50/30 hover:border-purple-400 hover:bg-purple-50/50'
// //             }
// //           `}
// //         >
// //           <input
// //             ref={fileInputRef}
// //             type="file"
// //             accept="audio/mpeg,.mp3"
// //             className="hidden"
// //             onChange={handleFileSelect}
// //             disabled={loading}
// //           />
          
// //           {!file ? (
// //             <div className="space-y-4">
// //               <div className="w-20 h-20 mx-auto bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center shadow-lg">
// //                 <Upload className="w-10 h-10 text-white" />
// //               </div>
// //               <div>
// //                 <p className="text-lg font-semibold text-gray-800 mb-1">
// //                   Click to upload or drag and drop
// //                 </p>
// //                 <p className="text-sm text-gray-500">Only MP3 files (Max 10MB)</p>
// //               </div>
// //             </div>
// //           ) : (
// //             <div className="space-y-4">
// //               <div className="w-20 h-20 mx-auto bg-gradient-to-br from-green-400 to-emerald-400 rounded-full flex items-center justify-center shadow-lg">
// //                 <CheckCircle className="w-10 h-10 text-white" />
// //               </div>
              
// //               <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
// //                 <div className="flex items-start gap-3 text-left">
// //                   <File className="w-5 h-5 text-purple-500 mt-0.5 flex-shrink-0" />
// //                   <div className="flex-1 min-w-0">
// //                     <p className="text-sm text-gray-500 mb-1">File đã chọn:</p>
// //                     <p className="font-semibold text-gray-800 truncate">{file.name}</p>
// //                     <p className="text-xs text-gray-400 mt-1">{formatFileSize(file.size)}</p>
// //                   </div>
// //                   {!loading && (
// //                     <button
// //                       onClick={(e) => {
// //                         e.stopPropagation();
// //                         removeFile();
// //                       }}
// //                       className="text-gray-400 hover:text-red-500 transition-colors"
// //                     >
// //                       <X className="w-5 h-5" />
// //                     </button>
// //                   )}
// //                 </div>
                
// //                 {(title || artist) && (
// //                   <div className="mt-3 pt-3 border-t border-gray-100 space-y-2 text-left">
// //                     {title && (
// //                       <div className="flex items-center gap-2">
// //                         <Music className="w-4 h-4 text-purple-500" />
// //                         <span className="text-sm text-gray-600">
// //                           Bài hát: <strong className="text-gray-800">{title}</strong>
// //                         </span>
// //                       </div>
// //                     )}
// //                     {artist && (
// //                       <div className="flex items-center gap-2">
// //                         <User className="w-4 h-4 text-purple-500" />
// //                         <span className="text-sm text-gray-600">
// //                           Nghệ sĩ: <strong className="text-gray-800">{artist}</strong>
// //                         </span>
// //                       </div>
// //                     )}
// //                   </div>
// //                 )}
// //               </div>
// //             </div>
// //           )}
// //         </div>

// //         {/* Thanh tiến trình upload */}
// //         {loading && (
// //           <div className="mt-6">
// //             <div className="flex items-center justify-between mb-2">
// //               <span className="text-sm font-medium text-gray-700">Đang upload...</span>
// //               <span className="text-sm font-bold text-purple-600">{progress}%</span>
// //             </div>
// //             <div className="h-3 w-full bg-gray-200 rounded-full overflow-hidden shadow-inner">
// //               <div
// //                 className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-300 ease-out relative overflow-hidden"
// //                 style={{ width: `${progress}%` }}
// //               >
// //                 <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
// //               </div>
// //             </div>
// //           </div>
// //         )}

// //         {/* Button Upload */}
// //         <button
// //           onClick={onSubmit}
// //           disabled={loading || !file || !title.trim() || !artist.trim()}
// //           className={`
// //             w-full mt-6 py-4 rounded-xl font-semibold text-white text-lg
// //             transition-all duration-300 flex items-center justify-center gap-2
// //             ${loading || !file || !title.trim() || !artist.trim()
// //               ? 'bg-gray-300 cursor-not-allowed'
// //               : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]'
// //             }
// //           `}
// //         >
// //           {loading ? (
// //             <>
// //               <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
// //               Uploading... {progress}%
// //             </>
// //           ) : (
// //             <>
// //               <Upload className="w-5 h-5" />
// //               Upload Music
// //             </>
// //           )}
// //         </button>
// //       </div>
// //     </div>
// //   );
// // }

// // function SuccessModal({ isOpen, onClose, songInfo }) {
// //   if (!isOpen) {
// //     return null; // Không render gì nếu không mở
// //   }

// //   return (
// //     // 1. Lớp nền mờ (Backdrop)
// //     <div
// //       className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fade-in-fast"
// //       onClick={onClose} // Cho phép đóng khi click ra ngoài
// //     >
// //       {/* 2. Nội dung Modal */}
// //       <div
// //         className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 relative animate-scale-in"
// //         onClick={(e) => e.stopPropagation()} // Ngăn việc click vào modal làm đóng modal
// //       >
// //         {/* Nút đóng (X) ở góc */}
// //         <button
// //           onClick={onClose}
// //           className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
// //         >
// //           <ModalX className="w-6 h-6" />
// //         </button>

// //         {/* 3. Nội dung chính */}
// //         <div className="text-center">
// //           {/* Icon success */}
// //           <div className="w-20 h-20 mx-auto bg-gradient-to-br from-green-400 to-emerald-400 rounded-full flex items-center justify-center shadow-lg mb-5">
// //             <ModalCheckCircle className="w-12 h-12 text-white" />
// //           </div>

// //           {/* Tiêu đề */}
// //           <h2 className="text-2xl font-bold text-gray-800 mb-2">
// //             Upload Thành Công!
// //           </h2>
// //           <p className="text-gray-600 mb-6">
// //             Bài hát của bạn đã được thêm vào hệ thống.
// //           </p>

// //           {/* Thông tin bài hát (nếu có) */}
// //           {songInfo && (
// //             <div className="bg-gray-50 rounded-xl p-4 mb-6 border border-gray-100 text-left space-y-3">
// //               <div className="flex items-center gap-3">
// //                 <ModalMusic className="w-5 h-5 text-purple-500 flex-shrink-0" />
// //                 <div>
// //                   <p className="text-xs text-gray-500">Bài hát</p>
// //                   <p className="font-semibold text-gray-800">
// //                     {songInfo.title}
// //                   </p>
// //                 </div>
// //               </div>
// //               <div className="flex items-center gap-3">
// //                 <ModalUser className="w-5 h-5 text-purple-500 flex-shrink-0" />
// //                 <div>
// //                   <p className="text-xs text-gray-500">Nghệ sĩ</p>
// //                   <p className="font-semibold text-gray-800">
// //                     {songInfo.artist}
// //                   </p>
// //                 </div>
// //               </div>
// //             </div>
// //           )}

// //           {/* Nút Call-to-Action */}
// //           <button
// //             onClick={onClose}
// //             className="w-full py-3 px-6 rounded-xl font-semibold text-white text-lg
// //                        bg-gradient-to-r from-purple-500 to-pink-500 
// //                        hover:from-purple-600 hover:to-pink-600 
// //                        shadow-lg hover:shadow-xl hover:scale-[1.02] 
// //                        active:scale-[0.98] transition-all duration-300"
// //           >
// //             Tuyệt vời!
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // // Parent component with complete upload logic
// // export default function UploadDemo() {
// //   const [title, setTitle] = useState("");
// //   const [artist, setArtist] = useState("");
// //   const [file, setFile] = useState(null);
// //   const [loading, setLoading] = useState(false);
// //   const [progress, setProgress] = useState(0);
// //   const [error, setError] = useState(null);
// //   //const [success, setSuccess] = useState(false);
// //   const [successInfo, setSuccessInfo] = useState(null)

// //   const handleUpload = async (e) => {
// //     e.preventDefault();
// //     setLoading(true);
// //     setProgress(0);
// //     setError(null);
// //     setSuccessInfo(null);

// //     try {
// //       const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/djdectxct/auto/upload";
// //       const UPLOAD_PRESET = "ml_default";

// //       const formData = new FormData();
// //       formData.append("file", file);
// //       formData.append("upload_preset", UPLOAD_PRESET);

// //       // Upload to Cloudinary with progress tracking
// //       const cloudRes = await axios.post(CLOUDINARY_URL, formData, {
// //         onUploadProgress: (event) => {
// //           const percent = Math.round((event.loaded * 100) / event.total);
// //           setProgress(percent);
// //         },
// //       });

// //       const cloudData = cloudRes.data;
// //       console.log("✅ Cloudinary upload success:", cloudData);

// //       // Prepare payload for backend
// //       const payload = {
// //         title: title.trim(),
// //         artist: artist.trim(),
// //         cloudinaryUrl: cloudData.secure_url,
// //         public_id: cloudData.public_id,
// //       };

// //       console.log("📤 Sending to backend:", payload);

// //       // Save to MongoDB
// //       const saveRes = await fetch("http://localhost:5000/api/music/upload", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify(payload),
// //       });

// //       if (!saveRes.ok) {
// //         const errorText = await saveRes.text();
// //         console.error("❌ Backend response:", errorText);
// //         throw new Error(`Backend save failed: ${saveRes.statusText}`);
// //       }

// //       const saveData = await saveRes.json();
// //       console.log("✅ Saved to MongoDB:", saveData);

// //       setProgress(100);
// //       setSuccessInfo({ title: payload.title, artist: payload.artist });

// //       // Reset form
// //       setTitle("");
// //       setArtist("");
// //       setFile(null);

// //       // Auto-hide success message after 3 seconds
// //       // setTimeout(() => {
// //       //   setSuccess(false);
// //       // }, 3000);

// //     } catch (err) {
// //       console.error("❌ Upload error:", err);
// //       setError(err.message || "Lỗi upload hoặc lưu dữ liệu!");
// //       setProgress(0);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 p-8">
// //       <div className="max-w-2xl mx-auto">
// //         {/* {success && (
// //           <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3 animate-fade-in">
// //             <CheckCircle className="w-6 h-6 text-green-500" />
// //             <p className="text-green-700 font-medium">Upload thành công! 🎉</p>
// //           </div>
// //         )} */}
// //         <SuccessModal
// //           isOpen={successInfo !== null}
// //           onClose={() => setSuccessInfo(null)} // Khi đóng modal, set state về null
// //           songInfo={successInfo}
// //         />
// //         <UploadForm
// //           title={title}
// //           artist={artist}
// //           file={file}
// //           loading={loading}
// //           progress={progress}
// //           error={error}
// //           setTitle={setTitle}
// //           setArtist={setArtist}
// //           setFile={setFile}
// //           setError={setError}
// //           handleUpload={handleUpload}
// //         />
        
// //         <div className="mt-8 p-4 bg-white rounded-xl shadow-sm border border-gray-200">
// //           <h3 className="font-semibold text-gray-800 mb-2">💡 Khuyên dùng:</h3>
// //           <ul className="text-sm text-gray-600 space-y-1">
// //             <li>• File MP3 dưới 10MB (vẫn có thể trên 10mb)</li>
// //             <li>• Nhập đầy đủ tên bài hát và nghệ sĩ</li>
// //             <li>• Có thể kéo thả file vào vùng upload</li>
// //             <li>• Upload thành công sẽ tự động đồng bộ real-time</li>
// //           </ul>
// //         </div>
// //       </div>

// //       <style jsx>{`
// //         @keyframes fade-in {
// //           from {
// //             opacity: 0;
// //             transform: translateY(-10px);
// //           }
// //           to {
// //             opacity: 1;
// //             transform: translateY(0);
// //           }
// //         }
// //         .animate-fade-in {
// //           animation: fade-in 0.3s ease-out;
// //         }
// //       `}</style>
// //     </div>
// //   );
// // }

// import React, { useRef, useEffect, useState } from "react";
// import { 
//     Upload, Music, User, File, CheckCircle, AlertCircle, X,
//     CheckCircle as ModalCheckCircle, // Đổi tên để tránh xung đột
//     Music as ModalMusic,           // Đổi tên để tránh xung đột
//     User as ModalUser,             // Đổi tên để tránh xung đột
//     X as ModalX                    // Đổi tên để tránh xung đột
// } from "lucide-react";
// import axios from "axios";

// // 🔥 Component UploadForm với UI Glassy/Neon mới
// function UploadForm({
//   title,
//   artist,
//   file,
//   loading,
//   progress,
//   error,
//   setTitle,
//   setArtist,
//   setFile,
//   setError,
//   handleUpload,
// }) {
//   const dropRef = useRef(null);
//   const fileInputRef = useRef(null);
//   const [isDragging, setIsDragging] = useState(false);

//   // LOGIC FILE SELECTION/DRAG & DROP (GIỮ NGUYÊN)
//   useEffect(() => {
//     if (file === null && fileInputRef.current) {
//       fileInputRef.current.value = "";
//     }
//   }, [file]);

//   useEffect(() => {
//     const dropArea = dropRef.current;
//     if (!dropArea) return;

//     const prevent = (e) => e.preventDefault();
    
//     const handleDragEnter = (e) => {
//       e.preventDefault();
//       setIsDragging(true);
//     };
    
//     const handleDragLeave = (e) => {
//       e.preventDefault();
//       if (!dropArea.contains(e.relatedTarget)) {
//         setIsDragging(false);
//       }
//     };
    
//     const handleDrop = (e) => {
//       e.preventDefault();
//       setIsDragging(false);
//       const dropped = e.dataTransfer.files[0];
      
//       if (!dropped) return;
      
//       if (dropped.type !== "audio/mpeg" && !dropped.name.endsWith('.mp3')) {
//         setError("Chỉ hỗ trợ file MP3!");
//         return;
//       }
      
//       if (dropped.size > 10 * 1024 * 1024) {
//         setError("File quá lớn! Vui lòng chọn file dưới 10MB");
//         return;
//       }
      
//       setError(null);
//       setFile(dropped);
//     };

//     ["dragenter", "dragover"].forEach((evt) =>
//       dropArea.addEventListener(evt, prevent)
//     );
//     dropArea.addEventListener("dragenter", handleDragEnter);
//     dropArea.addEventListener("dragleave", handleDragLeave);
//     dropArea.addEventListener("drop", handleDrop);

//     return () => {
//       ["dragenter", "dragover"].forEach((evt) =>
//         dropArea.removeEventListener(evt, prevent)
//       );
//       dropArea.removeEventListener("dragenter", handleDragEnter);
//       dropArea.removeEventListener("dragleave", handleDragLeave);
//       dropArea.removeEventListener("drop", handleDrop);
//     };
//   }, [setFile, setError]);

//   const handleFileSelect = (e) => {
//     const selected = e.target.files?.[0];
//     if (!selected) return;
    
//     if (selected.type !== "audio/mpeg" && !selected.name.endsWith('.mp3')) {
//       setError("Chỉ hỗ trợ file MP3!");
//       setFile(null);
//       if (fileInputRef.current) fileInputRef.current.value = "";
//       return;
//     }
    
//     if (selected.size > 10 * 1024 * 1024) {
//       setError("File quá lớn! Vui lòng chọn file dưới 10MB");
//       setFile(null);
//       if (fileInputRef.current) fileInputRef.current.value = "";
//       return;
//     }
    
//     setError(null);
//     setFile(selected);
//   };

//   const removeFile = () => {
//     setFile(null);
//     setError(null);
//     if (fileInputRef.current) {
//       fileInputRef.current.value = "";
//     }
//   };

//   const onSubmit = (e) => {
//     e.preventDefault();
    
//     if (!title.trim()) {
//       setError("Vui lòng nhập tên bài hát!");
//       return;
//     }
    
//     if (!artist.trim()) {
//       setError("Vui lòng nhập tên nghệ sĩ!");
//       return;
//     }
    
//     if (!file) {
//       setError("Vui lòng chọn file nhạc!");
//       return;
//     }
    
//     setError(null);
//     handleUpload(e);
//   };

//   const formatFileSize = (bytes) => {
//     if (bytes < 1024) return bytes + ' B';
//     if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
//     return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
//   };
//   // KẾT THÚC LOGIC

//   // BẮT ĐẦU UI MỚI
//   return (
//     <div className="mb-8">
//       <div className="
//         relative rounded-2xl p-6 backdrop-blur-xl border border-white/20 shadow-[0_0_30px_rgba(255,255,255,0.1)]
//         bg-gradient-to-br from-white/70 to-gray-200/40 dark:from-gray-800/60 dark:to-gray-900/40
//         transition-all duration-500 text-gray-800 dark:text-gray-100
//       ">
//         <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
//           <Upload className="w-6 h-6 text-purple-500 neon-glow" />
//           Upload Music
//         </h2>

//         {/* Error Message */}
//         {error && (
//           <div className="mb-4 p-4 bg-red-500/10 border border-red-400/50 rounded-xl flex items-start gap-3 backdrop-blur-md">
//             <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
//             <div className="flex-1">
//               <p className="text-sm text-red-300 font-medium">{error}</p>
//             </div>
//             <button
//               onClick={() => setError(null)}
//               className="text-red-300 hover:text-red-500 transition-colors"
//             >
//               <X className="w-4 h-4" />
//             </button>
//           </div>
//         )}

//         {/* Input tên bài hát */}
//         <div className="mb-4">
//           <label className="block text-sm font-medium dark:text-gray-300 mb-2">
//             <Music className="w-4 h-4 inline mr-1 text-purple-500" />
//             Tên bài hát <span className="text-red-500">*</span>
//           </label>
//           <input
//             type="text"
//             placeholder="Nhập tên bài hát..."
//             value={title}
//             onChange={(e) => {
//               setTitle(e.target.value);
//               if (error && e.target.value.trim()) setError(null);
//             }}
//             disabled={loading}
//             className="w-full px-4 py-3 rounded-xl border border-white/20 bg-white/20 dark:bg-gray-900/30
//                        focus:ring-2 focus:ring-purple-400/60 outline-none dark:text-gray-100
//                        placeholder-gray-400 backdrop-blur-md transition-all disabled:opacity-50 disabled:cursor-not-allowed"
//           />
//         </div>

//         {/* Input tên nghệ sĩ */}
//         <div className="mb-6">
//           <label className="block text-sm font-medium dark:text-gray-300 mb-2">
//             <User className="w-4 h-4 inline mr-1 text-purple-500" />
//             Tên nghệ sĩ <span className="text-red-500">*</span>
//           </label>
//           <input
//             type="text"
//             placeholder="Nhập tên nghệ sĩ..."
//             value={artist}
//             onChange={(e) => {
//               setArtist(e.target.value);
//               if (error && e.target.value.trim()) setError(null);
//             }}
//             disabled={loading}
//             className="w-full px-4 py-3 rounded-xl border border-white/20 bg-white/20 dark:bg-gray-900/30
//                        focus:ring-2 focus:ring-purple-400/60 outline-none dark:text-gray-100
//                        placeholder-gray-400 backdrop-blur-md transition-all disabled:opacity-50 disabled:cursor-not-allowed"
//           />
//         </div>

//         {/* Drag & Drop Zone */}
//         <div
//           ref={dropRef}
//           onClick={() => !loading && fileInputRef.current?.click()}
//           className={`
//             relative rounded-2xl text-center p-12 transition-all duration-300 border-2 border-dashed
//             ${loading ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
//             ${isDragging 
//               ? "border-purple-400 bg-purple-400/10 shadow-[0_0_25px_rgba(168,85,247,0.4)]"
//               : "border-white/20 hover:border-purple-400/60 hover:bg-white/10 dark:hover:bg-gray-800/10"}
//             backdrop-blur-md
//           `}
//         >
//           <input
//             ref={fileInputRef}
//             type="file"
//             accept="audio/mpeg,.mp3"
//             className="hidden"
//             onChange={handleFileSelect}
//             disabled={loading}
//           />
          
//           {!file ? (
//             <div className="space-y-4">
//               <div className="w-20 h-20 mx-auto bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-[0_0_25px_rgba(236,72,153,0.5)]">
//                 <Upload className="w-10 h-10 text-white" />
//               </div>
//               <div>
//                 <p className="text-lg font-semibold dark:text-gray-100 mb-1">
//                   Click to upload or drag and drop
//                 </p>
//                 <p className="text-sm text-gray-500 dark:text-gray-400">Only MP3 files (Max 10MB)</p>
//               </div>
//             </div>
//           ) : (
//             <div className="space-y-4">
//               <div className="w-20 h-20 mx-auto bg-gradient-to-br from-green-400 to-emerald-400 rounded-full flex items-center justify-center shadow-[0_0_25px_rgba(16,185,129,0.6)]">
//                 <CheckCircle className="w-10 h-10 text-white" />
//               </div>
              
//               <div className="bg-white/10 dark:bg-gray-800/30 rounded-xl p-4 border border-white/20 backdrop-blur-md text-left">
//                 <div className="flex items-start gap-3">
//                   <File className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
//                   <div className="flex-1 min-w-0">
//                     <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">File đã chọn:</p>
//                     <p className="font-semibold dark:text-gray-100 truncate">{file.name}</p>
//                     <p className="text-xs text-gray-400 mt-1">{formatFileSize(file.size)}</p>
//                   </div>
//                   {!loading && (
//                     <button
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         removeFile();
//                       }}
//                       className="text-gray-400 hover:text-red-500 transition-colors"
//                     >
//                       <X className="w-5 h-5" />
//                     </button>
//                   )}
//                 </div>
                
//                 {(title || artist) && (
//                   <div className="mt-3 pt-3 border-t border-white/20 space-y-2 text-left">
//                     {title && (
//                       <div className="flex items-center gap-2">
//                         <Music className="w-4 h-4 text-purple-400" />
//                         <span className="text-sm text-gray-300">
//                           Bài hát: <strong className="dark:text-gray-100">{title}</strong>
//                         </span>
//                       </div>
//                     )}
//                     {artist && (
//                       <div className="flex items-center gap-2">
//                         <User className="w-4 h-4 text-purple-400" />
//                         <span className="text-sm text-gray-300">
//                           Nghệ sĩ: <strong className="dark:text-gray-100">{artist}</strong>
//                         </span>
//                       </div>
//                     )}
//                   </div>
//                 )}
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Thanh tiến trình upload */}
//         {loading && (
//           <div className="mt-6">
//             <div className="flex items-center justify-between mb-2">
//               <span className="text-sm font-medium dark:text-gray-200">Đang upload...</span>
//               <span className="text-sm font-bold text-purple-400">{progress}%</span>
//             </div>
//             <div className="h-3 w-full bg-white/10 rounded-full overflow-hidden shadow-inner">
//               <div
//                 className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-300 ease-out relative overflow-hidden"
//                 style={{ width: `${progress}%` }}
//               >
//                 <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Button Upload */}
//         <button
//           onClick={onSubmit}
//           disabled={loading || !file || !title.trim() || !artist.trim()}
//           className={`
//             w-full mt-6 py-4 rounded-xl font-semibold text-white text-lg
//             transition-all duration-300 flex items-center justify-center gap-2
//             ${loading || !file || !title.trim() || !artist.trim()
//               ? "bg-gray-500/40 cursor-not-allowed"
//               : "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-[0_0_25px_rgba(236,72,153,0.4)] hover:shadow-[0_0_35px_rgba(236,72,153,0.6)]"}
//           `}
//         >
//           {loading ? (
//             <>
//               <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//               Uploading... {progress}%
//             </>
//           ) : (
//             <>
//               <Upload className="w-5 h-5" />
//               Upload Music
//             </>
//           )}
//         </button>
//       </div>
//     </div>
//   );
// }

// // 🔥 Component SuccessModal với UI Glassy/Neon mới
// function SuccessModal({ isOpen, onClose, songInfo }) {
//   if (!isOpen) {
//     return null; // Không render gì nếu không mở
//   }

//   return (
//     // 1. Lớp nền mờ (Backdrop)
//     <div
//       className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4 animate-fade-in-fast"
//       onClick={onClose} // Cho phép đóng khi click ra ngoài
//     >
//       {/* 2. Nội dung Modal */}
//       <div
//         className="bg-white/90 dark:bg-gray-900/90 rounded-2xl shadow-xl w-full max-w-md p-6 relative animate-scale-in backdrop-blur-lg border border-white/20 text-gray-800 dark:text-gray-100"
//         onClick={(e) => e.stopPropagation()} // Ngăn việc click vào modal làm đóng modal
//       >
//         {/* Nút đóng (X) ở góc */}
//         <button
//           onClick={onClose}
//           className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors"
//         >
//           <ModalX className="w-6 h-6" />
//         </button>

//         {/* 3. Nội dung chính */}
//         <div className="text-center">
//           {/* Icon success */}
//           <div className="w-20 h-20 mx-auto bg-gradient-to-br from-green-400 to-emerald-400 rounded-full flex items-center justify-center shadow-[0_0_25px_rgba(16,185,129,0.6)] mb-5">
//             <ModalCheckCircle className="w-12 h-12 text-white" />
//           </div>

//           {/* Tiêu đề */}
//           <h2 className="text-2xl font-bold mb-2">
//             Upload Thành Công!
//           </h2>
//           <p className="text-gray-600 dark:text-gray-300 mb-6">
//             Bài hát của bạn đã được thêm vào hệ thống.
//           </p>

//           {/* Thông tin bài hát (nếu có) */}
//           {songInfo && (
//             <div className="bg-white/20 dark:bg-gray-800/50 rounded-xl p-4 mb-6 border border-white/20 text-left space-y-3 backdrop-blur-sm">
//               <div className="flex items-center gap-3">
//                 <ModalMusic className="w-5 h-5 text-purple-400 flex-shrink-0" />
//                 <div>
//                   <p className="text-xs text-gray-500 dark:text-gray-400">Bài hát</p>
//                   <p className="font-semibold dark:text-gray-100">
//                     {songInfo.title}
//                   </p>
//                 </div>
//               </div>
//               <div className="flex items-center gap-3">
//                 <ModalUser className="w-5 h-5 text-purple-400 flex-shrink-0" />
//                 <div>
//                   <p className="text-xs text-gray-500 dark:text-gray-400">Nghệ sĩ</p>
//                   <p className="font-semibold dark:text-gray-100">
//                     {songInfo.artist}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Nút Call-to-Action */}
//           <button
//             onClick={onClose}
//             className="w-full py-3 px-6 rounded-xl font-semibold text-white text-lg
//                        bg-gradient-to-r from-purple-500 to-pink-500 
//                        hover:from-purple-600 hover:to-pink-600 
//                        shadow-lg hover:shadow-xl hover:scale-[1.02] 
//                        active:scale-[0.98] transition-all duration-300 shadow-[0_0_20px_rgba(236,72,153,0.3)]"
//           >
//             Tuyệt vời!
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// // Parent component with complete upload logic
// export default function UploadDemo() {
//   const [title, setTitle] = useState("");
//   const [artist, setArtist] = useState("");
//   const [file, setFile] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [progress, setProgress] = useState(0);
//   const [error, setError] = useState(null);
//   const [successInfo, setSuccessInfo] = useState(null)

//   // LOGIC UPLOAD (GIỮ NGUYÊN)
//   const handleUpload = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setProgress(0);
//     setError(null);
//     setSuccessInfo(null);

//     try {
//       const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/djdectxct/auto/upload";
//       const UPLOAD_PRESET = "ml_default";

//       const formData = new FormData();
//       formData.append("file", file);
//       formData.append("upload_preset", UPLOAD_PRESET);

//       // Upload to Cloudinary with progress tracking
//       const cloudRes = await axios.post(CLOUDINARY_URL, formData, {
//         onUploadProgress: (event) => {
//           const percent = Math.round((event.loaded * 100) / event.total);
//           setProgress(percent);
//         },
//       });

//       const cloudData = cloudRes.data;
//       console.log("✅ Cloudinary upload success:", cloudData);

//       // Prepare payload for backend
//       const payload = {
//         title: title.trim(),
//         artist: artist.trim(),
//         cloudinaryUrl: cloudData.secure_url,
//         public_id: cloudData.public_id,
//       };

//       console.log("📤 Sending to backend:", payload);

//       // Save to MongoDB
//       const saveRes = await fetch("http://localhost:5000/api/music/upload", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });

//       if (!saveRes.ok) {
//         const errorText = await saveRes.text();
//         console.error("❌ Backend response:", errorText);
//         throw new Error(`Backend save failed: ${saveRes.statusText}`);
//       }

//       const saveData = await saveRes.json();
//       console.log("✅ Saved to MongoDB:", saveData);

//       setProgress(100);
//       setSuccessInfo({ title: payload.title, artist: payload.artist });

//       // Reset form
//       setTitle("");
//       setArtist("");
//       setFile(null);

//     } catch (err) {
//       console.error("❌ Upload error:", err);
//       setError(err.message || "Lỗi upload hoặc lưu dữ liệu!");
//       setProgress(0);
//     } finally {
//       setLoading(false);
//     }
//   };
//   // KẾT THÚC LOGIC UPLOAD

//   // BẮT ĐẦU UI MỚI CỦA COMPONENT CHA
//   return (
//     <div className="min-h-screen bg-gray-900/95 p-8 text-gray-100">
//       {/* Thêm nền chuyển màu tối cho style neon */}
//       <div className="fixed inset-0 bg-gradient-to-br from-indigo-900 via-gray-900 to-purple-900 -z-10 opacity-80"></div>
//       <div className="fixed inset-0 -z-20 bg-noise opacity-5"></div>
      
//       <div className="max-w-2xl mx-auto relative z-10">
//         <SuccessModal
//           isOpen={successInfo !== null}
//           onClose={() => setSuccessInfo(null)}
//           songInfo={successInfo}
//         />
//         <UploadForm
//           title={title}
//           artist={artist}
//           file={file}
//           loading={loading}
//           progress={progress}
//           error={error}
//           setTitle={setTitle}
//           setArtist={setArtist}
//           setFile={setFile}
//           setError={setError}
//           handleUpload={handleUpload}
//         />
        
//         <div className="mt-8 p-4 bg-white/10 rounded-xl shadow-sm border border-white/20 backdrop-blur-md">
//           <h3 className="font-semibold text-purple-300 mb-2">💡 Khuyên dùng:</h3>
//           <ul className="text-sm text-gray-300 space-y-1">
//             <li>• File MP3 dưới 10MB (vẫn có thể trên 10mb)</li>
//             <li>• Nhập đầy đủ tên bài hát và nghệ sĩ</li>
//             <li>• Có thể kéo thả file vào vùng upload</li>
//             <li>• Upload thành công sẽ tự động đồng bộ real-time</li>
//           </ul>
//         </div>
//       </div>

//       <style jsx>{`
//         /* Thêm các animation và glow cho hiệu ứng neon/glassy */
//         @keyframes fade-in {
//           from { opacity: 0; transform: translateY(-10px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
//         @keyframes scale-in {
//           from { opacity: 0; transform: scale(0.95); }
//           to { opacity: 1; transform: scale(1); }
//         }
//         .animate-fade-in-fast { animation: fade-in 0.3s ease-out; }
//         .animate-scale-in { animation: scale-in 0.3s ease-out; }
//         .neon-glow {
//             filter: drop-shadow(0 0 5px #a855f7) drop-shadow(0 0 10px rgba(168, 85, 247, 0.5));
//         }
//         /* Tailwind dark mode classes được sử dụng để giả lập dark mode */
//       `}</style>
//     </div>
//   );
// }


import React, { useRef, useEffect, useState } from "react";
import { 
    Upload, Music, User, File, CheckCircle, AlertCircle, X,
    CheckCircle as ModalCheckCircle,
    Music as ModalMusic,
    User as ModalUser,
    X as ModalX,
    Loader
} from "lucide-react";
import axios from "axios";

// 🔥 Component UploadForm với UI Glassy/Neon mới
function UploadForm({
  title,
  artist,
  file,
  loading,
  progress,
  error,
  setTitle,
  setArtist,
  setFile,
  setError,
  handleUpload,
}) {
  const dropRef = useRef(null);
  const fileInputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  // LOGIC FILE SELECTION/DRAG & DROP (GIỮ NGUYÊN)
  useEffect(() => {
    if (file === null && fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, [file]);

  useEffect(() => {
    const dropArea = dropRef.current;
    if (!dropArea) return;

    const prevent = (e) => e.preventDefault();
    
    const handleDragEnter = (e) => {
      e.preventDefault();
      setIsDragging(true);
    };
    
    const handleDragLeave = (e) => {
      e.preventDefault();
      if (!dropArea.contains(e.relatedTarget)) {
        setIsDragging(false);
      }
    };
    
    const handleDrop = (e) => {
      e.preventDefault();
      setIsDragging(false);
      const dropped = e.dataTransfer.files[0];
      
      if (!dropped) return;
      
      if (dropped.type !== "audio/mpeg" && !dropped.name.endsWith('.mp3')) {
        setError("Chỉ hỗ trợ file MP3!");
        return;
      }
      
      if (dropped.size > 10 * 1024 * 1024) {
        setError("File quá lớn! Vui lòng chọn file dưới 10MB");
        return;
      }
      
      setError(null);
      setFile(dropped);
    };

    ["dragenter", "dragover"].forEach((evt) =>
      dropArea.addEventListener(evt, prevent)
    );
    dropArea.addEventListener("dragenter", handleDragEnter);
    dropArea.addEventListener("dragleave", handleDragLeave);
    dropArea.addEventListener("drop", handleDrop);

    return () => {
      ["dragenter", "dragover"].forEach((evt) =>
        dropArea.removeEventListener(evt, prevent)
      );
      dropArea.removeEventListener("dragenter", handleDragEnter);
      dropArea.removeEventListener("dragleave", handleDragLeave);
      dropArea.removeEventListener("drop", handleDrop);
    };
  }, [setFile, setError]);

  const handleFileSelect = (e) => {
    const selected = e.target.files?.[0];
    if (!selected) return;
    
    if (selected.type !== "audio/mpeg" && !selected.name.endsWith('.mp3')) {
      setError("Chỉ hỗ trợ file MP3!");
      setFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }
    
    if (selected.size > 10 * 1024 * 1024) {
      setError("File quá lớn! Vui lòng chọn file dưới 10MB");
      setFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }
    
    setError(null);
    setFile(selected);
  };

  const removeFile = () => {
    setFile(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    
    if (!title.trim()) {
      setError("Vui lòng nhập tên bài hát!");
      return;
    }
    
    if (!artist.trim()) {
      setError("Vui lòng nhập tên nghệ sĩ!");
      return;
    }
    
    if (!file) {
      setError("Vui lòng chọn file nhạc!");
      return;
    }
    
    setError(null);
    handleUpload(e);
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };
  // KẾT THÚC LOGIC

  // BẮT ĐẦU UI NEON GLASSMOPHISM MỚI
  return (
    <div className="mb-8">
      <div className="
        relative rounded-3xl p-8 backdrop-blur-xl border border-white/20 shadow-[0_0_10px_rgba(170,200,255,0.4)]
        bg-white/5 transition-all duration-500 text-white
      ">
        <h2 className="text-3xl font-bold mb-8 flex items-center gap-3 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 drop-shadow-[0_0_10px_rgba(236,72,153,0.5)]">
          <Upload className="w-8 h-8 text-purple-400 neon-text" />
          Tải lên bài hát mới
        </h2>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-4 bg-red-900/40 border border-red-500/80 rounded-xl flex items-start gap-3 backdrop-blur-md shadow-lg shadow-red-500/10">
            <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm text-red-300 font-medium">{error}</p>
            </div>
            <button
              onClick={() => setError(null)}
              className="text-red-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Input Tên Bài Hát & Nghệ Sĩ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Tên bài hát */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                <ModalMusic className="w-4 h-4 inline mr-1 text-purple-400" />
                Track Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter track title..."
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  if (error && e.target.value.trim()) setError(null);
                }}
                disabled={loading}
                className="w-full px-4 py-3 rounded-xl border border-white/10 bg-black/30 text-white
                          focus:ring-2 focus:ring-pink-400/60 outline-none placeholder-gray-500 
                          backdrop-blur-md transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>

            {/* Tên nghệ sĩ */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                <ModalUser className="w-4 h-4 inline mr-1 text-purple-400" />
                Artist Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter artist name..."
                value={artist}
                onChange={(e) => {
                  setArtist(e.target.value);
                  if (error && e.target.value.trim()) setError(null);
                }}
                disabled={loading}
                className="w-full px-4 py-3 rounded-xl border border-white/10 bg-black/30 text-white
                          focus:ring-2 focus:ring-pink-400/60 outline-none placeholder-gray-500 
                          backdrop-blur-md transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>
        </div>

        {/* Drag & Drop Zone */}
        <div
          ref={dropRef}
          onClick={() => !loading && fileInputRef.current?.click()}
          className={`
            relative rounded-2xl text-center p-12 transition-all duration-300 border-2 border-dashed
            ${loading ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
            ${isDragging 
              ? "border-pink-400 bg-pink-900/20 shadow-[0_0_30px_rgba(236,72,153,0.5)]"
              : "border-purple-400/40 hover:border-pink-400/80 hover:bg-black/20"}
            backdrop-blur-sm
          `}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="audio/mpeg,.mp3"
            className="hidden"
            onChange={handleFileSelect}
            disabled={loading}
          />
          
          {!file ? (
            <div className="space-y-4">
              <div className="w-20 h-20 mx-auto bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-[0_0_25px_rgba(236,72,153,0.5)]">
                <Upload className="w-10 h-10 text-white" />
              </div>
              <div>
                <p className="text-xl font-semibold text-white mb-1 drop-shadow-md">
                  Drag & Drop or Click to Select File
                </p>
                <p className="text-sm text-gray-400">MP3 only | Max 10MB</p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="w-20 h-20 mx-auto bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center shadow-[0_0_25px_rgba(16,185,129,0.6)]">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
              
              <div className="bg-white/10 rounded-xl p-4 border border-green-500/50 backdrop-blur-md text-left shadow-xl shadow-green-500/5">
                <div className="flex items-start gap-3">
                  <File className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-400 mb-1">Selected File:</p>
                    <p className="font-semibold text-white truncate">{file.name}</p>
                    <p className="text-xs text-gray-500 mt-1">{formatFileSize(file.size)}</p>
                  </div>
                  {!loading && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFile();
                      }}
                      className="text-gray-400 hover:text-pink-500 transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Thanh tiến trình upload */}
        {loading && (
          <div className="mt-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-300">Uploading...</span>
              <span className="text-sm font-bold text-pink-400">{progress}%</span>
            </div>
            <div className="h-3 w-full bg-white/10 rounded-full overflow-hidden shadow-inner shadow-black/50">
              <div
                className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-300 ease-out relative overflow-hidden"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute inset-0 bg-white/30 animate-shine"></div>
              </div>
            </div>
          </div>
        )}

        {/* Button Upload */}
        <button
          onClick={onSubmit}
          disabled={loading || !file || !title.trim() || !artist.trim()}
          className={`
            w-full mt-8 py-4 rounded-xl font-bold text-lg
            transition-all duration-300 flex items-center justify-center gap-2
            ${loading || !file || !title.trim() || !artist.trim()
              ? "bg-gray-700/60 cursor-not-allowed text-gray-400"
              : "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 shadow-[0_0_20px_rgba(236,72,153,0.5)] hover:shadow-[0_0_35px_rgba(236,72,153,0.8)]"}
          `}
        >
          {loading ? (
            <>
              <Loader className="w-5 h-5 animate-spin" />
              Processing... {progress}%
            </>
          ) : (
            <>
              <Upload className="w-5 h-5" />
              Start Upload
            </>
          )}
        </button>
      </div>
    </div>
  );
}

// 🔥 Component SuccessModal với UI Neon Glassmorphism mới
function SuccessModal({ isOpen, onClose, songInfo }) {
  if (!isOpen) {
    return null; 
  }

  return (
    // Backdrop
    <div
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 animate-fade-in-fast"
      onClick={onClose}
    >
      {/* Nội dung Modal */}
      <div
        className="bg-black/40 rounded-3xl shadow-xl w-full max-w-sm p-8 relative animate-scale-in backdrop-blur-xl border border-green-500/50 text-white shadow-[0_0_50px_rgba(16,185,129,0.3)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Nút đóng (X) ở góc */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-pink-500 transition-colors"
        >
          <ModalX className="w-6 h-6" />
        </button>

        {/* Nội dung chính */}
        <div className="text-center">
          {/* Icon success */}
          <div className="w-20 h-20 mx-auto bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.7)] mb-6">
            <ModalCheckCircle className="w-12 h-12 text-white" />
          </div>

          {/* Tiêu đề */}
          <h2 className="text-3xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400 drop-shadow-[0_0_8px_rgba(16,185,129,0.8)]">
            Upload Success!
          </h2>
          <p className="text-gray-300 mb-8">
            Your track is now live on the platform.
          </p>

          {/* Thông tin bài hát */}
          {songInfo && (
            <div className="bg-white/10 rounded-xl p-4 mb-8 border border-white/20 text-left space-y-3 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <ModalMusic className="w-5 h-5 text-purple-400 flex-shrink-0" />
                <div>
                  <p className="text-xs text-gray-400">Track Title</p>
                  <p className="font-semibold text-white">{songInfo.title}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <ModalUser className="w-5 h-5 text-purple-400 flex-shrink-0" />
                <div>
                  <p className="text-xs text-gray-400">Artist</p>
                  <p className="font-semibold text-white">{songInfo.artist}</p>
                </div>
              </div>
            </div>
          )}

          {/* Nút Call-to-Action */}
          <button
            onClick={onClose}
            className="w-full py-3 px-6 rounded-xl font-bold text-lg text-white
                       bg-gradient-to-r from-purple-600 to-pink-600 
                       hover:from-purple-500 hover:to-pink-500 
                       shadow-lg transition-all duration-300 shadow-[0_0_20px_rgba(236,72,153,0.3)] hover:shadow-[0_0_30px_rgba(236,72,153,0.5)]"
          >
            Awesome!
          </button>
        </div>
      </div>
    </div>
  );
}

// Parent component with complete upload logic (updated with Neon UI)
export default function UploadDemo() {
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [successInfo, setSuccessInfo] = useState(null)

  // LOGIC UPLOAD (GIỮ NGUYÊN)
  const handleUpload = async (e) => {
    e.preventDefault();
    setLoading(true);
    setProgress(0);
    setError(null);
    setSuccessInfo(null);

    try {
      const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/djdectxct/auto/upload";
      const UPLOAD_PRESET = "ml_default";

      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", UPLOAD_PRESET);

      // Upload to Cloudinary with progress tracking
      const cloudRes = await axios.post(CLOUDINARY_URL, formData, {
        onUploadProgress: (event) => {
          const percent = Math.round((event.loaded * 100) / event.total);
          setProgress(percent);
        },
      });

      const cloudData = cloudRes.data;
      console.log("✅ Cloudinary upload success:", cloudData);

      // Prepare payload for backend
      const payload = {
        title: title.trim(),
        artist: artist.trim(),
        cloudinaryUrl: cloudData.secure_url,
        public_id: cloudData.public_id,
      };

      console.log("📤 Sending to backend:", payload);

      // Save to MongoDB
      const saveRes = await fetch("https://musicsharingcloudbackend-production.up.railway.app/api/music/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!saveRes.ok) {
        const errorText = await saveRes.text();
        console.error("❌ Backend response:", errorText);
        throw new Error(`Backend save failed: ${saveRes.statusText}`);
      }

      const saveData = await saveRes.json();
      console.log("✅ Saved to MongoDB:", saveData);

      setProgress(100);
      setSuccessInfo({ title: payload.title, artist: payload.artist });

      // Reset form
      setTitle("");
      setArtist("");
      setFile(null);

    } catch (err) {
      console.error("❌ Upload error:", err);
      setError(err.message || "Lỗi upload hoặc lưu dữ liệu!");
      setProgress(0);
    } finally {
      setLoading(false);
    }
  };
  // KẾT THÚC LOGIC UPLOAD

  // BẮT ĐẦU UI MỚI CỦA COMPONENT CHA
  return (
    <div>
      {/* Background glow orbs */}
      <div>
        <div className="absolute top-[-150px] left-[-150px] w-[300px] h-[300px] bg-purple-500 opacity-40 blur-3xl rounded-full animate-pulse-slow"></div>
        <div className="absolute bottom-[-120px] right-[-150px] w-[350px] h-[350px] bg-pink-500 opacity-30 blur-3xl rounded-full animate-pulse-slow delay-500"></div>
      </div>

      {/* HEADER SECTION */}
      <div className="relative max-w-3xl mx-auto text-center mb-12 z-10">
        {/* Glassmorphism card */}
        <div className="relative inline-block px-8 py-6 rounded-3xl backdrop-blur-xl bg-white/5 border border-white/20 shadow-[0_0_30px_rgba(168,85,247,0.4)] hover:shadow-[0_0_45px_rgba(236,72,153,0.6)] transition-all duration-500">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-fuchsia-500 drop-shadow-[0_0_5px_rgba(236,72,153,0.8)] animate-neon">
            Welcome to the music sharing app 🎵
          </h1>
          <p className=" mt-2 text-sm sm:text-base text-gray-300 tracking-wide">
            Upload, share, and vibe together with your favorite tracks.
          </p>
        </div>

        {/* Decorative neon underline */}
        <div className="mt-6 flex justify-center">
          <div className="w-40 h-[3px] bg-gradient-to-r from-purple-500 via-pink-500 to-fuchsia-500 rounded-full shadow-[0_0_20px_rgba(236,72,153,0.7)]"></div>
        </div>
      </div>
      
      
        <SuccessModal
          isOpen={successInfo !== null}
          onClose={() => setSuccessInfo(null)}
          songInfo={successInfo}
        />
        
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
        
        

        <div className="max-w-3xl mx-auto relative z-10">
            <div className="mt-8 p-6 bg-white/10 rounded-2xl border border-white/20 shadow-[0_0_10px_rgba(170,200,255,0.4)] backdrop-blur-lg mb-10">
                <h3 className="font-bold text-pink-400 mb-3 text-xl">🚀 Upload Tips:</h3>
                <ul className="text-sm text-gray-300 space-y-2 list-disc list-inside">
                    <li className="text-purple-300">File Requirement: <span className="text-white font-medium">MP3 only, max 10MB.</span></li>
                    <li className="text-purple-300">Metadata: <span className="text-white font-medium">Fill in both Title and Artist for better discovery.</span></li>
                    <li className="text-purple-300">Method: <span className="text-white font-medium">Drag & drop files directly into the zone.</span></li>
                    <li className="text-purple-300">Live Sync: <span className="text-white font-medium">Successful uploads are immediately available.</span></li>
                </ul>
            </div>
        </div>
      

      <style jsx>{`
        /* Keyframes */
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scale-in {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes pulse-slow {
            0%, 100% { transform: scale(1); opacity: 0.4; }
            50% { transform: scale(1.1); opacity: 0.5; }
        }
        @keyframes shine {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
        }
        
        /* Classes */
        .animate-fade-in-fast { animation: fade-in 0.3s ease-out; }
        .animate-scale-in { animation: scale-in 0.3s ease-out; }
        .animate-pulse-slow { animation: pulse-slow 6s infinite ease-in-out; }
        .animate-shine { animation: shine 3s infinite linear; }
        .neon-text {
            text-shadow: 0 0 5px #f0abfc, 0 0 10px #f0abfc, 0 0 20px #c084fc;
        }
      `}</style>
    </div>
  );
}