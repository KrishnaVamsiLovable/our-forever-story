import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Heart, Send } from "lucide-react";

const eventOptions = [
  { id: "wedding", label: "Wedding - March 29th, 2026" },
  { id: "reception", label: "Reception - April 1st, 2026" },
];

const RSVPSection = () => {
  const headerRef = useRef(null);
  const formRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });
  const isFormInView = useInView(formRef, { once: true, margin: "-50px" });
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    numGuests: "",
    events: [] as string[],
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      toast({
        title: "Please enter your name",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const scriptUrl = "https://script.google.com/macros/s/AKfycbziCO7B3rhvUL7SvRluCsTbuye88TMM_29yPuQsAR_wSosS-LqLLXhaHWpcAM7CXmx2-A/exec";

      const attendingWedding = formData.events.includes("wedding") ? "Yes" : "No";
      const attendingReception = formData.events.includes("reception") ? "Yes" : "No";

      const payload = {
        name: formData.name.trim(),
        guests: formData.numGuests,
        attendingWedding: attendingWedding,
        attendingReception: attendingReception,
        message: formData.message.trim(),
      };

      const formDataToSend = new URLSearchParams();
      formDataToSend.append("name", payload.name);
      formDataToSend.append("guests", payload.guests);
      formDataToSend.append("attendingWedding", payload.attendingWedding);
      formDataToSend.append("attendingReception", payload.attendingReception);
      formDataToSend.append("message", payload.message);

      await fetch(scriptUrl, {
        method: "POST",
        mode: "no-cors",
        body: formDataToSend,
      });

      await new Promise((resolve) => setTimeout(resolve, 500));

      toast({
        title: "Thank you for your RSVP!",
        description: "We can't wait to celebrate with you.",
      });

      // Reset form
      setFormData({ name: "", numGuests: "", events: [], message: "" });
    } catch (error) {
      toast({
        title: "Failed to submit RSVP",
        description: error instanceof Error ? error.message : "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEventToggle = (eventId: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      events: checked
        ? [...prev.events, eventId]
        : prev.events.filter((id) => id !== eventId),
    }));
  };

  return (
    <section className="py-20 md:py-28 px-6 bg-cover bg-center bg-no-repeat bg-sage-light/10" style={{ backgroundImage: "url('/decorative-bg.jpeg')" }}>
      <motion.div
        ref={headerRef}
        className="max-w-3xl mx-auto text-center mb-12 md:mb-16"
        initial={{ opacity: 0, y: 30 }}
        animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <span className="font-script text-xl text-sage tracking-wide">
          We hope you can make it
        </span>

        <h2 className="font-serif text-4xl md:text-5xl font-medium mt-4 mb-6">
          RSVP
        </h2>

        <div className="w-16 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-6" />

        <p className="text-muted-foreground text-lg">
          Please let us know if you'll be joining us for our special day
        </p>
      </motion.div>

      <motion.div
        ref={formRef}
        className="max-w-xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        animate={isFormInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Card className="border-sage-light/30 bg-background/80 backdrop-blur-sm shadow-soft">
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-foreground font-medium">
                  Your Name
                </Label>
                <Input
                  id="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  maxLength={100}
                  className="border-sage-light/50 focus:border-sage"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="numGuests" className="text-foreground font-medium">
                  Number of Guests
                </Label>
                <Input
                  id="numGuests"
                  type="number"
                  min="1"
                  placeholder="How many guests will be attending?"
                  value={formData.numGuests}
                  onChange={(e) =>
                    setFormData({ ...formData, numGuests: e.target.value })
                  }
                  className="border-sage-light/50 focus:border-sage"
                />
              </div>

              <div className="space-y-3">
                <Label className="text-foreground font-medium">
                  Which events will you attend?
                </Label>
                <div className="flex flex-wrap gap-3">
                  {eventOptions.map((event) => {
                    const isSelected = formData.events.includes(event.id);
                    return (
                      <button
                        key={event.id}
                        type="button"
                        onClick={() => handleEventToggle(event.id, !isSelected)}
                        className={cn(
                          "px-5 py-3 rounded-lg border-2 text-sm font-medium transition-all duration-200",
                          isSelected
                            ? "bg-sage text-white border-sage"
                            : "bg-background text-foreground border-sage-light/50 hover:border-sage/50"
                        )}
                      >
                        {event.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="text-foreground font-medium">
                  Message for the Couple
                </Label>
                <Textarea
                  id="message"
                  placeholder="Share your wishes or any dietary requirements..."
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  maxLength={500}
                  rows={4}
                  className="border-sage-light/50 focus:border-sage resize-none"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-sage hover:bg-sage/90 text-white py-6 text-lg font-medium"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <Heart className="w-5 h-5 animate-pulse" />
                    Sending...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Send className="w-5 h-5" />
                    Send RSVP
                  </span>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </section>
  );
};

export default RSVPSection;
