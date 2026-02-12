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
            setError(err.error || 'User not found');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-[#e6f2ff] border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-sm font-bold text-black mb-4 flex items-center gap-2 uppercase">
                <Search className="text-blue-500" strokeWidth={3} size={20} /> Check Rank
            </h2>
            
            <form onSubmit={handleLookup} className="flex gap-2 mb-6">
                <input
                    type="number"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    placeholder="ID"
                    className="flex-1 bg-white border-2 border-black p-2 text-black placeholder-gray-400 focus:outline-none focus:bg-yellow-50 font-mono text-sm shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                />
                <button 
                    type="submit" 
                    disabled={loading}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 font-bold uppercase text-xs border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? '...' : 'GO'}
                </button>
            </form>

            <AnimatePresence mode="wait">
                {error && (
                    <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="text-red-500 bg-red-100 border-2 border-red-500 p-2 text-xs uppercase font-bold text-center"
                    >
                        {error}
                    </motion.div>
                )}

                {rankData && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-yellow-300 p-4 border-4 border-black text-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                    >
                        <div className="text-black text-xs mb-1 font-bold uppercase">Player {rankData.user_id}</div>
                        <div className="text-2xl font-black text-black mb-2 flex items-center justify-center gap-2 drop-shadow-sm">
                            <Medal className="text-white drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]" strokeWidth={2.5} /> #{rankData.rank}
                        </div>
                        <div className="text-red-600 font-mono text-sm font-bold bg-black px-2 py-1 inline-block border-2 border-white">
                            {rankData.total_score.toLocaleString()} PTS
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default UserRankLookup;
