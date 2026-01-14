import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Wine, Music, Heart, Utensils, Sparkles } from "lucide-react";
const events = [{
  time: "3:00 PM",
  title: "Welcome Reception",
  description: "Join us for refreshments as we gather to celebrate. Light hors d'oeuvres and champagne will be served in the garden.",
  icon: Wine
}, {
  time: "4:30 PM",
  title: "The Ceremony",
  description: "Under the ancient oak tree, we will exchange our vows and begin our forever. Please be seated by 4:15 PM.",
  icon: Heart
}, {
  time: "5:30 PM",
  title: "Cocktail Hour",
  description: "Enjoy signature cocktails and live jazz while we steal away for photos. Explore the beautiful estate grounds.",
  icon: Sparkles
}, {
  time: "7:00 PM",
  title: "Dinner",
  description: "A farm-to-table feast celebrating the bounty of Napa Valley. Vegetarian and dietary options available.",
  icon: Utensils
}, {
  time: "9:00 PM",
  title: "Dancing Under the Stars",
  description: "The night is young and the dance floor awaits. Let's celebrate until the stars guide us home.",
  icon: Music
}];
const EventCard = ({
  event,
  index
}: {
  event: typeof events[0];
  index: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "-50px"
  });
  const Icon = event.icon;
  return <motion.div ref={ref} className="relative flex gap-6 md:gap-8" initial={{
    opacity: 0,
    x: index % 2 === 0 ? -30 : 30
  }} animate={isInView ? {
    opacity: 1,
    x: 0
  } : {}} transition={{
    duration: 0.6,
    delay: index * 0.1
  }}>
      {/* Timeline line */}
      <div className="hidden md:flex flex-col items-center">
        <div className="w-12 h-12 rounded-full bg-sage-light flex items-center justify-center shadow-soft">
          <Icon className="w-5 h-5 text-sage" />
        </div>
        {index < events.length - 1 && <div className="w-px h-full bg-gradient-to-b from-sage-light to-transparent mt-4" />}
      </div>

      {/* Mobile icon */}
      <div className="md:hidden w-10 h-10 rounded-full bg-sage-light flex items-center justify-center shadow-soft shrink-0">
        <Icon className="w-4 h-4 text-sage" />
      </div>

      {/* Content */}
      <div className="flex-1 pb-12 md:pb-16">
        <span className="text-gold font-medium text-sm tracking-wide">
          {event.time}
        </span>
        <h3 className="font-serif text-2xl md:text-3xl mt-1 mb-3">
          {event.title}
        </h3>
        <p className="text-muted-foreground leading-relaxed">
          {event.description}
        </p>
      </div>
    </motion.div>;
};
const EventSchedule = () => {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, {
    once: true,
    margin: "-100px"
  });
  return <section className="py-24 md:py-32 px-6">
      <motion.div ref={headerRef} className="max-w-3xl mx-auto text-center mb-16 md:mb-20" initial={{
      opacity: 0,
      y: 30
    }} animate={isHeaderInView ? {
      opacity: 1,
      y: 0
    } : {}} transition={{
      duration: 0.8
    }}>
        <span className="font-script text-xl text-sage tracking-wide">
          The Celebration
        </span>
        
        <h2 className="font-serif text-4xl md:text-5xl font-medium mt-4 mb-6">
          Schedule of Events
        </h2>
        
        <div className="w-16 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-6" />
        
        <p className="text-muted-foreground text-lg">March 29, 2026 • Sai Priya Beach Resort</p>
      </motion.div>

      <div className="max-w-2xl mx-auto">
        {events.map((event, index) => <EventCard key={event.title} event={event} index={index} />)}
      </div>
    </section>;
};
export default EventSchedule;