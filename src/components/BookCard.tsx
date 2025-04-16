
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen } from "lucide-react";
import { BookListing } from "@/data/mockData";

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
    <Link to={`/listings/${book.id}`}>
      <Card className="overflow-hidden transition-all duration-200 hover:shadow-md hover:-translate-y-1">
        <div className="aspect-[4/3] relative">
          {book.imageUrl ? (
            <img
              src={book.imageUrl}
              alt={book.title}
              className="object-cover w-full h-full"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-muted">
              <BookOpen className="h-10 w-10 text-muted-foreground" />
            </div>
          )}
          {book.status === "sold" && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
              <span className="text-white font-bold text-lg tracking-wider">SOLD</span>
            </div>
          )}
          <Badge className="absolute top-2 right-2">${book.price.toFixed(2)}</Badge>
        </div>
        <CardContent className="pt-4">
          <h3 className="font-semibold text-lg leading-tight line-clamp-1">{book.title}</h3>
          <p className="text-sm text-muted-foreground line-clamp-1">{book.author}</p>
          <p className="text-xs text-muted-foreground mt-1">{book.courseCode}</p>
        </CardContent>
        <CardFooter className="pt-0 flex justify-between">
          <Badge variant="outline" className={`${conditionColor}`}>
            {book.condition}
          </Badge>
          <span className="text-xs text-muted-foreground">
            {new Date(book.createdAt).toLocaleDateString()}
          </span>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default BookCard;
