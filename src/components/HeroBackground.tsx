import { motion } from "framer-motion";
import couple1 from "@/assets/couple-1.jpg";
import couple2 from "@/assets/couple-2.jpg";
import couple3 from "@/assets/couple-3.jpg";

const images = [couple1, couple2, couple3];

const HeroBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Animated blurred images */}
      {images.map((image, index) => (
        <motion.div
          key={index}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: [0, 0.6, 0.6, 0],
            scale: [1.1, 1.15, 1.2, 1.1],
          }}
          transition={{
            duration: 12,
            delay: index * 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <img
            src={image}
            alt=""
            className="h-full w-full object-cover blur-sm"
          />
        </motion.div>
      ))}
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-hero-overlay" />
      
      {/* Soft romantic gradient */}
      <div className="absolute inset-0 bg-romantic opacity-30" />
    </div>
  );
};

export default HeroBackground;
