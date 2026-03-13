import React from 'react';
import { Truck, BarChart3, TrendingUp, Info } from 'lucide-react';

const SocietyDashboard = ({ user, onNavigate }) => {
  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <div className="bg-gradient-to-br from-green-600 to-emerald-700 p-8 rounded-3xl text-white mb-8 shadow-xl shadow-green-100">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-black mb-1">Welcome, {user.name}!</h1>
            <p className="text-green-100 opacity-90">Doing great for the environment today.</p>
          </div>
          <div className="bg-white/20 p-2 rounded-xl backdrop-blur-sm">
            <TrendingUp className="w-8 h-8" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <button
          onClick={() => onNavigate('request')}
          className="bg-white p-8 rounded-2xl border border-green-100 shadow-sm hover:shadow-xl transition-all duration-300 text-left group"
        >
          <div className="w-14 h-14 bg-green-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-green-600 group-hover:text-white transition-colors">
            <Truck className="w-8 h-8 text-green-600 transition-colors" />
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Request Pickup</h2>
          <p className="text-gray-500 text-sm">Schedule a collector to pick up your sorted recyclables.</p>
        </button>

        <button
          onClick={() => onNavigate('leaderboard')}
          className="bg-white p-8 rounded-2xl border border-green-100 shadow-sm hover:shadow-xl transition-all duration-300 text-left group"
        >
          <div className="w-14 h-14 bg-emerald-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
            <BarChart3 className="w-8 h-8 text-emerald-600 transition-colors" />
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">View Leaderboard</h2>
          <p className="text-gray-500 text-sm">Check where your society stands in the green rankings.</p>
        </button>
      </div>

      <div className="mt-12 bg-white rounded-2xl border border-green-100 p-6 flex items-start space-x-4">
        <div className="bg-green-100 p-2 rounded-full mt-1">
          <Info className="w-5 h-5 text-green-700" />
        </div>
        <div>
          <h3 className="font-bold text-gray-800">Your Society ID</h3>
          <p className="text-gray-500 text-sm mt-1">Your registered identifier is <span className="font-mono bg-gray-50 px-2 py-0.5 rounded text-green-700 font-bold">{user.identifier}</span>. Use this if you need to manually log in from another device.</p>
        </div>
      </div>
    </div>
  );
};

export default SocietyDashboard;
