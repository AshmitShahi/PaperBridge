"use client";

import { useState } from "react";
import { evaluateResearchPaper, type PaperEvaluationOutput } from "@/ai/flows/paper-evaluation-flow";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  Search, 
  Trophy, 
  AlertTriangle, 
  CheckCircle, 
  Lightbulb, 
  Target, 
  TrendingUp,
  Loader2,
  Sparkles,
  ChevronRight
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";

export default function PaperEvaluatorPage() {
  const [title, setTitle] = useState("");
  const [abstract, setAbstract] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [evaluation, setEvaluation] = useState<PaperEvaluationOutput | null>(null);
  const { toast } = useToast();

  const handleEvaluate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !abstract.trim()) {
      toast({
        title: "Missing Information",
        description: "Please provide both a title and an abstract to evaluate.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const result = await evaluateResearchPaper({ title, abstract });
      setEvaluation(result);
      toast({
        title: "Evaluation Complete",
        description: "Your paper has been critically reviewed by PaperBridge AI.",
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Evaluation Failed",
        description: "An error occurred while analyzing the paper. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 8) return "text-green-500";
    if (score >= 5) return "text-amber-500";
    return "text-destructive";
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
      <div className="flex flex-col items-center text-center mb-16 space-y-4">
        <Badge variant="outline" className="py-2 px-6 rounded-full border-accent/30 text-primary bg-white/50 backdrop-blur-sm gap-2 shadow-sm">
          <Sparkles className="h-4 w-4 text-accent" />
          <span className="font-semibold">Professional Peer Review AI</span>
        </Badge>
        <h1 className="text-4xl md:text-6xl font-bold text-primary font-headline">
          PaperBridge <span className="text-accent">Evaluator</span>
        </h1>
        <p className="text-muted-foreground max-w-2xl text-lg">
          Get critical, structured feedback on your research paper's quality, novelty, and publication readiness.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Input Section */}
        <div className="lg:col-span-5 space-y-8">
          <Card className="rounded-[2.5rem] border-primary/5 shadow-xl glass-morphism overflow-hidden">
            <CardHeader className="bg-primary/5 border-b border-primary/5 pb-8">
              <CardTitle className="flex items-center gap-2 text-primary">
                <FileText className="h-5 w-5 text-accent" />
                Paper Submission
              </CardTitle>
              <CardDescription>
                Provide the details of the research paper you wish to evaluate.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-8 space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-primary/70 uppercase tracking-wider ml-1">Paper Title</label>
                <Input 
                  placeholder="Enter the full research title..." 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="rounded-xl border-muted focus-visible:ring-accent h-12"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-primary/70 uppercase tracking-wider ml-1">Academic Abstract</label>
                <Textarea 
                  placeholder="Paste the abstract here..." 
                  value={abstract}
                  onChange={(e) => setAbstract(e.target.value)}
                  className="rounded-xl border-muted focus-visible:ring-accent min-h-[300px] text-sm leading-relaxed"
                />
              </div>
              <Button 
                onClick={handleEvaluate}
                disabled={isLoading}
                className="w-full h-14 bg-primary hover:bg-primary/90 rounded-[1.25rem] text-lg font-bold transition-all shadow-lg hover:shadow-primary/20 gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Analyzing Research...
                  </>
                ) : (
                  <>
                    <Target className="h-5 w-5" />
                    Evaluate Paper
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Results Section */}
        <div className="lg:col-span-7 space-y-8 min-h-[600px]">
          {evaluation ? (
            <div className="space-y-8 animate-fade-in">
              {/* Readiness Score Card */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="rounded-3xl border-primary/5 shadow-lg bg-white p-6">
                  <div className="flex flex-col items-center text-center space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Publication Readiness</span>
                    <div className={`text-6xl font-black ${getScoreColor(evaluation.readiness.score)}`}>
                      {evaluation.readiness.score}<span className="text-2xl text-muted-foreground/30">/10</span>
                    </div>
                    <p className="text-xs font-medium text-muted-foreground leading-relaxed px-4">
                      {evaluation.readiness.reason}
                    </p>
                  </div>
                </Card>
                <Card className="rounded-3xl border-primary/5 shadow-lg bg-white p-6">
                  <div className="flex flex-col items-center text-center space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Novelty Assessment</span>
                    <div className="text-xl font-bold text-primary flex items-center gap-2 pt-2">
                      <Trophy className="h-6 w-6 text-accent" />
                      {evaluation.novelty.assessment}
                    </div>
                    <p className="text-xs font-medium text-muted-foreground leading-relaxed px-4">
                      {evaluation.novelty.justification}
                    </p>
                  </div>
                </Card>
              </div>

              {/* Summary */}
              <Card className="rounded-[2rem] border-primary/5 shadow-lg bg-white overflow-hidden">
                <div className="p-8 space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-primary flex items-center gap-2">
                      <Search className="h-5 w-5 text-accent" />
                      Critical Summary
                    </h3>
                    <p className="text-foreground/80 leading-relaxed font-medium italic">
                      "{evaluation.summary}"
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <h4 className="text-sm font-bold text-green-600 uppercase tracking-wider flex items-center gap-2">
                        <CheckCircle className="h-4 w-4" />
                        Strengths
                      </h4>
                      <ul className="space-y-2">
                        {evaluation.strengths.map((s, i) => (
                          <li key={i} className="text-sm text-muted-foreground flex gap-2">
                            <ChevronRight className="h-4 w-4 shrink-0 text-green-500 mt-0.5" />
                            {s}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="space-y-4">
                      <h4 className="text-sm font-bold text-destructive uppercase tracking-wider flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4" />
                        Weaknesses
                      </h4>
                      <ul className="space-y-2">
                        {evaluation.weaknesses.map((w, i) => (
                          <li key={i} className="text-sm text-muted-foreground flex gap-2">
                            <ChevronRight className="h-4 w-4 shrink-0 text-destructive mt-0.5" />
                            {w}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Suggestions & Missing Elements */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card className="rounded-[2rem] border-primary/5 shadow-lg bg-white p-8 space-y-4">
                  <h4 className="text-sm font-bold text-primary uppercase tracking-wider flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-amber-500" />
                    Missing Elements
                  </h4>
                  <ul className="space-y-3">
                    {evaluation.missingElements.map((m, i) => (
                      <li key={i} className="text-sm font-medium text-foreground/70 p-3 bg-muted/30 rounded-xl border border-muted/50">
                        {m}
                      </li>
                    ))}
                  </ul>
                </Card>
                <Card className="rounded-[2rem] border-primary/5 shadow-lg bg-white p-8 space-y-4">
                  <h4 className="text-sm font-bold text-primary uppercase tracking-wider flex items-center gap-2">
                    <Lightbulb className="h-4 w-4 text-accent" />
                    Actionable Improvements
                  </h4>
                  <ul className="space-y-3">
                    {evaluation.suggestions.map((s, i) => (
                      <li key={i} className="text-sm font-medium text-foreground/70 p-3 bg-accent/5 rounded-xl border border-accent/10">
                        {s}
                      </li>
                    ))}
                  </ul>
                </Card>
              </div>

              {/* Enhancements */}
              <Card className="rounded-[2rem] border-accent/20 bg-accent/5 p-8 space-y-4">
                <h4 className="text-lg font-bold text-primary flex items-center gap-2">
                  <TrendingUp className="h-6 w-6 text-accent" />
                  Suggested Enhancements for Strength
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {evaluation.enhancements.map((e, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm font-bold text-primary bg-white/60 p-4 rounded-2xl border border-white">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                      {e}
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center p-12 glass-morphism rounded-[3rem] border-dashed border-2 border-primary/10">
              <FileText className="h-20 w-20 text-muted-foreground/20 mb-6" />
              <h3 className="text-2xl font-bold text-primary mb-2">Ready for Review</h3>
              <p className="text-muted-foreground max-w-sm">
                Submit your research paper details on the left to receive a professional, AI-powered academic evaluation.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
