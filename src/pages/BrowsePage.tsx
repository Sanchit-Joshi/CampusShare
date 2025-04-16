import { useState, useEffect } from "react";
import BookCard from "@/components/BookCard";
import SearchFilters, { FilterState } from "@/components/SearchFilters";
import { filterListings, BookListing } from "@/data/mockData";
import { Grid, List, SlidersHorizontal, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

const BrowsePage = () => {
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
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Browse Textbooks</h1>
        <p className="text-muted-foreground">
          Find and compare textbooks from students across your campus.
        </p>
      </div>
      
      {/* Search and Filters */}
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

      {/* Results Display */}
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
                <p className="text-sm text-muted-foreground mt-1">{book.description}</p>
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

export default BrowsePage;