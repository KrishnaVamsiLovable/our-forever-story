import { motion } from "framer-motion";
import { Heart } from "lucide-react";
const Footer = () => {
  return <footer className="relative py-16 px-6 bg-cover bg-center bg-no-repeat bg-champagne/30 text-center" style={{ backgroundImage: "url('/decorative-bg.png')" }}>
      <div
        className="absolute inset-x-0 top-0 h-32 md:h-48 bg-no-repeat bg-[length:100%_auto] bg-top pointer-events-none z-[1]"
        style={{ backgroundImage: "url('/border-bottom.png')" }}
      />
      <motion.div className="relative z-10" initial={{
      opacity: 0
    }} whileInView={{
      opacity: 1
    }} viewport={{
      once: true
    }} transition={{
      duration: 0.8
    }}>
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-gold" />
          <Heart className="w-5 h-5 text-rose fill-rose/30" />
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-gold" />
        </div>
        
        <p className="font-script text-2xl text-foreground mb-2">Leela & Krishna</p>
        
        <p className="text-muted-foreground text-sm tracking-wide">
          March 29, 2026
        </p>
        
        <p className="text-muted-foreground/60 text-xs mt-8">
          With love and excitement, we can't wait to celebrate with you
        </p>
      </motion.div>
    </footer>;
};
export default Footer;