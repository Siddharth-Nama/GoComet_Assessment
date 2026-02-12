import { useState } from 'react';
import { getTopScores } from '../services/api';
import { Trophy, RefreshCcw, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import usePolling from '../hooks/usePolling';

const Leaderboard = () => {
    const [scores, setScores] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchScores = async () => {
        try {
            const data = await getTopScores();
            setScores(data);
            setError(null);
        } catch (err) {
            setError('Failed to fetch leaderboard');
        } finally {
            setLoading(false);
        }
    };

    usePolling(fetchScores, 5000);

    return (
        <div className="mario-brick p-8 relative">
            {/* Visual Decoration: Coins */}
            <div className="absolute -top-6 left-10 text-yellow-400 animate-bounce">
                <Star className="fill-yellow-400 stroke-black stroke-[3px]" size={32} />
            </div>
             <div className="absolute -top-6 right-10 text-yellow-400 animate-bounce delay-100">
                <Star className="fill-yellow-400 stroke-black stroke-[3px]" size={32} />
            </div>

            <div className="bg-black/80 border-4 border-white p-6 relative">
                 <div className="flex justify-between items-center mb-6 border-b-4 border-white pb-4">
                    <h2 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2 uppercase tracking-tight drop-shadow-[2px_2px_0px_#000]">
                        <Trophy className="text-yellow-400 fill-yellow-400" strokeWidth={3} /> Top Players
                    </h2>
                    <button 
                        onClick={() => { setLoading(true); fetchScores(); }} 
                        className="p-2 hover:bg-white/20 transition-all active:translate-y-1 rounded-sm"
                    >
                        <RefreshCcw size={20} className={`text-white ${loading ? "animate-spin" : ""}`} />
                    </button>
                </div>

                {error && <div className="text-red-500 font-bold mb-4 bg-black border-2 border-red-500 p-2 text-xs uppercase text-center blinking-text">{error}</div>}

                <div className="space-y-4">
                    <AnimatePresence>
                        {scores.map((entry, index) => (
                            <motion.div
                                key={`${entry.username}-${index}`}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{ delay: index * 0.05 }}
                                className="bg-blue-900 border-2 border-white p-3 flex items-center justify-between hover:bg-blue-800 transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`
                                        w-8 h-8 flex items-center justify-center font-bold border-2 border-white text-xs
                                        ${index === 0 ? 'bg-yellow-400 text-black' : 
                                          index === 1 ? 'bg-gray-400 text-black' : 
                                          index === 2 ? 'bg-orange-600 text-white' : 'bg-black text-white'}
                                    `}>
                                        {index + 1}
                                    </div>
                                    <div className="text-white font-bold uppercase text-xs md:text-sm tracking-wide">{entry.username}</div>
                                </div>
                                <div className="text-yellow-400 font-bold font-mono tracking-widest text-shadow-sm">
                                    {entry.total_score.toLocaleString()}
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                    
                    {!loading && scores.length === 0 && (
                        <div className="text-center text-white/50 py-8 font-mono text-xs uppercase">No scores yet...</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Leaderboard;
