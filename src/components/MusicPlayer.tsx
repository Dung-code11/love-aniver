// components/MusicPlayer.tsx
import { useRef, forwardRef, useImperativeHandle } from 'react';

export interface MusicPlayerHandle {
  play: () => void;
  pause: () => void;
}

export const MusicPlayer = forwardRef<MusicPlayerHandle>((props, ref) => {
  const audioRef = useRef<HTMLAudioElement>(null);

  useImperativeHandle(ref, () => ({
    play: () => {
      console.log('🔊 MusicPlayer: Play method called');
      if (audioRef.current) {
        audioRef.current.volume = 0.5;
        audioRef.current.play()
          .then(() => console.log('✅ Music started successfully!'))
          .catch(error => console.error('❌ Music error:', error));
      }
    },
    pause: () => {
      audioRef.current?.pause();
      console.log('⏸️ Music paused');
    }
  }));

  return (
    <div className="fixed bottom-4 right-4 z-40">
      <button
        onClick={() => {
          console.log('🎵 Button clicked');
          if (audioRef.current?.paused) {
            audioRef.current.play().catch(console.error);
          } else {
            audioRef.current?.pause();
          }
        }}
        className="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center text-white shadow-lg hover:bg-pink-600 transition-all transform hover:scale-105"
      >
        🎵
      </button>
      
      {/* Dùng nhạc test online để đảm bảo hoạt động */}
      <audio
        ref={audioRef}
        loop
        preload="auto"
        onPlay={() => console.log('🎶 Audio is playing')}
        onPause={() => console.log('⏸️ Audio paused')}
        onError={(e) => console.error('❌ Audio error:', e)}
      >
        <source src="/public/bg-music.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
});

MusicPlayer.displayName = 'MusicPlayer';