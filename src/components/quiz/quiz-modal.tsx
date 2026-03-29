import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, CheckCircle2, XCircle } from "lucide-react";

interface QuizQuestion {
  type: "multiple-choice" | "short-answer";
  question: string;
  options?: string[];
  correctAnswer: string;
  explanation: string;
}

interface QuizModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function QuizModal({ isOpen, onClose }: QuizModalProps) {
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  const handleGenerate = async () => {
    if (!topic.trim()) return;
    setLoading(true);
    setQuestions([]);
    setCurrentIndex(0);
    setScore(0);
    setShowResult(false);
    
    try {
      const res = await fetch("/api/quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic }),
      });
      const data = await res.json();
      if (data.questions) {
        setQuestions(data.questions);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    const isCorrect = 
      selectedAnswer.trim().toLowerCase() === currentQuestion.correctAnswer.trim().toLowerCase();
    
    if (isCorrect) setScore(s => s + 1);
    
    setShowResult(true);
  };

  const proceedToNextQuestion = () => {
    setSelectedAnswer("");
    setShowResult(false);
    setCurrentIndex(i => i + 1);
  };

  const resetQuiz = () => {
    setQuestions([]);
    setTopic("");
    setCurrentIndex(0);
    setScore(0);
    setShowResult(false);
  };

  const isFinished = currentIndex >= questions.length && questions.length > 0;
  const currentQuestion = questions[currentIndex];

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>AI Quiz Generator</DialogTitle>
          <DialogDescription>
            Test your knowledge. Enter a topic or paste text to generate a quick quiz.
          </DialogDescription>
        </DialogHeader>

        {questions.length === 0 ? (
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Input
                placeholder="e.g. Mitochondria, World War II, Next.js routing..."
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleGenerate();
                }}
                disabled={loading}
              />
            </div>
            <Button
              className="w-full"
              onClick={handleGenerate}
              disabled={loading || !topic.trim()}
            >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {loading ? "Generating questions..." : "Generate Quiz"}
            </Button>
          </div>
        ) : isFinished ? (
          <div className="py-8 text-center space-y-4 flex flex-col items-center">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-primary text-3xl font-bold mb-2">
              {score}/{questions.length}
            </div>
            <h3 className="text-xl font-semibold">Quiz Completed!</h3>
            <p className="text-muted-foreground mb-4">
              Great job practicing active recall.
            </p>
            <div className="flex gap-4 mt-4 w-full">
              <Button variant="outline" className="flex-1" onClick={onClose}>
                Close
              </Button>
              <Button className="flex-1" onClick={resetQuiz}>
                Create New Quiz
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-6 py-4">
            <div className="flex justify-between items-center text-sm font-medium text-muted-foreground">
              <span>Question {currentIndex + 1} of {questions.length}</span>
              <span className="bg-muted px-2 py-1 rounded-md text-xs">
                {currentQuestion.type === "multiple-choice" ? "Multiple Choice" : "Short Answer"}
              </span>
            </div>

            <h3 className="text-lg font-medium">{currentQuestion.question}</h3>

            {!showResult ? (
              <div className="space-y-3">
                {currentQuestion.type === "multiple-choice" && currentQuestion.options ? (
                  currentQuestion.options.map((opt, i) => (
                    <button
                      key={i}
                      className={`w-full text-left p-4 rounded-xl border transition-all ${
                        selectedAnswer === opt
                          ? "border-primary bg-primary/5 ring-1 ring-primary"
                          : "hover:bg-muted"
                      }`}
                      onClick={() => setSelectedAnswer(opt)}
                    >
                      {opt}
                    </button>
                  ))
                ) : (
                  <Input
                    placeholder="Type your answer..."
                    value={selectedAnswer}
                    onChange={(e) => setSelectedAnswer(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && selectedAnswer.trim()) handleNext();
                    }}
                  />
                )}
                
                <Button
                  className="w-full mt-4"
                  onClick={handleNext}
                  disabled={!selectedAnswer.trim()}
                >
                  Submit Answer
                </Button>
              </div>
            ) : (
              <div className="space-y-4 p-5 rounded-xl bg-muted/50 border">
                <div className="flex items-start gap-3">
                  {selectedAnswer.trim().toLowerCase() === currentQuestion.correctAnswer.trim().toLowerCase() ? (
                    <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="w-6 h-6 text-red-500 shrink-0 mt-0.5" />
                  )}
                  <div>
                    <h4 className="font-semibold text-lg flex items-center gap-2">
                       {selectedAnswer.trim().toLowerCase() === currentQuestion.correctAnswer.trim().toLowerCase()
                        ? "Correct!"
                        : "Incorrect"}
                    </h4>
                    <div className="mt-3 space-y-2 text-sm">
                      <p><span className="font-medium">Your answer:</span> {selectedAnswer}</p>
                      {selectedAnswer.trim().toLowerCase() !== currentQuestion.correctAnswer.trim().toLowerCase() && (
                         <p><span className="font-medium text-emerald-600 dark:text-emerald-400">Correct answer:</span> {currentQuestion.correctAnswer}</p>
                      )}
                      <div className="bg-background border rounded-lg p-3 mt-3 text-muted-foreground leading-relaxed">
                        <span className="font-medium prose-sm block mb-1 text-foreground">Explanation:</span> 
                        {currentQuestion.explanation}
                      </div>
                    </div>
                  </div>
                </div>
                <Button className="w-full mt-2" onClick={proceedToNextQuestion}>
                  {currentIndex + 1 === questions.length ? "View Results" : "Next Question"}
                </Button>
              </div>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
