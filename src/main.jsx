import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom'; // Switched to Legacy import for stability
import { 
  Menu, X, ArrowRight, Shield, Music, Zap, Bot, MessageSquare, 
  Github, Twitter, ExternalLink, ChevronDown, LayoutDashboard, 
  Settings, Users, Activity, LogOut, Save, Disc, AlertTriangle, 
  Search, MoreVertical, Coins, Loader2 
} from 'lucide-react';

// --- CONFIGURATION ---
const API_URL = 'https://97s-bot.onrender.com'; // Your Render URL

// --- MAIN APP COMPONENT ---
function App() {
  const [currentView, setCurrentView] = useState('landing'); 
  const [stats, setStats] = useState({ servers: 0, users: 0, ping: 0 });

  // Fetch Bot Stats on Load
  useEffect(() => {
    fetch(`${API_URL}/api/stats`)
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(err => console.log('Bot Offline or Sleeping:', err));
  }, []);

  const handleLogin = () => {
    setCurrentView('loading');
    setTimeout(() => setCurrentView('dashboard'), 1500);
  };

  return (
    <div className="min-h-screen bg-black text-zinc-100 font-sans selection:bg-pink-600 selection:text-white">
      {/* Global Styles Injection */}
      <style>{`
        body { background-color: #000; color: #fff; margin: 0; font-family: 'Inter', system-ui, sans-serif; }
      `}</style>
      
      {currentView === 'landing' && <LandingPage stats={stats} onLogin={handleLogin} />}
      {currentView === 'loading' && <LoadingScreen />}
      {currentView === 'dashboard' && <Dashboard onLogout={() => setCurrentView('landing')} />}
    </div>
  );
}

// --- LOADING SCREEN ---
function LoadingScreen() {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-black">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-zinc-800 border-t-pink-600 rounded-full animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-bold text-xs text-zinc-500">97s</span>
        </div>
      </div>
      <p className="mt-4 text-zinc-500 font-mono text-sm animate-pulse">SYNCING WITH LEVIATHAN CORE...</p>
    </div>
  );
}

// --- LANDING PAGE ---
function LandingPage({ onLogin, stats }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-black/80 backdrop-blur-md border-b border-zinc-800 py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-pink-600 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-[0_0_15px_rgba(219,39,119,0.5)]">97</div>
            <span className="font-bold text-xl tracking-tight text-white">97s</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-medium text-zinc-400 hover:text-pink-500 transition-colors">Features</a>
            <a href="#commands" className="text-sm font-medium text-zinc-400 hover:text-pink-500 transition-colors">Commands</a>
            <button onClick={onLogin} className="bg-zinc-100 text-black px-5 py-2 rounded-full text-sm font-bold hover:bg-pink-600 hover:text-white transition-all shadow-lg hover:shadow-pink-600/20">
              Dashboard
            </button>
          </div>
          
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 text-zinc-400 hover:text-white"><Menu size={24} /></button>
        </div>
        
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-zinc-900 border-b border-zinc-800 p-4 flex flex-col gap-4 shadow-2xl">
             <button onClick={onLogin} className="w-full bg-pink-600 text-white px-5 py-3 rounded-lg font-bold">Login</button>
          </div>
        )}
      </nav>

      <section className="pt-32 pb-20 md:pt-48 md:pb-32 px-4 relative overflow-hidden">
        <div className="absolute top-20 right-0 -mr-20 w-96 h-96 bg-pink-900/20 rounded-full blur-3xl -z-10 animate-pulse"></div>
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-pink-500 text-sm font-medium mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-pink-500"></span>
            </span>
            {stats.servers > 0 ? `Online on ${stats.servers} Servers` : 'Connecting to Core...'}
          </div>
          
          <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter mb-6 leading-tight">
            NEXT GEN <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-zinc-500">AUTOMATION</span>
          </h1>
          
          <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
            Serving <b>{stats.users.toLocaleString()}</b> users with advanced moderation, high-fidelity music, and seamless management.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button onClick={onLogin} className="w-full sm:w-auto px-8 py-4 bg-pink-600 text-white rounded-full font-bold text-lg hover:bg-pink-700 transition-all shadow-[0_0_20px_rgba(219,39,119,0.3)] flex items-center justify-center gap-2 group">
              Setup Bot
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="w-full sm:w-auto px-8 py-4 bg-transparent text-white border border-zinc-700 rounded-full font-bold text-lg hover:bg-zinc-800 transition-all">Documentation</button>
          </div>
        </div>
      </section>
      
      {/* Features Grid */}
      <section id="features" className="py-20 bg-black relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Shield size={32} className="text-pink-500" />}
              title="Sentinel Mode"
              description="Automated raid protection and anti-spam filters that adapt to your server's needs."
            />
            <FeatureCard 
              icon={<Music size={32} className="text-zinc-200" />}
              title="Audio Engine"
              description="Lossless audio streaming with bass boost, vaporwave filters, and 24/7 lo-fi support."
            />
            <FeatureCard 
              icon={<Zap size={32} className="text-pink-500" />}
              title="Rank Cards"
              description="Fully customizable rank cards with dark mode aesthetics and custom backgrounds."
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-12 border-t border-zinc-900 text-center">
        <p className="text-zinc-600">&copy; 2025 97s Systems. All systems nominal.</p>
      </footer>
    </>
  );
}

// --- DASHBOARD ---
function Dashboard({ onLogout }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (activeTab === 'members') {
      fetch(`${API_URL}/api/leaderboard`)
        .then(res => res.json())
        .then(data => {
            setLeaderboard(data);
            setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [activeTab]);

  const menuItems = [
    { id: 'overview', icon: <Activity size={20} />, label: 'Overview' },
    { id: 'modules', icon: <LayoutDashboard size={20} />, label: 'Modules' },
    { id: 'members', icon: <Users size={20} />, label: 'Leaderboard' },
    { id: 'settings', icon: <Settings size={20} />, label: 'Settings' },
  ];

  return (
    <div className="flex h-screen bg-black overflow-hidden">
      <aside className="w-64 bg-zinc-950 border-r border-zinc-900 flex flex-col hidden md:flex">
        <div className="p-6 flex items-center gap-3 border-b border-zinc-900">
          <div className="w-8 h-8 bg-pink-600 rounded-lg flex items-center justify-center text-white font-bold shadow-[0_0_10px_rgba(219,39,119,0.5)]">97</div>
          <span className="font-bold text-lg text-white tracking-wide">97s Panel</span>
        </div>
        <div className="flex-1 py-6 px-4 space-y-2">
          {menuItems.map((item) => (
            <button key={item.id} onClick={() => setActiveTab(item.id)} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${activeTab === item.id ? 'bg-pink-600/10 text-pink-500 border border-pink-600/20' : 'text-zinc-400 hover:bg-zinc-900 hover:text-white'}`}>
              {item.icon} {item.label}
            </button>
          ))}
        </div>
        <div className="p-4 border-t border-zinc-900">
          <button onClick={onLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-zinc-500 hover:text-red-400 hover:bg-red-400/10 transition-colors"><LogOut size={20} /> Logout</button>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto bg-black p-8">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white mb-1">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h1>
            <p className="text-zinc-500 text-sm">Real-time data from Leviathan Core.</p>
          </div>
        </header>

        {activeTab === 'members' && (
          <div className="bg-zinc-950 border border-zinc-900 rounded-xl overflow-hidden">
             {loading ? (
                 <div className="p-8 text-center text-zinc-500">Fetching live data from bot...</div>
             ) : (
                <table className="w-full text-left">
                    <thead className="bg-zinc-900 text-zinc-400 text-xs uppercase font-medium">
                        <tr><th className="px-6 py-4">Rank</th><th className="px-6 py-4">User</th><th className="px-6 py-4">Level</th><th className="px-6 py-4 text-right">XP</th></tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-900 text-sm">
                        {leaderboard.map((user, i) => (
                            <tr key={i} className="hover:bg-zinc-900/50 transition-colors">
                                <td className="px-6 py-4 text-zinc-500">#{i+1}</td>
                                <td className="px-6 py-4 flex items-center gap-3">
                                    <img src={user.avatar || 'https://cdn.discordapp.com/embed/avatars/0.png'} className="w-8 h-8 rounded-full" />
                                    <span className="font-bold text-white">{user.username}</span>
                                </td>
                                <td className="px-6 py-4"><span className="text-pink-500 font-bold">{user.level}</span></td>
                                <td className="px-6 py-4 text-right text-zinc-400">{user.xp.toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
             )}
          </div>
        )}

        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-zinc-950 border border-zinc-900 rounded-xl p-6">
                  <h3 className="text-zinc-500 text-sm font-medium mb-2">Bot Status</h3>
                  <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-2xl font-bold text-white">Online</span>
                  </div>
              </div>
          </div>
        )}
      </main>
    </div>
  );
}

// Helper components
function FeatureCard({ icon, title, description }) {
  return (
    <div className="p-8 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-pink-900 hover:bg-zinc-900/80 transition-all duration-300 group">
      <div className="w-14 h-14 bg-black rounded-xl flex items-center justify-center border border-zinc-800 mb-6 group-hover:scale-110 group-hover:border-pink-500/30 transition-all duration-300">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
      <p className="text-zinc-400 leading-relaxed">{description}</p>
    </div>
  );
}

function StatCard({ title, value, change }) {
  return (
    <div className="bg-zinc-950 border border-zinc-900 rounded-xl p-6 hover:border-zinc-800 transition-colors">
      <p className="text-zinc-500 text-sm font-medium mb-2">{title}</p>
      <div className="flex items-end justify-between">
        <h3 className="text-3xl font-bold text-white">{value}</h3>
        <span className="text-green-500 text-sm font-bold bg-green-500/10 px-2 py-1 rounded">{change}</span>
      </div>
    </div>
  );
}

function ActivityRow({ user, action, time }) {
  return (
    <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-zinc-900/50 transition-colors">
      <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-xs text-white font-bold">
        {user.charAt(0)}
      </div>
      <div className="flex-1">
        <p className="text-sm text-zinc-300"><span className="font-bold text-white">{user}</span> {action}</p>
      </div>
      <span className="text-xs text-zinc-600">{time}</span>
    </div>
  );
}

function Toggle({ checked, onChange }) {
  return (
    <button 
      onClick={onChange}
      className={`w-12 h-6 rounded-full p-1 transition-colors duration-200 ease-in-out ${checked ? 'bg-pink-600' : 'bg-zinc-800'}`}
    >
      <div className={`w-4 h-4 rounded-full bg-white shadow-sm transform transition-transform duration-200 ${checked ? 'translate-x-6' : 'translate-x-0'}`} />
    </button>
  );
}

// --- RENDER APPLICATION ---
const rootElement = document.getElementById('root');
if (rootElement) {
  // Using legacy render to fix the "reading 'S'" version mismatch error
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>, 
    rootElement
  );
}
