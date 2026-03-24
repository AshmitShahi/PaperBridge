"use client";

import { useEffect, useState } from "react";
import { SearchInput } from "@/components/search-input";
import { Badge } from "@/components/ui/badge";
import { BookOpen, TrendingUp, Sparkles, Clock, ShieldCheck, Zap, Globe, GraduationCap } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

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
    <div className="relative min-h-screen flex flex-col overflow-hidden bg-background">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex flex-col items-center justify-center px-4">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 search-gradient opacity-60" />
        
        <div className="max-w-4xl w-full space-y-12 text-center relative z-10">
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
                      className="py-1 px-4 cursor-pointer hover:bg-accent/20 transition-all duration-200"
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
                    className="py-1 px-4 cursor-pointer hover:bg-primary/5 hover:border-accent transition-all duration-200"
                    onClick={() => window.location.href = `/search?q=${topic}`}
                  >
                    {topic}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Info Sections */}
      <section className="py-24 px-4 md:px-8 max-w-7xl mx-auto w-full space-y-32">
        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="space-y-4 p-8 glass-morphism rounded-3xl border-primary/5 hover:border-accent/30 transition-all duration-500 hover:shadow-xl group">
            <div className="bg-primary/10 w-14 h-14 rounded-2xl flex items-center justify-center group-hover:bg-accent/20 transition-colors">
              <Zap className="h-7 w-7 text-primary group-hover:text-accent" />
            </div>
            <h3 className="text-xl font-bold text-primary">Semantic Intelligence</h3>
            <p className="text-muted-foreground leading-relaxed">
              We don't just search for keywords. Our AI understands the context of your research goals to find papers that truly matter.
            </p>
          </div>
          <div className="space-y-4 p-8 glass-morphism rounded-3xl border-primary/5 hover:border-accent/30 transition-all duration-500 hover:shadow-xl group">
            <div className="bg-primary/10 w-14 h-14 rounded-2xl flex items-center justify-center group-hover:bg-accent/20 transition-colors">
              <ShieldCheck className="h-7 w-7 text-primary group-hover:text-accent" />
            </div>
            <h3 className="text-xl font-bold text-primary">Trusted Sources</h3>
            <p className="text-muted-foreground leading-relaxed">
              Every result is pulled from verified academic databases including arXiv, Semantic Scholar, and CrossRef.
            </p>
          </div>
          <div className="space-y-4 p-8 glass-morphism rounded-3xl border-primary/5 hover:border-accent/30 transition-all duration-500 hover:shadow-xl group">
            <div className="bg-primary/10 w-14 h-14 rounded-2xl flex items-center justify-center group-hover:bg-accent/20 transition-colors">
              <Globe className="h-7 w-7 text-primary group-hover:text-accent" />
            </div>
            <h3 className="text-xl font-bold text-primary">Global Reach</h3>
            <p className="text-muted-foreground leading-relaxed">
              Access millions of open-source publications from researchers around the globe in a matter of seconds.
            </p>
          </div>
        </div>

        {/* How it Works */}
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2 space-y-8">
            <Badge className="bg-accent/10 text-accent border-accent/20 hover:bg-accent/20">How It Works</Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-primary leading-tight font-headline">
              Bridging the gap between <br />
              <span className="text-accent">Complexity and Clarity.</span>
            </h2>
            <div className="space-y-6">
              {[
                { step: "01", title: "Natural Search", desc: "Type your query in plain English. No complex operators needed." },
                { step: "02", title: "AI Analysis", desc: "Our system analyzes millions of abstracts to find the perfect matches." },
                { step: "03", title: "Smart Summaries", desc: "Get instant, easy-to-read AI summaries for every paper found." }
              ].map((item) => (
                <div key={item.step} className="flex gap-4">
                  <span className="text-2xl font-bold text-accent/40 font-mono">{item.step}</span>
                  <div className="space-y-1">
                    <h4 className="font-bold text-lg text-primary">{item.title}</h4>
                    <p className="text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:w-1/2 w-full relative">
            <div className="aspect-square bg-gradient-to-br from-primary/10 to-accent/10 rounded-[3rem] p-8 flex items-center justify-center relative overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-full bg-grid-white/10 opacity-20" />
               <div className="relative z-10 glass-morphism p-8 rounded-3xl shadow-2xl border-white/40 max-w-sm rotate-3 hover:rotate-0 transition-transform duration-700">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                      <GraduationCap className="h-5 w-5 text-accent" />
                    </div>
                    <div className="h-3 w-32 bg-muted rounded-full" />
                  </div>
                  <div className="space-y-3">
                    <div className="h-4 w-full bg-muted/60 rounded-full" />
                    <div className="h-4 w-5/6 bg-muted/60 rounded-full" />
                    <div className="h-20 w-full bg-accent/5 rounded-2xl border border-accent/10 p-3">
                      <p className="text-[10px] text-accent font-medium uppercase tracking-widest mb-1">AI Summary</p>
                      <div className="h-2 w-full bg-accent/20 rounded-full mb-1" />
                      <div className="h-2 w-3/4 bg-accent/20 rounded-full" />
                    </div>
                  </div>
               </div>
               <div className="absolute bottom-12 right-12 glass-morphism p-4 rounded-2xl shadow-xl -rotate-6 hidden md:block border-white/40">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-primary" />
                    <span className="text-[10px] font-bold text-primary uppercase">Verified Source</span>
                  </div>
               </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-primary rounded-[3rem] p-12 md:p-20 text-center space-y-8 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />
          
          <h2 className="text-3xl md:text-5xl font-bold text-white relative z-10 font-headline">
            Ready to accelerate your research?
          </h2>
          <p className="text-primary-foreground/80 max-w-xl mx-auto text-lg relative z-10">
            Join thousands of students and researchers who use PaperBridge to discover high-impact publications.
          </p>
          <div className="flex flex-wrap justify-center gap-4 relative z-10">
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 h-14 px-10 rounded-2xl text-lg font-bold shadow-lg transition-all hover:scale-105">
              Get Started for Free
            </Button>
            <Link href="/bookmarks">
              <Button size="lg" variant="outline" className="h-14 px-10 rounded-2xl text-lg font-bold border-white/20 text-white hover:bg-white/10 transition-all">
                View Bookmarks
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Partners/Sources Footer */}
      <div className="pb-10 flex items-center justify-center gap-12 text-muted-foreground/40 mt-12 px-4 flex-wrap">
        <div className="flex items-center gap-2 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all">
          <BookOpen className="h-5 w-5" />
          <span className="text-xs font-bold uppercase tracking-tighter">arXiv.org</span>
        </div>
        <div className="flex items-center gap-2 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all">
          <Sparkles className="h-5 w-5" />
          <span className="text-xs font-bold uppercase tracking-tighter">Semantic Scholar</span>
        </div>
        <div className="flex items-center gap-2 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all">
          <Globe className="h-5 w-5" />
          <span className="text-xs font-bold uppercase tracking-tighter">CrossRef</span>
        </div>
        <div className="flex items-center gap-2 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all">
          <GraduationCap className="h-5 w-5" />
          <span className="text-xs font-bold uppercase tracking-tighter">DOI Foundation</span>
        </div>
      </div>
    </div>
  );
}
