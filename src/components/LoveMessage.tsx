import { motion } from "motion/react";
import { Heart, Quote } from "lucide-react";

export function LoveMessage() {
  const messages = [
    "Cảm ơn em đã đến bên anh và làm cuộc đời anh trở nên ý nghĩa hơn",
    "Mỗi ngày bên em là một món quà quý giá mà anh trân trọng",
    "Anh hứa sẽ luôn ở bên em, yêu thương và che chở cho em",
  ];

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative"
        >
          {/* Decorative Hearts */}
          <div className="absolute -top-4 -left-4 md:-left-8">
            <Heart className="w-12 h-12 md:w-16 md:h-16 fill-rose-200 text-rose-300 opacity-50" />
          </div>
          <div className="absolute -bottom-4 -right-4 md:-right-8">
            <Heart className="w-10 h-10 md:w-14 md:h-14 fill-pink-200 text-pink-300 opacity-50" />
          </div>

          {/* Main Card */}
          <div className="relative bg-gradient-to-br from-rose-50 via-pink-50 to-red-50 rounded-3xl shadow-2xl p-8 md:p-12 border-2 border-rose-100">
            <div className="text-center mb-8">
              <Quote className="w-12 h-12 text-rose-300 mx-auto mb-4" />
              <h2 className="text-rose-600 mb-2">Lời Nhắn Yêu Thương</h2>
            </div>

            <div className="space-y-6">
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-3"
                >
                  <Heart className="w-5 h-5 fill-rose-500 text-rose-500 flex-shrink-0 mt-1" />
                  <p className="text-gray-700 text-lg italic">
                    {message}
                  </p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
              className="text-center mt-10 pt-8 border-t-2 border-rose-200"
            >
              <p className="text-gray-600 mb-2">Với tất cả tình yêu,</p>
              <p className="text-2xl text-rose-600">Anh của em ❤️</p>
            </motion.div>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16 text-gray-500"
        >
          <p>Made with ❤️ for you</p>
        </motion.div>
      </div>
    </section>
  );
}
