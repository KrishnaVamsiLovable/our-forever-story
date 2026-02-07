import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
const OurStory = () => {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, {
    once: true,
    margin: "-100px"
  });

  const firstParagraphRef = useRef(null);
  const thirdParagraphRef = useRef(null);

  const isFirstParagraphInView = useInView(firstParagraphRef, {
    once: true,
    margin: "-50px"
  });
  const isThirdParagraphInView = useInView(thirdParagraphRef, {
    once: true,
    margin: "-50px"
  });
  return <section className="py-20 md:py-28 px-6 bg-cover bg-center bg-no-repeat bg-champagne/30" style={{ backgroundImage: "url('/decorative-bg.jpeg')" }}>
      <motion.div ref={headerRef} className="max-w-3xl mx-auto text-center" initial={{
      opacity: 0,
      y: 50
    }} animate={isHeaderInView ? {
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
        <div className="space-y-6 text-muted-foreground leading-relaxed text-base md:text-lg">
          <motion.p
            ref={firstParagraphRef}
            initial={{ opacity: 0, y: 20 }}
            animate={isFirstParagraphInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            Our story began the way the most beautiful ones often do, unexpectedly. An impromptu trip, a spontaneous choice, a moment neither of us planned, yet one that changed everything. We didn’t know then that it would lead us to the love of our lives, but fate had already begun writing our story. We found ourselves wanting to be together in every moment, and somewhere along the way, we realized this was exactly how we wanted to walk through life.
          </motion.p>
          
          <motion.p
            ref={thirdParagraphRef}
            className="font-script text-xl md:text-2xl text-sage pt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isThirdParagraphInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            And now, we invite you to celebrate this beautiful beginning with us.
          </motion.p>
        </div>
      </motion.div>
    </section>;
};
export default OurStory;