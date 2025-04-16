
export interface BookListing {
  id: string;
  sellerId: string;
  title: string;
  author: string;
  courseCode: string;
  condition: "New" | "Good" | "Fair";
  price: number;
  description: string;
  imageUrl: string;
  status: "available" | "sold";
  createdAt: string;
  updatedAt: string;
}

export interface User {
  uid: string;
  displayName: string;
  email: string;
  createdAt: string;
  contactPreference: "email" | "in-app";
}

export const mockUsers: User[] = [
  {
    uid: "user1",
    displayName: "Alex Johnson",
    email: "alex.johnson@university.edu",
    createdAt: "2023-05-15T10:30:00Z",
    contactPreference: "email"
  },
  {
    uid: "user2",
    displayName: "Jamie Smith",
    email: "jamie.smith@university.edu",
    createdAt: "2023-06-20T14:45:00Z",
    contactPreference: "in-app"
  },
  {
    uid: "user3",
    displayName: "Taylor Williams",
    email: "taylor.williams@university.edu",
    createdAt: "2023-07-05T09:15:00Z",
    contactPreference: "email"
  }
];

export const mockListings: BookListing[] = [
  {
    id: "book1",
    sellerId: "user1",
    title: "Introduction to Computer Science",
    author: "John Smith",
    courseCode: "CS101",
    condition: "Good",
    price: 45.99,
    description: "Slightly used textbook for CS101, has some highlighting in chapter 3-5 but otherwise in great condition.",
    imageUrl: "https://images.unsplash.com/photo-1532012197267-da84d127e765?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=768&q=80",
    status: "available",
    createdAt: "2023-08-10T08:00:00Z",
    updatedAt: "2023-08-10T08:00:00Z"
  },
  {
    id: "book2",
    sellerId: "user2",
    title: "Principles of Economics",
    author: "Gregory Mankiw",
    courseCode: "ECON201",
    condition: "New",
    price: 65.00,
    description: "Brand new economics textbook, never used. Bought it but ended up dropping the class.",
    imageUrl: "https://images.unsplash.com/photo-1589998059171-988d887df646?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=768&q=80",
    status: "available",
    createdAt: "2023-08-12T10:30:00Z",
    updatedAt: "2023-08-12T10:30:00Z"
  },
  {
    id: "book3",
    sellerId: "user3",
    title: "Organic Chemistry",
    author: "Paula Bruice",
    courseCode: "CHEM240",
    condition: "Fair",
    price: 30.50,
    description: "Used organic chemistry textbook with some wear and tear. Contains my notes which might be helpful.",
    imageUrl: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=768&q=80",
    status: "available",
    createdAt: "2023-08-15T14:15:00Z",
    updatedAt: "2023-08-15T14:15:00Z"
  },
  {
    id: "book4",
    sellerId: "user1",
    title: "Calculus: Early Transcendentals",
    author: "James Stewart",
    courseCode: "MATH201",
    condition: "Good",
    price: 55.75,
    description: "Calculus textbook in good condition, used for one semester. No writing inside.",
    imageUrl: "https://images.unsplash.com/photo-1621351183012-e2f9972dd9bf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=768&q=80",
    status: "available",
    createdAt: "2023-08-18T09:45:00Z",
    updatedAt: "2023-08-18T09:45:00Z"
  },
  {
    id: "book5",
    sellerId: "user2",
    title: "Introduction to Psychology",
    author: "David G. Myers",
    courseCode: "PSYC101",
    condition: "New",
    price: 70.25,
    description: "New psychology textbook, still in shrink wrap. Decided to use a different book for the course.",
    imageUrl: "https://images.unsplash.com/photo-1576872381149-7847515ce5d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=768&q=80",
    status: "available",
    createdAt: "2023-08-20T16:30:00Z",
    updatedAt: "2023-08-20T16:30:00Z"
  },
  {
    id: "book6",
    sellerId: "user3",
    title: "Environmental Science",
    author: "G. Tyler Miller",
    courseCode: "ENVS150",
    condition: "Fair",
    price: 25.99,
    description: "Used environmental science textbook. Cover has some wear but content is in good shape.",
    imageUrl: "https://images.unsplash.com/photo-1497644083578-611b798c60f3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=768&q=80",
    status: "sold",
    createdAt: "2023-08-22T11:20:00Z",
    updatedAt: "2023-08-25T13:45:00Z"
  }
];

export const getSeller = (sellerId: string): User | undefined => {
  return mockUsers.find(user => user.uid === sellerId);
};

export const getListingById = (id: string): BookListing | undefined => {
  return mockListings.find(listing => listing.id === id);
};

export const getListingsByUser = (userId: string): BookListing[] => {
  return mockListings.filter(listing => listing.sellerId === userId);
};

export const filterListings = (
  query: string = "",
  priceMin: number = 0,
  priceMax: number = 1000,
  condition: string = "",
  status: string = "available"
): BookListing[] => {
  return mockListings.filter(listing => {
    // Filter by status
    if (status && listing.status !== status) return false;
    
    // Filter by query (title, author, course code)
    if (query) {
      const queryLower = query.toLowerCase();
      const matchesTitle = listing.title.toLowerCase().includes(queryLower);
      const matchesAuthor = listing.author.toLowerCase().includes(queryLower);
      const matchesCourseCode = listing.courseCode.toLowerCase().includes(queryLower);
      
      if (!(matchesTitle || matchesAuthor || matchesCourseCode)) return false;
    }
    
    // Filter by price range
    if (listing.price < priceMin || listing.price > priceMax) return false;
    
    // Filter by condition
    if (condition && listing.condition !== condition) return false;
    
    return true;
  });
};
