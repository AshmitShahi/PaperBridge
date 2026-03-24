"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function SearchInput({ initialValue = "", variant = "large" }: { initialValue?: string, variant?: "large" | "small" }) {
  const [query, setQuery] = useState(initialValue);
  const [isSearching, setIsSearching] = useState(false);
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setIsSearching(true);
    router.push(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <form onSubmit={handleSearch} className={`relative w-full ${variant === 'large' ? 'max-w-2xl' : 'max-w-xl'}`}>
      <div className="relative group">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
        </div>
        <Input
          type="text"
          placeholder="Search topics like 'Quantum Computing' or 'LLM in Healthcare'..."
          className={`w-full pl-12 pr-24 ${variant === 'large' ? 'h-14 text-lg rounded-2xl' : 'h-11 text-base rounded-xl'} shadow-lg border-2 border-transparent focus-visible:border-accent transition-all`}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="absolute inset-y-2 right-2 flex items-center">
          <Button 
            type="submit" 
            disabled={isSearching}
            className={`${variant === 'large' ? 'h-10 px-6 rounded-xl' : 'h-8 px-4 rounded-lg'} bg-primary hover:bg-primary/90 text-white`}
          >
            {isSearching ? <Loader2 className="h-4 w-4 animate-spin" /> : "Search"}
          </Button>
        </div>
      </div>
    </form>
  );
}