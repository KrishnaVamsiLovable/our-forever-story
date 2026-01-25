import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Heart, Sparkles, ChevronRight, RotateCcw } from "lucide-react";
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

const GuessingGame = () => {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [score, setScore] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);

  const currentQuestion = questions[currentIndex];
  const isCorrect = selectedAnswer === currentQuestion?.answer;

  const handleGuess = (option: string) => {
    setSelectedAnswer(option);
    setRevealed(true);
    if (option === currentQuestion.answer) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setRevealed(false);
    } else {
      setGameComplete(true);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setRevealed(false);
    setScore(0);
    setGameComplete(false);
  };

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

      <div className="max-w-2xl mx-auto">
        <AnimatePresence mode="wait">
          {!gameComplete ? (
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
            >
              {/* Progress indicator */}
              <div className="flex items-center justify-center gap-2 mb-8">
                {questions.map((_, idx) => (
                  <div
                    key={idx}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      idx === currentIndex
                        ? "w-8 bg-sage"
                        : idx < currentIndex
                        ? "bg-sage/50"
                        : "bg-sage/20"
                    }`}
                  />
                ))}
              </div>

              <Card className="overflow-hidden border-rose-soft/50 bg-gradient-to-br from-background to-rose-soft/20 shadow-soft">
                <CardContent className="p-8 md:p-10">
                  <div className="text-center mb-8">
                    <span className="text-sm text-muted-foreground font-medium">
                      Question {currentIndex + 1} of {questions.length}
                    </span>
                  </div>

                  <div className="flex items-center justify-center gap-3 mb-8">
                    <div className="w-12 h-12 rounded-full bg-rose-soft flex items-center justify-center shrink-0">
                      <Sparkles className="w-6 h-6 text-rose" />
                    </div>
                  </div>

                  <h3 className="font-serif text-2xl md:text-3xl text-center mb-10">
                    {currentQuestion.question}
                  </h3>

                  <AnimatePresence mode="wait">
                    {!revealed ? (
                      <motion.div
                        key="options"
                        className="flex flex-wrap justify-center gap-4"
                        exit={{ opacity: 0, scale: 0.95 }}
                      >
                        {currentQuestion.options.map((option) => (
                          <Button
                            key={option}
                            variant="outline"
                            className="px-8 py-6 text-lg border-sage/30 hover:bg-sage-light hover:border-sage transition-all duration-300"
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
                        className="space-y-6"
                      >
                        <div
                          className={`flex items-center gap-4 p-6 rounded-xl ${
                            isCorrect
                              ? "bg-sage-light/50 border border-sage/30"
                              : "bg-rose-soft/50 border border-rose/30"
                          }`}
                        >
                          <motion.div
                            initial={{ rotate: -180, scale: 0 }}
                            animate={{ rotate: 0, scale: 1 }}
                            transition={{ delay: 0.2, type: "spring", bounce: 0.5 }}
                          >
                            <Heart
                              className={`w-8 h-8 ${
                                isCorrect ? "text-sage fill-sage" : "text-rose fill-rose"
                              }`}
                            />
                          </motion.div>
                          <div>
                            <p className="font-medium text-lg">
                              {isCorrect ? "You got it! 🎉" : `Oops! It's ${currentQuestion.answer}`}
                            </p>
                            <p className="text-muted-foreground font-script text-xl italic">
                              {currentQuestion.funReveal}
                            </p>
                          </div>
                        </div>

                        <div className="flex justify-center">
                          <Button
                            className="px-8 py-6 text-lg gap-2"
                            onClick={handleNext}
                          >
                            {currentIndex < questions.length - 1 ? (
                              <>
                                Next Question
                                <ChevronRight className="w-5 h-5" />
                              </>
                            ) : (
                              "See Results"
                            )}
                          </Button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            <motion.div
              key="complete"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="overflow-hidden border-gold/30 bg-gradient-to-br from-background to-gold-soft/30 shadow-romantic">
                <CardContent className="p-10 md:p-12 text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", bounce: 0.5 }}
                    className="w-20 h-20 rounded-full bg-gold-soft mx-auto mb-6 flex items-center justify-center"
                  >
                    <Heart className="w-10 h-10 text-gold fill-gold" />
                  </motion.div>

                  <h3 className="font-serif text-3xl md:text-4xl mb-4">
                    You scored {score} out of {questions.length}!
                  </h3>

                  <p className="text-muted-foreground font-script text-2xl italic mb-8">
                    {score === questions.length
                      ? "Perfect! You know us so well! 💕"
                      : score >= questions.length / 2
                      ? "Great job! You're definitely invited! 🎉"
                      : "Time to get to know us better at the wedding! 💒"}
                  </p>

                  <Button
                    variant="outline"
                    className="gap-2 px-6 py-5 text-lg"
                    onClick={handleRestart}
                  >
                    <RotateCcw className="w-5 h-5" />
                    Play Again
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default GuessingGame;
