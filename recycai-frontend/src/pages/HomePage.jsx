import React from 'react';
import { Leaf, UserPlus, Truck, ClipboardList, BarChart3 } from 'lucide-react';

const HomePage = ({ onNavigate }) => {
  const actions = [
    { 
      id: 'register', 
      title: 'Register Society', 
      desc: 'Join the green revolution and start earning credits.',
      icon: <UserPlus className="w-8 h-8 text-green-600" />,
      color: 'bg-green-50'
    },
    { 
      id: 'request', 
      title: 'Request Pickup', 
      desc: 'Schedule a waste pickup for your society.',
      icon: <Truck className="w-8 h-8 text-green-600" />,
      color: 'bg-green-50'
    },
    { 
      id: 'kabadiwala', 
      title: 'Kabadiwala Panel', 
      desc: 'Confirm pickups and award green credits.',
      icon: <ClipboardList className="w-8 h-8 text-green-600" />,
      color: 'bg-green-100'
    },
    { 
      id: 'leaderboard', 
      title: 'View Leaderboard', 
      desc: 'See which societies are leading in sustainability.',
      icon: <BarChart3 className="w-8 h-8 text-green-600" />,
      color: 'bg-green-50'
    },
  ];

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <div className="flex justify-center mb-4">
          <Leaf className="w-16 h-16 text-green-600" />
        </div>
        <h1 className="text-4xl font-bold text-green-800 mb-4">RecycAI</h1>
        <p className="text-xl text-green-700">Competitive Recycling Platform for a Greener Tomorrow</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {actions.map((action) => (
          <button
            key={action.id}
            onClick={() => onNavigate(action.id)}
            className={`${action.color} p-8 rounded-xl border border-green-200 shadow-sm hover:shadow-md transition-shadow text-left flex items-start space-x-4 group`}
          >
            <div className="p-3 bg-white rounded-lg shadow-sm group-hover:bg-green-600 group-hover:text-white transition-colors duration-200">
              {action.icon}
            </div>
            <div>
              <h2 className="text-xl font-semibold text-green-900 mb-1">{action.title}</h2>
              <p className="text-green-700 text-sm">{action.desc}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
