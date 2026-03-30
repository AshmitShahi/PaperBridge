"use client";

import { useEffect, useState } from "react";
import { SearchInput } from "@/components/search-input";
import { Badge } from "@/components/ui/badge";
import { BookOpen, TrendingUp, Sparkles, Clock, ShieldCheck, Zap, Globe, GraduationCap, BarChart3, Star, ArrowRight, Layers, Fingerprint } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/firebase";
import { initiateAnonymousSignIn } from "@/firebase/non-blocking-login";
import { useToast } from "@/hooks/use-toast";

export default function Home() {
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const auth = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    const history = JSON.parse(localStorage.getItem("search_history") || "[]");
    setRecentSearches(history.slice(0, 4));
  }, []);

  const handleJoin = () => {
    initiateAnonymousSignIn(auth);
    toast({
      title: "Welcome to PaperBridge!",
      description: "You've joined as a guest. Start exploring research papers today.",
    });
  };

  const popularTopics = [
    "Machine Learning",
    "Quantum Computing",
    "Sustainable Energy",
    "Neuroscience",
    "Blockchain",
    "Climate Change"
  ];

  const stats = [
    { label: "Research Papers", value: "200M+", icon: BookOpen },
    { label: "Verified Sources", value: "50k+", icon: ShieldCheck },
    { label: "Monthly Users", value: "1.2M", icon: GraduationCap },
    { label: "AI Summaries", value: "Instant", icon: Sparkles },
  ];

  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden bg-background">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-4 pt-20">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 search-gradient opacity-60" />
        
        <div className="max-w-5xl w-full space-y-12 text-center relative z-10">
          <div className="space-y-6 animate-fade-in">
            <Badge variant="outline" className="py-2 px-6 rounded-full border-accent/30 text-primary bg-white/50 backdrop-blur-sm gap-2 shadow-sm">
              <Sparkles className="h-4 w-4 text-accent animate-pulse" />
              <span className="font-semibold tracking-wide">Next-Gen Semantic Research Discovery</span>
            </Badge>
            <h1 className="text-5xl md:text-8xl font-bold tracking-tight text-primary font-headline leading-[1.1]">
              Knowledge is just <br className="hidden md:block" />
              <span className="text-accent">one bridge away.</span>
            </h1>
            <p className="text-lg md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-medium">
              Find, summarize, and organize millions of academic papers with 
              intelligent semantic search that understands your research goals.
            </p>
          </div>

          <div className="animate-fade-in [animation-delay:200ms] flex flex-col items-center gap-6">
            <SearchInput variant="large" />
            <div className="flex items-center gap-6 text-sm text-muted-foreground/60 font-medium italic">
              <span className="flex items-center gap-1.5"><ShieldCheck className="h-4 w-4" /> Trusted by Academics</span>
              <span className="flex items-center gap-1.5"><Zap className="h-4 w-4" /> AI-Powered Analysis</span>
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 pt-12 animate-fade-in [animation-delay:400ms]">
            {stats.map((stat, i) => (
              <div key={i} className="glass-morphism p-6 rounded-3xl border-primary/5 shadow-sm group hover:scale-105 transition-transform duration-300">
                <stat.icon className="h-6 w-6 text-accent mb-3 mx-auto opacity-70 group-hover:opacity-100 transition-opacity" />
                <div className="text-2xl font-bold text-primary">{stat.value}</div>
                <div className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground/70">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Topics Section */}
      <section className="py-12 bg-white/30 backdrop-blur-sm border-y border-primary/5">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-center gap-8">
            <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-muted-foreground whitespace-nowrap">
              <TrendingUp className="h-4 w-4 text-accent" />
              Trending Now
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              {popularTopics.map((topic) => (
                <Badge 
                  key={topic} 
                  variant="outline" 
                  className="py-1.5 px-5 cursor-pointer bg-white hover:bg-accent/10 hover:border-accent transition-all duration-300 rounded-xl font-medium text-primary/70"
                  onClick={() => window.location.href = `/search?q=${topic}`}
                >
                  {topic}
                </Badge>
              ))}
            </div>
        </div>
      </section>

      {/* Detailed Info Sections */}
      <section className="py-32 px-4 md:px-8 max-w-7xl mx-auto w-full space-y-40">
        {/* Features Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { 
              icon: BarChart3, 
              title: "Impact Analysis", 
              desc: "Evaluate the influence of research with automated citation tracking and impact scoring across multiple journals." 
            },
            { 
              icon: Layers, 
              title: "Semantic Summaries", 
              desc: "Get to the point faster. Our AI breaks down complex academic jargon into clear, actionable insights." 
            },
            { 
              icon: Globe, 
              title: "Unified Access", 
              desc: "One search connects you to arXiv, PubMed, Semantic Scholar, and hundreds of university archives simultaneously." 
            }
          ].map((feature, i) => (
            <div key={i} className="group p-10 glass-morphism rounded-[2.5rem] border-primary/5 hover:border-accent/40 transition-all duration-500 hover:shadow-2xl relative overflow-hidden">
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-accent/5 rounded-full group-hover:scale-150 transition-transform duration-700" />
              <div className="bg-primary/5 w-16 h-16 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-accent/20 transition-colors">
                <feature.icon className="h-8 w-8 text-primary group-hover:text-accent transition-colors" />
              </div>
              <h3 className="text-2xl font-bold text-primary mb-4">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed text-lg">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Informative Section: Why PaperBridge? */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <Badge className="bg-primary/10 text-primary border-primary/20 px-4 py-1">Why PaperBridge?</Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-primary font-headline leading-tight">
              Bridging the gap between <br />
              <span className="text-accent">raw data and real insight.</span>
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Traditional search engines focus on keywords. We focus on intent. By using advanced semantic embeddings, we understand the scientific context of your query.
            </p>
            <ul className="space-y-4">
              {[
                { icon: Fingerprint, text: "Personalized research recommendations" },
                { icon: ShieldCheck, text: "Curated from peer-reviewed databases" },
                { icon: Zap, text: "Instant summaries for 200M+ abstracts" }
              ].map((item, idx) => (
                <li key={idx} className="flex items-center gap-3 text-lg font-medium text-primary/80">
                  <item.icon className="h-5 w-5 text-accent" />
                  {item.text}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative">
             <div className="absolute inset-0 bg-accent/20 blur-[100px] rounded-full" />
             <div className="relative glass-morphism p-8 rounded-[3rem] border-white/40 shadow-2xl">
                <div className="space-y-6">
                   <div className="flex gap-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold">1</div>
                      <div className="space-y-2">
                         <h4 className="font-bold text-primary">Discover</h4>
                         <p className="text-sm text-muted-foreground">Semantic search scans millions of papers in seconds.</p>
                      </div>
                   </div>
                   <div className="flex gap-4">
                      <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center text-accent font-bold">2</div>
                      <div className="space-y-2">
                         <h4 className="font-bold text-primary">Understand</h4>
                         <p className="text-sm text-muted-foreground">AI-generated summaries distill complex findings into insights.</p>
                      </div>
                   </div>
                   <div className="flex gap-4">
                      <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center text-white font-bold">3</div>
                      <div className="space-y-2">
                         <h4 className="font-bold text-primary">Organize</h4>
                         <p className="text-sm text-muted-foreground">Bookmark and categorize papers into your personal library.</p>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-primary rounded-[4rem] p-12 md:p-24 text-center space-y-10 relative overflow-hidden shadow-[0_20px_50px_rgba(30,58,138,0.3)]">
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent/30 rounded-full -translate-y-1/2 translate-x-1/2 blur-[100px]" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-[100px]" />
          
          <div className="relative z-10 space-y-6">
            <h2 className="text-4xl md:text-7xl font-bold text-white font-headline leading-tight">
              Research smarter, <br /> not harder.
            </h2>
            <p className="text-primary-foreground/70 max-w-2xl mx-auto text-xl font-medium">
              Join a community of 1M+ researchers who use PaperBridge to cut through the noise and find the insights that define their work.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-6 relative z-10 pt-4">
            <Button 
              size="lg" 
              onClick={handleJoin}
              className="bg-accent text-accent-foreground hover:bg-accent/90 h-16 px-12 rounded-[1.5rem] text-xl font-bold shadow-xl transition-all hover:scale-105 active:scale-95"
            >
              Start Free Discovery
            </Button>
            <Link href="/bookmarks">
              <Button size="lg" variant="outline" className="h-16 px-12 rounded-[1.5rem] text-xl font-bold border-white/30 text-white hover:bg-white/10 transition-all backdrop-blur-sm">
                View My Collection
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Partners/Sources Footer */}
      <div className="pb-20 flex flex-col items-center gap-10 mt-12 px-4">
        <div className="text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground/50">Aggregating Global Knowledge From</div>
        <div className="flex items-center justify-center gap-16 text-muted-foreground/40 flex-wrap">
          <div className="flex items-center gap-2 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all cursor-default">
            <BookOpen className="h-6 w-6" />
            <span className="text-sm font-bold uppercase tracking-tighter">arXiv.org</span>
          </div>
          <div className="flex items-center gap-2 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all cursor-default">
            <Sparkles className="h-6 w-6" />
            <span className="text-sm font-bold uppercase tracking-tighter">Semantic Scholar</span>
          </div>
          <div className="flex items-center gap-2 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all cursor-default">
            <Globe className="h-6 w-6" />
            <span className="text-sm font-bold uppercase tracking-tighter">CrossRef</span>
          </div>
          <div className="flex items-center gap-2 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all cursor-default">
            <GraduationCap className="h-6 w-6" />
            <span className="text-sm font-bold uppercase tracking-tighter">DOI Foundation</span>
          </div>
        </div>
      </div>
    </div>
  );
}
