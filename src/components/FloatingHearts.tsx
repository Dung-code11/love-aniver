// components/FloatingHearts.tsx
import { motion } from "motion/react";
import { Heart } from "lucide-react";
import { useState, useEffect } from "react";

interface FloatingHeartsProps {
  onHeartClick: () => void;
}

export function FloatingHearts({ onHeartClick }: FloatingHeartsProps) {
  const [clickedHearts, setClickedHearts] = useState<Set<number>>(new Set());
  const [showInstruction, setShowInstruction] = useState(true);
  
  const hearts = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    delay: Math.random() * 5,
    duration: 10 + Math.random() * 10,
    size: 24 + Math.random() * 24,
  }));

  useEffect(() => {
    console.log('FloatingHearts mounted');
  }, []);

  const handleHeartClick = (heartId: number, event: React.MouseEvent) => {
    event.stopPropagation();
    console.log('🎯 Heart clicked! ID:', heartId);
    
    if (clickedHearts.size === 0) {
      console.log('🚀 First heart click - starting experience');
      setShowInstruction(false);
      onHeartClick();
    }
    
    setClickedHearts(prev => new Set(prev).add(heartId));
    
    setTimeout(() => {
      setClickedHearts(prev => {
        const newSet = new Set(prev);
        newSet.delete(heartId);
        return newSet;
      });
    }, 2000);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    console.log('Backdrop clicked');
    handleHeartClick(999, e);
  };

  return (
    <>
      {/* Floating hearts - nằm dưới overlay */}
      <div className="fixed inset-0 overflow-hidden z-30 pointer-events-none">
        {hearts.map((heart) => (
          <motion.div
            key={heart.id}
            className="absolute"
            style={{
              left: heart.left,
              bottom: "-50px",
            }}
            animate={{
              y: [0, -window.innerHeight - 100],
              x: [0, Math.sin(heart.id) * 50],
              rotate: [0, 180],
              opacity: clickedHearts.has(heart.id) ? [1, 0] : [0, 0.6, 0.6, 0],
              scale: clickedHearts.has(heart.id) ? [1, 1.5, 0] : 1,
            }}
            transition={{
              duration: clickedHearts.has(heart.id) ? 1 : heart.duration,
              delay: clickedHearts.has(heart.id) ? 0 : heart.delay,
              repeat: clickedHearts.has(heart.id) ? 0 : Infinity,
              ease: "easeOut",
            }}
          >
            <Heart
              className={`${
                clickedHearts.has(heart.id) 
                  ? "fill-red-500 text-red-500" 
                  : "fill-pink-400 text-pink-500 opacity-80"
              } transition-all duration-300 filter drop-shadow-lg`}
              style={{ 
                width: heart.size, 
                height: heart.size,
              }}
            />
          </motion.div>
        ))}
      </div>

      {/* Overlay hướng dẫn - nằm trên cùng với pointer-events-auto */}
      {showInstruction && (
        <div className="fixed inset-0 z-50 pointer-events-auto">
          {/* Backdrop có thể click - chiếm toàn bộ màn hình */}
          <div 
            className="absolute inset-0 bg-amber-50/80 backdrop-blur-sm"
            onClick={handleBackdropClick}
          />
          
          {/* Popup content */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div 
              className="bg-gradient-to-br from-rose-600 to-pink-700 rounded-3xl p-8 shadow-2xl max-w-md mx-4 text-center border-4 border-rose-400/50"
              initial={{ scale: 0.7, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              transition={{ delay: 1, type: "spring", stiffness: 100 }}
              onClick={(e) => e.stopPropagation()}
            >
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Heart className="w-20 h-20 fill-rose-200 text-rose-200 mx-auto mb-4 drop-shadow-lg" />
              </motion.div>
              
              <h2 className="text-3xl font-bold text-rose-100 mb-4 drop-shadow-md">
                Gửi Em Yêu! 💖
              </h2>
              
              <div className="bg-rose-500/30 rounded-2xl p-4 mb-6 backdrop-blur-sm border border-rose-400/30">
                <p className="text-lg text-rose-50 leading-relaxed font-medium">
                  "Mỗi khoảnh khắc bên em<br />
                  là trang sách đẹp nhất đời anh..."
                </p>
              </div>

              <p className="text-rose-100/90 mb-6 text-base leading-relaxed">
                Hãy ấn vào khám phá ngay<br />
                để mở ra câu chuyện của chúng ta
              </p>
              
              <motion.div
                className="flex justify-center items-center space-x-2 mb-6"
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="w-3 h-3 bg-rose-200 rounded-full"></div>
                <div className="w-3 h-3 bg-rose-200 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-3 h-3 bg-rose-200 rounded-full" style={{ animationDelay: '0.4s' }}></div>
              </motion.div>
              
              <motion.button
                className="bg-gradient-to-r from-amber-400 to-orange-400 text-rose-900 px-8 py-4 rounded-full font-bold text-lg hover:from-amber-300 hover:to-orange-300 transition-all duration-300 mb-3 shadow-lg w-full max-w-xs mx-auto border-2 border-amber-300/50"
                onClick={(e) => {
                  e.stopPropagation();
                  handleHeartClick(999, e);
                }}
                whileHover={{ 
                  scale: 1,
                  boxShadow: "0 10px 25px rgba(245, 158, 11, 0.4)"
                }}
                whileTap={{ scale: 0.95 }}
              >
                💕 Bắt Đầu Ngay 💕
              </motion.button>
            </motion.div>
          </div>
        </div>
      )}
    </>
  );
}