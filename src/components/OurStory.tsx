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
          <p>Our story began the way the most beautiful ones often do, unexpectedly. An impromptu trip, a spontaneous choice, a moment neither of us planned… and yet, it changed everything. At the time, we didn’t know that a single unplanned decision would quietly lead us to the love of our lives. But fate, it seems, loves surprises.</p>
          
          <p>From that moment on, life unfolded in the most magical way. What followed became the most beautiful chapter we’ve ever known, filled with endless conversations, shared laughter, quiet comforts, and dreams spoken out loud. We found ourselves wanting to be together in every moment, in every joy and every pause in between.


Somewhere along the way, we realized this was it. That partnership, love, and home all felt the same when we were together. This is how we want to walk through life, side by side.</p>
          
          <p className="font-script text-2xl text-sage pt-4">
            And now, we invite you to celebrate this beautiful beginning with us.
          </p>
        </div>
      </motion.div>
    </section>;
};
export default OurStory;