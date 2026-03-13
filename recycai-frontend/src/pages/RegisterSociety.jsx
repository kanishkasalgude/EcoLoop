import React, { useState } from 'react';
import axios from 'axios';
import { ArrowLeft, CheckCircle } from 'lucide-react';

const RegisterSociety = ({ onBack }) => {
  const [formData, setFormData] = useState({ name: '', location: '' });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/society/register', formData);
      setMessage(`Society registered successfully! ID: ${response.data.id}`);
      setFormData({ name: '', location: '' });
    } catch (error) {
      setMessage(`Error: ${error.response?.data?.error || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto py-12 px-4">
      <button 
        onClick={onBack}
        className="flex items-center text-green-700 hover:text-green-900 mb-8 font-medium"
      >
        <ArrowLeft className="w-5 h-5 mr-1" /> Back to Home
      </button>

      <div className="bg-white p-8 rounded-2xl border border-green-100 shadow-xl">
        <h1 className="text-2xl font-bold text-green-800 mb-6">Register Society</h1>
        
        {message && (
          <div className={`p-4 rounded-lg mb-6 flex items-start space-x-2 ${message.startsWith('Error') ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'}`}>
            {!message.startsWith('Error') && <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />}
            <p>{message}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-green-900 mb-1">Society Name</label>
            <input
              type="text"
              required
              className="w-full px-4 py-2 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
              placeholder="e.g. Green Valley Apartments"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-green-900 mb-1">Location</label>
            <input
              type="text"
              required
              className="w-full px-4 py-2 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
              placeholder="e.g. Sector 21, Pune"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition-colors disabled:opacity-50"
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterSociety;
