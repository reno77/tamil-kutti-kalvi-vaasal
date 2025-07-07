import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Volume2, Check } from "lucide-react";

interface MultipleChoiceProps {
  exercise: {
    question: string;
    options: string[];
    correct: number;
    tamil: string;
    type: string;
  };
  onComplete: (isCorrect: boolean) => void;
}

export const MultipleChoice = ({ exercise, onComplete }: MultipleChoiceProps) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleOptionSelect = (index: number) => {
    if (showResult) return;
    setSelectedOption(index);
  };

  const handleCheckAnswer = () => {
    if (selectedOption === null) return;
    setShowResult(true);
    
    setTimeout(() => {
      const isCorrect = selectedOption === exercise.correct;
      onComplete(isCorrect);
      setSelectedOption(null);
      setShowResult(false);
    }, 2000);
  };

  const getOptionStyle = (index: number) => {
    if (!showResult) {
      return selectedOption === index 
        ? "border-primary bg-primary-soft" 
        : "border-border hover:border-primary/50";
    }
    
    if (index === exercise.correct) {
      return "border-learning-green bg-learning-green-soft";
    }
    
    if (selectedOption === index && index !== exercise.correct) {
      return "border-destructive bg-destructive/10";
    }
    
    return "border-border";
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      {/* Question */}
      <div className="text-center">
        <h3 className="text-xl font-semibold text-foreground mb-4">
          {exercise.question}
        </h3>
        
        {exercise.tamil && (
          <div className="space-y-2">
            <div className="text-4xl font-bold text-primary">
              {exercise.tamil}
            </div>
            <Button variant="ghost" size="sm">
              <Volume2 className="w-4 h-4 mr-2" />
              Listen
            </Button>
          </div>
        )}
      </div>

      {/* Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {exercise.options.map((option, index) => (
          <Card
            key={index}
            className={`cursor-pointer transition-all duration-200 hover:scale-102 ${getOptionStyle(index)}`}
            onClick={() => handleOptionSelect(index)}
          >
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-semibold text-foreground">
                {option}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Check Answer Button */}
      <div className="text-center">
        <Button 
          variant="learning" 
          size="lg"
          disabled={selectedOption === null || showResult}
          onClick={handleCheckAnswer}
        >
          <Check className="w-4 h-4 mr-2" />
          Check Answer
        </Button>
      </div>

      {/* Result Feedback */}
      {showResult && (
        <div className="text-center p-4 rounded-lg bg-muted/50">
          {selectedOption === exercise.correct ? (
            <div className="text-learning-green font-semibold text-lg">
              🎉 Correct! Well done!
            </div>
          ) : (
            <div className="text-destructive font-semibold text-lg">
              ❌ Not quite right. The correct answer is: {exercise.options[exercise.correct]}
            </div>
          )}
        </div>
      )}
    </div>
  );
};