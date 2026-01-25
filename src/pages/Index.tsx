import HeroSection from "@/components/HeroSection";
import OurStory from "@/components/OurStory";
import EventSchedule from "@/components/EventSchedule";
import RSVPSection from "@/components/RSVPSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <HeroSection />
      <OurStory />
      <EventSchedule />
      <RSVPSection />
      <Footer />
    </main>
  );
};

export default Index;
