import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Volume2, Check, RotateCcw, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { DragDropExercise } from "@/components/practice/DragDropExercise";
import { FlashCard } from "@/components/practice/FlashCard";
import { MultipleChoice } from "@/components/practice/MultipleChoice";

const Practice = () => {
  const [selectedUnit, setSelectedUnit] = useState(1);
  const [selectedLesson, setSelectedLesson] = useState(1);
  const [currentExercise, setCurrentExercise] = useState(0);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  const units = [
    {
      id: 1,
      title: "Tamil Letters",
      lessons: [
        { id: 1, title: "Vowels (உயிர்)", progress: 100, stars: 3 },
        { id: 2, title: "Consonants (மெய்)", progress: 80, stars: 2 },
        { id: 3, title: "Combined Letters", progress: 60, stars: 1 },
      ]
    },
    {
      id: 2,
      title: "Basic Words",
      lessons: [
        { id: 1, title: "Family Words", progress: 90, stars: 3 },
        { id: 2, title: "Colors", progress: 70, stars: 2 },
        { id: 3, title: "Numbers", progress: 50, stars: 1 },
      ]
    },
    {
      id: 3,
      title: "Simple Sentences",
      lessons: [
        { id: 1, title: "Greetings", progress: 40, stars: 0 },
        { id: 2, title: "Questions", progress: 20, stars: 0 },
        { id: 3, title: "Daily Activities", progress: 0, stars: 0 },
      ]
    }
  ];

  const exercises = [
    {
      type: "flashcard",
      question: "What does 'அம்மா' mean?",
      tamil: "அம்மா",
      answer: "Mother",
      pronunciation: "Amma"
    },
    {
      type: "multiple-choice",
      question: "Which Tamil letter makes the 'ka' sound?",
      options: ["க", "ங", "ச", "ந"],
      correct: 0,
      tamil: "க"
    },
    {
      type: "drag-drop",
      question: "Match the Tamil letters with their sounds",
      pairs: [
        { tamil: "அ", english: "a" },
        { tamil: "இ", english: "i" },
        { tamil: "உ", english: "u" }
      ]
    }
  ];

  const handleExerciseComplete = (isCorrect: boolean) => {
    if (isCorrect) {
      setScore(score + 1);
    }
    
    if (currentExercise < exercises.length - 1) {
      setCurrentExercise(currentExercise + 1);
    } else {
      setCompleted(true);
    }
  };

  const resetExercises = () => {
    setCurrentExercise(0);
    setScore(0);
    setCompleted(false);
  };

  const currentUnit = units.find(u => u.id === selectedUnit);
  const currentLesson = currentUnit?.lessons.find(l => l.id === selectedLesson);

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
            <h1 className="text-2xl font-bold">Practice Zone</h1>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="secondary" className="bg-white/20 text-white">
              Score: {score}/{exercises.length}
            </Badge>
            <Progress value={(currentExercise / exercises.length) * 100} className="w-32" />
          </div>
        </div>
      </header>

      <div className="container mx-auto p-4">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar - Units and Lessons */}
          <div className="lg:col-span-1">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-lg">Learning Path</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {units.map((unit) => (
                  <div key={unit.id} className="space-y-2">
                    <Button
                      variant={selectedUnit === unit.id ? "learning" : "ghost"}
                      className="w-full justify-start"
                      onClick={() => setSelectedUnit(unit.id)}
                    >
                      Unit {unit.id}: {unit.title}
                    </Button>
                    
                    {selectedUnit === unit.id && (
                      <div className="ml-4 space-y-1">
                        {unit.lessons.map((lesson) => (
                          <div
                            key={lesson.id}
                            className={`p-3 rounded-lg cursor-pointer transition-all ${
                              selectedLesson === lesson.id
                                ? 'bg-primary-soft border border-primary'
                                : 'bg-muted hover:bg-muted/80'
                            }`}
                            onClick={() => setSelectedLesson(lesson.id)}
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium">{lesson.title}</span>
                              <div className="flex items-center gap-1">
                                {Array.from({ length: lesson.stars }).map((_, i) => (
                                  <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                ))}
                              </div>
                            </div>
                            <Progress value={lesson.progress} className="mt-2 h-2" />
                            <span className="text-xs text-muted-foreground">{lesson.progress}% Complete</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3">
            {!completed ? (
              <Card className="shadow-card">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>
                      {currentUnit?.title} - {currentLesson?.title}
                    </CardTitle>
                    <Badge variant="outline">
                      Exercise {currentExercise + 1} of {exercises.length}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Exercise Content */}
                  <div className="min-h-[400px] flex items-center justify-center">
                    {exercises[currentExercise]?.type === 'flashcard' && (
                      <FlashCard
                        exercise={exercises[currentExercise] as any}
                        onComplete={handleExerciseComplete}
                      />
                    )}
                    {exercises[currentExercise]?.type === 'multiple-choice' && (
                      <MultipleChoice
                        exercise={exercises[currentExercise] as any}
                        onComplete={handleExerciseComplete}
                      />
                    )}
                    {exercises[currentExercise]?.type === 'drag-drop' && (
                      <DragDropExercise
                        exercise={exercises[currentExercise] as any}
                        onComplete={handleExerciseComplete}
                      />
                    )}
                  </div>

                  {/* Audio Controls */}
                  <div className="flex justify-center">
                    <Button variant="learning-secondary" size="lg">
                      <Volume2 className="w-4 h-4 mr-2" />
                      Hear Pronunciation
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              /* Completion Screen */
              <Card className="shadow-card text-center">
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <div className="text-6xl">🎉</div>
                    <h2 className="text-3xl font-bold text-foreground">Great Job!</h2>
                    <p className="text-xl text-muted-foreground">
                      You completed the lesson with a score of {score}/{exercises.length}
                    </p>
                    
                    <div className="flex items-center justify-center gap-2">
                      {Array.from({ length: Math.min(3, Math.ceil((score / exercises.length) * 3)) }).map((_, i) => (
                        <Star key={i} className="w-8 h-8 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Button variant="learning" size="lg" onClick={resetExercises}>
                        <RotateCcw className="w-4 h-4 mr-2" />
                        Try Again
                      </Button>
                      <Link to="/">
                        <Button variant="outline" size="lg">
                          Back to Home
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Practice;