import React, { useState, useRef } from 'react';
import { Upload, Image as ImageIcon, Loader2, X } from 'lucide-react';

const WasteDetectionCard = ({ onDetect, isLoading }) => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleFile = (selectedFile) => {
    if (!selectedFile || !selectedFile.type.startsWith('image/')) return;
    setFile(selectedFile);
    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result);
    reader.readAsDataURL(selectedFile);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    handleFile(droppedFile);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const clearFile = () => {
    setFile(null);
    setPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="bg-white rounded-3xl border border-green-200 shadow-xl p-6 sm:p-8 w-full max-w-lg mx-auto">
      {/* Drop Zone */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => !preview && fileInputRef.current?.click()}
        className={`relative rounded-2xl border-2 border-dashed transition-all duration-300 cursor-pointer flex flex-col items-center justify-center min-h-[220px] ${
          isDragging
            ? 'border-green-500 bg-green-50 scale-[1.02]'
            : preview
            ? 'border-green-300 bg-green-50/50'
            : 'border-gray-300 bg-gray-50 hover:border-green-400 hover:bg-green-50/30'
        }`}
      >
        {preview ? (
          <div className="relative w-full">
            <img
              src={preview}
              alt="Uploaded waste preview"
              className="w-full max-h-64 object-contain rounded-xl"
            />
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                clearFile();
              }}
              className="absolute top-2 right-2 bg-white/90 hover:bg-red-50 text-red-500 rounded-full p-1.5 shadow-md transition-all hover:scale-110"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <>
            <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-4">
              <Upload className="w-8 h-8 text-green-600" />
            </div>
            <p className="font-bold text-gray-700 text-sm sm:text-base">
              Drag & drop your image here
            </p>
            <p className="text-gray-400 text-xs sm:text-sm mt-1">
              or click to browse files
            </p>
            <p className="text-gray-300 text-xs mt-3">
              Supports JPG, PNG, WEBP
            </p>
          </>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => handleFile(e.target.files[0])}
      />

      {/* File Info */}
      {file && (
        <div className="flex items-center space-x-2 mt-4 px-3 py-2 bg-green-50 rounded-xl border border-green-100">
          <ImageIcon className="w-4 h-4 text-green-600 flex-shrink-0" />
          <span className="text-sm text-green-800 font-medium truncate">
            {file.name}
          </span>
          <span className="text-xs text-green-500 flex-shrink-0">
            ({(file.size / 1024).toFixed(1)} KB)
          </span>
        </div>
      )}

      {/* Detect Button */}
      <button
        onClick={() => file && onDetect(file)}
        disabled={!file || isLoading}
        className="w-full mt-6 bg-green-700 hover:bg-green-800 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-black py-4 rounded-2xl shadow-xl shadow-green-200/50 flex items-center justify-center space-x-2 transition-all"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Analyzing...</span>
          </>
        ) : (
          <>
            <Upload className="w-5 h-5" />
            <span>Detect Waste</span>
          </>
        )}
      </button>
    </div>
  );
};

export default WasteDetectionCard;
