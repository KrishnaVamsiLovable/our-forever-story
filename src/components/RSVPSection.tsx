import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Heart, Send } from "lucide-react";

const eventOptions = [
  { id: "wedding", label: "Wedding Ceremony - March 29th, 2026" },
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

    if (!formData.numGuests || parseInt(formData.numGuests) < 1) {
      toast({
        title: "Please enter number of guests",
        variant: "destructive",
      });
      return;
    }

    if (formData.events.length === 0) {
      toast({
        title: "Please select at least one event",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast({
      title: "Thank you for your RSVP!",
      description: "We can't wait to celebrate with you.",
    });

    setFormData({ name: "", numGuests: "", events: [], message: "" });
    setIsSubmitting(false);
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
    <section className="py-24 md:py-32 px-6 bg-sage-light/20">
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
                  max="10"
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
                <div className="space-y-3">
                  {eventOptions.map((event) => (
                    <div key={event.id} className="flex items-center space-x-3">
                      <Checkbox
                        id={event.id}
                        checked={formData.events.includes(event.id)}
                        onCheckedChange={(checked) =>
                          handleEventToggle(event.id, checked as boolean)
                        }
                        className="border-sage-light/50 data-[state=checked]:bg-sage data-[state=checked]:border-sage"
                      />
                      <Label
                        htmlFor={event.id}
                        className="text-foreground font-normal cursor-pointer"
                      >
                        {event.label}
                      </Label>
                    </div>
                  ))}
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
