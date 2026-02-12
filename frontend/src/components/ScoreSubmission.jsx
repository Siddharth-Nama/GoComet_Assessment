import React, { useState } from 'react';
import { submitScore } from '../services/api';
import { RotateCcw, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ScoreSubmission = () => {
    const [userId, setUserId] = useState('');
    const [score, setScore] = useState('');
    const [status, setStatus] = useState(null); // success, error
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
            setMessage('Score submitted successfully!');
            setScore(''); // Reset score, keep user ID for multiple submissions
        } catch (err) {
            setStatus('error');
            setMessage('Failed to submit score.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-gradient-to-br from-red-900/50 to-black/50 backdrop-blur-md rounded-xl p-6 shadow-xl border border-red-500/30 relative overflow-hidden group">
            <div className="absolute inset-0 bg-red-500/5 opacity-0 group-hover:opacity-10 transition-opacity pointer-events-none" />
            
            <h2 className="text-xl font-bold text-red-50 mb-4 flex items-center gap-2">
                <Send className="text-red-500" /> Submit Score
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-red-200/70 text-xs uppercase mb-1 font-mono">User ID</label>
                    <input
                        type="number"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        placeholder="e.g. 1"
                        className="w-full bg-black/40 border border-red-500/20 rounded-lg px-4 py-2 text-white placeholder-red-900/50 focus:outline-none focus:border-red-500 transition-colors font-mono"
                    />
                </div>
                <div>
                    <label className="block text-red-200/70 text-xs uppercase mb-1 font-mono">Score</label>
                    <input
                        type="number"
                        value={score}
                        onChange={(e) => setScore(e.target.value)}
                        placeholder="e.g. 5000"
                        className="w-full bg-black/40 border border-red-500/20 rounded-lg px-4 py-2 text-white placeholder-red-900/50 focus:outline-none focus:border-red-500 transition-colors font-mono"
                    />
                </div>

                <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-red-600 to-red-800 hover:from-red-500 hover:to-red-700 text-white py-2 rounded-lg font-bold uppercase tracking-wider transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_15px_rgba(220,38,38,0.5)]"
                >
                    {loading ? 'Submitting...' : 'Submit Score'}
                </button>
            </form>

            <AnimatePresence>
                {status && (
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className={`mt-4 p-3 rounded-lg text-sm text-center font-bold ${status === 'success' ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-red-500/20 text-red-400 border border-red-500/30'}`}
                    >
                        {message}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ScoreSubmission;
