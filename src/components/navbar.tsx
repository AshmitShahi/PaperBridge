"use client";

import Link from "next/link";
import { BookOpen, Bookmark, Search, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b glass-morphism px-4 md:px-8 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-primary p-2 rounded-lg group-hover:bg-accent transition-colors">
            <BookOpen className="h-6 w-6 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight text-primary font-headline">
            PaperBridge
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-sm font-medium hover:text-accent flex items-center gap-1.5">
            <Home className="h-4 w-4" /> Home
          </Link>
          <Link href="/bookmarks" className="text-sm font-medium hover:text-accent flex items-center gap-1.5">
            <Bookmark className="h-4 w-4" /> Bookmarks
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="md:hidden">
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="outline" className="hidden sm:flex border-primary text-primary hover:bg-primary/5">
            Sign In
          </Button>
          <Button className="bg-primary hover:bg-primary/90">
            Join Platform
          </Button>
        </div>
      </div>
    </nav>
  );
}