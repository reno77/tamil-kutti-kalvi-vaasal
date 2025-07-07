import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Volume2, Check, X } from "lucide-react";

interface FlashCardProps {
  exercise: {
    question: string;
    tamil: string;
    answer: string;
    pronunciation: string;
    type: string;
  };
  onComplete: (isCorrect: boolean) => void;
}

export const FlashCard = ({ exercise, onComplete }: FlashCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);

  const handleShowAnswer = () => {
    setShowAnswer(true);
  };

  const handleAnswer = (isCorrect: boolean) => {
    onComplete(isCorrect);
    setIsFlipped(false);
    setShowAnswer(false);
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-semibold text-foreground mb-4">
          {exercise.question}
        </h3>
      </div>

      {/* Flashcard */}
      <div className="relative h-80">
        <Card 
          className={`absolute inset-0 shadow-card cursor-pointer transition-transform duration-500 ${
            isFlipped ? 'rotate-y-180' : ''
          }`}
          onClick={() => setIsFlipped(!isFlipped)}
        >
          <CardContent className="h-full flex items-center justify-center p-8">
            <div className="text-center">
              <div className="text-6xl font-bold text-primary mb-4">
                {exercise.tamil}
              </div>
              <div className="text-lg text-muted-foreground">
                [{exercise.pronunciation}]
              </div>
              <Button variant="ghost" size="sm" className="mt-4">
                <Volume2 className="w-4 h-4 mr-2" />
                Listen
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card 
          className={`absolute inset-0 shadow-card transition-transform duration-500 ${
            isFlipped ? '' : 'rotate-y-180'
          }`}
        >
          <CardContent className="h-full flex items-center justify-center p-8">
            <div className="text-center">
              <div className="text-4xl font-semibold text-foreground mb-4">
                {exercise.answer}
              </div>
              <p className="text-muted-foreground">
                Click to flip back
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Controls */}
      <div className="text-center space-y-4">
        {!showAnswer ? (
          <Button 
            variant="learning" 
            size="lg" 
            onClick={handleShowAnswer}
          >
            <Check className="w-4 h-4 mr-2" />
            Check Answer
          </Button>
        ) : (
          <div className="space-y-4">
            <p className="text-lg font-medium text-foreground">
              Did you get it right?
            </p>
            <div className="flex gap-4 justify-center">
              <Button 
                variant="learning-green" 
                size="lg"
                onClick={() => handleAnswer(true)}
              >
                <Check className="w-4 h-4 mr-2" />
                Yes, I got it!
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => handleAnswer(false)}
              >
                <X className="w-4 h-4 mr-2" />
                No, I missed it
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};