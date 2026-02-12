import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

const BackgroundMusic = () => {
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        // Auto-play attempt on mount
        const playAudio = async () => {
            try {
                if (audioRef.current) {
                    audioRef.current.volume = 0.3; // Lower volume
                    await audioRef.current.play();
                    setIsPlaying(true);
                }
            } catch (err) {
                console.log("Auto-play blocked, waiting for user interaction");
            }
        };
        playAudio();
    }, []);

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    return (
        <div className="fixed bottom-4 right-4 z-50">
            <button 
                onClick={togglePlay}
                className="bg-yellow-400 border-4 border-black p-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:scale-105 active:scale-95 transition-transform"
            >
                {isPlaying ? <Volume2 size={24} /> : <VolumeX size={24} />}
            </button>
            <audio ref={audioRef} loop src="https://ia800504.us.archive.org/33/items/SuperMarioBros.ThemeMusic/SuperMarioBros.mp3" />
        </div>
    );
};

export default BackgroundMusic;
