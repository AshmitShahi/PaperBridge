"use client";

import { useEffect, useState } from "react";
import { PaperCard } from "@/components/paper-card";
import { Bookmark, Search, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import type { SemanticPaperSearchOutput } from "@/ai/flows/semantic-paper-search-flow";

export default function Bookmarks() {
  const [bookmarks, setBookmarks] = useState<SemanticPaperSearchOutput>([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("paper_bookmarks") || "[]");
    setBookmarks(saved);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
      <div className="mb-12 flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-primary font-headline flex items-center gap-3">
            <Bookmark className="h-8 w-8 text-accent fill-current" />
            My Collection
          </h1>
          <p className="text-muted-foreground">Your personal library of saved research papers.</p>
        </div>
        <Link href="/">
          <Button variant="outline" className="gap-2">
            <Search className="h-4 w-4" /> Find More
          </Button>
        </Link>
      </div>

      {bookmarks.length === 0 ? (
        <div className="text-center py-32 glass-morphism rounded-3xl border border-dashed border-primary/20">
          <BookOpen className="h-16 w-16 text-muted-foreground/30 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-primary mb-4">No papers saved yet</h2>
          <p className="text-muted-foreground max-w-sm mx-auto mb-8">
            Start exploring topics and bookmark papers you want to read later.
          </p>
          <Link href="/">
            <Button className="bg-primary hover:bg-primary/90 px-8 h-12 rounded-xl text-lg">
              Discover Research
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {bookmarks.map((paper, idx) => (
            <PaperCard key={idx} paper={paper} />
          ))}
        </div>
      )}
    </div>
  );
}