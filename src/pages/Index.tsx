import HeroSection from "@/components/HeroSection";
import OurStory from "@/components/OurStory";
import EventSchedule from "@/components/EventSchedule";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <HeroSection />
      <OurStory />
      <EventSchedule />
      <Footer />
    </main>
  );
};

export default Index;
