import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Search, Volume2, RotateCcw, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { VocabularyCard } from "@/components/vocabulary/VocabularyCard";
import { FlashcardMode } from "@/components/vocabulary/FlashcardMode";

interface VocabularyWord {
  id: number;
  tamil: string;
  english: string;
  pronunciation: string;
  image: string;
  theme: string;
}

const Vocabulary = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTheme, setSelectedTheme] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "flashcard">("grid");

  // Sample vocabulary data - in a real app, this would come from an API
  const vocabularyData: VocabularyWord[] = [
    {
      id: 1,
      tamil: "அம்மா",
      english: "Mother",
      pronunciation: "Amma",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop",
      theme: "family"
    },
    {
      id: 2,
      tamil: "அப்பா",
      english: "Father", 
      pronunciation: "Appa",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
      theme: "family"
    },
    {
      id: 3,
      tamil: "சிவப்பு",
      english: "Red",
      pronunciation: "Sivappu",
      image: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=400&h=400&fit=crop",
      theme: "colors"
    },
    {
      id: 4,
      tamil: "நீலம்",
      english: "Blue",
      pronunciation: "Neelam",
      image: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=400&h=400&fit=crop",
      theme: "colors"
    },
    {
      id: 5,
      tamil: "மஞ்சள்",
      english: "Yellow",
      pronunciation: "Manjal",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
      theme: "colors"
    },
    {
      id: 6,
      tamil: "பூனை",
      english: "Cat",
      pronunciation: "Poonai",
      image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=400&fit=crop",
      theme: "animals"
    },
    {
      id: 7,
      tamil: "நாய்",
      english: "Dog",
      pronunciation: "Naai",
      image: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&h=400&fit=crop",
      theme: "animals"
    },
    {
      id: 8,
      tamil: "பால்",
      english: "Milk",
      pronunciation: "Paal",
      image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&h=400&fit=crop",
      theme: "food"
    },
    {
      id: 9,
      tamil: "சாதம்",
      english: "Rice",
      pronunciation: "Saatham",
      image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=400&fit=crop",
      theme: "food"
    },
    {
      id: 10,
      tamil: "வீடு",
      english: "House",
      pronunciation: "Veedu",
      image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400&h=400&fit=crop",
      theme: "places"
    }
  ];

  const themes = [
    { id: "all", name: "All Words", count: vocabularyData.length },
    { id: "family", name: "Family", count: vocabularyData.filter(w => w.theme === "family").length },
    { id: "colors", name: "Colors", count: vocabularyData.filter(w => w.theme === "colors").length },
    { id: "animals", name: "Animals", count: vocabularyData.filter(w => w.theme === "animals").length },
    { id: "food", name: "Food", count: vocabularyData.filter(w => w.theme === "food").length },
    { id: "places", name: "Places", count: vocabularyData.filter(w => w.theme === "places").length }
  ];

  const filteredWords = useMemo(() => {
    let filtered = vocabularyData;
    
    if (selectedTheme !== "all") {
      filtered = filtered.filter(word => word.theme === selectedTheme);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(word => 
        word.tamil.toLowerCase().includes(searchTerm.toLowerCase()) ||
        word.english.toLowerCase().includes(searchTerm.toLowerCase()) ||
        word.pronunciation.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return filtered;
  }, [selectedTheme, searchTerm]);

  const handlePronunciation = (text: string) => {
    // Placeholder for ElevenLabs integration
    console.log("Playing pronunciation for:", text);
    // TODO: Implement ElevenLabs TTS
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-hero text-white p-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
            <h1 className="text-2xl font-bold">Vocabulary Explorer</h1>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="secondary" className="bg-white/20 text-white">
              {filteredWords.length} words
            </Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto p-4">
        {/* Controls */}
        <div className="mb-6 space-y-4">
          {/* View Mode Toggle */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex gap-2">
              <Button
                variant={viewMode === "grid" ? "learning" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
              >
                Grid View
              </Button>
              <Button
                variant={viewMode === "flashcard" ? "learning" : "outline"}
                size="sm"
                onClick={() => setViewMode("flashcard")}
              >
                Flashcard Mode
              </Button>
            </div>
            
            {/* Search */}
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search words..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Theme Filters */}
          <div className="flex flex-wrap gap-2">
            {themes.map((theme) => (
              <Button
                key={theme.id}
                variant={selectedTheme === theme.id ? "learning" : "outline"}
                size="sm"
                onClick={() => setSelectedTheme(theme.id)}
              >
                {theme.name} ({theme.count})
              </Button>
            ))}
          </div>
        </div>

        {/* Content */}
        {viewMode === "grid" ? (
          /* Grid View */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredWords.map((word) => (
              <VocabularyCard
                key={word.id}
                word={word}
                onPronunciation={handlePronunciation}
              />
            ))}
          </div>
        ) : (
          /* Flashcard Mode */
          <FlashcardMode
            words={filteredWords}
            onPronunciation={handlePronunciation}
          />
        )}

        {/* No Results */}
        {filteredWords.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-foreground mb-2">No words found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search or filter to find more words.
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm("");
                setSelectedTheme("all");
              }}
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Vocabulary;