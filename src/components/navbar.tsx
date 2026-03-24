"use client";

import Link from "next/link";
import { BookOpen, Bookmark, Home, LogOut, User as UserIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUser, useAuth } from "@/firebase";
import { initiateAnonymousSignIn } from "@/firebase/non-blocking-login";
import { signOut } from "firebase/auth";
import { useToast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function Navbar() {
  const { user, isUserLoading } = useUser();
  const auth = useAuth();
  const { toast } = useToast();

  const handleJoin = () => {
    initiateAnonymousSignIn(auth);
    toast({
      title: "Welcome to PaperBridge!",
      description: "You've joined as a guest. Your bookmarks will be saved to this session.",
    });
  };

  const handleSignOut = async () => {
    await signOut(auth);
    toast({
      title: "Signed out",
      description: "You have been successfully signed out.",
    });
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b glass-morphism px-4 md:px-8 py-3 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-primary p-2 rounded-lg group-hover:bg-accent transition-all duration-300 shadow-sm group-hover:shadow-md">
            <BookOpen className="h-6 w-6 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight text-primary font-headline">
            PaperBridge
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-sm font-medium hover:text-accent flex items-center gap-1.5 transition-colors">
            <Home className="h-4 w-4" /> Home
          </Link>
          <Link href="/bookmarks" className="text-sm font-medium hover:text-accent flex items-center gap-1.5 transition-colors">
            <Bookmark className="h-4 w-4" /> Bookmarks
          </Link>
        </div>

        <div className="flex items-center gap-4">
          {!isUserLoading && (
            user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10 border-2 border-primary/10">
                      <AvatarFallback className="bg-primary/5 text-primary">
                        <UserIcon className="h-5 w-5" />
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">Guest User</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user.uid.substring(0, 8)}...
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/bookmarks" className="cursor-pointer">
                      <Bookmark className="mr-2 h-4 w-4" />
                      <span>My Collection</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} className="text-destructive focus:text-destructive cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button 
                  variant="ghost" 
                  className="hidden sm:flex text-primary hover:text-accent"
                  onClick={handleJoin}
                >
                  Sign In
                </Button>
                <Button 
                  className="bg-primary hover:bg-primary/90 shadow-md hover:shadow-lg transition-all"
                  onClick={handleJoin}
                >
                  Join Platform
                </Button>
              </>
            )
          )}
        </div>
      </div>
    </nav>
  );
}
