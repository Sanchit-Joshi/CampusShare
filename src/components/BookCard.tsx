
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen } from "lucide-react"; // Removed unused icons
import { BookListing } from "@/data/mockData";
import StarRating from "./StarRating";
// Removed unused Separator import

interface BookCardProps {
  book: BookListing;
}

const BookCard = ({ book }: BookCardProps) => {
  const conditionColor = {
    "New": "bg-green-100 text-green-800 border-green-200",
    "Good": "bg-blue-100 text-blue-800 border-blue-200",
    "Fair": "bg-yellow-100 text-yellow-800 border-yellow-200",
  }[book.condition] || "bg-gray-100 text-gray-800 border-gray-200";

  return (
    <Link to={`/listings/${book.id}`} className="block">
      {/* Reverted h-full from Card and flex structure */}
      <Card className="overflow-hidden transition-all duration-200 hover:shadow-lg hover:-translate-y-1 h-[420px] w-full">
        <div className="h-[250px] relative"> {/* Standard book cover aspect ratio */}
          {book.imageUrl ? (
            <img
              src={book.imageUrl}
              alt={book.title}
              className="object-cover w-full h-full"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-muted">
              <BookOpen className="h-8 w-8 text-muted-foreground" /> {/* Reverted icon size */}
            </div>
          )}
          {book.status === "sold" && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
              <span className="text-white font-bold text-base tracking-wider">SOLD</span>
            </div>
          )}
          {/* Moved price badge for better visibility */}
        </div>
        {/* Reverted padding and removed flex-grow */}
        <CardContent className="p-4 h-[170px] flex flex-col justify-between">
          <div className="flex justify-between items-start mb-1">
             <h3 className="font-semibold text-base leading-tight line-clamp-1 flex-1">{book.title}</h3> {/* Allow two lines for title */}
             <Badge variant="secondary" className="whitespace-nowrap text-xs">₹{book.price.toFixed(2)}</Badge> {/* Moved price here */}
          </div>
          <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">{book.author}</p>
          <p className="text-xs text-muted-foreground">{book.courseCode}</p>
          <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">{book.description}</p>
          <div className="flex justify-between items-center mt-1.5 pt-1.5 border-t border-border/50">
            <Badge variant="outline" className={`${conditionColor} text-xs`}>{book.condition}</Badge>
            <StarRating rating={book.rating} size={14} />
          </div>
        </CardContent>
        {/* Removed CardFooter as content is moved to CardContent */}
      </Card>
    </Link>
  );
};

export default BookCard;
