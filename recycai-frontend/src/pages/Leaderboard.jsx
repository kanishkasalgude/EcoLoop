import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ArrowLeft, Trophy, Medal, Crown } from 'lucide-react';

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
    <div className="max-w-3xl mx-auto py-12 px-4">
      <button 
        onClick={onBack}
        className="flex items-center text-green-700 hover:text-green-900 mb-8 font-bold"
      >
        <ArrowLeft className="w-5 h-5 mr-1" /> Back
      </button>

      <div className="bg-white rounded-[2rem] shadow-2xl shadow-green-100 overflow-hidden border border-green-50">
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-10 text-white relative">
          <div className="flex items-center space-x-4 relative z-10">
            <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-md">
                <Trophy className="w-10 h-10" />
            </div>
            <div>
                <h1 className="text-3xl font-black mb-1">Hall of Green</h1>
                <p className="text-green-100 text-sm font-medium">Top performing societies this month</p>
            </div>
          </div>
          <div className="absolute top-0 right-0 p-8 opacity-20 transform translate-x-10 -translate-y-4">
             <Trophy className="w-48 h-48" />
          </div>
        </div>

        {loading ? (
          <div className="p-20 text-center text-green-700 font-bold animate-pulse">Gathering statistics...</div>
        ) : error ? (
          <div className="p-20 text-center text-red-500 font-bold">{error}</div>
        ) : (
          <div className="px-4 pb-4">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-green-800 text-xs font-black uppercase tracking-widest border-b border-gray-100">
                    <th className="px-6 py-8 text-left">Rank</th>
                    <th className="px-6 py-8 text-left">Society</th>
                    <th className="px-6 py-8 text-right">Green Credits</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {data.map((society, index) => (
                    <tr key={index} className={`transition-colors ${index === 0 ? 'bg-emerald-50/50' : 'hover:bg-gray-50/50'}`}>
                      <td className="px-6 py-6">
                        <div className="flex items-center font-black text-xl">
                          {index === 0 ? <Crown className="w-6 h-6 text-yellow-500 mr-2" /> : <span className="w-6 mr-2 text-center text-gray-300">#</span>}
                          <span className={index < 3 ? 'text-green-900' : 'text-gray-400'}>{index + 1}</span>
                        </div>
                      </td>
                      <td className="px-6 py-6 font-bold text-gray-800 text-lg">
                        {society.name}
                      </td>
                      <td className="px-6 py-6 text-right">
                        <div className="inline-block bg-white border border-green-100 px-4 py-2 rounded-xl shadow-sm">
                            <span className="text-2xl font-black text-green-600">{society.totalCredits.toLocaleString()}</span>
                            <span className="text-xs font-black text-green-300 ml-1 uppercase">pts</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {data.length === 0 && (
                    <tr>
                      <td colSpan="3" className="px-6 py-20 text-center text-gray-400 italic font-medium">No results recorded yet. Be the first!</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;
