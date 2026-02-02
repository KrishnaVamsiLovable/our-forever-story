import { motion } from "framer-motion";
import couple1 from "@/assets/couple-1.jpg";
import couple2 from "@/assets/couple-2.jpg";
import couple3 from "@/assets/couple-3.jpg";
import couple4 from "@/assets/couple-4.jpeg";
import couple5 from "@/assets/couple-5.jpeg";
import couple6 from "@/assets/couple-6.jpeg";

const images = [couple1, couple2, couple6, couple5, couple1];

const getOpacity = (index: number) => {
  switch (index) {
    case 0:
      return [0.4, 0.8, 0.8, 0, 0, 0, 0, 0, 0, 0];
    case 1:
      return [0, 0, 0, 0.8, 0.8, 0, 0, 0, 0, 0];
    case 2:
      return [0, 0, 0, 0, 0, 0.8, 0.8, 0, 0, 0];
    case 3:
      return [0, 0, 0, 0, 0, 0, 0, 0.8, 0.8, 0];
    case 4:
      return [0, 0, 0, 0, 0, 0, 0, 0, 0, 0.4];
    default:
      return [];
  }
};

const getScale = (index: number) => {
  switch (index) {
    case 0:
      return [1.1, 1.15, 1.2, 1.2, 1.1, 1.1, 1.1, 1.1, 1.1, 1.1];
    case 1:
      return [1.1, 1.1, 1.1, 1.15, 1.2, 1.2, 1.1, 1.1, 1.1, 1.1];
    case 2:
      return [1.1, 1.1, 1.1, 1.1, 1.1, 1.15, 1.2, 1.2, 1.1, 1.1];
    case 3:
      return [1.1, 1.1, 1.1, 1.1, 1.1, 1.1, 1.1, 1.15, 1.2, 1.2];
    case 4:
      return [1.1, 1.1, 1.1, 1.1, 1.1, 1.1, 1.1, 1.1, 1.1, 1.1];
    default:
      return [];
  }
};

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
            opacity: getOpacity(index),
            scale: getScale(index),
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
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
