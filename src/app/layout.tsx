import type {Metadata} from 'next';
import './globals.css';
import { Navbar } from '@/components/navbar';
import { Toaster } from '@/components/ui/toaster';
import { FirebaseClientProvider } from '@/firebase/client-provider';

export const metadata: Metadata = {
  title: 'PaperBridge | Discover Research Semantically',
  description: 'A modern research paper discovery platform helping students find high-quality papers using semantic AI.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased selection:bg-accent/30 selection:text-primary">
        <FirebaseClientProvider>
          <Navbar />
          <main className="min-h-screen">
            {children}
          </main>
          <Toaster />
          <footer className="bg-white border-t py-12 px-4 text-center mt-20">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8 text-left">
                <div className="space-y-2">
                  <h3 className="font-bold text-primary">PaperBridge</h3>
                  <p className="text-sm text-muted-foreground max-w-xs">Connecting curious minds with the world's most rigorous research through semantic AI.</p>
                </div>
                <div className="flex gap-12">
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-primary">Product</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>Search</li>
                      <li>Bookmarks</li>
                      <li>AI Summaries</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-primary">Sources</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>arXiv</li>
                      <li>Semantic Scholar</li>
                      <li>CrossRef</li>
                    </ul>
                  </div>
                </div>
              </div>
              <p className="text-muted-foreground text-xs pt-8 border-t border-muted">
                &copy; {new Date().getFullYear()} PaperBridge Discovery. Powered by Semantic AI. All research materials are property of their respective publishers.
              </p>
            </div>
          </footer>
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
