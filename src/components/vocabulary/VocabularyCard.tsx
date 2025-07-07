import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Volume2 } from "lucide-react";

interface VocabularyWord {
  id: number;
  tamil: string;
  english: string;
  pronunciation: string;
  image: string;
  theme: string;
}

interface VocabularyCardProps {
  word: VocabularyWord;
  onPronunciation: (text: string) => void;
}

export const VocabularyCard = ({ word, onPronunciation }: VocabularyCardProps) => {
  const getThemeColor = (theme: string) => {
    const colors = {
      family: "learning-purple",
      colors: "learning-green", 
      animals: "learning",
      food: "learning-secondary",
      places: "outline"
    };
    return colors[theme as keyof typeof colors] || "outline";
  };

  const getThemeBg = (theme: string) => {
    const colors = {
      family: "bg-learning-purple-soft",
      colors: "bg-learning-green-soft",
      animals: "bg-primary-soft",
      food: "bg-secondary-soft",
      places: "bg-muted"
    };
    return colors[theme as keyof typeof colors] || "bg-muted";
  };

  return (
    <Card className="group overflow-hidden shadow-card hover:shadow-button transition-all duration-300 hover:scale-105 bg-gradient-card border-border/50">
      <CardContent className="p-0">
        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          <img 
            src={word.image} 
            alt={word.english}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            onError={(e) => {
              e.currentTarget.src = "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          
          {/* Theme Badge */}
          <div className="absolute top-3 left-3">
            <Badge variant="secondary" className={`${getThemeBg(word.theme)} text-foreground capitalize`}>
              {word.theme}
            </Badge>
          </div>

          {/* Pronunciation Button */}
          <div className="absolute bottom-3 right-3">
            <Button
              variant="secondary"
              size="sm"
              className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/30"
              onClick={() => onPronunciation(word.tamil)}
            >
              <Volume2 className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-3">
          {/* Tamil Word */}
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-1">
              {word.tamil}
            </div>
            <div className="text-sm text-muted-foreground">
              [{word.pronunciation}]
            </div>
          </div>

          {/* English Translation */}
          <div className="text-center">
            <div className="text-xl font-semibold text-foreground">
              {word.english}
            </div>
          </div>

          {/* Action Button */}
          <Button
            variant={getThemeColor(word.theme) as any}
            size="sm"
            className="w-full"
            onClick={() => onPronunciation(word.tamil)}
          >
            <Volume2 className="w-4 h-4 mr-2" />
            Hear Pronunciation
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};