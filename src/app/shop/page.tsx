"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { 
  Filter, 
  ShoppingBag, 
  Star, 
  Grid3X3, 
  List, 
  Search,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Sheet, 
  SheetClose, 
  SheetContent, 
  SheetDescription, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger,
} from "@/components/ui/sheet";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/contexts/CartContext";
import { products, categories } from "@/lib/mock-data";
import { fadeIn, staggerContainer, cardHover } from "@/lib/animations";
import { Product } from "@/types";

type SortOption = "newest" | "price-asc" | "price-desc" | "name-asc" | "name-desc";
type ViewMode = "grid" | "list";

export default function ShopPage() {
  const { addItem } = useCart();
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [sortOption, setSortOption] = useState<SortOption>("newest");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200]);
  const [isLoading, setIsLoading] = useState(false);

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Filter and sort products
  useEffect(() => {
    setIsLoading(true);
    
    // Filter by search query
    let filtered = products.filter(product => 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    // Filter by category
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(product => 
        selectedCategories.includes(product.category)
      );
    }
    
    // Filter by price range
    filtered = filtered.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );
    
    // Sort products
    filtered = [...filtered].sort((a, b) => {
      switch (sortOption) {
        case "newest":
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "name-asc":
          return a.name.localeCompare(b.name);
        case "name-desc":
          return b.name.localeCompare(a.name);
        default:
          return 0;
      }
    });
    
    // Simulate loading
    const timer = setTimeout(() => {
      setFilteredProducts(filtered);
      setIsLoading(false);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [searchQuery, selectedCategories, sortOption, priceRange]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setPriceRange([0, 200]);
    setSearchQuery("");
  };

  const handleQuickAdd = (product: Product) => {
    addItem(product, 1);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Page Header */}
      <motion.div
        className="text-center mb-12"
        initial="initial"
        animate="animate"
        variants={fadeIn()}
      >
        <h1 className="text-4xl font-bold mb-4">Shop</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Browse our collection of premium fashion items. Discover the perfect pieces to elevate your style.
        </p>
      </motion.div>

      {/* Filters and Sorting */}
      <div className="flex flex-col md:flex-row justify-between mb-8 gap-4">
        <div className="flex gap-2">
          {/* Mobile Filter Button */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[350px]">
              <SheetHeader>
                <SheetTitle>Filter Products</SheetTitle>
                <SheetDescription>
                  Narrow down your search with these filters
                </SheetDescription>
              </SheetHeader>
              
              <div className="mt-6 space-y-6">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="categories">
                    <AccordionTrigger>Categories</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2">
                        {categories.map(category => (
                          <div key={category.id} className="flex items-center space-x-2">
                            <Checkbox 
                              id={`mobile-category-${category.id}`} 
                              checked={selectedCategories.includes(category.slug)}
                              onCheckedChange={() => handleCategoryChange(category.slug)}
                            />
                            <label 
                              htmlFor={`mobile-category-${category.id}`}
                              className="text-sm capitalize"
                            >
                              {category.name}
                            </label>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="price">
                    <AccordionTrigger>Price Range</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        <div className="flex justify-between">
                          <span>${priceRange[0]}</span>
                          <span>${priceRange[1]}</span>
                        </div>
                        <div className="flex gap-4">
                          <Input 
                            type="range" 
                            min="0" 
                            max="200" 
                            value={priceRange[0]}
                            onChange={e => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                            className="w-full"
                          />
                          <Input 
                            type="range" 
                            min="0" 
                            max="200" 
                            value={priceRange[1]}
                            onChange={e => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                            className="w-full"
                          />
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                
                <div className="flex justify-between">
                  <Button variant="outline" onClick={clearFilters}>
                    Clear All
                  </Button>
                  <SheetClose asChild>
                    <Button>Apply Filters</Button>
                  </SheetClose>
                </div>
              </div>
            </SheetContent>
          </Sheet>
          
          {/* Desktop Search */}
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products..."
              className="pl-8 w-full"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-9 w-9"
                onClick={() => setSearchQuery("")}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* View Mode Toggle */}
          <div className="flex border rounded-md">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="icon"
              className="rounded-none rounded-l-md"
              onClick={() => setViewMode("grid")}
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="icon"
              className="rounded-none rounded-r-md"
              onClick={() => setViewMode("list")}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
          
          {/* Sort Dropdown */}
          <Select
            value={sortOption}
            onValueChange={(value) => setSortOption(value as SortOption)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="price-asc">Price: Low to High</SelectItem>
              <SelectItem value="price-desc">Price: High to Low</SelectItem>
              <SelectItem value="name-asc">Name: A to Z</SelectItem>
              <SelectItem value="name-desc">Name: Z to A</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Desktop Sidebar Filters */}
        <div className="hidden md:block w-64 shrink-0">
          <div className="sticky top-24 space-y-6">
            <div>
              <h3 className="font-medium text-lg mb-4">Categories</h3>
              <div className="space-y-2">
                {categories.map(category => (
                  <div key={category.id} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`category-${category.id}`} 
                      checked={selectedCategories.includes(category.slug)}
                      onCheckedChange={() => handleCategoryChange(category.slug)}
                    />
                    <label 
                      htmlFor={`category-${category.id}`}
                      className="text-sm font-medium capitalize"
                    >
                      {category.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            <Separator />
            
            <div>
              <h3 className="font-medium text-lg mb-4">Price Range</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
                <div className="flex flex-col gap-4">
                  <input 
                    type="range" 
                    min="0" 
                    max="200" 
                    value={priceRange[0]}
                    onChange={e => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                    className="w-full"
                  />
                  <input 
                    type="range" 
                    min="0" 
                    max="200" 
                    value={priceRange[1]}
                    onChange={e => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full"
                  />
                </div>
              </div>
            </div>
            
            <Separator />
            
            <Button variant="outline" onClick={clearFilters}>
              Clear All Filters
            </Button>
          </div>
        </div>

        {/* Product Grid/List */}
        <div className="flex-1">
          {/* Active Filters */}
          {(selectedCategories.length > 0 || searchQuery || priceRange[0] > 0 || priceRange[1] < 200) && (
            <div className="mb-6">
              <div className="flex flex-wrap gap-2">
                {selectedCategories.map(category => (
                  <Badge key={category} variant="secondary" className="capitalize">
                    {category}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-4 w-4 ml-1 p-0"
                      onClick={() => handleCategoryChange(category)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
                
                {searchQuery && (
                  <Badge variant="secondary">
                    Search: {searchQuery}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-4 w-4 ml-1 p-0"
                      onClick={() => setSearchQuery("")}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                )}
                
                {(priceRange[0] > 0 || priceRange[1] < 200) && (
                  <Badge variant="secondary">
                    Price: ${priceRange[0]} - ${priceRange[1]}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-4 w-4 ml-1 p-0"
                      onClick={() => setPriceRange([0, 200])}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                )}
              </div>
            </div>
          )}

          {isLoading ? (
            <div className="flex justify-center items-center min-h-[300px]">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <ShoppingBag className="h-16 w-16 mb-4 text-muted-foreground" />
              <h2 className="text-2xl font-medium mb-4">No products found</h2>
              <p className="text-muted-foreground mb-8 max-w-md">
                We could not find any products matching your criteria. Try adjusting your filters or search query.
              </p>
              <Button onClick={clearFilters}>Clear Filters</Button>
            </div>
          ) : (
            <motion.div
              ref={ref}
              initial="initial"
              animate={inView ? "animate" : "initial"}
              variants={staggerContainer}
              className={
                viewMode === "grid" 
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                  : "space-y-6"
              }
            >
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  variants={fadeIn(0.1 * (index % 6))}
                  {...cardHover}
                  className={`
                    group 
                    ${viewMode === "grid" ? "" : "flex border rounded-lg overflow-hidden"}
                  `}
                >
                  {viewMode === "grid" ? (
                    <Link href={`/shop/product/${product.id}`}>
                      <div className="bg-card rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all h-full">
                        <div className="relative aspect-square">
                          <Image
                            src={product.images[0]}
                            alt={product.name}
                            fill
                            style={{ objectFit: "cover" }}
                            className="transition-transform duration-500 group-hover:scale-110"
                          />
                        </div>
                        <div className="p-4">
                          <div className="flex justify-between">
                            <h3 className="font-medium line-clamp-1">{product.name}</h3>
                            <span className="font-semibold text-primary">
                              ${product.price.toFixed(2)}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                            {product.description}
                          </p>
                          <div className="flex justify-between items-center mt-4">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                              ))}
                            </div>
                            <Badge variant="outline" className="capitalize">
                              {product.category}
                            </Badge>
                          </div>
                          <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button 
                              className="w-full"
                              onClick={(e) => {
                                e.preventDefault();
                                handleQuickAdd(product);
                              }}
                            >
                              <ShoppingBag className="mr-2 h-4 w-4" />
                              Quick Add
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ) : (
                    <div className="w-full">
                      <div className="relative h-40 w-40 flex-shrink-0">
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          fill
                          style={{ objectFit: "cover" }}
                        />
                      </div>
                      <div className="flex-grow p-4">
                        <div className="flex justify-between">
                          <Link href={`/shop/product/${product.id}`}>
                            <h3 className="font-medium hover:text-primary">{product.name}</h3>
                          </Link>
                          <span className="font-semibold text-primary">
                            ${product.price.toFixed(2)}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-2 mb-4">
                          {product.description.length > 100 
                            ? `${product.description.substring(0, 100)}...` 
                            : product.description
                          }
                        </p>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <div className="flex mr-2">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                              ))}
                            </div>
                            <Badge variant="outline" className="capitalize">
                              {product.category}
                            </Badge>
                          </div>
                          <div className="flex gap-2">
                            <Button 
                              size="sm"
                              variant="outline"
                              onClick={(e) => {
                                e.preventDefault();
                                handleQuickAdd(product);
                              }}
                            >
                              <ShoppingBag className="mr-2 h-4 w-4" />
                              Add to Cart
                            </Button>
                            <Link href={`/shop/product/${product.id}`}>
                              <Button size="sm">
                                View Details
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}