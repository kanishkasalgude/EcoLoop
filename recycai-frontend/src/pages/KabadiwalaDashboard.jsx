import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Package, CheckCircle2, RefreshCw, Scale, Award, Radio } from 'lucide-react';

const POLL_INTERVAL = 10000; // Refresh every 10 seconds

const KabadiwalaDashboard = () => {
  const [pickups, setPickups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedPickup, setSelectedPickup] = useState(null);
  const [weight, setWeight] = useState('');
  const [confirming, setConfirming] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [lastRefresh, setLastRefresh] = useState(null);

  const fetchPickups = useCallback(async (silent = false) => {
    if (!silent) setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/pickups');
      setPickups(response.data.filter(p => p.status === 'requested'));
      setLastRefresh(new Date());
      setError('');
    } catch (err) {
      setError('Failed to load pickup requests.');
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial fetch + auto-polling every 10 seconds
  useEffect(() => {
    fetchPickups();
    const interval = setInterval(() => fetchPickups(true), POLL_INTERVAL);
    return () => clearInterval(interval);
  }, [fetchPickups]);

  const handleConfirm = async (e) => {
    e.preventDefault();
    if (!weight || parseFloat(weight) <= 0) return;
    
    setConfirming(true);
    try {
      const resp = await axios.post('http://localhost:5000/pickup/confirm', {
        pickupId: selectedPickup.id,
        weight: parseFloat(weight)
      });
      setSuccessMsg(`Pickup completed! Generated ${resp.data.creditsGenerated} credits.`);
      setSelectedPickup(null);
      setWeight('');
      fetchPickups();
    } catch (err) {
      setError('Failed to confirm pickup.');
    } finally {
      setConfirming(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-3xl font-black text-gray-800">Collector Dashboard</h1>
          <p className="text-gray-500">Manage and fulfill recycling requests</p>
        </div>
        <button 
          onClick={() => fetchPickups(false)}
          className="p-3 bg-white border border-green-100 rounded-xl hover:bg-green-50 transition-colors shadow-sm"
        >
          <RefreshCw className={`w-5 h-5 text-green-600 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {/* Live sync status bar */}
      <div className="flex items-center justify-between mb-8 bg-white border border-green-100 rounded-xl px-4 py-3 shadow-sm">
        <div className="flex items-center space-x-2">
          <Radio className="w-4 h-4 text-green-500 animate-pulse" />
          <span className="text-xs font-bold text-green-600 uppercase tracking-widest">Live Sync</span>
          <span className="text-xs text-gray-400 font-medium">
            {lastRefresh ? `Updated ${lastRefresh.toLocaleTimeString()}` : 'Connecting...'}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="bg-yellow-100 text-yellow-700 text-xs font-black px-3 py-1 rounded-full">
            {pickups.length} pending
          </span>
        </div>
      </div>

      {successMsg && (
        <div className="bg-emerald-600 text-white p-6 rounded-2xl mb-8 flex items-center space-x-4 animate-bounce">
          <Award className="w-10 h-10" />
          <p className="text-lg font-bold">{successMsg}</p>
          <button onClick={() => setSuccessMsg('')} className="ml-auto font-bold opacity-60">Dismiss</button>
        </div>
      )}

      {selectedPickup ? (
        <div className="bg-white p-8 rounded-3xl border-2 border-green-600 shadow-2xl relative overflow-hidden">
           <div className="absolute top-0 right-0 p-4">
              <button onClick={() => setSelectedPickup(null)} className="text-gray-400 hover:text-gray-600 uppercase text-xs font-black">Cancel</button>
           </div>
           <div className="flex items-center space-x-4 mb-6">
              <Scale className="w-8 h-8 text-green-600" />
              <h2 className="text-2xl font-bold text-gray-800">Complete Pickup</h2>
           </div>
           
           <div className="bg-green-50 p-4 rounded-xl mb-6">
              <p className="text-sm font-bold text-green-700 uppercase tracking-widest">Waste Type</p>
              <p className="text-xl font-bold capitalize text-green-900">{selectedPickup.wasteType}</p>
           </div>

           <form onSubmit={handleConfirm} className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Measure Weight (kg)</label>
                <input 
                  type="number" 
                  step="0.1"
                  required
                  autoFocus
                  className="w-full px-6 py-4 text-3xl font-black bg-gray-50 border-2 border-transparent focus:border-green-600 focus:bg-white rounded-2xl outline-none transition-all"
                  placeholder="0.0"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                />
              </div>
              <button 
                disabled={confirming}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-black py-5 rounded-2xl shadow-xl shadow-green-200 text-xl flex items-center justify-center space-x-3 transition-all"
              >
                <CheckCircle2 className="w-6 h-6" />
                <span>{confirming ? 'Processing...' : 'Confirm Fulfillment'}</span>
              </button>
           </form>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pickups.map(pickup => (
            <div key={pickup.id} className="bg-white p-6 rounded-2xl border border-green-100 shadow-sm hover:shadow-md transition-all">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-green-50 rounded-lg">
                  <Package className="w-6 h-6 text-green-600" />
                </div>
                <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-xs font-bold rounded-full uppercase tracking-tighter">Pending Approval</span>
              </div>
              
              <div className="mb-6">
                <div className="flex items-center space-x-2 text-green-700 mb-1">
                  <Package className="w-4 h-4" />
                  <span className="text-xs font-black uppercase tracking-widest">{pickup.wasteType}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800">{pickup.societyName}</h3>
                <p className="text-gray-500 text-sm flex items-center mt-1">
                   <span className="opacity-60 italic mr-1">at</span> {pickup.location}
                </p>
                <p className="text-gray-400 text-[10px] mt-4 uppercase font-bold tracking-tighter">
                   Requested on {new Date(pickup.createdAt?._seconds * 1000).toLocaleDateString()}
                </p>
              </div>

              <button 
                onClick={() => setSelectedPickup(pickup)}
                className="w-full py-3 bg-gray-900 border border-gray-900 text-white hover:bg-white hover:text-gray-900 text-sm font-bold rounded-xl transition-all"
              >
                Fulfill Request
              </button>
            </div>
          ))}

          {pickups.length === 0 && !loading && (
            <div className="col-span-full py-20 text-center bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
              <Package className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 font-medium">No pending pickup requests at the moment.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default KabadiwalaDashboard;
