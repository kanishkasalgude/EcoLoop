import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { RefreshCw, Radio, CheckCircle2, Package, TrendingUp } from 'lucide-react';
import StatCard from '../components/StatCard';
import PickupCard from '../components/PickupCard';

const POLL_INTERVAL = 10000;

const KabadiwalaDashboard = () => {
  const [allPickups, setAllPickups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // State for the currently accepted pickup weight input
  const [acceptedPickupId, setAcceptedPickupId] = useState(null);
  const [weightInput, setWeightInput] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [lastRefresh, setLastRefresh] = useState(null);

  const fetchPickups = useCallback(async (silent = false) => {
    if (!silent) setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/pickups');
      setAllPickups(response.data);
      setLastRefresh(new Date());
      setError('');
    } catch (err) {
      setError('Failed to load pickup requests.');
    } finally {
      if (!silent) setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPickups();
    const interval = setInterval(() => fetchPickups(true), POLL_INTERVAL);
    return () => clearInterval(interval);
  }, [fetchPickups]);

  const handleAccept = (id) => {
    setAcceptedPickupId(id);
    setWeightInput('');
    // Ideally we'd hit an API to update status to "accepted", 
    // but revealing the input UI is sufficient for the MVP flow.
  };

  const handleConfirm = async (id) => {
    if (!weightInput || parseFloat(weightInput) <= 0) return;
    
    setIsUpdating(true);
    try {
      const resp = await axios.post('http://localhost:5000/pickup/confirm', {
        pickupId: id,
        weight: parseFloat(weightInput)
      });
      setSuccessMsg(`Pickup completed! Generated ${resp.data.creditsGenerated} credits.`);
      setAcceptedPickupId(null);
      setWeightInput('');
      fetchPickups();
      
      setTimeout(() => setSuccessMsg(''), 5000); // clear msg after 5s
    } catch (err) {
      setError('Failed to confirm pickup.');
    } finally {
      setIsUpdating(false);
    }
  };

  const pendingPickups = allPickups.filter(p => p.status === 'requested' || p.status === 'pending');
  const completedPickups = allPickups.filter(p => p.status === 'completed');
  const totalWaste = completedPickups.reduce((sum, p) => sum + (p.weight || 0), 0);

  // Normalizing pickups for PickupCard
  const displayPickups = allPickups.map(p => ({
     ...p,
     status: acceptedPickupId === (p.id || p._id) ? 'accepted' : p.status === 'requested' ? 'pending' : p.status
  }));

  // Sort: Accepted first, then pending, then completed
  displayPickups.sort((a, b) => {
     if (a.status === 'accepted') return -1;
     if (b.status === 'accepted') return 1;
     if (a.status === 'pending' && b.status !== 'pending') return -1;
     if (b.status === 'pending' && a.status !== 'pending') return 1;
     return new Date(b.createdAt?._seconds ? b.createdAt._seconds * 1000 : b.date) - new Date(a.createdAt?._seconds ? a.createdAt._seconds * 1000 : a.date);
  });

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-black text-gray-800">Collector Panel</h1>
          <p className="text-gray-500 font-medium">Manage municipal recycling requests</p>
        </div>
        <div className="flex items-center space-x-4">
           {lastRefresh && (
             <div className="hidden sm:flex items-center space-x-2 text-gray-500 bg-white px-3 py-1.5 rounded-full border border-gray-200">
               <Radio className="w-4 h-4 text-green-500 animate-pulse" />
               <span className="text-xs font-bold uppercase tracking-widest">Live Sync</span>
             </div>
           )}
           <button 
             onClick={() => fetchPickups(false)}
             className="p-3 bg-white border border-green-200 rounded-xl hover:bg-green-50 transition-colors shadow-sm text-green-700"
             title="Refresh"
           >
             <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
           </button>
        </div>
      </div>

      {successMsg && (
        <div className="bg-emerald-100 text-emerald-800 border border-emerald-200 p-4 rounded-xl mb-8 flex items-center justify-between shadow-sm">
          <div className="flex items-center space-x-3">
             <CheckCircle2 className="w-6 h-6" />
             <p className="font-bold">{successMsg}</p>
          </div>
          <button onClick={() => setSuccessMsg('')} className="font-bold text-emerald-600 hover:text-emerald-800 text-sm">Dismiss</button>
        </div>
      )}

      {error && (
         <div className="bg-red-50 text-red-700 p-4 rounded-xl mb-8 border border-red-100 font-bold text-sm">
            {error}
         </div>
      )}

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard 
          title="Pending Requests"
          value={pendingPickups.length}
          subtitle="Awaiting pickup"
          icon={<Package className="w-6 h-6" />}
          highlight={true}
        />
        <StatCard 
          title="Completed Pickups"
          value={completedPickups.length}
          subtitle="Lifetime record"
          icon={<CheckCircle2 className="w-6 h-6" />}
        />
        <StatCard 
          title="Total Waste Collected"
          value={`${totalWaste} kg`}
          subtitle="Diverted from landfill"
          icon={<TrendingUp className="w-6 h-6" />}
          highlight={true}
        />
      </div>

      {/* Requests */}
      <h2 className="text-xl font-bold text-gray-800 mb-6">Pickup Queue</h2>
      
      {displayPickups.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayPickups.map(pickup => (
            <PickupCard 
              key={pickup.id || pickup._id}
              pickup={pickup}
              userRole="kabadiwala"
              onAccept={handleAccept}
              onConfirm={handleConfirm}
              weightInput={acceptedPickupId === (pickup.id || pickup._id) ? weightInput : ''}
              setWeightInput={setWeightInput}
              isUpdating={isUpdating}
            />
          ))}
        </div>
      ) : (
        !loading && (
          <div className="py-20 text-center bg-white rounded-3xl border border-dashed border-green-200">
            <Package className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 font-medium">No pickup requests found.</p>
          </div>
        )
      )}
    </div>
  );
};

export default KabadiwalaDashboard;
