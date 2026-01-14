import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
const OurStory = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "-100px"
  });
  return <section className="py-24 md:py-32 px-6 bg-champagne/50">
      <motion.div ref={ref} className="max-w-3xl mx-auto text-center" initial={{
      opacity: 0,
      y: 50
    }} animate={isInView ? {
      opacity: 1,
      y: 0
    } : {}} transition={{
      duration: 0.8
    }}>
        <span className="font-script text-xl text-sage tracking-wide">
          Our Story
        </span>
        
        <h2 className="font-serif text-4xl md:text-5xl font-medium mt-4 mb-8">Becoming One</h2>
        
        <div className="w-16 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-10" />
        
        <div className="space-y-6 text-muted-foreground leading-relaxed text-lg">
          <p>
            It all began on a rainy afternoon in a small bookshop downtown. Emma was reaching for her 
            favorite poetry collection when James accidentally bumped into her, sending books 
            tumbling everywhere. What started with apologies and laughter turned into coffee, 
            then dinner, and before we knew it—a lifetime of adventures together.
          </p>
          
          <p>
            Three years, countless sunsets, and one perfect proposal later, we're ready to begin 
            the greatest chapter of our story. We've traveled through mountains and across oceans, 
            but the journey that matters most is the one we take together, hand in hand.
          </p>
          
          <p className="font-script text-2xl text-sage pt-4">
            And now, we invite you to celebrate this beautiful beginning with us.
          </p>
        </div>
      </motion.div>
    </section>;
};
export default OurStory;