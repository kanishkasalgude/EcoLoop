import React, { useState, useEffect } from 'react';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import SocietyDashboard from './pages/SocietyDashboard';
import KabadiwalaDashboard from './pages/KabadiwalaDashboard';
import RequestPickup from './pages/RequestPickup';
import Leaderboard from './pages/Leaderboard';
import { Leaf, LogOut, LayoutDashboard, BarChart3, Menu, X } from 'lucide-react';

function App() {
  const [user, setUser] = useState(null);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [authPage, setAuthPage] = useState('login'); // 'login' or 'signup'
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('recycai_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('recycai_user');
    setUser(null);
    setCurrentPage('dashboard');
    setAuthPage('login');
    setMenuOpen(false);
  };

  const navigate = (page) => {
    setCurrentPage(page);
    setMenuOpen(false);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-green-50/50">
        {authPage === 'login' ? (
          <LoginPage onNavigate={setAuthPage} onLogin={setUser} />
        ) : (
          <SignupPage onNavigate={setAuthPage} onLogin={setUser} />
        )}
      </div>
    );
  }

  const renderPage = () => {
    if (user.role === 'society') {
      switch (currentPage) {
        case 'dashboard': return <SocietyDashboard user={user} onNavigate={navigate} />;
        case 'request': return <RequestPickup user={user} onBack={() => navigate('dashboard')} />;
        case 'leaderboard': return <Leaderboard onBack={() => navigate('dashboard')} />;
        default: return <SocietyDashboard user={user} onNavigate={navigate} />;
      }
    } else {
      switch (currentPage) {
        case 'dashboard': return <KabadiwalaDashboard />;
        case 'leaderboard': return <Leaderboard onBack={() => navigate('dashboard')} />;
        default: return <KabadiwalaDashboard />;
      }
    }
  };

  return (
    <div className="min-h-screen bg-green-50/30 flex flex-col">
      {/* Navbar */}
      <nav className="bg-white border-b border-green-100 px-6 py-4 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <button 
            onClick={() => navigate('dashboard')}
            className="flex items-center space-x-2 text-green-800"
          >
            <div className="bg-green-600 p-1.5 rounded-lg transition-transform hover:scale-110">
                <Leaf className="w-6 h-6 text-white fill-current" />
            </div>
            <span className="text-2xl font-black tracking-tightest">RecycAI</span>
          </button>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-1">
            <button 
              onClick={() => navigate('dashboard')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${currentPage === 'dashboard' ? 'bg-green-600 text-white shadow-lg shadow-green-100' : 'text-gray-500 hover:bg-green-50 hover:text-green-700'}`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Dashboard</span>
            </button>
            <button 
              onClick={() => navigate('leaderboard')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${currentPage === 'leaderboard' ? 'bg-green-600 text-white shadow-lg shadow-green-100' : 'text-gray-500 hover:bg-green-50 hover:text-green-700'}`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>Leaderboard</span>
            </button>
            <div className="w-px h-6 bg-gray-100 mx-2"></div>
            <button 
              onClick={handleLogout}
              className="flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-bold text-red-500 hover:bg-red-50 transition-all border border-transparent hover:border-red-100"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2 text-gray-500">
             {menuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Nav */}
        {menuOpen && (
          <div className="md:hidden mt-4 space-y-2 pb-4 animate-in fade-in slide-in-from-top-4 duration-200">
            <button 
              onClick={() => navigate('dashboard')}
              className="w-full flex items-center space-x-3 p-4 rounded-xl bg-gray-50 font-bold text-gray-700 active:bg-green-600 active:text-white"
            >
              <LayoutDashboard className="w-5 h-5" />
              <span>Dashboard</span>
            </button>
            <button 
              onClick={() => navigate('leaderboard')}
              className="w-full flex items-center space-x-3 p-4 rounded-xl bg-gray-50 font-bold text-gray-700 active:bg-green-600 active:text-white"
            >
              <BarChart3 className="w-5 h-5" />
              <span>Leaderboard</span>
            </button>
            <button 
              onClick={handleLogout}
              className="w-full flex items-center space-x-3 p-4 rounded-xl bg-red-50 font-bold text-red-600 active:bg-red-600 active:text-white"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        <div className="container mx-auto">
          {renderPage()}
        </div>
      </main>

      <footer className="bg-white border-t border-green-50 py-10 text-center mt-auto">
        <div className="flex justify-center mb-4">
           <Leaf className="w-6 h-6 text-green-200" />
        </div>
        <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest">Powered by RecycAI &bull; Sustainable Future Guaranteed</p>
      </footer>
    </div>
  );
}

export default App;
