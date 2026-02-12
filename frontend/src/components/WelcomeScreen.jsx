import React, { useState } from 'react';
import { Gamepad2, Play } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const WelcomeScreen = ({ onStart }) => {
    return (
        <motion.div 
            className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center overflow-hidden w-screen h-screen"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 1 } }}
        >
            <video 
                autoPlay 
                loop 
                muted 
                playsInline 
                className="absolute inset-0 w-full h-full object-fill opacity-50"
            >
                <source src="/assets/videos/video.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

            <div className="relative z-10 text-center space-y-8">
                <motion.div 
                    initial={{ y: -500, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ type: "spring", bounce: 0.5 }}
                >
                    <h1 className="text-5xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-yellow-300 to-yellow-600 drop-shadow-[5px_5px_0px_rgba(0,0,0,1)] tracking-tighter uppercase font-[Press_Start_2P]" style={{ textShadow: '6px 6px 0px #000, -2px -2px 0px #b91c1c' }}>
                        IRON LEAGE
                    </h1>
                    <p className="text-white text-lg md:text-2xl font-bold uppercase tracking-[0.5em] mt-4 drop-shadow-md pb-4">Super Edition</p>
                </motion.div>

                <motion.button
                    onClick={onStart}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="group relative inline-flex items-center gap-4 bg-red-600 hover:bg-red-500 text-white px-8 py-4 md:px-12 md:py-6 rounded-none border-4 border-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all"
                >
                    <Play className="fill-white" size={32} />
                    <span className="text-xl md:text-3xl font-bold uppercase blinking-text">Press Start</span>
                </motion.button>
                
                <div className="text-white/60 text-xs uppercase mt-8 font-mono">
                    © 2024 Iron Leage Corp. • Insert Coin to Play
                </div>
            </div>
        </motion.div>
    );
};

export default WelcomeScreen;
