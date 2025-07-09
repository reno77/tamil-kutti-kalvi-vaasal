import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import heroImage from "@/assets/hero-tamil-learning.jpg";
import gamesIcon from "@/assets/games-icon.jpg";
import vocabularyIcon from "@/assets/vocabulary-icon.jpg";
import audioIcon from "@/assets/audio-icon.jpg";
import practiceIcon from "@/assets/practice-icon.jpg";
import storyIcon from "@/assets/story-icon.jpg";
import progressIcon from "@/assets/progress-icon.jpg";
import { Book, Gamepad, Headphones, List, Mic, User } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const learningCards = [
    // {
    //   title: "Learn Tamil",
    //   description: "Start your Tamil journey with interactive lessons",
    //   icon: Book,
    //   image: vocabularyIcon,
    //   variant: "learning" as const,
    //   color: "primary"
    // },
    // {
    //   title: "Games",
    //   description: "Fun games to practice Tamil skills",
    //   icon: Gamepad,
    //   image: gamesIcon,
    //   variant: "learning-purple" as const,
    //   color: "purple"
    // },
    // {
    //   title: "Vocabulary",
    //   description: "Build your Tamil word collection",
    //   icon: List,
    //   image: vocabularyIcon,
    //   variant: "learning-green" as const,
    //   color: "green"
    // },
    {
      title: "Practice Zone",
      description: "Test your skills with exercises",
      icon: User,
      image: practiceIcon,
      variant: "learning-secondary" as const,
      color: "secondary"
    },
    // {
    //   title: "Audio Library",
    //   description: "Listen and learn pronunciation",
    //   icon: Headphones,
    //   image: audioIcon,
    //   variant: "learning" as const,
    //   color: "primary"
    // },
    // {
    //   title: "Story Corner",
    //   description: "Discover Tamil stories and tales",
    //   icon: Book,
    //   image: storyIcon,
    //   variant: "learning-purple" as const,
    //   color: "purple"
    // },
    // {
    //   title: "Progress Tracker",
    //   description: "See your learning achievements",
    //   icon: Mic,
    //   image: progressIcon,
    //   variant: "learning-green" as const,
    //   color: "green"
    // }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-hero py-16 px-4 md:py-24">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                வணக்கம்!
                <br />
                <span className="text-2xl md:text-3xl font-normal">Welcome to Tamil Learning</span>
              </h1>
              <p className="text-xl text-white/90 mb-8 leading-relaxed">
                Join thousands of children on an exciting journey to learn Tamil through stories, games, and interactive activities designed just for you!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link to="/practice">
                  <Button variant="learning" size="xl" className="bg-white text-primary hover:bg-white/90">
                    Start Learning Now
                  </Button>
                </Link>
                {/* <Button variant="outline" size="xl" className="border-white text-white hover:bg-white hover:text-primary">
                  Watch Demo
                </Button> */}
              </div>
            </div>
            <div className="relative">
              <img 
                src={heroImage} 
                alt="Tamil Learning Hero" 
                className="w-full h-auto rounded-3xl shadow-card"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Login Section */}
      {/* <section className="py-8 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <Card className="shadow-soft">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <h2 className="text-2xl font-semibold text-foreground mb-2">Ready to Learn?</h2>
                  <p className="text-muted-foreground">Sign in to track your progress and unlock more content</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button variant="learning" size="lg">
                    Student Login
                  </Button>
                  <Button variant="outline" size="lg">
                    Parent Login
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section> */}

      {/* Learning Sections */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Explore Tamil Learning
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Choose your adventure! Each section is designed to make learning Tamil fun and engaging for young minds. New sections will be added soon.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {learningCards.map((card, index) => (
              <Card key={index} className="group overflow-hidden shadow-card hover:shadow-button transition-all duration-300 hover:scale-105 bg-gradient-card border-border/50">
                <CardContent className="p-0">
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={card.image} 
                      alt={card.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <card.icon className="w-8 h-8 mb-2" />
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      {card.title}
                    </h3>
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {card.description}
                    </p>
                    {card.title === "Practice Zone" ? (
                      <Link to="/practice" className="w-full">
                        <Button 
                          variant={card.variant} 
                          size="learning-card"
                          className="w-full"
                        >
                          Explore {card.title}
                        </Button>
                      </Link>
                    ) : card.title === "Vocabulary" ? (
                      <Link to="/vocabulary" className="w-full">
                        <Button 
                          variant={card.variant} 
                          size="learning-card"
                          className="w-full"
                        >
                          Explore {card.title}
                        </Button>
                      </Link>
                    ) : (
                      <Button 
                        variant={card.variant} 
                        size="learning-card"
                        className="w-full"
                      >
                        Explore {card.title}
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 bg-gradient-learning">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Start Your Tamil Learning Adventure Today!
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join our community of young Tamil learners and discover the joy of language through interactive stories and games.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="learning" size="xl" className="bg-white text-primary hover:bg-white/90 shadow-button">
              Create Free Account
            </Button>
            <Button variant="outline" size="xl" className="border-white text-white hover:bg-white/10">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 bg-muted/20">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <h3 className="text-lg font-semibold text-foreground mb-1">Tamil Learning</h3>
              <p className="text-muted-foreground text-sm">Making Tamil fun for children ages 5-13</p>
            </div>
            <div className="flex gap-4">
              <Button variant="ghost" size="sm">Help</Button>
              <Button variant="ghost" size="sm">About</Button>
              <Button variant="ghost" size="sm">Contact</Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;