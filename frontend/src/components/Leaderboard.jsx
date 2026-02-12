import { useState } from 'react';
import { getTopScores } from '../services/api';
import { Trophy, RefreshCcw } from 'lucide-react';
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
        <div className="bg-[#f8f8f8] border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative">
            <div className="absolute -top-3 -left-3 w-6 h-6 bg-[#f8f8f8] border-4 border-black"></div>
            <div className="absolute -top-3 -right-3 w-6 h-6 bg-[#f8f8f8] border-4 border-black"></div>
            <div className="absolute -bottom-3 -left-3 w-6 h-6 bg-[#f8f8f8] border-4 border-black"></div>
            <div className="absolute -bottom-3 -right-3 w-6 h-6 bg-[#f8f8f8] border-4 border-black"></div>

            <div className="flex justify-between items-center mb-6 border-b-4 border-black pb-4">
                <h2 className="text-xl md:text-2xl font-bold text-black flex items-center gap-2 uppercase tracking-tight">
                    <Trophy className="text-yellow-500" strokeWidth={3} /> Top Startups
                </h2>
                <button 
                    onClick={() => { setLoading(true); fetchScores(); }} 
                    className="p-2 hover:bg-gray-200 border-2 border-transparent hover:border-black transition-all active:translate-y-1"
                >
                    <RefreshCcw size={20} className={`text-black ${loading ? "animate-spin" : ""}`} />
                </button>
            </div>

            {error && <div className="text-red-500 font-bold mb-4 bg-red-100 border-2 border-red-500 p-2 text-xs uppercase">{error}</div>}

            <div className="space-y-4">
                <AnimatePresence>
                    {scores.map((entry, index) => (
                        <motion.div
                            key={`${entry.username}-${index}`}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ delay: index * 0.05 }}
                            className="bg-white p-3 flex items-center justify-between hover:bg-yellow-50 transition-colors border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                        >
                            <div className="flex items-center gap-4">
                                <div className={`
                                    w-8 h-8 flex items-center justify-center font-bold border-2 border-black
                                    ${index === 0 ? 'bg-yellow-400 text-black' : 
                                      index === 1 ? 'bg-gray-300 text-black' : 
                                      index === 2 ? 'bg-orange-400 text-black' : 'bg-white text-black'}
                                `}>
                                    {index + 1}
                                </div>
                                <div className="text-black font-bold uppercase text-xs md:text-sm">{entry.username}</div>
                            </div>
                            <div className="text-red-600 font-bold font-mono tracking-widest">
                                {entry.total_score.toLocaleString()}
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
                
                {!loading && scores.length === 0 && (
                    <div className="text-center text-gray-500 py-8 font-mono text-xs uppercase">No scores yet. Press Start!</div>
                )}
            </div>
        </div>
    );
};

export default Leaderboard;
