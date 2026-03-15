import React, { useState } from 'react';
import axios from 'axios';
import { Search, ArrowLeft } from 'lucide-react';
import WasteDetectionCard from '../components/WasteDetectionCard';
import ResultCard from '../components/ResultCard';

const KnowYourWaste = ({ onNavigate, onBack }) => {
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleDetect = async (file) => {
    setIsLoading(true);
    setError('');
    setResult(null);

    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await axios.post('http://localhost:5000/detect-waste', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setResult(response.data);
    } catch (err) {
      const message =
        err.response?.data?.error ||
        err.message ||
        'Could not connect to the waste detection service.';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] py-10 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Back Button */}
        {onBack && (
          <button
            onClick={onBack}
            className="flex items-center text-green-700 hover:text-green-900 mb-6 font-bold transition-all group"
          >
            <ArrowLeft className="w-5 h-5 mr-1 group-hover:-translate-x-1 transition-transform" />
            Back
          </button>
        )}

        {/* Header */}
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-green-700" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-green-800 mb-3">
            Know Your Waste
          </h1>
          <p className="text-gray-500 font-medium text-sm sm:text-base max-w-md mx-auto leading-relaxed">
            Upload an image to identify waste and learn how to recycle it properly.
          </p>
        </div>

        {/* Upload Card */}
        <WasteDetectionCard onDetect={handleDetect} isLoading={isLoading} />

        {/* Error */}
        {error && (
          <div className="max-w-lg mx-auto mt-6 p-4 bg-red-50 text-red-700 rounded-xl text-sm font-medium border border-red-100 text-center">
            {error}
          </div>
        )}

        {/* Result */}
        <ResultCard result={result} onNavigate={onNavigate} />
      </div>
    </div>
  );
};

export default KnowYourWaste;
