import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, Volume2 } from "lucide-react";

interface DragDropExerciseProps {
  exercise: {
    question: string;
    pairs: Array<{ tamil: string; english: string }>;
    type: string;
  };
  onComplete: (isCorrect: boolean) => void;
}

export const DragDropExercise = ({ exercise, onComplete }: DragDropExerciseProps) => {
  const [matches, setMatches] = useState<Record<string, string>>({});
  const [showResult, setShowResult] = useState(false);

  const handleMatch = (tamil: string, english: string) => {
    setMatches(prev => ({
      ...prev,
      [tamil]: english
    }));
  };

  const handleRemoveMatch = (tamil: string) => {
    setMatches(prev => {
      const newMatches = { ...prev };
      delete newMatches[tamil];
      return newMatches;
    });
  };

  const handleCheckAnswer = () => {
    setShowResult(true);
    
    const isCorrect = exercise.pairs.every(pair => 
      matches[pair.tamil] === pair.english
    );
    
    setTimeout(() => {
      onComplete(isCorrect);
      setMatches({});
      setShowResult(false);
    }, 3000);
  };

  const getMatchedEnglish = (tamil: string) => {
    return matches[tamil];
  };

  const getUnmatchedEnglish = () => {
    const matchedValues = Object.values(matches);
    return exercise.pairs
      .map(pair => pair.english)
      .filter(english => !matchedValues.includes(english));
  };

  const isCorrectMatch = (tamil: string) => {
    if (!showResult) return null;
    const pair = exercise.pairs.find(p => p.tamil === tamil);
    return pair && matches[tamil] === pair.english;
  };

  const allMatched = exercise.pairs.length === Object.keys(matches).length;

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Question */}
      <div className="text-center">
        <h3 className="text-xl font-semibold text-foreground mb-4">
          {exercise.question}
        </h3>
        <p className="text-muted-foreground">
          Click on a Tamil letter, then click on its matching English sound
        </p>
      </div>

      {/* Matching Area */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Tamil Letters */}
        <div className="space-y-3">
          <h4 className="text-lg font-medium text-center">Tamil Letters</h4>
          <div className="space-y-2">
            {exercise.pairs.map((pair, index) => {
              const matched = getMatchedEnglish(pair.tamil);
              const isCorrect = isCorrectMatch(pair.tamil);
              
              return (
                <Card
                  key={index}
                  className={`cursor-pointer transition-all duration-200 hover:scale-102 ${
                    matched 
                      ? showResult 
                        ? isCorrect 
                          ? 'border-learning-green bg-learning-green-soft' 
                          : 'border-destructive bg-destructive/10'
                        : 'border-primary bg-primary-soft'
                      : 'border-border hover:border-primary/50'
                  }`}
                  onClick={() => matched ? handleRemoveMatch(pair.tamil) : null}
                >
                  <CardContent className="p-4 flex items-center justify-between">
                    <div className="text-3xl font-bold text-primary">
                      {pair.tamil}
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        <Volume2 className="w-4 h-4" />
                      </Button>
                      {matched && (
                        <div className="text-lg font-medium text-foreground">
                          → {matched}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* English Sounds */}
        <div className="space-y-3">
          <h4 className="text-lg font-medium text-center">English Sounds</h4>
          <div className="space-y-2">
            {getUnmatchedEnglish().map((english, index) => (
              <Card
                key={index}
                className="cursor-pointer transition-all duration-200 hover:scale-102 border-border hover:border-secondary/50"
                onClick={() => {
                  // Find which Tamil letter is selected (not matched yet)
                  const selectedTamil = exercise.pairs.find(pair => 
                    !getMatchedEnglish(pair.tamil)
                  )?.tamil;
                  
                  if (selectedTamil) {
                    handleMatch(selectedTamil, english);
                  }
                }}
              >
                <CardContent className="p-4 text-center">
                  <div className="text-xl font-medium text-foreground">
                    {english}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Check Answer Button */}
      <div className="text-center">
        <Button 
          variant="learning" 
          size="lg"
          disabled={!allMatched || showResult}
          onClick={handleCheckAnswer}
        >
          <Check className="w-4 h-4 mr-2" />
          Check Answer
        </Button>
      </div>

      {/* Result Feedback */}
      {showResult && (
        <div className="text-center p-4 rounded-lg bg-muted/50">
          {exercise.pairs.every(pair => matches[pair.tamil] === pair.english) ? (
            <div className="text-learning-green font-semibold text-lg">
              🎉 Perfect! All matches are correct!
            </div>
          ) : (
            <div className="text-destructive font-semibold text-lg">
              ❌ Some matches are incorrect. Keep practicing!
            </div>
          )}
        </div>
      )}
    </div>
  );
};