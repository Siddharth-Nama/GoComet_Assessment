import React, { useState } from 'react';
import { submitScore } from '../services/api';
import { Send, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ScoreSubmission = () => {
    const [userId, setUserId] = useState('');
    const [score, setScore] = useState('');
    const [status, setStatus] = useState(null);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!userId || !score) return;

        setLoading(true);
        setStatus(null);

        try {
            await submitScore(userId, parseInt(score));
            setStatus('success');
            setMessage('1UP!');
            setTimeout(() => setStatus(null), 2000);
        } catch (err) {
            setStatus('error');
            setMessage('GAME OVER');
            setTimeout(() => setStatus(null), 2000);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mario-pipe p-6 pt-8 mt-6">
            <h2 className="text-sm font-bold text-white mb-4 flex items-center gap-2 uppercase relative z-10 drop-shadow-md">
                <Star className="text-yellow-400 fill-yellow-400 animate-spin-slow" strokeWidth={3} size={20} /> Submit Score
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
                <div>
                    <label className="block text-white text-[10px] uppercase mb-1 font-bold drop-shadow-sm">Player ID</label>
                    <input
                        type="number"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        placeholder="1"
                        className="w-full bg-black border-2 border-white p-2 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400 font-mono text-sm shadow-[inset_2px_2px_4px_rgba(0,0,0,0.5)]"
                    />
                </div>
                <div>
                    <label className="block text-white text-[10px] uppercase mb-1 font-bold drop-shadow-sm">Score</label>
                    <input
                        type="number"
                        value={score}
                        onChange={(e) => setScore(e.target.value)}
                        placeholder="000000"
                        className="w-full bg-black border-2 border-white p-2 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400 font-mono text-sm shadow-[inset_2px_2px_4px_rgba(0,0,0,0.5)]"
                    />
                </div>

                <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full bg-red-600 hover:bg-red-500 text-white py-3 font-bold uppercase text-xs tracking-wider border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? 'Submitting...' : 'PRESS START'}
                </button>
            </form>

            <AnimatePresence>
                {status && (
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.5, y: 0 }}
                        animate={{ opacity: 1, scale: 1, y: -20 }}
                        exit={{ opacity: 0 }}
                        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none text-2xl font-black italic tracking-tighter drop-shadow-[2px_2px_0_#000] ${status === 'success' ? 'text-green-400' : 'text-red-500'}`}
                    >
                        {message}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ScoreSubmission;
