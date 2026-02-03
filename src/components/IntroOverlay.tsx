import { useEffect, useRef, useState } from "react";
import envelopeAnimation from "@/assets/envelope-animation.mp4";
// Static poster image shown before the video starts playing.
// Add this file under `src/assets` (for example, a screenshot of the first frame).
import envelopePoster from "@/assets/envelope-poster.jpg";

interface IntroOverlayProps {
  children: React.ReactNode;
  /** Called when the overlay starts fading out so content can mount and run entrance animations. */
  onFadeStart?: () => void;
}

const INTRO_AUTO_PLAY_DELAY_MS = 10000;
const INTRO_FADE_OUT_DELAY_MS = 3500;
const INTRO_FADE_DURATION_MS = 2500;

const IntroOverlay = ({ children, onFadeStart }: IntroOverlayProps) => {
  const [hasStarted, setHasStarted] = useState(false);
  const [showIntroText, setShowIntroText] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const autoPlayTimeoutRef = useRef<number | null>(null);
  const fadeOutTimeoutRef = useRef<number | null>(null);
  const hideTimeoutRef = useRef<number | null>(null);
  const textFadeTimeoutRef = useRef<number | null>(null);

  // Kick off autoplay if there is no interaction within 5 seconds.
  useEffect(() => {
    if (hasStarted || !isVisible) return;

    autoPlayTimeoutRef.current = window.setTimeout(() => {
      startPlayback(false);
    }, INTRO_AUTO_PLAY_DELAY_MS);

    return () => {
      if (autoPlayTimeoutRef.current !== null) {
        window.clearTimeout(autoPlayTimeoutRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasStarted, isVisible]);

  const startFadeOutSequence = () => {
    if (isFadingOut || !isVisible) return;

    fadeOutTimeoutRef.current = window.setTimeout(() => {
      setIsFadingOut(true);
      onFadeStart?.();

      hideTimeoutRef.current = window.setTimeout(() => {
        setIsVisible(false);
      }, INTRO_FADE_DURATION_MS);
    }, INTRO_FADE_OUT_DELAY_MS);
  };

  const clearAllTimers = () => {
    if (autoPlayTimeoutRef.current !== null) {
      window.clearTimeout(autoPlayTimeoutRef.current);
      autoPlayTimeoutRef.current = null;
    }
    if (fadeOutTimeoutRef.current !== null) {
      window.clearTimeout(fadeOutTimeoutRef.current);
      fadeOutTimeoutRef.current = null;
    }
    if (hideTimeoutRef.current !== null) {
      window.clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }
    if (textFadeTimeoutRef.current !== null) {
      window.clearTimeout(textFadeTimeoutRef.current);
      textFadeTimeoutRef.current = null;
    }
  };

  const startPlayback = (fromTap: boolean) => {
    if (hasStarted || !isVisible) return;

    clearAllTimers();
    setHasStarted(true);

    const video = videoRef.current;
    if (video) {
      // We keep the video muted so that autoplay works reliably across devices.
      video.muted = true;
      video
        .play()
        .then(() => {
          // Fade the intro text out 1 second after playback starts.
          textFadeTimeoutRef.current = window.setTimeout(() => {
            setShowIntroText(false);
          }, 2500);
        })
        .catch(() => {
          // If playback fails (e.g. autoplay restriction), we simply leave the overlay as-is.
          setHasStarted(false);
        });
    }

    startFadeOutSequence();
  };

  // Prevent page scrolling while the intro overlay is visible.
  useEffect(() => {
    if (isVisible) {
      const previousOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";

      return () => {
        document.body.style.overflow = previousOverflow;
      };
    }

    return undefined;
  }, [isVisible]);

  // Clean up all timers on unmount.
  useEffect(() => {
    return () => {
      clearAllTimers();
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-background">
      {children}

      {isVisible && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center bg-white transition-opacity duration-3000 ${
            isFadingOut ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
          style={{ transitionDuration: `${INTRO_FADE_DURATION_MS}ms`, backgroundColor: "#FCFCFC" }}
          onClick={() => startPlayback(true)}
        >
          <div
            className="relative flex w-full max-w-sm items-center justify-center px-6"
            style={{ aspectRatio: "9 / 16", maxHeight: "80vh" }}
          >
            <video
              ref={videoRef}
              src={envelopeAnimation}
              poster={envelopePoster}
              preload="auto"
              className="h-full w-full object-contain"
              playsInline
              muted
              controls={false}
            />

            <div
              className={`pointer-events-none absolute inset-x-0 top-16 px-8 text-center font-script text-xl font-normal tracking-[0.12em] transition-opacity sm:top-10 sm:px-10 sm:text-2xl ${
                showIntroText ? "opacity-100" : "opacity-0"
              }`}
              style={{
                color: "hsl(var(--sage))",
                transition: "opacity 2000ms ease-out",
                textShadow: "0 1px 2px hsl(var(--foreground) / 0.06)",
              }}
            >
              A new chapter begins...
            </div>

            <div
              className={`pointer-events-none absolute inset-x-0 bottom-6 text-center text-xs font-normal uppercase tracking-[0.1em] text-muted-foreground drop-shadow-sm transition-opacity ${
                showIntroText ? "opacity-100" : "opacity-0"
              }`}
              style={{
                transition: "opacity 2000ms ease-out",
              }}
            >
              Tap to open
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IntroOverlay;

