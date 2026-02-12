import { useState } from 'react';
import Leaderboard from './components/Leaderboard';
import UserRankLookup from './components/UserRankLookup';
import ScoreSubmission from './components/ScoreSubmission';
import WelcomeScreen from './components/WelcomeScreen';
import BackgroundMusic from './components/BackgroundMusic';
import { Gamepad2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const [gameStarted, setGameStarted] = useState(false);

  return (
    <div className="min-h-screen text-black font-sans selection:bg-yellow-400 selection:text-black overflow-hidden relative">
      <AnimatePresence>
        {!gameStarted && <WelcomeScreen onStart={() => setGameStarted(true)} />}
      </AnimatePresence>

      {/* Main Background Video */}
      <div className="fixed top-0 left-0 w-full h-full z-[-1] bg-black overflow-hidden">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="w-full h-full object-fill opacity-90"
          >
            <source src="/assets/videos/video.mp4" type="video/mp4" />
          </video>
      </div>
      
      {/* Background Music - Only plays after start */}
      {gameStarted && <BackgroundMusic />}
      
      <div className={`relative z-10 px-4 py-8 md:px-8 transition-opacity duration-1000 ${gameStarted ? 'opacity-100' : 'opacity-0'}`}>
        <motion.header 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="max-w-7xl mx-auto mb-12 flex flex-col items-center justify-center text-center bg-white/90 backdrop-blur-sm border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-sm"
        >
          <div className="flex items-center gap-4 mb-2">
            <div className="text-red-600 animate-bounce">
              <Gamepad2 size={48} />
            </div>
            <h1 className="text-3xl md:text-5xl font-black text-red-600 uppercase tracking-tighter" style={{ textShadow: '4px 4px 0px #000' }}>
              Super Leaderboard
            </h1>
          </div>
          <p className="text-black text-xs md:text-sm font-bold tracking-widest uppercase bg-yellow-400 px-4 py-1 border-2 border-black">World 1-1</p>
        </motion.header>

        <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Leaderboard */}
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
               className="bg-black/80 backdrop-blur-md rounded-sm p-6 border-4 border-white text-center shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)]"
            >
               <h3 className="text-green-400 font-bold text-xs uppercase mb-2">System Status</h3>
               <div className="flex justify-center items-center gap-2">
                 <div className="w-3 h-3 bg-green-500 rounded-none animate-pulse border border-white"></div>
                 <span className="text-white text-xs">ONLINE</span>
               </div>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;

