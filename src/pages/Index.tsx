import HeroSection from "@/components/HeroSection";
import OurStory from "@/components/OurStory";
import EventSchedule from "@/components/EventSchedule";
import GuessingGame from "@/components/GuessingGame";
import RSVPSection from "@/components/RSVPSection";
import Footer from "@/components/Footer";
import IntroOverlay from "@/components/IntroOverlay";

const Index = () => {
  return (
    <IntroOverlay>
      <main className="min-h-screen bg-background">
        <HeroSection />
        <OurStory />
        <EventSchedule />
        <GuessingGame />
        <RSVPSection />
        <Footer />
      </main>
    </IntroOverlay>
  );
};

export default Index;
