import type {Metadata} from 'next';
import './globals.css';
import { Navbar } from '@/components/navbar';
import { Toaster } from '@/components/ui/toaster';

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
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Toaster />
        <footer className="bg-white border-t py-12 px-4 text-center mt-20">
          <div className="max-w-7xl mx-auto">
            <p className="text-muted-foreground text-sm font-medium">
              &copy; {new Date().getFullYear()} PaperBridge Discovery. Powered by Semantic AI.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}