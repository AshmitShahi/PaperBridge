"use client";

import { useState, useEffect } from "react";
import { Calendar, Users, Quote, ExternalLink, Download, Bookmark, BookmarkCheck, ShieldCheck, Sparkles } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import type { SemanticPaperSearchOutput } from "@/ai/flows/semantic-paper-search-flow";

type Paper = SemanticPaperSearchOutput[number];

export function PaperCard({ paper }: { paper: Paper }) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const bookmarks = JSON.parse(localStorage.getItem("paper_bookmarks") || "[]");
    setIsBookmarked(bookmarks.some((b: any) => b.title === paper.title));
  }, [paper.title]);

  const toggleBookmark = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const bookmarks = JSON.parse(localStorage.getItem("paper_bookmarks") || "[]");
    if (isBookmarked) {
      const filtered = bookmarks.filter((b: any) => b.title !== paper.title);
      localStorage.setItem("paper_bookmarks", JSON.stringify(filtered));
      toast({
        title: "Removed from collection",
        description: "Paper has been removed from your bookmarks.",
      });
    } else {
      bookmarks.push(paper);
      localStorage.setItem("paper_bookmarks", JSON.stringify(bookmarks));
      toast({
        title: "Added to collection",
        description: "Paper has been saved to your bookmarks.",
      });
    }
    setIsBookmarked(!isBookmarked);
  };

  return (
    <Card className="paper-card-hover border border-muted/20 bg-white shadow-sm overflow-hidden flex flex-col h-full animate-fade-in group relative">
      <CardHeader className="pb-3 relative">
        <div className="flex justify-between items-start gap-4">
          <div className="space-y-1">
            <Badge variant="secondary" className="bg-primary/5 text-primary border-primary/10 text-[10px] uppercase tracking-widest font-bold mb-2 flex w-fit items-center gap-1">
              <ShieldCheck className="h-3 w-3" />
              Verified Source
            </Badge>
            <CardTitle className="text-xl font-bold font-headline leading-tight text-primary group-hover:text-accent transition-colors duration-300 line-clamp-2 cursor-pointer">
              {paper.title}
            </CardTitle>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleBookmark}
            className={`rounded-xl transition-all duration-300 ${isBookmarked ? "text-accent bg-accent/10" : "text-muted-foreground hover:text-accent hover:bg-accent/5"}`}
          >
            {isBookmarked ? <BookmarkCheck className="h-6 w-6 fill-current" /> : <Bookmark className="h-6 w-6" />}
          </Button>
        </div>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-4 text-[13px] text-muted-foreground font-medium">
          <div className="flex items-center gap-1.5">
            <Users className="h-3.5 w-3.5 text-primary/40" />
            <span className="line-clamp-1">{paper.authors.slice(0, 3).join(", ")}{paper.authors.length > 3 ? " et al." : ""}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5 text-primary/40" />
            <span>{paper.publicationYear}</span>
          </div>
          {paper.citationCount !== undefined && (
            <div className="flex items-center gap-1.5">
              <Quote className="h-3.5 w-3.5 text-primary/40" />
              <span>{paper.citationCount} Citations</span>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="flex-grow pb-4">
        <div className="bg-muted/30 p-4 rounded-2xl mb-5 border border-muted/50 transition-all group-hover:bg-accent/5">
          <h4 className="text-[10px] font-bold uppercase tracking-widest text-primary/40 mb-2 flex items-center gap-2">
            <Sparkles className="h-3 w-3" />
            Semantic Summary
          </h4>
          <p className="text-sm leading-relaxed text-foreground/80 italic font-medium">
            "{paper.aiSummary}"
          </p>
        </div>
        <div className="space-y-2">
          <h4 className="text-[10px] font-bold uppercase tracking-widest text-primary/40">Academic Abstract</h4>
          <p className="text-[13px] line-clamp-3 text-muted-foreground leading-relaxed">
            {paper.abstract}
          </p>
        </div>
      </CardContent>
      <CardFooter className="pt-0 flex gap-3 mt-auto">
        <Button 
          variant="default" 
          className="flex-1 bg-primary hover:bg-primary/90 rounded-xl shadow-sm hover:shadow-md transition-all gap-2 h-11" 
          asChild
        >
          <a href={paper.directLink} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="h-4 w-4" /> View Paper
          </a>
        </Button>
        {paper.pdfPreviewLink && (
          <Button 
            variant="outline" 
            className="flex-1 border-primary/20 text-primary hover:bg-primary/5 rounded-xl transition-all gap-2 h-11" 
            asChild
          >
            <a href={paper.pdfPreviewLink} target="_blank" rel="noopener noreferrer">
              <Download className="h-4 w-4" /> PDF
            </a>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
