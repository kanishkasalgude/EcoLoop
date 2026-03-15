import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ArrowLeft, Trophy } from 'lucide-react';
import LeaderboardTable from '../components/LeaderboardTable';

const Leaderboard = ({ onBack }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await axios.get('http://localhost:5000/leaderboard');
        setData(response.data);
      } catch (err) {
        setError('Leaderboard currently unavailable.');
      } finally {
        setLoading(false);
      }
    };
    fetchLeaderboard();
  }, []);

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <button 
        onClick={onBack}
        className="flex items-center text-green-700 hover:text-green-900 mb-8 font-bold transition-all group"
      >
        <ArrowLeft className="w-5 h-5 mr-1 group-hover:-translate-x-1 transition-transform" /> Back
      </button>

      <div className="bg-white rounded-[2rem] shadow-2xl shadow-green-100 overflow-hidden border border-green-50 mb-8">
        <div className="bg-gradient-to-r from-green-700 to-emerald-600 p-10 text-white relative overflow-hidden">
          <div className="flex items-center space-x-6 relative z-10">
            <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-md shadow-lg border border-white/20">
                <Trophy className="w-10 h-10 text-yellow-300 fill-current" />
            </div>
            <div>
                <h1 className="text-4xl font-black mb-2 tracking-tight">City Recycling Leaderboard</h1>
                <p className="text-green-50 text-lg font-medium">Leaderboard ranks societies based on verified recyclable waste collection.</p>
            </div>
          </div>
          <div className="absolute top-0 right-0 p-8 opacity-10 transform translate-x-10 -translate-y-4">
             <Trophy className="w-64 h-64" />
          </div>
        </div>

        <div className="p-8 bg-gray-50 border-t border-green-100 min-h-[400px]">
          {loading ? (
            <div className="py-20 text-center flex flex-col items-center justify-center space-y-4">
              <div className="w-12 h-12 border-4 border-green-200 border-t-green-600 rounded-full animate-spin"></div>
              <p className="text-green-700 font-bold uppercase tracking-widest text-sm">Gathering statistics...</p>
            </div>
          ) : error ? (
            <div className="py-10 px-6 bg-red-50 border border-red-100 rounded-2xl text-center">
              <p className="text-red-600 font-bold">{error}</p>
            </div>
          ) : (
            <LeaderboardTable leaderboardData={data} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
