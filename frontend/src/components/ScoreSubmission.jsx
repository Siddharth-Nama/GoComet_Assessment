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
            setScore(''); 
        } catch (err) {
            setStatus('error');
            setMessage('GAME OVER');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-[#ffcccc] border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden">
            
            <h2 className="text-sm font-bold text-red-600 mb-4 flex items-center gap-2 uppercase">
                <Star className="text-yellow-500 fill-yellow-500 animate-spin-slow" strokeWidth={3} size={20} /> Submit Score
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-black text-[10px] uppercase mb-1 font-bold">Player ID</label>
                    <input
                        type="number"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        placeholder="1"
                        className="w-full bg-white border-2 border-black p-2 text-black placeholder-gray-400 focus:outline-none focus:bg-yellow-50 font-mono text-sm shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                    />
                </div>
                <div>
                    <label className="block text-black text-[10px] uppercase mb-1 font-bold">Score</label>
                    <input
                        type="number"
                        value={score}
                        onChange={(e) => setScore(e.target.value)}
                        placeholder="000000"
                        className="w-full bg-white border-2 border-black p-2 text-black placeholder-gray-400 focus:outline-none focus:bg-yellow-50 font-mono text-sm shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                    />
                </div>

                <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full bg-red-500 hover:bg-red-600 text-white py-3 font-bold uppercase text-xs tracking-wider border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? 'Submitting...' : 'PRESS START'}
                </button>
            </form>

            <AnimatePresence>
                {status && (
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className={`mt-4 p-2 border-2 border-black text-xs text-center font-bold uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ${status === 'success' ? 'bg-green-400 text-black' : 'bg-black text-red-500'}`}
                    >
                        {message}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ScoreSubmission;
