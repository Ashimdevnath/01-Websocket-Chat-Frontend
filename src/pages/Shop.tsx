import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, ShoppingCart, User, LogOut, Star, ArrowLeft } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

// Mock products data
const allProducts = [
  { id: 1, name: "Wireless Mouse", category: "Electronics", price: 29.99, rating: 4.5, stock: 45, image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=400" },
  { id: 2, name: "USB-C Cable", category: "Accessories", price: 12.99, rating: 4.2, stock: 120, image: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=400" },
  { id: 3, name: "Laptop Stand", category: "Accessories", price: 49.99, rating: 4.8, stock: 30, image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400" },
  { id: 4, name: "Mechanical Keyboard", category: "Electronics", price: 89.99, rating: 4.7, stock: 15, image: "https://images.unsplash.com/photo-1595225476474-87563907a212?w=400" },
  { id: 5, name: "Webcam HD", category: "Electronics", price: 59.99, rating: 4.3, stock: 25, image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=400" },
  { id: 6, name: "Phone Case", category: "Accessories", price: 19.99, rating: 4.0, stock: 80, image: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=400" },
  { id: 7, name: "Bluetooth Speaker", category: "Electronics", price: 79.99, rating: 4.6, stock: 20, image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400" },
  { id: 8, name: "Desk Organizer", category: "Office", price: 24.99, rating: 4.4, stock: 50, image: "https://images.unsplash.com/photo-1587828015049-8c1dce9dc30b?w=400" },
  { id: 9, name: "Monitor Stand", category: "Office", price: 39.99, rating: 4.5, stock: 35, image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400" },
];

const categories = ["All", "Electronics", "Accessories", "Office"];

const Shop = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("name");

  const handleLogout = () => {
    navigate("/login");
  };

  // Filter and sort products
  const filteredProducts = allProducts
    .filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      return a.name.localeCompare(b.name);
    });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={() => navigate("/dashboard")}>
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                Shop
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" onClick={() => navigate("/profile")}>
                <User className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                  3
                </Badge>
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive hover:bg-destructive/10">
                    <LogOut className="h-5 w-5" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Confirm Logout</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to logout? You'll need to sign in again to access your account.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleLogout}
                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                      Logout
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Category Filter */}
          <div className="flex gap-2 flex-wrap md:flex-nowrap">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className="min-w-[100px]"
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Sort */}
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="rating">Rating</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Results Count */}
        <div className="mb-4">
          <p className="text-muted-foreground">
            Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
            {selectedCategory !== "All" && ` in ${selectedCategory}`}
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="overflow-hidden hover:shadow-elegant transition-shadow">
              <div className="aspect-square overflow-hidden bg-muted">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-lg line-clamp-2">{product.name}</CardTitle>
                  <Badge variant="secondary" className="shrink-0">
                    {product.category}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pb-3">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 fill-primary text-primary" />
                    <span className="ml-1 text-sm font-medium">{product.rating}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">•</span>
                  <span className="text-sm text-muted-foreground">
                    {product.stock} in stock
                  </span>
                </div>
                <div className="text-2xl font-bold text-primary">${product.price}</div>
              </CardContent>
              <CardFooter>
                <Button className="w-full gap-2">
                  <ShoppingCart className="h-4 w-4" />
                  Add to Cart
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg mb-2">No products found</p>
            <p className="text-sm text-muted-foreground">Try adjusting your filters or search query</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;
