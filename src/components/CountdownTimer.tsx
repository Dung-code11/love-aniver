import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Calendar, Heart } from "lucide-react";

export function CountdownTimer() {
  // Ngày kỷ niệm - bạn có thể thay đổi ngày này
  const anniversaryDate = new Date("2025-10-17T00:00:00");
  const [timeElapsed, setTimeElapsed] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date();
      const diff = now.getTime() - anniversaryDate.getTime();
      
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeElapsed({ days, hours, minutes, seconds });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  const timeUnits = [
    { label: "Ngày", value: timeElapsed.days },
    { label: "Giờ", value: timeElapsed.hours },
    { label: "Phút", value: timeElapsed.minutes },
    { label: "Giây", value: timeElapsed.seconds },
  ];

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <Calendar className="w-8 h-8 text-rose-500" />
            <h2 className="text-rose-600">Chúng Ta Đã Bên Nhau</h2>
          </div>
          <p className="text-gray-600">
            Kể từ ngày {anniversaryDate.toLocaleDateString('vi-VN')}
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {timeUnits.map((unit, index) => (
            <motion.div
              key={unit.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border-2 border-rose-100 hover:border-rose-300 transition-colors">
                <div className="text-4xl md:text-5xl text-rose-600 mb-2">
                  {unit.value.toString().padStart(2, '0')}
                </div>
                <div className="text-gray-600">{unit.label}</div>
                {index === 0 && (
                  <Heart className="absolute -top-3 -right-3 w-6 h-6 fill-red-500 text-red-500" />
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
