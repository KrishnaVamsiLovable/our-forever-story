import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Heart, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const questions = [
  {
    question: "Who said 'I love you' first?",
    options: ["Leela", "Krishna"],
    answer: "Krishna",
    funReveal: "Krishna couldn't hold it in any longer! 💕"
  },
  {
    question: "Who is the better cook?",
    options: ["Leela", "Krishna"],
    answer: "Leela",
    funReveal: "Leela rules the kitchen! 👨‍🍳"
  },
  {
    question: "Who takes longer to get ready?",
    options: ["Leela", "Krishna"],
    answer: "Leela",
    funReveal: "But the wait is always worth it! ✨"
  },
  {
    question: "Who is more likely to cry at the wedding?",
    options: ["Leela", "Krishna", "Both"],
    answer: "Both",
    funReveal: "Tissues ready for everyone! 😭💕"
  },
  {
    question: "Who planned the first date?",
    options: ["Leela", "Krishna"],
    answer: "Krishna",
    funReveal: "Krishna had it all figured out! 🌹"
  }
];

interface QuestionCardProps {
  question: typeof questions[0];
  index: number;
}

const QuestionCard = ({ question, index }: QuestionCardProps) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const handleGuess = (option: string) => {
    setSelectedAnswer(option);
    setRevealed(true);
  };

  const isCorrect = selectedAnswer === question.answer;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <Card className="overflow-hidden border-rose-soft/50 bg-gradient-to-br from-background to-rose-soft/20 shadow-soft hover:shadow-romantic transition-shadow duration-300">
        <CardContent className="p-6 md:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-rose-soft flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5 text-rose" />
            </div>
            <h3 className="font-serif text-xl md:text-2xl">{question.question}</h3>
          </div>

          <AnimatePresence mode="wait">
            {!revealed ? (
              <motion.div
                key="options"
                className="flex flex-wrap gap-3"
                exit={{ opacity: 0, scale: 0.95 }}
              >
                {question.options.map((option) => (
                  <Button
                    key={option}
                    variant="outline"
                    className="px-6 py-2 border-sage/30 hover:bg-sage-light hover:border-sage transition-all duration-300"
                    onClick={() => handleGuess(option)}
                  >
                    {option}
                  </Button>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="reveal"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, type: "spring", bounce: 0.4 }}
                className="space-y-4"
              >
                <div className={`flex items-center gap-3 p-4 rounded-lg ${
                  isCorrect 
                    ? "bg-sage-light/50 border border-sage/30" 
                    : "bg-rose-soft/50 border border-rose/30"
                }`}>
                  <motion.div
                    initial={{ rotate: -180, scale: 0 }}
                    animate={{ rotate: 0, scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", bounce: 0.5 }}
                  >
                    <Heart className={`w-6 h-6 ${isCorrect ? "text-sage fill-sage" : "text-rose fill-rose"}`} />
                  </motion.div>
                  <div>
                    <p className="font-medium">
                      {isCorrect ? "You got it! 🎉" : `Oops! It's ${question.answer}`}
                    </p>
                    <p className="text-muted-foreground font-script text-lg italic">
                      {question.funReveal}
                    </p>
                  </div>
                </div>
                
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground hover:text-foreground"
                  onClick={() => {
                    setSelectedAnswer(null);
                    setRevealed(false);
                  }}
                >
                  Try again
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const GuessingGame = () => {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });

  return (
    <section className="py-24 md:py-32 px-6 bg-champagne/30">
      <motion.div
        ref={headerRef}
        className="max-w-3xl mx-auto text-center mb-16 md:mb-20"
        initial={{ opacity: 0, y: 30 }}
        animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <span className="font-script text-xl text-sage tracking-wide">
          How Well Do You Know Us?
        </span>

        <h2 className="font-serif text-4xl md:text-5xl font-medium mt-4 mb-6">
          Guessing Game
        </h2>

        <div className="w-16 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-6" />

        <p className="text-muted-foreground text-lg">
          Test your knowledge about us! Tap to reveal the answers.
        </p>
      </motion.div>

      <div className="max-w-2xl mx-auto space-y-6">
        {questions.map((question, index) => (
          <QuestionCard key={question.question} question={question} index={index} />
        ))}
      </div>
    </section>
  );
};

export default GuessingGame;
