import { useState } from 'react';
import Leaderboard from './components/Leaderboard';
import UserRankLookup from './components/UserRankLookup';
import ScoreSubmission from './components/ScoreSubmission';
import Background3D from './components/Background3D';
import { Gamepad2, Skull } from 'lucide-react';
import { motion } from 'framer-motion';

function App() {
  return (
    <div className="min-h-screen text-gray-100 font-sans selection:bg-red-500 selection:text-white">
      <Background3D />
      
      <div className="relative z-10 px-4 py-8 md:px-8">
        <motion.header 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="max-w-7xl mx-auto mb-12 flex items-center justify-between border-b border-red-900/30 pb-6"
        >
          <div className="flex items-center gap-4">
            <div className="bg-red-900/20 p-3 rounded-xl backdrop-blur border border-red-500/30 text-red-500 shadow-[0_0_15px_rgba(220,38,38,0.3)]">
              <Gamepad2 size={32} />
            </div>
            <div>
              <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-800 tracking-tighter uppercase italic">
                Iron Leage
              </h1>
              <p className="text-red-200/50 text-xs font-mono tracking-widest uppercase">Global Competitive Ladder</p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-2 text-red-500/50">
             <Skull size={20} />
             <span className="font-mono text-xs">Kill or be Killed</span>
          </div>
        </motion.header>

        <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Leaderboard (Takes up more space) */}
          <div className="lg:col-span-8 space-y-8">
             <Leaderboard />
          </div>
          
          {/* Right Column: Actions */}
          <div className="lg:col-span-4 space-y-6">
            <ScoreSubmission />
            <UserRankLookup />
            
            <motion.div 
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ delay: 0.2 }}
               className="bg-black/40 backdrop-blur-md rounded-xl p-6 border border-red-900/30 text-center"
            >
               <h3 className="text-red-500 font-mono text-xs uppercase mb-2">System Status</h3>
               <div className="flex justify-center items-center gap-2">
                 <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_#22c55e]"></div>
                 <span className="text-gray-400 text-sm">Server Online</span>
               </div>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
