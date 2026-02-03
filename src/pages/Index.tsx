import { useCallback, useEffect, useRef, useState } from "react";
import HeroSection from "@/components/HeroSection";
import OurStory from "@/components/OurStory";
import EventSchedule from "@/components/EventSchedule";
import GuessingGame from "@/components/GuessingGame";
import RSVPSection from "@/components/RSVPSection";
import Footer from "@/components/Footer";
import IntroOverlay from "@/components/IntroOverlay";

const CONTENT_RENDER_DELAY_MS = 100;

const Index = () => {
  const [showContent, setShowContent] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  const handleFadeStart = useCallback(() => {
    timeoutRef.current = window.setTimeout(() => setShowContent(true), CONTENT_RENDER_DELAY_MS);
  }, []);

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) window.clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <IntroOverlay onFadeStart={handleFadeStart}>
      {showContent && (
        <main className="min-h-screen overflow-x-hidden bg-background">
          <HeroSection />
          <OurStory />
          <EventSchedule />
          <GuessingGame />
          <RSVPSection />
          <Footer />
        </main>
      )}
    </IntroOverlay>
  );
};

export default Index;
