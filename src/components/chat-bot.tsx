
"use client";

import { useState, useRef, useEffect } from "react";
import { 
  MessageCircle, 
  X, 
  Send, 
  Loader2, 
  BrainCircuit, 
  Sparkles, 
  BookOpen, 
  ArrowRight,
  User
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { semanticPaperSearch, type SemanticPaperSearchOutput } from "@/ai/flows/semantic-paper-search-flow";
import { getPaperBridgeAiInsight } from "@/ai/flows/paperbridge-ai-chat-flow";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface Message {
  role: "user" | "assistant";
  content: string;
  papers?: SemanticPaperSearchOutput;
}

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: "assistant", 
      content: "Hello! I'm PaperBridge AI. Ask me any research-related question, and I'll explain it using peer-reviewed papers." 
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom whenever messages or loading state changes
  useEffect(() => {
    if (scrollRef.current) {
      const scrollContainer = scrollRef.current;
      scrollContainer.scrollTo({
        top: scrollContainer.scrollHeight,
        behavior: "smooth"
      });
    }
  }, [messages, isLoading]);

  const isGreeting = (text: string) => {
    const greetings = ["hi", "hello", "hey", "hola", "greetings", "good morning", "good afternoon", "good evening", "howdy"];
    const thanks = ["thanks", "thank you", "thx", "appreciated", "cheers"];
    const lowered = text.toLowerCase().trim().replace(/[^\w\s]/gi, '');
    return greetings.includes(lowered) || thanks.includes(lowered);
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userQuery = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: "user", content: userQuery }]);
    
    // Check if it's just a greeting or thank you
    if (isGreeting(userQuery)) {
      const lowered = userQuery.toLowerCase();
      let response = "Hello! How can I help you with your research today?";
      if (lowered.includes("thank") || lowered.includes("thx")) {
        response = "You're very welcome! Let me know if you need help exploring more research topics.";
      }
      
      setMessages(prev => [...prev, { 
        role: "assistant", 
        content: response 
      }]);
      return;
    }

    setIsLoading(true);

    try {
      // 1. Search for relevant papers
      const papers = await semanticPaperSearch({ query: userQuery });
      
      // 2. Generate insight based on these papers
      const insight = await getPaperBridgeAiInsight({ 
        query: userQuery, 
        papers: papers.map(p => ({
          title: p.title,
          abstract: p.abstract,
          aiSummary: p.aiSummary
        }))
      });

      setMessages(prev => [...prev, { 
        role: "assistant", 
        content: insight.explanation,
        papers: papers
      }]);
    } catch (error) {
      setMessages(prev => [...prev, { 
        role: "assistant", 
        content: "I encountered an error connecting to my research database. Please try again." 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end gap-4">
      {/* Chat Window */}
      {isOpen && (
        <Card className="w-[90vw] md:w-[420px] h-[600px] shadow-2xl border-accent/20 flex flex-col animate-in slide-in-from-bottom-5 duration-300 rounded-[2rem] overflow-hidden">
          <CardHeader className="bg-primary p-4 flex flex-row items-center justify-between space-y-0 shrink-0">
            <div className="flex items-center gap-2 text-white">
              <div className="bg-white/20 p-1.5 rounded-lg">
                <BrainCircuit className="h-5 w-5" />
              </div>
              <div>
                <CardTitle className="text-sm font-bold font-headline">PaperBridge AI</CardTitle>
                <div className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-[10px] opacity-70">Research Assistant Online</span>
                </div>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsOpen(false)} 
              className="text-white/70 hover:text-white hover:bg-white/10 rounded-full"
            >
              <X className="h-5 w-5" />
            </Button>
          </CardHeader>
          
          <CardContent className="flex-1 p-0 bg-secondary/30 min-h-0 overflow-hidden">
            <ScrollArea className="h-full" viewportRef={scrollRef}>
              <div className="p-4 space-y-6">
                {messages.map((msg, i) => (
                  <div key={i} className={cn(
                    "flex flex-col gap-2 animate-fade-in",
                    msg.role === "user" ? "items-end" : "items-start"
                  )}>
                    <div className={cn(
                      "max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed",
                      msg.role === "user" 
                        ? "bg-primary text-white rounded-tr-none" 
                        : "bg-white border shadow-sm rounded-tl-none text-foreground"
                    )}>
                      {msg.content}
                    </div>
                    
                    {msg.role === "assistant" && msg.papers && msg.papers.length > 0 && (
                      <div className="w-full mt-2 space-y-2">
                        <div className="flex items-center gap-2 px-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                          <BookOpen className="h-3 w-3" />
                          Source Papers
                        </div>
                        <div className="grid gap-2">
                          {msg.papers.slice(0, 2).map((paper, idx) => (
                            <a 
                              key={idx} 
                              href={paper.directLink} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="block p-3 bg-white border rounded-xl hover:border-accent transition-all group"
                            >
                              <div className="text-[11px] font-bold text-primary line-clamp-1 group-hover:text-accent">
                                {paper.title}
                              </div>
                              <div className="text-[9px] text-muted-foreground mt-1 flex items-center justify-between">
                                <span>{paper.authors[0]} ({paper.publicationYear})</span>
                                <ArrowRight className="h-2 w-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                              </div>
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
                {isLoading && (
                  <div className="flex items-start gap-3 animate-fade-in">
                    <div className="bg-white border p-3 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin text-accent" />
                      <span className="text-sm text-muted-foreground">Analyzing research...</span>
                    </div>
                  </div>
                )}
                {/* Extra space at the bottom to ensure last message is fully visible */}
                <div className="h-4" />
              </div>
            </ScrollArea>
          </CardContent>

          <CardFooter className="p-4 bg-white border-t shrink-0">
            <form 
              onSubmit={(e) => { e.preventDefault(); handleSend(); }} 
              className="flex w-full items-center gap-2"
            >
              <Input
                placeholder="Ask about a research topic..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="rounded-xl border-muted focus-visible:ring-accent"
              />
              <Button 
                type="submit" 
                size="icon" 
                disabled={isLoading || !input.trim()}
                className="bg-primary hover:bg-primary/90 shrink-0 rounded-xl"
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </CardFooter>
        </Card>
      )}

      {/* Doodle Button */}
      <Button 
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-16 h-16 rounded-full shadow-2xl transition-all duration-500 group relative p-0 overflow-hidden",
          isOpen ? "bg-accent rotate-90" : "bg-primary hover:scale-110 active:scale-95"
        )}
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-accent/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        {isOpen ? (
          <X className="h-8 w-8 text-white relative z-10" />
        ) : (
          <div className="relative z-10 flex items-center justify-center">
            <BrainCircuit className="h-8 w-8 text-white group-hover:animate-pulse" />
            <Sparkles className="h-4 w-4 text-accent absolute -top-1 -right-1 animate-pulse" />
          </div>
        )}
      </Button>
    </div>
  );
}
