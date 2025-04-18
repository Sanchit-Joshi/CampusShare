
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import BookCard from "@/components/BookCard";
import SearchFilters, { FilterState } from "@/components/SearchFilters";
import { filterListings, BookListing } from "@/data/mockData";
import { Grid, List, SlidersHorizontal, BookOpen, ArrowRight, RefreshCw, DollarSign, Users } from "lucide-react";
import { useScrollAnimation } from "@/lib/useScrollAnimation";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState<FilterState>({
    priceRange: [0, 200],
    condition: "",
  });
  
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [books, setBooks] = useState<BookListing[]>([]);

  // Update books when search or filters change
  useEffect(() => {
    const filteredBooks = filterListings(
      searchQuery,
      activeFilters.priceRange[0],
      activeFilters.priceRange[1],
      activeFilters.condition
    );
    setBooks(filteredBooks);
  }, [searchQuery, activeFilters]);

  // Handle search input
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Handle filter changes
  const handleFilterChange = (newFilters: FilterState) => {
    setActiveFilters(newFilters);
  };

  return (
    <div className="container py-8">
      {/* Hero Section with CTA */}
      <div className="mb-12 text-center">
        <h1 className="text-5xl font-bold mb-4">CampusShare</h1>
        <p className="text-muted-foreground max-w-3xl mx-auto text-xl mb-8">
          Exchange knowledge, save money - Your campus textbook community marketplace.
        </p>
        <div className="flex justify-center gap-4">
          <Button size="lg" className="px-8" asChild>
            <Link to="/create-listing">
              Sell Your Textbooks
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" className="px-8" asChild>
            <Link to="/browse">
              Browse Books
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
      
      {/* How It Works Section */}
      <div className="mb-16 bg-muted/30 py-10 px-6 rounded-xl" ref={useScrollAnimation({ animation: 'fade-up' })}>
        <h2 className="text-3xl font-bold text-center mb-8">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="h-8 w-8 text-primary" />
            </div>
            <h3 className="font-semibold text-xl mb-2">List Your Books</h3>
            <p className="text-muted-foreground">Upload your textbooks with details like condition, price, and course code.</p>
          </div>
          <div className="text-center">
            <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="h-8 w-8 text-primary" />
            </div>
            <h3 className="font-semibold text-xl mb-2">Connect with Students</h3>
            <p className="text-muted-foreground">Chat with interested buyers or sellers from your campus.</p>
          </div>
          <div className="text-center">
            <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <RefreshCw className="h-8 w-8 text-primary" />
            </div>
            <h3 className="font-semibold text-xl mb-2">Exchange & Save</h3>
            <p className="text-muted-foreground">Meet up on campus to exchange books and save money.</p>
          </div>
        </div>
      </div>
      
      {/* Benefits Section */}
      <div className="mb-16" ref={useScrollAnimation({ animation: 'fade-up', threshold: 0.2 })}>
        <h2 className="text-3xl font-bold text-center mb-8">Why Use CampusShare Hub?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border rounded-lg p-6 hover:shadow-md transition-shadow">
            <DollarSign className="h-10 w-10 text-green-500 mb-4" />
            <h3 className="font-semibold text-xl mb-2">Save Up to 70% on Textbooks</h3>
            <p className="text-muted-foreground">Buy used textbooks directly from other students at a fraction of bookstore prices.</p>
          </div>
          <div className="border rounded-lg p-6 hover:shadow-md transition-shadow">
            <Users className="h-10 w-10 text-blue-500 mb-4" />
            <h3 className="font-semibold text-xl mb-2">Campus Community</h3>
            <p className="text-muted-foreground">Connect with students who've taken your courses for advice and study tips.</p>
          </div>
          <div className="border rounded-lg p-6 hover:shadow-md transition-shadow">
            <RefreshCw className="h-10 w-10 text-purple-500 mb-4" />
            <h3 className="font-semibold text-xl mb-2">Sustainable Education</h3>
            <p className="text-muted-foreground">Reduce waste by giving textbooks a second (or third) life in our circular economy.</p>
          </div>
          <div className="border rounded-lg p-6 hover:shadow-md transition-shadow">
            <BookOpen className="h-10 w-10 text-orange-500 mb-4" />
            <h3 className="font-semibold text-xl mb-2">Course-Specific Books</h3>
            <p className="text-muted-foreground">Find exactly what you need with our course code filtering system.</p>
          </div>
        </div>
      </div>
      
      {/* Search Section Title */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Find Your Textbooks</h2>
        <p className="text-muted-foreground">Search our marketplace for the books you need this semester.</p>
      </div>
      
      <div className="mb-6">
        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Search by title, author, or course code..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full rounded-lg border border-input py-3 pl-4 pr-10 bg-background"
          />
        </div>
        
        <div className="flex flex-wrap justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <SearchFilters onFilterChange={handleFilterChange} />
            <div className="text-sm text-muted-foreground">
              Showing <span className="font-medium">{books.length}</span> results
            </div>
          </div>
          
          <div className="flex items-center space-x-1">
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="icon"
              onClick={() => setViewMode("grid")}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              size="icon"
              onClick={() => setViewMode("list")}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {books.length === 0 ? (
        <div className="text-center py-12">
          <SlidersHorizontal className="h-12 w-12 mx-auto text-muted-foreground" />
          <h3 className="mt-4 text-lg font-medium">No books found</h3>
          <p className="mt-1 text-muted-foreground">
            Try adjusting your search or filters to find what you're looking for.
          </p>
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {books.map((book) => (
            <div key={book.id} className="border rounded-lg p-4 flex gap-4">
              <div className="flex-shrink-0 w-24 h-24 bg-muted rounded-md overflow-hidden">
                {book.imageUrl ? (
                  <img
                    src={book.imageUrl}
                    alt={book.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <BookOpen className="h-8 w-8 text-muted-foreground" />
                  </div>
                )}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">{book.title}</h3>
                <p className="text-sm text-muted-foreground">{book.author}</p>
+                 {/* Consider adding description and rating to list view as well if desired */}
                <div className="flex items-center mt-2 justify-between">
                  <span className="text-sm font-medium">${book.price.toFixed(2)}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-muted-foreground">
                      {book.courseCode}
                    </span>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${
                        book.condition === "New"
                          ? "bg-green-100 text-green-800"
                          : book.condition === "Good"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {book.condition}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;
