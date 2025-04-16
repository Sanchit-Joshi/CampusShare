
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  Plus,
  MoreVertical,
  Pencil,
  Trash2,
  Tag,
  AlertTriangle,
} from "lucide-react";
import { mockListings } from "@/data/mockData";

const MyListingsPage = () => {
  // In a real app, this would come from auth
  const currentUserId = "user1";
  
  const { toast } = useToast();
  const [userListings, setUserListings] = useState(
    mockListings.filter((listing) => listing.sellerId === currentUserId)
  );

  const availableListings = userListings.filter(
    (listing) => listing.status === "available"
  );
  
  const soldListings = userListings.filter(
    (listing) => listing.status === "sold"
  );

  const handleMarkAsSold = (id: string) => {
    setUserListings(
      userListings.map((listing) =>
        listing.id === id ? { ...listing, status: "sold" } : listing
      )
    );
    
    toast({
      title: "Listing Updated",
      description: "Your book has been marked as sold.",
    });
  };

  const handleDelete = (id: string) => {
    setUserListings(userListings.filter((listing) => listing.id !== id));
    
    toast({
      title: "Listing Deleted",
      description: "Your book listing has been removed.",
    });
  };

  return (
    <div className="container py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Listings</h1>
        <Button asChild>
          <Link to="/create-listing">
            <Plus className="mr-2 h-4 w-4" />
            Add New Listing
          </Link>
        </Button>
      </div>

      <Tabs defaultValue="available">
        <TabsList>
          <TabsTrigger value="available">
            Available
            {availableListings.length > 0 && (
              <Badge variant="secondary" className="ml-2">
                {availableListings.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="sold">
            Sold
            {soldListings.length > 0 && (
              <Badge variant="secondary" className="ml-2">
                {soldListings.length}
              </Badge>
            )}
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="available">
          {availableListings.length === 0 ? (
            <div className="text-center py-12 border rounded-lg">
              <BookOpen className="h-12 w-12 mx-auto text-muted-foreground" />
              <h3 className="mt-4 text-lg font-medium">No available listings</h3>
              <p className="mt-1 text-muted-foreground">
                You don't have any active book listings.
              </p>
              <Button asChild className="mt-6">
                <Link to="/create-listing">
                  <Plus className="mr-2 h-4 w-4" />
                  Create Your First Listing
                </Link>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
              {availableListings.map((listing) => (
                <Card key={listing.id}>
                  <CardHeader className="p-0">
                    <div className="aspect-[3/2] relative">
                      {listing.imageUrl ? (
                        <img
                          src={listing.imageUrl}
                          alt={listing.title}
                          className="w-full h-full object-cover rounded-t-lg"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-muted rounded-t-lg">
                          <BookOpen className="h-10 w-10 text-muted-foreground" />
                        </div>
                      )}
                      <Badge className="absolute top-2 right-2">
                        ${listing.price.toFixed(2)}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold line-clamp-1">{listing.title}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-1">
                          {listing.author}
                        </p>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link to={`/listings/${listing.id}`}>View Listing</Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link to={`/edit-listing/${listing.id}`}>
                              <Pencil className="mr-2 h-4 w-4" />
                              Edit
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleMarkAsSold(listing.id)}>
                            <Tag className="mr-2 h-4 w-4" />
                            Mark as Sold
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-destructive focus:text-destructive"
                            onClick={() => handleDelete(listing.id)}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-0 pb-4 px-6">
                    <div className="w-full flex justify-between text-sm">
                      <Badge variant="outline">
                        {listing.condition}
                      </Badge>
                      <span className="text-muted-foreground">
                        {new Date(listing.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="sold">
          {soldListings.length === 0 ? (
            <div className="text-center py-12 border rounded-lg">
              <AlertTriangle className="h-12 w-12 mx-auto text-muted-foreground" />
              <h3 className="mt-4 text-lg font-medium">No sold listings</h3>
              <p className="mt-1 text-muted-foreground">
                You haven't sold any books yet.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
              {soldListings.map((listing) => (
                <Card key={listing.id} className="opacity-75">
                  <CardHeader className="p-0">
                    <div className="aspect-[3/2] relative">
                      {listing.imageUrl ? (
                        <img
                          src={listing.imageUrl}
                          alt={listing.title}
                          className="w-full h-full object-cover rounded-t-lg filter grayscale"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-muted rounded-t-lg">
                          <BookOpen className="h-10 w-10 text-muted-foreground" />
                        </div>
                      )}
                      <Badge variant="secondary" className="absolute top-2 right-2">
                        ${listing.price.toFixed(2)}
                      </Badge>
                      <div className="absolute inset-0 bg-background/60 flex items-center justify-center">
                        <Badge variant="destructive" className="text-sm">SOLD</Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <h3 className="font-semibold line-clamp-1">{listing.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-1">
                      {listing.author}
                    </p>
                  </CardContent>
                  <CardFooter className="pt-0 pb-4 px-6">
                    <div className="w-full flex justify-between text-sm">
                      <Badge variant="outline">
                        {listing.condition}
                      </Badge>
                      <span className="text-muted-foreground">
                        {new Date(listing.updatedAt).toLocaleDateString()}
                      </span>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MyListingsPage;
