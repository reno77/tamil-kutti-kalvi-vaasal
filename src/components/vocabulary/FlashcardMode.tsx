import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, Volume2, RotateCcw, Shuffle } from "lucide-react";

interface VocabularyWord {
  id: number;
  tamil: string;
  english: string;
  pronunciation: string;
  image: string;
  theme: string;
}

interface FlashcardModeProps {
  words: VocabularyWord[];
  onPronunciation: (text: string) => void;
}

export const FlashcardMode = ({ words, onPronunciation }: FlashcardModeProps) => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [shuffledWords, setShuffledWords] = useState(words);

  const currentWord = shuffledWords[currentCardIndex];

  const nextCard = () => {
    setCurrentCardIndex((prev) => (prev + 1) % shuffledWords.length);
    setIsFlipped(false);
  };

  const prevCard = () => {
    setCurrentCardIndex((prev) => (prev - 1 + shuffledWords.length) % shuffledWords.length);
    setIsFlipped(false);
  };

  const shuffleCards = () => {
    const shuffled = [...words].sort(() => Math.random() - 0.5);
    setShuffledWords(shuffled);
    setCurrentCardIndex(0);
    setIsFlipped(false);
  };

  const resetCards = () => {
    setShuffledWords(words);
    setCurrentCardIndex(0);
    setIsFlipped(false);
  };

  if (!currentWord) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">📚</div>
        <h3 className="text-xl font-semibold text-foreground mb-2">No flashcards to show</h3>
        <p className="text-muted-foreground">Add some words to get started!</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Badge variant="outline">
            {currentCardIndex + 1} of {shuffledWords.length}
          </Badge>
          <Badge variant="secondary" className="capitalize">
            {currentWord.theme}
          </Badge>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={shuffleCards}>
            <Shuffle className="w-4 h-4 mr-2" />
            Shuffle
          </Button>
          <Button variant="outline" size="sm" onClick={resetCards}>
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
        </div>
      </div>

      {/* Flashcard */}
      <div className="relative h-96">
        {/* Front Side */}
        <Card 
          className={`absolute inset-0 shadow-card cursor-pointer transition-all duration-500 ${
            isFlipped ? 'opacity-0 rotate-y-180' : 'opacity-100'
          }`}
          onClick={() => setIsFlipped(true)}
        >
          <CardContent className="h-full flex flex-col items-center justify-center p-8 text-center">
            <div className="mb-6">
              <img 
                src={currentWord.image} 
                alt={currentWord.english}
                className="w-32 h-32 object-cover rounded-2xl shadow-soft"
                onError={(e) => {
                  e.currentTarget.src = "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop";
                }}
              />
            </div>
            
            <div className="text-5xl font-bold text-primary mb-4">
              {currentWord.tamil}
            </div>
            
            <div className="text-lg text-muted-foreground mb-6">
              [{currentWord.pronunciation}]
            </div>

            <Button variant="ghost" size="sm">
              <Volume2 className="w-4 h-4 mr-2" />
              Listen & Click to reveal
            </Button>
          </CardContent>
        </Card>

        {/* Back Side */}
        <Card 
          className={`absolute inset-0 shadow-card cursor-pointer transition-all duration-500 ${
            isFlipped ? 'opacity-100' : 'opacity-0 rotate-y-180'
          }`}
          onClick={() => setIsFlipped(false)}
        >
          <CardContent className="h-full flex flex-col items-center justify-center p-8 text-center">
            <div className="mb-6">
              <img 
                src={currentWord.image} 
                alt={currentWord.english}
                className="w-32 h-32 object-cover rounded-2xl shadow-soft grayscale-0"
                onError={(e) => {
                  e.currentTarget.src = "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop";
                }}
              />
            </div>
            
            <div className="text-4xl font-semibold text-foreground mb-4">
              {currentWord.english}
            </div>
            
            <div className="text-2xl text-primary mb-6">
              {currentWord.tamil}
            </div>

            <Button
              variant="learning"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onPronunciation(currentWord.tamil);
              }}
            >
              <Volume2 className="w-4 h-4 mr-2" />
              Hear Pronunciation
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          size="lg"
          onClick={prevCard}
          disabled={shuffledWords.length <= 1}
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Previous
        </Button>

        <div className="text-center">
          <div className="text-sm text-muted-foreground mb-1">
            Click card to flip
          </div>
          <div className="flex gap-1">
            {shuffledWords.slice(0, 5).map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full ${
                  index === currentCardIndex ? 'bg-primary' : 'bg-muted'
                }`}
              />
            ))}
            {shuffledWords.length > 5 && (
              <div className="text-muted-foreground text-xs">...</div>
            )}
          </div>
        </div>

        <Button
          variant="outline"
          size="lg"
          onClick={nextCard}
          disabled={shuffledWords.length <= 1}
        >
          Next
          <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};