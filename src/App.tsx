// App.tsx
import { Hero } from "./components/Hero";
import { CountdownTimer } from "./components/CountdownTimer";
import { PhotoGallery } from "./components/PhotoGallery";
import { Timeline } from "./components/Timeline";
import { LoveMessage } from "./components/LoveMessage";
import { FloatingHearts } from "./components/FloatingHearts";
import { MusicPlayer, MusicPlayerHandle } from "./components/MusicPlayer";
import { useState, useRef, useEffect } from "react";

export default function App() {
  const [isStarted, setIsStarted] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const mainContentRef = useRef<HTMLDivElement>(null);
  const musicPlayerRef = useRef<MusicPlayerHandle>(null);

  const handleHeartClick = () => {
    console.log('🎉 APP: Heart clicked - starting experience!');
    
    if (!isStarted) {
      setIsStarted(true);
      
      // Hiển thị nội dung
      setTimeout(() => {
        setShowContent(true);
      }, 500);
      
      // Phát nhạc
      setTimeout(() => {
        console.log('🎵 APP: Attempting to play music...');
        musicPlayerRef.current?.play();
      }, 1000);
      
      // Cuộn xuống nội dung
      setTimeout(() => {
        mainContentRef.current?.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }, 1500);
    }
  };

  useEffect(() => {
    console.log('📱 APP State - isStarted:', isStarted, 'showContent:', showContent);
  }, [isStarted, showContent]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-red-50 relative">
      {/* FloatingHearts với overlay */}
      <FloatingHearts onHeartClick={handleHeartClick} />
      
      {/* Nội dung chính */}
      <div 
        ref={mainContentRef}
        className={`relative z-10 transition-all duration-1000 ${
          showContent 
            ? 'opacity-100 translate-y-0 pointer-events-auto' 
            : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
        style={{ 
          display: showContent ? 'block' : 'none'
        }}
      >
        <MusicPlayer ref={musicPlayerRef} />
        <Hero />
        <CountdownTimer />
        <PhotoGallery />
        <Timeline />
        <LoveMessage />
      </div>
    </div>
  );
}