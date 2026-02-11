import { useState } from 'react';
import Leaderboard from './components/Leaderboard';
import UserRankLookup from './components/UserRankLookup';
import { Gamepad2 } from 'lucide-react';
import { motion } from 'framer-motion';

function App() {
  return (
    <div className="min-h-screen px-4 py-8 md:px-8">
      <motion.header 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="max-w-6xl mx-auto mb-12 flex items-center justify-between"
      >
        <div className="flex items-center gap-3">
          <div className="bg-white/10 p-2 rounded-lg backdrop-blur text-purple-400">
            <Gamepad2 size={32} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight">Gaming Arena</h1>
            <p className="text-gray-400 text-sm">Global Leaderboard System</p>
          </div>
        </div>
      </motion.header>

      <main className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Leaderboard />
        </div>
        
        <div className="space-y-8">
          <UserRankLookup />
          
          <motion.div 
             initial={{ opacity: 0, x: 20 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ delay: 0.2 }}
             className="bg-gradient-to-br from-amber-500/20 to-orange-600/20 backdrop-blur-md rounded-xl p-6 border border-amber-500/20"
          >
             <h3 className="text-amber-400 font-bold mb-2">Simulate Activity</h3>
             <p className="text-sm text-gray-300 mb-4">
               Run the python simulation script to see values update in real-time!
             </p>
             <div className="bg-black/30 p-3 rounded font-mono text-xs text-gray-400">
               python backend/simulate_load.py
             </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}

export default App;
