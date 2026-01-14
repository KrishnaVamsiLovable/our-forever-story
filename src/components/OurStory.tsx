import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const OurStory = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 md:py-32 px-6 bg-champagne/50">
      <motion.div
        ref={ref}
        className="max-w-3xl mx-auto text-center"
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <span className="font-script text-xl text-sage tracking-wide">
          Our Story
        </span>
        
        <h2 className="font-serif text-4xl md:text-5xl font-medium mt-4 mb-8">
          Two Hearts, One Journey
        </h2>
        
        <div className="w-16 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-10" />
        
        <div className="space-y-6 text-muted-foreground leading-relaxed text-lg">
          <p>
            Our story began with something beautifully unplanned—an impromptu trip that neither of us 
            expected. We didn't know then that one single, spontaneous decision would lead us 
            to the love of our lives. But fate has a way of writing the most extraordinary chapters 
            when we least expect it.
          </p>
          
          <p>
            What happened since that moment has been nothing short of the most beautiful part of 
            our lives. We became inseparable—wanting to spend every moment together, eager to 
            share every experience, every laugh, every dream. We are partners in everything, 
            and somewhere along the way, we realized this is exactly how we want to live 
            the rest of our lives.
          </p>
          
          <p className="font-script text-2xl text-sage pt-4">
            Together, always. And now, we invite you to celebrate this beautiful forever with us.
          </p>
        </div>
      </motion.div>
    </section>
  );
};

export default OurStory;
