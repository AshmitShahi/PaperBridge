"use client";

import { useEffect, useState } from "react";
import { SearchInput } from "@/components/search-input";
import { Badge } from "@/components/ui/badge";
import { BookOpen, TrendingUp, Sparkles, Clock, ShieldCheck, Zap, Globe, GraduationCap, BarChart3, Star } from "lucide-react";
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
              icon: Sparkles, 
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

        {/* How it Works / Split Section */}
        <div className="flex flex-col lg:flex-row items-center gap-24">
          <div className="lg:w-1/2 space-y-10">
            <div className="space-y-4">
              <Badge className="bg-accent/10 text-accent border-accent/20 px-4 py-1.5 rounded-full font-bold">The Researcher's Workflow</Badge>
              <h2 className="text-5xl md:text-6xl font-bold text-primary leading-[1.1] font-headline">
                Streamline your <br />
                <span className="text-accent">literature review.</span>
              </h2>
            </div>
            <div className="space-y-8">
              {[
                { 
                  step: "01", 
                  title: "Semantic Intent", 
                  desc: "Describe your research question in natural language. Our AI identifies core concepts beyond simple keywords." 
                },
                { 
                  step: "02", 
                  title: "Deep Discovery", 
                  desc: "Cross-reference millions of abstracts. We filter for quality, relevance, and methodological rigor." 
                },
                { 
                  step: "03", 
                  title: "Active Collection", 
                  desc: "Save papers to your personal library and receive related recommendations based on your activity." 
                }
              ].map((item) => (
                <div key={item.step} className="flex gap-6 group">
                  <div className="text-4xl font-bold text-accent/20 font-mono group-hover:text-accent/60 transition-colors">{item.step}</div>
                  <div className="space-y-2">
                    <h4 className="font-bold text-xl text-primary">{item.title}</h4>
                    <p className="text-muted-foreground text-lg leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:w-1/2 w-full relative">
            <div className="aspect-square bg-gradient-to-br from-primary/10 to-accent/20 rounded-[4rem] p-12 flex items-center justify-center relative overflow-hidden shadow-inner">
               <div className="absolute top-0 left-0 w-full h-full bg-grid-white/20 opacity-30" />
               <div className="relative z-10 glass-morphism p-10 rounded-[3rem] shadow-2xl border-white/50 max-w-sm rotate-3 hover:rotate-0 transition-transform duration-700">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-full bg-accent/30 flex items-center justify-center">
                      <Star className="h-6 w-6 text-accent fill-current" />
                    </div>
                    <div className="space-y-2">
                      <div className="h-3 w-32 bg-primary/10 rounded-full" />
                      <div className="h-2 w-20 bg-primary/5 rounded-full" />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="h-5 w-full bg-primary/5 rounded-full" />
                    <div className="h-5 w-4/5 bg-primary/5 rounded-full" />
                    <div className="mt-8 p-5 bg-accent/5 rounded-[2rem] border border-accent/20">
                      <p className="text-[11px] text-accent font-bold uppercase tracking-[0.2em] mb-2">Bridge Insight</p>
                      <div className="h-2 w-full bg-accent/30 rounded-full mb-2" />
                      <div className="h-2 w-3/4 bg-accent/30 rounded-full" />
                    </div>
                  </div>
               </div>
               {/* Decorative floating elements */}
               <div className="absolute top-20 right-10 glass-morphism px-4 py-2 rounded-xl shadow-lg animate-bounce [animation-duration:3s]">
                  <span className="text-xs font-bold text-primary flex items-center gap-2"><Clock className="h-3 w-3" /> Real-time Updates</span>
               </div>
               <div className="absolute bottom-20 left-10 glass-morphism px-4 py-2 rounded-xl shadow-lg animate-bounce [animation-duration:4s]">
                  <span className="text-xs font-bold text-accent flex items-center gap-2"><Star className="h-3 w-3 fill-current" /> Peer Reviewed</span>
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