import React from 'react';

const InfoCard = ({ icon, title, description, colorClass = "bg-green-50" }) => {
  return (
    <div className={`p-6 rounded-xl border border-green-200 shadow-sm transition-all hover:shadow-md flex flex-col items-start space-y-4 ${colorClass}`}>
      <div className="p-3 bg-white rounded-lg shadow-sm text-green-700">
        {icon}
      </div>
      <div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-700 font-medium leading-relaxed">{description}</p>
      </div>
    </div>
  );
};

export default InfoCard;
