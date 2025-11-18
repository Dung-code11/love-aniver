import { motion } from "motion/react";
import { MapPin, Heart, Star, Gift } from "lucide-react";

export function Timeline() {
  const milestones = [
    {
      date: "12/10/2024",
      title: "Ngày đầu tiên gặp nhau",
      description: "Khoảnh khắc định mệnh khi hai ta gặp gỡ",
      icon: Heart,
      color: "rose",
    },
    {
      date: "25/1/2024",
      title: "Kỷ niệm 100 ngày",
      description: "Một dấu mốc đáng nhớ trong hành trình của chúng ta",
      icon: Star,
      color: "red",
    },
    {
      date: "28/06/2025",
      title: "Chuyến đi đầu tiên",
      description: "Cùng nhau khám phá những nơi mới",
      icon: MapPin,
      color: "pink",
    },
    {
      date: "17/10/2025",
      title: "Kỷ niệm 1 năm",
      description: "Một năm yêu thương và gắn bó",
      icon: Gift,
      color: "rose",
    },
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      rose: "bg-rose-100 text-rose-600 border-rose-300",
      pink: "bg-pink-100 text-pink-600 border-pink-300",
      red: "bg-red-100 text-red-600 border-red-300",
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-rose-50 to-pink-50">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="mb-4 text-rose-600">Hành Trình Của Chúng Ta</h2>
          <p className="text-gray-600">
            Những mốc thời gian đáng nhớ
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-rose-300 via-pink-300 to-red-300"></div>

          {milestones.map((milestone, index) => {
            const Icon = milestone.icon;
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className={`relative flex items-center mb-12 ${
                  isEven ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Content */}
                <div className={`w-full md:w-5/12 ${isEven ? "md:pr-12" : "md:pl-12"} pl-20 md:pl-0`}>
                  <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow border-2 border-rose-100">
                    <div className="text-rose-500 mb-2">{milestone.date}</div>
                    <h3 className="mb-2 text-gray-800">{milestone.title}</h3>
                    <p className="text-gray-600 text-sm">{milestone.description}</p>
                  </div>
                </div>

                {/* Icon */}
                <div className="absolute left-4 md:left-1/2 md:transform md:-translate-x-1/2">
                  <div className={`w-16 h-16 rounded-full border-4 ${getColorClasses(milestone.color)} flex items-center justify-center shadow-lg`}>
                    <Icon className="w-7 h-7" />
                  </div>
                </div>

                {/* Spacer for alternating layout on desktop */}
                <div className="hidden md:block w-5/12"></div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
