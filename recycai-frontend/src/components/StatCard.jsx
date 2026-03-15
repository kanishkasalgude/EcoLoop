import React from 'react';

const StatCard = ({ title, value, subtitle, icon, highlight = false }) => {
  return (
    <div className={`p-6 rounded-xl border border-green-100 shadow-sm flex items-center justify-between ${highlight ? 'bg-emerald-50' : 'bg-white'}`}>
      <div>
        <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-1">{title}</h4>
        <p className="text-3xl font-black text-green-800">{value}</p>
        {subtitle && <p className="text-xs font-semibold text-emerald-600 mt-1">{subtitle}</p>}
      </div>
      {icon && (
        <div className={`p-4 rounded-xl ${highlight ? 'bg-emerald-200 text-emerald-800' : 'bg-green-50 text-green-600'}`}>
          {icon}
        </div>
      )}
    </div>
  );
};

export default StatCard;
