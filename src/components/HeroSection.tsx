import { motion } from "framer-motion";
import HeroBackground from "./HeroBackground";
import { Heart } from "lucide-react";
const HeroSection = () => {
  return <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <HeroBackground />
      
      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div initial={{
        opacity: 0,
        y: 30
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 1,
        delay: 0.3
      }}>
          <span className="font-script text-xl md:text-2xl text-muted-foreground tracking-wide">
            We're getting married
          </span>
        </motion.div>
        
        <motion.h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-medium mt-4 mb-6 tracking-tight" initial={{
        opacity: 0,
        y: 30
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 1,
        delay: 0.5
      }}>
          <span className="text-foreground">Leela</span>
          <motion.span className="inline-block mx-4 md:mx-6" initial={{
          scale: 0
        }} animate={{
          scale: 1
        }} transition={{
          duration: 0.6,
          delay: 1.2,
          type: "spring"
        }}>
            <Heart className="inline w-8 h-8 md:w-12 md:h-12 text-rose fill-rose/30" />
          </motion.span>
          <span className="text-foreground">Krishna</span>
        </motion.h1>
        
        <motion.div className="w-24 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-8" initial={{
        scaleX: 0
      }} animate={{
        scaleX: 1
      }} transition={{
        duration: 1,
        delay: 0.8
      }} />
        
        <motion.p className="font-script text-2xl md:text-3xl text-sage mb-4" initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} transition={{
        duration: 1,
        delay: 1
      }}>March 29, 2026</motion.p>
        
        <motion.p className="text-muted-foreground text-lg tracking-wide" initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} transition={{
        duration: 1,
        delay: 1.2
      }}>Sai Priya Beach Resort • Rushikonda, Vizag</motion.p>
      </div>
      
      {/* Scroll indicator */}
      <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2" initial={{
      opacity: 0
    }} animate={{
      opacity: 1
    }} transition={{
      delay: 2
    }}>
        <motion.div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-2" animate={{
        y: [0, 8, 0]
      }} transition={{
        duration: 1.5,
        repeat: Infinity
      }}>
          <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50" />
        </motion.div>
      </motion.div>
    </section>;
};
export default HeroSection;