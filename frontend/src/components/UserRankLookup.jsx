import React, { useState } from 'react';
import { getPlayerRank } from '../services/api';
import { Search, Medal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const UserRankLookup = () => {
    const [userId, setUserId] = useState('');
    const [rankData, setRankData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleLookup = async (e) => {
        e.preventDefault();
        if (!userId) return;

        setLoading(true);
        setError(null);
        setRankData(null);

        try {
            const data = await getPlayerRank(userId);
            setRankData(data);
        } catch (err) {
            setError(err.error || 'User not found or error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-xl border border-white/20">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Search className="text-blue-400" /> Check Rank
            </h2>
            
            <form onSubmit={handleLookup} className="flex gap-2 mb-6">
                <input
                    type="number"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    placeholder="Enter User ID"
                    className="flex-1 bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                />
                <button 
                    type="submit" 
                    disabled={loading}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
                >
                    {loading ? 'Searching...' : 'Check'}
                </button>
            </form>

            <AnimatePresence mode="wait">
                {error && (
                    <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="text-red-400 bg-red-400/10 p-3 rounded-lg text-sm"
                    >
                        {error}
                    </motion.div>
                )}

                {rankData && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-gradient-to-br from-blue-900/50 to-purple-900/50 p-4 rounded-xl border border-white/10"
                    >
                        <div className="text-center">
                            <div className="text-gray-400 text-sm mb-1">User ID: {rankData.user_id}</div>
                            <div className="text-4xl font-bold text-white mb-2 flex items-center justify-center gap-2">
                                <Medal className="text-yellow-400" /> #{rankData.rank}
                            </div>
                            <div className="text-emerald-400 font-mono text-lg">
                                {rankData.total_score.toLocaleString()} pts
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default UserRankLookup;
