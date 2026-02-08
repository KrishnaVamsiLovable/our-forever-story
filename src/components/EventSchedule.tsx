import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Heart, PartyPopper, MapPin, Calendar, ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
const events = [{
  title: "Wedding Ceremony",
  date: "Sunday, 29th March, 2026",
  time: "9:01 PM",
  venue: "Sai Priya Beach Resort",
  address: "Rushikonda, Visakhapatnam, Andhra Pradesh 530045",
  mapLink: "https://maps.app.goo.gl/AXTvtCnd8STL2zgz8",
  icon: Heart
}, {
  title: "Reception",
  date: "Wednesday, 1st April, 2026",
  time: "7:30 PM",
  venue: "Swarna Bharathi Kalyana Mandapam",
  address: "Ramachandra Nagar Colony, Moti Nagar, Khammam, Telangana 507003",
  mapLink: "https://maps.app.goo.gl/TJZhYXPDCxwYsFVp9",
  icon: PartyPopper
}];
const EventCard = ({
  event,
  index
}: {
  event: (typeof events)[0];
  index: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "-50px"
  });
  const Icon = event.icon;
  return <motion.div ref={ref} initial={{
    opacity: 0,
    y: 30
  }} animate={isInView ? {
    opacity: 1,
    y: 0
  } : {}} transition={{
    duration: 0.6,
    delay: index * 0.2
  }}>
      <Card className="overflow-hidden border-sage-light/30 bg-gradient-to-br from-background to-sage-light/10 shadow-soft hover:shadow-lg transition-shadow duration-300">
        <CardContent className="p-8">
          <div className="gap-4 mb-6 flex items-center justify-start">
            <div className="w-14 h-14 rounded-full bg-sage-light flex items-center justify-center shrink-0">
              <Icon className="w-7 h-7 text-sage" />
            </div>
            <div>
              <h3 className="font-serif text-2xl md:text-3xl">{event.title}</h3>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3 text-foreground">
              <Calendar className="w-5 h-5 text-gold" />
              <span className="text-lg">
                {event.date} | <span className="font-medium">{event.time}</span>
              </span>
            </div>

            <div className="flex items-start gap-3 text-muted-foreground">
              <MapPin className="w-5 h-5 text-gold shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-foreground">{event.venue}</p>
                <p className="text-sm">{event.address}</p>
              </div>
            </div>

            <a href={event.mapLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sage hover:text-sage/80 transition-colors mt-2 font-medium">
              <ExternalLink className="w-4 h-4" />
              View on Google Maps
            </a>
          </div>
        </CardContent>
      </Card>
    </motion.div>;
};
const EventSchedule = () => {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, {
    once: true,
    margin: "-100px"
  });
  return <section className="py-20 md:py-28 px-6">
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
          Save the Date
        </span>

        <h2 className="font-serif text-4xl md:text-5xl font-medium mt-4 mb-6">Events</h2>

        <div className="w-16 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto" />
      </motion.div>

      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6 md:gap-8">
        {events.map((event, index) => <EventCard key={event.title} event={event} index={index} />)}
      </div>
    </section>;
};
export default EventSchedule;