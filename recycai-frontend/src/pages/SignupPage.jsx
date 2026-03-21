import React, { useState } from 'react';
import axios from 'axios';
import { ArrowLeft, Copy, CheckCircle2 } from 'lucide-react';
import logo from '../assets/logo.png';

const SignupPage = ({ onNavigate, onLogin }) => {
  const [formData, setFormData] = useState({ name: '', location: '', phone: '', email: '' });
  const [loading, setLoading] = useState(false);
  const [registeredId, setRegisteredId] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await axios.post('http://localhost:5000/society/register', formData);
      setRegisteredId(response.data.id);
    } catch (err) {
      setError(err.response?.data?.error || err.message);
    } finally {
      setLoading(false);
    }
  };

  const copyId = () => {
    navigator.clipboard.writeText(registeredId);
    alert('Society ID copied! Save this for login.');
  };

  const proceedToLogin = () => {
    // Optional: Auto-login after signup
    const userData = { 
        name: formData.name, 
        role: 'society', 
        identifier: registeredId, 
        location: formData.location 
    };
    localStorage.setItem('recycai_user', JSON.stringify(userData));
    onLogin(userData);
  };

  if (registeredId) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white p-10 rounded-[2.5rem] shadow-2xl border border-green-100 text-center animate-in zoom-in duration-500">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
            <CheckCircle2 className="w-12 h-12" />
          </div>
          <h2 className="text-3xl font-black text-gray-800 mb-2">Registration Complete!</h2>
          <p className="text-gray-500 mb-8">Your society is now part of the green revolution. Save your unique ID to log in.</p>
          
          <div className="bg-gray-50 p-6 rounded-2xl mb-8 flex items-center justify-between border-2 border-dashed border-green-200">
             <div className="text-left overflow-hidden">
                <p className="text-[10px] font-black text-green-600 uppercase tracking-widest mb-1">Your Society ID</p>
                <p className="font-mono text-lg font-bold text-gray-800 truncate">{registeredId}</p>
             </div>
             <button onClick={copyId} className="p-3 hover:bg-green-100 rounded-xl transition-colors text-green-600">
                <Copy className="w-5 h-5" />
             </button>
          </div>

          <button 
            onClick={proceedToLogin}
            className="w-full bg-green-600 text-white font-black py-5 rounded-2xl shadow-xl shadow-green-100 hover:bg-green-700 transition-all flex items-center justify-center space-x-2"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white p-10 rounded-[2.5rem] shadow-2xl border border-green-100">
        <button 
          onClick={() => onNavigate('login')}
          className="flex items-center text-green-700 hover:text-green-900 mb-8 font-bold transition-all group"
        >
          <ArrowLeft className="w-5 h-5 mr-1 group-hover:-translate-x-1 transition-transform" /> Back to Login
        </button>

        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <img src={logo} alt="EcoLoop Logo" className="h-24 w-auto drop-shadow-md object-contain" />
          </div>
          <h1 className="text-3xl font-black text-green-800">Register Society</h1>
          <p className="text-gray-400 text-sm mt-1">Start tracking your impact today</p>
        </div>

        {error && (
          <div className="p-4 bg-red-50 text-red-700 rounded-xl mb-6 text-sm font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Society Name</label>
              <input
                type="text"
                required
                className="w-full px-5 py-4 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-4 focus:ring-green-500/10 focus:border-green-600 outline-none transition-all placeholder:text-gray-300 font-medium text-gray-900"
                placeholder="e.g. Green Valley Apartments"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Location</label>
              <input
                type="text"
                required
                className="w-full px-5 py-4 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-4 focus:ring-green-500/10 focus:border-green-600 outline-none transition-all placeholder:text-gray-300 font-medium text-gray-900"
                placeholder="e.g. Sector 2, New Delhi"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Phone Number</label>
              <input
                type="tel"
                required
                className="w-full px-5 py-4 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-4 focus:ring-green-500/10 focus:border-green-600 outline-none transition-all placeholder:text-gray-300 font-medium text-gray-900"
                placeholder="e.g. 9876543210"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Email ID</label>
              <input
                type="email"
                required
                className="w-full px-5 py-4 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-4 focus:ring-green-500/10 focus:border-green-600 outline-none transition-all placeholder:text-gray-300 font-medium text-gray-900"
                placeholder="e.g. contact@society.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-black py-5 rounded-2xl shadow-xl shadow-green-100 flex items-center justify-center space-x-2 transition-all disabled:opacity-50 mt-4"
          >
            <span>{loading ? 'Submitting...' : 'Register Now'}</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
