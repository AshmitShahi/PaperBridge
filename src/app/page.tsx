"use client";

import { useEffect, useState } from "react";
import { SearchInput } from "@/components/search-input";
import { Badge } from "@/components/ui/badge";
import { BookOpen, TrendingUp, Sparkles, Clock } from "lucide-react";

export default function Home() {
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  useEffect(() => {
    const history = JSON.parse(localStorage.getItem("search_history") || "[]");
    setRecentSearches(history.slice(0, 4));
  }, []);

  const popularTopics = [
    "Machine Learning",
    "Quantum Computing",
    "Sustainable Energy",
    "Neuroscience",
    "Blockchain",
    "Climate Change"
  ];

  return (
    <div className="relative min-h-[90vh] flex flex-col items-center justify-center px-4 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 search-gradient opacity-60" />
      
      <div className="max-w-4xl w-full space-y-12 text-center">
        <div className="space-y-6 animate-fade-in">
          <Badge variant="outline" className="py-1.5 px-4 rounded-full border-accent text-primary bg-accent/10 backdrop-blur-sm gap-2">
            <Sparkles className="h-3.5 w-3.5 text-accent" />
            AI-Powered Paper Discovery
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-primary font-headline">
            The bridge between you and <br className="hidden md:block" />
            <span className="text-accent">Global Research.</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Enter any topic to find the most relevant, high-quality research papers across multiple databases using semantic intelligence.
          </p>
        </div>

        <div className="animate-fade-in [animation-delay:200ms] flex justify-center">
          <SearchInput variant="large" />
        </div>

        <div className="space-y-8 animate-fade-in [animation-delay:400ms]">
          {recentSearches.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-2 text-sm font-bold uppercase tracking-widest text-muted-foreground">
                <Clock className="h-4 w-4" />
                Recent Discoveries
              </div>
              <div className="flex flex-wrap justify-center gap-2">
                {recentSearches.map((topic) => (
                  <Badge 
                    key={topic} 
                    variant="secondary" 
                    className="py-1 px-4 cursor-pointer hover:bg-accent/20 transition-colors"
                    onClick={() => window.location.href = `/search?q=${topic}`}
                  >
                    {topic}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-4">
            <div className="flex items-center justify-center gap-2 text-sm font-bold uppercase tracking-widest text-muted-foreground">
              <TrendingUp className="h-4 w-4" />
              Popular in Research
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              {popularTopics.map((topic) => (
                <Badge 
                  key={topic} 
                  variant="outline" 
                  className="py-1 px-4 cursor-pointer hover:bg-primary/5 hover:border-accent transition-all"
                  onClick={() => window.location.href = `/search?q=${topic}`}
                >
                  {topic}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-8 text-muted-foreground/40 hidden lg:flex">
        <div className="flex items-center gap-2">
          <BookOpen className="h-5 w-5" />
          <span className="text-xs font-bold uppercase tracking-tighter">arXiv</span>
        </div>
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5" />
          <span className="text-xs font-bold uppercase tracking-tighter">Semantic Scholar</span>
        </div>
        <div className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          <span className="text-xs font-bold uppercase tracking-tighter">CrossRef</span>
        </div>
      </div>
    </div>
  );
}