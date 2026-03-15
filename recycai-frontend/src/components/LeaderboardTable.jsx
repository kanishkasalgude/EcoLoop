import React from 'react';
import { Medal } from 'lucide-react';

const LeaderboardTable = ({ leaderboardData }) => {
  return (
    <div className="bg-white rounded-xl shadow-md border border-green-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-green-700 text-white border-b border-green-800">
              <th className="py-4 px-6 font-bold uppercase tracking-wider text-sm w-24 text-center">Rank</th>
              <th className="py-4 px-6 font-bold uppercase tracking-wider text-sm">Society Name</th>
              <th className="py-4 px-6 font-bold uppercase tracking-wider text-sm text-right">Total Credits</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {leaderboardData.length > 0 ? (
              leaderboardData.map((entry, index) => (
                <tr 
                  key={index}
                  className={`transition-colors hover:bg-gray-50 ${index === 0 ? 'bg-emerald-50' : ''}`}
                >
                  <td className="py-4 px-6 text-center">
                    {index === 0 ? (
                      <div className="flex justify-center">
                        <Medal className="w-6 h-6 text-yellow-500 fill-current" />
                      </div>
                    ) : index === 1 ? (
                       <div className="flex justify-center">
                        <Medal className="w-6 h-6 text-gray-400 fill-current" />
                      </div>
                    ) : index === 2 ? (
                       <div className="flex justify-center">
                        <Medal className="w-6 h-6 text-amber-600 fill-current" />
                      </div>
                    ) : (
                      <span className="text-gray-500 font-bold text-lg inline-block w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mx-auto">
                        {index + 1}
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-6">
                    <div className={`font-bold ${index === 0 ? 'text-emerald-800 text-lg' : 'text-gray-800'}`}>
                      {entry.societyName || entry.name}
                    </div>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <span className={`inline-block px-3 py-1 rounded-full font-black ${index === 0 ? 'bg-emerald-200 text-emerald-900' : 'bg-green-100 text-green-800'}`}>
                      {entry.totalCredits || entry.credits || 0}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="py-8 text-center text-gray-500 font-medium">
                  No societies found on the leaderboard yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaderboardTable;
