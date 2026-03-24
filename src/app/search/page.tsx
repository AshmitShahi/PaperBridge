"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { semanticPaperSearch, type SemanticPaperSearchOutput } from "@/ai/flows/semantic-paper-search-flow";
import { PaperCard } from "@/components/paper-card";
import { FilterSidebar } from "@/components/filter-sidebar";
import { SearchInput } from "@/components/search-input";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle, SearchIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  
  const [results, setResults] = useState<SemanticPaperSearchOutput>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!query) return;

    // Save to local history for the dashboard
    try {
      const history = JSON.parse(localStorage.getItem("search_history") || "[]");
      const updatedHistory = [query, ...history.filter((h: string) => h !== query)].slice(0, 10);
      localStorage.setItem("search_history", JSON.stringify(updatedHistory));
    } catch (e) {
      console.warn("Could not save search history", e);
    }

    const performSearch = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await semanticPaperSearch({ query });
        setResults(data);
      } catch (err) {
        console.error("Search Error:", err);
        setError("We encountered an error retrieving research papers. Please try again in a moment.");
      } finally {
        setLoading(false);
      }
    };

    performSearch();
  }, [query]);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
        <div className="w-full md:w-2/3">
          <h1 className="text-2xl font-bold mb-4 flex items-center gap-3">
            <SearchIcon className="h-6 w-6 text-accent" />
            Showing results for <span className="text-primary">"{query}"</span>
          </h1>
          <SearchInput initialValue={query} variant="small" />
        </div>
        <div className="hidden md:block text-right">
          <p className="text-sm font-medium text-muted-foreground">
            {loading ? "Discovering papers..." : `Found ${results.length} relevant publications`}
          </p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
        <aside className="lg:w-1/4">
          <FilterSidebar />
        </aside>

        <main className="lg:w-3/4 flex-grow">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="space-y-4 bg-white p-6 rounded-2xl border animate-pulse">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-24 w-full" />
                  <div className="flex gap-2">
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Search Failed</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          ) : results.length === 0 ? (
            <div className="text-center py-20 glass-morphism rounded-3xl border border-dashed border-primary/20">
              <SearchIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-xl font-bold mb-2">No papers found</h2>
              <p className="text-muted-foreground">Try adjusting your keywords or using a more general topic.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {results.map((paper, idx) => (
                <PaperCard key={idx} paper={paper} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default function SearchResults() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    }>
      <SearchContent />
    </Suspense>
  );
}
