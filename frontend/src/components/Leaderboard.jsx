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

    useEffect(() => {
        fetchScores();
    }, []);

    usePolling(fetchScores, 5000);

    return (
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-xl border border-white/20">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                    <Trophy className="text-yellow-400" /> Leaderboard
                </h2>
                <button 
                    onClick={() => { setLoading(true); fetchScores(); }} 
                    className="p-2 hover:bg-white/10 rounded-full transition-colors text-white"
                >
                    <RefreshCcw size={20} className={loading ? "animate-spin" : ""} />
                </button>
            </div>

            {error && <div className="text-red-400 mb-4">{error}</div>}

            <div className="space-y-2">
                <AnimatePresence>
                    {scores.map((entry, index) => (
                        <motion.div
                            key={`${entry.username}-${index}`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ delay: index * 0.05 }}
                            className="bg-white/5 p-4 rounded-lg flex items-center justify-between hover:bg-white/10 transition-colors border border-transparent hover:border-white/10"
                        >
                            <div className="flex items-center gap-4">
                                <div className={`
                                    w-8 h-8 flex items-center justify-center rounded-full font-bold
                                    ${index === 0 ? 'bg-yellow-500 text-black' : 
                                      index === 1 ? 'bg-gray-400 text-black' : 
                                      index === 2 ? 'bg-orange-600 text-white' : 'bg-gray-700 text-white'}
                                `}>
                                    {index + 1}
                                </div>
                                <div className="text-white font-medium">{entry.username}</div>
                            </div>
                            <div className="text-emerald-400 font-bold font-mono">
                                {entry.total_score.toLocaleString()}
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
                
                {!loading && scores.length === 0 && (
                    <div className="text-center text-gray-400 py-8">No scores yet. Be the first!</div>
                )}
            </div>
        </div>
    );
};

export default Leaderboard;
