"use client";

import { useState, useEffect } from "react";
import { Calendar, Users, Quote, ExternalLink, Download, Bookmark, BookmarkCheck } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { SemanticPaperSearchOutput } from "@/ai/flows/semantic-paper-search-flow";

type Paper = SemanticPaperSearchOutput[number];

export function PaperCard({ paper }: { paper: Paper }) {
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    const bookmarks = JSON.parse(localStorage.getItem("paper_bookmarks") || "[]");
    setIsBookmarked(bookmarks.some((b: any) => b.title === paper.title));
  }, [paper.title]);

  const toggleBookmark = () => {
    const bookmarks = JSON.parse(localStorage.getItem("paper_bookmarks") || "[]");
    if (isBookmarked) {
      const filtered = bookmarks.filter((b: any) => b.title !== paper.title);
      localStorage.setItem("paper_bookmarks", JSON.stringify(filtered));
    } else {
      bookmarks.push(paper);
      localStorage.setItem("paper_bookmarks", JSON.stringify(bookmarks));
    }
    setIsBookmarked(!isBookmarked);
  };

  return (
    <Card className="paper-card-hover border-none shadow-sm overflow-hidden flex flex-col h-full animate-fade-in">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start gap-4">
          <CardTitle className="text-xl font-bold font-headline leading-tight text-primary hover:text-accent cursor-pointer line-clamp-2">
            {paper.title}
          </CardTitle>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleBookmark}
            className={isBookmarked ? "text-accent" : "text-muted-foreground hover:text-accent"}
          >
            {isBookmarked ? <BookmarkCheck className="h-6 w-6 fill-current" /> : <Bookmark className="h-6 w-6" />}
          </Button>
        </div>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span className="line-clamp-1">{paper.authors.slice(0, 3).join(", ")}{paper.authors.length > 3 ? " et al." : ""}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>{paper.publicationYear}</span>
          </div>
          {paper.citationCount !== undefined && (
            <div className="flex items-center gap-1">
              <Quote className="h-4 w-4" />
              <span>{paper.citationCount} Citations</span>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="flex-grow pb-4">
        <div className="bg-muted/30 p-4 rounded-xl mb-4 border border-muted/50">
          <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">AI Summary</h4>
          <p className="text-sm leading-relaxed text-foreground/80 italic">
            "{paper.aiSummary}"
          </p>
        </div>
        <div className="space-y-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Abstract Preview</h4>
          <p className="text-sm line-clamp-3 text-muted-foreground leading-relaxed">
            {paper.abstract}
          </p>
        </div>
      </CardContent>
      <CardFooter className="pt-0 flex gap-3">
        <Button variant="default" className="flex-1 bg-primary hover:bg-primary/90 gap-2" asChild>
          <a href={paper.directLink} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="h-4 w-4" /> View Paper
          </a>
        </Button>
        {paper.pdfPreviewLink && (
          <Button variant="outline" className="flex-1 border-primary text-primary hover:bg-primary/5 gap-2" asChild>
            <a href={paper.pdfPreviewLink} target="_blank" rel="noopener noreferrer">
              <Download className="h-4 w-4" /> PDF
            </a>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}