
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search, BookOpen, PlusCircle, User, MessageSquare } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { ThemeToggle } from "@/components/ThemeToggle";

const Navigation = () => {
  const isMobile = useIsMobile();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex">
          <Link to="/" className="flex items-center space-x-2">
            <BookOpen className="h-6 w-6 text-brand-500" />
            <span className="font-bold text-xl hidden md:inline-block">TextTradeHub</span>
          </Link>
        </div>

        {!isMobile && (
          <div className="flex flex-1 items-center justify-center px-2">
            <div className="w-full max-w-xl lg:max-w-3xl relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                type="search"
                placeholder="Search by title, author, or course code..."
                className="w-full rounded-md border border-input bg-background pl-8 pr-4 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </div>
          </div>
        )}

        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/" title="Home">
              <BookOpen className="h-5 w-5" />
              {isMobile && <span className="sr-only">Home</span>}
            </Link>
          </Button>
          
          <Button variant="ghost" size="icon" asChild>
            <Link to="/my-listings" title="My Listings">
              <User className="h-5 w-5" />
              {isMobile && <span className="sr-only">My Listings</span>}
            </Link>
          </Button>
          
          <Button variant="ghost" size="icon" asChild>
            <Link to="#" title="Messages">
              <MessageSquare className="h-5 w-5" />
              {isMobile && <span className="sr-only">Messages</span>}
            </Link>
          </Button>
          
          <ThemeToggle />
          
          <Button variant="default" size={isMobile ? "icon" : "default"} asChild>
            <Link to="/create-listing">
              {isMobile ? (
                <PlusCircle className="h-5 w-5" />
              ) : (
                <>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  <span>List a Book</span>
                </>
              )}
            </Link>
          </Button>
        </div>
      </div>
      
      {isMobile && (
        <div className="container pb-2">
          <div className="w-full relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search books..."
              className="w-full rounded-md border border-input bg-background pl-8 pr-4 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>
        </div>
      )}
    </header>
  );
};

export default Navigation;
