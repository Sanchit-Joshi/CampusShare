
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowLeft,
  MessageSquare,
  Mail,
  User,
  Calendar,
  BookOpen,
  AlertTriangle
} from "lucide-react";
import { getListingById, getSeller } from "@/data/mockData";

const ListingDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState(true);
  const [listing, setListing] = useState(id ? getListingById(id) : undefined);
  const [seller, setSeller] = useState(
    listing ? getSeller(listing.sellerId) : undefined
  );

  useEffect(() => {
    // Simulate API call
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // In a real app, this would be an API call
        if (id) {
          const bookData = getListingById(id);
          setListing(bookData);
          
          if (bookData) {
            const sellerData = getSeller(bookData.sellerId);
            setSeller(sellerData);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (isLoading) {
    return (
      <div className="container py-8">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse">
            <div className="h-6 w-24 bg-muted rounded mb-4"></div>
            <div className="h-64 bg-muted rounded-lg mb-6"></div>
            <div className="h-8 w-3/4 bg-muted rounded mb-4"></div>
            <div className="h-4 w-1/2 bg-muted rounded mb-6"></div>
            <div className="h-24 bg-muted rounded-lg mb-6"></div>
            <div className="h-40 bg-muted rounded-lg"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="container py-8">
        <div className="max-w-4xl mx-auto text-center py-12">
          <AlertTriangle className="h-12 w-12 mx-auto text-muted-foreground" />
          <h2 className="mt-4 text-2xl font-bold">Listing Not Found</h2>
          <p className="mt-2 text-muted-foreground">
            The book listing you're looking for doesn't exist or has been removed.
          </p>
          <Button asChild className="mt-6">
            <Link to="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const conditionColor = {
    "New": "bg-green-100 text-green-800 border-green-200",
    "Good": "bg-blue-100 text-blue-800 border-blue-200",
    "Fair": "bg-yellow-100 text-yellow-800 border-yellow-200",
  }[listing.condition] || "bg-gray-100 text-gray-800 border-gray-200";

  const formattedDate = new Date(listing.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="container py-8">
      <div className="max-w-4xl mx-auto">
        <Link to="/" className="inline-flex items-center text-sm mb-6 hover:underline">
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back to listings
        </Link>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Book Image */}
          <div className="md:col-span-1">
            <div className="aspect-[3/4] rounded-lg overflow-hidden border bg-muted">
              {listing.imageUrl ? (
                <img
                  src={listing.imageUrl}
                  alt={listing.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <BookOpen className="h-16 w-16 text-muted-foreground" />
                </div>
              )}
            </div>
          </div>
          
          {/* Book Details */}
          <div className="md:col-span-2">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">{listing.title}</h1>
                <p className="text-lg text-muted-foreground mb-2">{listing.author}</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">${listing.price.toFixed(2)}</div>
                <Badge variant="outline" className={`mt-1 ${conditionColor}`}>
                  {listing.condition}
                </Badge>
              </div>
            </div>
            
            {listing.status === "sold" && (
              <div className="mt-4 p-2 bg-destructive/10 text-destructive rounded-md flex items-center">
                <AlertTriangle className="h-5 w-5 mr-2" />
                <span className="font-medium">This book has been sold</span>
              </div>
            )}
            
            <div className="mt-6">
              <h2 className="text-lg font-semibold mb-2">Description</h2>
              <p className="text-muted-foreground">{listing.description}</p>
            </div>
            
            <div className="mt-6">
              <div className="flex items-center text-sm text-muted-foreground">
                <Calendar className="h-4 w-4 mr-1" />
                <span>Listed on {formattedDate}</span>
              </div>
              
              {listing.courseCode && (
                <div className="mt-1 text-sm">
                  <span className="font-medium">Course Code: </span>
                  {listing.courseCode}
                </div>
              )}
            </div>
            
            {seller && (
              <Card className="mt-6">
                <CardContent className="p-4">
                  <h2 className="font-semibold mb-4 flex items-center">
                    <User className="h-4 w-4 mr-1" />
                    <span>Seller Information</span>
                  </h2>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{seller.displayName}</p>
                      <p className="text-sm text-muted-foreground">
                        Contact Preference: {seller.contactPreference === "email" ? "Email" : "In-app Message"}
                      </p>
                    </div>
                    
                    <div className="flex gap-2">
                      {seller.contactPreference === "email" ? (
                        <Button variant="default">
                          <Mail className="h-4 w-4 mr-2" />
                          Email Seller
                        </Button>
                      ) : (
                        <Button variant="default">
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Message Seller
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingDetailPage;
