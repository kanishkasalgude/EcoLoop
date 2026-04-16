import React, { useState, useEffect } from 'react';
import { ArrowRight, Leaf, Recycle, RefreshCw, Trash2, Users, Globe, Zap, ArrowDown, CheckCircle2, IndianRupee, Search, ScanLine, Clock, Lightbulb, Trophy, Gift, Medal, Award, BarChart3, CloudLightning } from 'lucide-react';
import InfoCard from '../components/InfoCard';
import StatCard from '../components/StatCard';
import logo from '../assets/logo.png';

const HomePage = ({ onNavigate }) => {
  const [stats, setStats] = useState({
    wasteDiverted: 12450,
    activeSocieties: 342,
    greenCredits: 85200
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('http://localhost:5000/stats/citywide');
        if (response.ok) {
          const data = await response.json();
          setStats(data);
        }
      } catch (error) {
        console.error("Error fetching citywide stats:", error);
      }
    };

    fetchStats();
    // Refresh stats every 30 seconds for real-time feel
    const interval = setInterval(fetchStats, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full">
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        @keyframes floatReverse {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(20px) rotate(-5deg); }
        }
        @keyframes pulseSlow {
          0%, 100% { opacity: 0.15; transform: scale(1); }
          50% { opacity: 0.25; transform: scale(1.05); }
        }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeSlideUp2 {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeSlideUp3 {
          from { opacity: 0; transform: translateY(50px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes countUp {
          from { opacity: 0; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1); }
        }
        .hero-title { animation: fadeSlideUp 0.8s ease-out 0.2s both; }
        .hero-subtitle { animation: fadeSlideUp2 0.8s ease-out 0.5s both; }
        .hero-desc { animation: fadeSlideUp2 0.8s ease-out 0.7s both; }
        .hero-pills { animation: fadeSlideUp3 0.8s ease-out 0.9s both; }
        .hero-btns { animation: fadeSlideUp3 0.8s ease-out 1.1s both; }
        .hero-stats { animation: fadeSlideUp3 0.8s ease-out 1.3s both; }
        .shimmer-text {
          background: linear-gradient(90deg, #fff 30%, #a7f3d0 50%, #fff 70%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 3s linear infinite;
        }
        .float-1 { animation: float 6s ease-in-out infinite; }
        .float-2 { animation: floatReverse 8s ease-in-out infinite; }
        .float-3 { animation: float 10s ease-in-out 2s infinite; }
        .blob { animation: pulseSlow 4s ease-in-out infinite; }
      `}</style>


      {/* Platform Features Highlight */}
      <section className="py-20 px-6 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-gray-800 mb-4">Powerful Digital Tools</h2>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto">Track your environmental impact with precision and earn recognition.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <InfoCard 
              icon={<BarChart3 className="w-8 h-8 text-blue-600" />}
              title="Advanced Analytics"
              description="Visualize your recycling volume over time with interactive line charts and composition donut graphs."
              colorClass="bg-blue-50"
            />
            <InfoCard 
              icon={<CloudLightning className="w-8 h-8 text-emerald-600" />}
              title="Real CO₂ Tracking"
              description="Calculate the exact kilograms of CO₂ emissions you've saved using standard EPA offset formulas."
              colorClass="bg-emerald-50"
            />
            <InfoCard 
              icon={<Award className="w-8 h-8 text-purple-600" />}
              title="Gamified Badges"
              description="Unlock achievements like 'Green Champion', 'Diverse Recycler', and 'E-Warrior' as you recycle."
              colorClass="bg-purple-50"
            />
          </div>
        </div>
      </section>

      {/* Rewards & Prizes Section */}
      <section className="py-24 px-6 bg-gradient-to-br from-green-900 to-green-950 text-white relative overflow-hidden">
        {/* Abstract background blobs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-green-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="inline-block p-3 bg-yellow-400/20 text-yellow-400 rounded-2xl mb-4 border border-yellow-400/30">
              <Gift className="w-10 h-10" />
            </div>
            <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">Earn Credits <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-500">& Win Exciting Prizes</span></h2>
            <p className="text-xl text-green-200 max-w-2xl mx-auto font-medium">Recycling is rewarding! Accumulate Green Credits to climb the leaderboard and unlock municipal rewards.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center sm:text-left">
            <div className="bg-white/10 backdrop-blur-md rounded-[2rem] p-8 border border-white/10 hover:bg-white/15 transition-all">
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-6 mx-auto sm:mx-0">
                <Medal className="w-8 h-8 text-yellow-400" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-white">Monthly Top 3</h3>
              <p className="text-green-200 leading-relaxed font-medium mb-6">Societies ranking in the top 3 spots of the leaderboard each month receive exclusive municipal recognition and grand prizes.</p>
              <ul className="text-sm font-bold text-yellow-300 space-y-2">
                <li className="flex items-center justify-center sm:justify-start"> <span className="w-2 h-2 rounded-full bg-yellow-400 mr-2"></span> Trophies & Certificates </li>
                <li className="flex items-center justify-center sm:justify-start"> <span className="w-2 h-2 rounded-full bg-yellow-400 mr-2"></span> Community Fund Bonuses </li>
              </ul>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-[2rem] p-8 border border-white/10 hover:bg-white/15 transition-all md:scale-105 shadow-2xl relative z-20">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-yellow-400 text-yellow-900 text-xs font-black uppercase tracking-widest py-1 px-4 rounded-full">Most Popular</div>
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center mb-6 mx-auto sm:mx-0 shadow-lg shadow-yellow-500/30">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-white">Credit Milestones</h3>
              <p className="text-green-200 leading-relaxed font-medium mb-6">Unlock instant rewards when your society reaches universal credit tiers across the year.</p>
              <ul className="text-sm font-medium text-white/80 space-y-3 bg-black/20 p-4 rounded-xl">
                 <li className="flex justify-between items-center"><span className="text-white">♻️ 5,000 Credits:</span> <span className="text-green-300 font-bold">Reusable Tote Bags</span></li>
                 <li className="flex justify-between items-center"><span className="text-white">🌱 15,000 Credits:</span> <span className="text-green-300 font-bold">Composter Kits</span></li>
                 <li className="flex justify-between items-center"><span className="text-white">🌍 50,000 Credits:</span> <span className="text-green-300 font-bold">Property Tax Rebates</span></li>
              </ul>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-[2rem] p-8 border border-white/10 hover:bg-white/15 transition-all">
               <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-6 mx-auto sm:mx-0">
                <Users className="w-8 h-8 text-emerald-400" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-white">Community Events</h3>
              <p className="text-green-200 leading-relaxed font-medium mb-6">Host sponsored clean-up drives. Earn bonus Green Credits for verified community-driven recycling events in your area.</p>
              <button onClick={() => onNavigate('leaderboard')} className="w-full mt-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold py-3 px-4 rounded-xl transition-all">
                Check Rankings
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* About Recycling Section (RRR) */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-gray-800 mb-4">The 3 R's of Sustainability</h2>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto">Our government portal encourages every citizen to follow these core principles.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <InfoCard 
              icon={<Trash2 className="w-8 h-8" />}
              title="Reduce"
              description="Minimize waste generation by making smart purchasing decisions and avoiding single-use plastics."
              colorClass="bg-red-50"
            />
            <InfoCard 
              icon={<RefreshCw className="w-8 h-8" />}
              title="Reuse"
              description="Find new purposes for old items. Donate, repair, or upcycle instead of throwing away."
              colorClass="bg-blue-50"
            />
            <InfoCard 
              icon={<Recycle className="w-8 h-8" />}
              title="Recycle"
              description="Separate your waste so valuable materials can be processed and turned into new products."
              colorClass="bg-green-50"
            />
          </div>
        </div>
      </section>



      {/* How it Works / Flows */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-gray-800 mb-4">How EcoLoop Works</h2>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto">A seamless digital flow connecting households to authorized recycling collectors.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
            {[
              { step: 1, title: 'Identify', text: 'Separate your recyclable waste' },
              { step: 2, title: 'Request', text: 'Schedule a pickup on the portal' },
              { step: 3, title: 'Collect', text: 'Authorized recycling collector arrives' },
              { step: 4, title: 'Earn', text: 'Receive verified Green Credits' },
              { step: 5, title: 'Compete', text: 'Climb the municipal leaderboard' }
            ].map((item, index) => (
              <React.Fragment key={index}>
                <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-2xl border border-gray-100 relative group hover:bg-green-50 transition-colors">
                  <div className="w-12 h-12 bg-green-600 text-white font-black text-xl rounded-full flex items-center justify-center mb-4 shadow-lg group-hover:-translate-y-1 transition-transform">
                    {item.step}
                  </div>
                  <h3 className="font-bold text-gray-800 text-lg mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-500 font-medium">{item.text}</p>
                </div>
                {index < 4 && (
                  <div className="hidden md:flex justify-center text-green-300">
                    <ArrowRight className="w-8 h-8" />
                  </div>
                )}
                {index < 4 && (
                  <div className="md:hidden flex justify-center text-green-300 py-2">
                    <ArrowDown className="w-6 h-6" />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>



      {/* Optional Panels: Tips & Timelines */}
      <section className="py-20 px-6 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-3xl font-black mb-8 flex items-center"><Leaf className="mr-3 text-green-400"/> Recycling Tips</h3>
              <ul className="space-y-6">
                <li className="flex items-start space-x-4">
                   <div className="bg-gray-800 p-2 rounded-lg text-emerald-400 mt-1"><CheckCircle2 className="w-5 h-5"/></div>
                   <div>
                     <h4 className="font-bold text-lg text-gray-100">Separate Dry and Wet Waste</h4>
                     <p className="text-gray-400 mt-1">Keep food waste strictly away from paper and plastics to avoid contamination.</p>
                   </div>
                </li>
                 <li className="flex items-start space-x-4">
                   <div className="bg-gray-800 p-2 rounded-lg text-emerald-400 mt-1"><CheckCircle2 className="w-5 h-5"/></div>
                   <div>
                     <h4 className="font-bold text-lg text-gray-100">Clean Your Plastics</h4>
                     <p className="text-gray-400 mt-1">Rinse takeaway containers and bottles before throwing them into the recycle bin.</p>
                   </div>
                </li>
                 <li className="flex items-start space-x-4">
                   <div className="bg-gray-800 p-2 rounded-lg text-emerald-400 mt-1"><CheckCircle2 className="w-5 h-5"/></div>
                   <div>
                     <h4 className="font-bold text-lg text-gray-100">Dispose E-Waste Responsibly</h4>
                     <p className="text-gray-400 mt-1">Batteries and electronics contain toxic materials and require specialized recycling.</p>
                   </div>
                </li>
              </ul>
            </div>
            
            <div className="bg-gray-800 p-10 rounded-3xl border border-gray-700 shadow-2xl">
              <h3 className="text-2xl font-black mb-8 text-white">Decomposition Timeline</h3>
              <p className="text-gray-400 mb-8 text-sm">How long it takes for common items to break down in a landfill if not recycled:</p>
              
              <div className="space-y-6">
                 <div>
                    <div className="flex justify-between text-sm font-bold mb-2">
                        <span className="text-gray-300">Newspaper / Paper</span>
                        <span className="text-red-400">2 to 6 weeks</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2"><div className="bg-red-500 h-2 rounded-full" style={{width: '10%'}}></div></div>
                 </div>
                 <div>
                    <div className="flex justify-between text-sm font-bold mb-2">
                        <span className="text-gray-300">Aluminium Cans</span>
                        <span className="text-orange-400">200 years</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2"><div className="bg-orange-500 h-2 rounded-full" style={{width: '50%'}}></div></div>
                 </div>
                 <div>
                    <div className="flex justify-between text-sm font-bold mb-2">
                        <span className="text-gray-300">Plastic Bottles</span>
                        <span className="text-yellow-400">up to 450 years</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2"><div className="bg-yellow-500 h-2 rounded-full" style={{width: '80%'}}></div></div>
                 </div>
                 <div>
                    <div className="flex justify-between text-sm font-bold mb-2">
                        <span className="text-gray-300">Glass Bottles</span>
                        <span className="text-red-600">1 Million+ years</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2"><div className="bg-red-600 h-2 rounded-full" style={{width: '100%'}}></div></div>
                 </div>
              </div>
            </div>
        </div>
      </section>

    </div>
  );
};

export default HomePage;
