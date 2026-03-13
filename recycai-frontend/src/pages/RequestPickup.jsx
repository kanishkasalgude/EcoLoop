import React, { useState } from 'react';
import axios from 'axios';
import { ArrowLeft, Send, CheckCircle2 } from 'lucide-react';

const RequestPickup = ({ user, onBack }) => {
  const [wasteType, setWasteType] = useState('plastic');
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setError('');
    
    try {
      await axios.post('http://localhost:5000/pickup/request', {
        societyId: user.identifier,
        societyName: user.name,
        location: user.location || "Default Location", // Fallback if not in user object
        wasteType
      });
      setStatus('success');
    } catch (err) {
      setError(err.response?.data?.error || err.message);
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="max-w-md mx-auto py-20 px-4 text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
          <CheckCircle2 className="w-12 h-12" />
        </div>
        <h2 className="text-3xl font-black text-gray-800 mb-2">Request Sent!</h2>
        <p className="text-gray-500 mb-8">A collector will be notified of your {wasteType} recycling request.</p>
        <button 
          onClick={onBack}
          className="w-full bg-green-600 text-white font-bold py-4 rounded-xl shadow-lg ring-offset-2 hover:bg-green-700 transition-all"
        >
          Return to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto py-12 px-4">
      <button 
        onClick={onBack}
        className="flex items-center text-green-700 hover:text-green-900 mb-8 font-bold transition-all"
      >
        <ArrowLeft className="w-5 h-5 mr-1" /> Back
      </button>

      <div className="bg-white p-8 rounded-3xl border border-green-100 shadow-2xl">
        <h1 className="text-2xl font-black text-green-800 mb-6">What are we recycling?</h1>
        
        {status === 'error' && (
          <div className="p-4 bg-red-50 text-red-700 rounded-xl mb-6 text-sm font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-4">
             {['plastic', 'paper', 'metal', 'ewaste'].map((type) => (
                <label key={type} className={`flex items-center p-4 rounded-2xl border-2 cursor-pointer transition-all ${wasteType === type ? 'border-green-600 bg-green-50 shadow-sm' : 'border-gray-50 hover:bg-gray-50'}`}>
                   <input 
                      type="radio" 
                      name="wasteType" 
                      value={type} 
                      className="hidden" 
                      onChange={(e) => setWasteType(e.target.value)} 
                   />
                   <div className={`w-6 h-6 rounded-full border-2 mr-4 flex items-center justify-center ${wasteType === type ? 'border-green-600' : 'border-gray-300'}`}>
                      {wasteType === type && <div className="w-3 h-3 bg-green-600 rounded-full" />}
                   </div>
                   <span className="capitalize font-bold text-gray-800">{type}</span>
                </label>
             ))}
          </div>

          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-black py-5 rounded-2xl shadow-xl shadow-green-100 flex items-center justify-center space-x-2 transition-all disabled:opacity-50"
          >
            <Send className="w-5 h-5" />
            <span>{status === 'loading' ? 'Notifying Collectors...' : 'Request Pickup Now'}</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default RequestPickup;
