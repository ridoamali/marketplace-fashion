"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Star, 
  ShoppingCart, 
  Heart, 
  ChevronLeft, 
  ChevronRight,
  ArrowLeft
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/contexts/CartContext";
import { products } from "@/lib/mock-data";
import { fadeIn, slideInLeft, slideInRight, scaleUp } from "@/lib/animations";
import { useRouter } from "next/router";


// export default function ProductPage({ params }: { params: { id: string } }) {
export default function ProductPage() {
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState<string | undefined>();
  const [selectedColor, setSelectedColor] = useState<string | undefined>();
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  // Find the product by ID
//   const product = products.find(p => p.id === params.id);
const router = useRouter();
const productId = router.query.id;
const product = products.find(p => p.id === productId);


  
  // If product not found, show message and link to shop
  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] text-center">
        <h1 className="text-2xl font-bold mb-4">Product not found</h1>
        <p className="text-muted-foreground mb-6">
          The product you are looking for does not exist or has been removed.
        </p>
        <Link href="/shop">
          <Button>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Shop
          </Button>
        </Link>
      </div>
    );
  }

  // Related products (show a few other products)
  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    setIsAddingToCart(true);
    
    // Add a slight delay to show loading state
    setTimeout(() => {
      addItem(product, quantity, selectedSize, selectedColor);
      setIsAddingToCart(false);
    }, 600);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <motion.div 
        className="mb-8"
        initial="initial"
        animate="animate"
        variants={fadeIn()}
      >
        <nav className="flex text-sm">
          <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
            Home
          </Link>
          <span className="mx-2 text-muted-foreground">/</span>
          <Link href="/shop" className="text-muted-foreground hover:text-foreground transition-colors">
            Shop
          </Link>
          <span className="mx-2 text-muted-foreground">/</span>
          <Link 
            href={`/shop/${product.category}`} 
            className="text-muted-foreground hover:text-foreground transition-colors capitalize"
          >
            {product.category}
          </Link>
          <span className="mx-2 text-muted-foreground">/</span>
          <span className="text-foreground font-medium truncate">{product.name}</span>
        </nav>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <motion.div
          initial="initial"
          animate="animate"
          variants={slideInLeft}
        >
          <div className="relative aspect-square rounded-lg overflow-hidden mb-4">
            <Image
              src={product.images[currentImageIndex]}
              alt={product.name}
              fill
              style={{ objectFit: "cover" }}
              priority
              className="transition-all duration-300 hover:scale-105"
            />
          </div>
          
          <div className="grid grid-cols-4 gap-4">
            {product.images.map((image, index) => (
              <div
                key={index}
                className={`relative aspect-square rounded-md overflow-hidden cursor-pointer border-2 transition-all ${
                  currentImageIndex === index ? "border-primary" : "border-transparent"
                }`}
                onClick={() => setCurrentImageIndex(index)}
              >
                <Image
                  src={image}
                  alt={`${product.name} - Image ${index + 1}`}
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
            ))}
          </div>
        </motion.div>

        {/* Product Details */}
        <motion.div
          initial="initial"
          animate="animate"
          variants={slideInRight}
          className="flex flex-col"
        >
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          
          <div className="flex items-center mb-4">
            <div className="flex mr-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-primary text-primary" />
              ))}
            </div>
            <span className="text-muted-foreground">(42 reviews)</span>
          </div>
          
          <div className="text-2xl font-bold mb-6">${product.price.toFixed(2)}</div>
          
          <p className="text-muted-foreground mb-6">
            {product.description}
          </p>
          
          <Separator className="mb-6" />
          
          {/* Size Selection */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="mb-6">
              <h3 className="font-medium mb-3">Size</h3>
              <div className="flex flex-wrap gap-3">
                {product.sizes.map((size) => (
                  <Button
                    key={size}
                    variant={selectedSize === size ? "default" : "outline"}
                    onClick={() => setSelectedSize(size)}
                    className="w-12 h-12 rounded-md"
                  >
                    {size}
                  </Button>
                ))}
              </div>
            </div>
          )}
          
          {/* Color Selection */}
          {product.colors && product.colors.length > 0 && (
            <div className="mb-6">
              <h3 className="font-medium mb-3">Color</h3>
              <div className="flex flex-wrap gap-3">
                {product.colors.map((color) => (
                  <Button
                    key={color}
                    variant={selectedColor === color ? "default" : "outline"}
                    onClick={() => setSelectedColor(color)}
                    className="px-4 py-2 rounded-md"
                  >
                    {color}
                  </Button>
                ))}
              </div>
            </div>
          )}
          
          {/* Quantity Selection */}
          <div className="mb-6">
            <h3 className="font-medium mb-3">Quantity</h3>
            <div className="flex items-center">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="w-12 text-center">{quantity}</span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity(quantity + 1)}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 mt-4 mb-6">
            <Button 
              className="flex-1 gap-2" 
              size="lg"
              onClick={handleAddToCart}
              disabled={isAddingToCart}
            >
              {isAddingToCart ? (
                <>
                  <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
                  Adding...
                </>
              ) : (
                <>
                  <ShoppingCart className="h-5 w-5" /> 
                  Add to Cart
                </>
              )}
            </Button>
            <Button variant="outline" size="lg" className="flex-1 gap-2">
              <Heart className="h-5 w-5" /> Wishlist
            </Button>
          </div>
          
          <Separator className="mb-6" />
          
          {/* Additional Information */}
          <div className="space-y-2 text-sm">
            <div className="flex">
              <span className="font-medium w-24">SKU:</span>
              <span className="text-muted-foreground">PRD-{product.id}</span>
            </div>
            <div className="flex">
              <span className="font-medium w-24">Category:</span>
              <Link 
                href={`/shop/${product.category}`} 
                className="text-primary hover:underline capitalize"
              >
                {product.category}
              </Link>
            </div>
            <div className="flex">
              <span className="font-medium w-24">Tags:</span>
              <div className="flex flex-wrap gap-1">
                <Badge variant="outline">Fashion</Badge>
                <Badge variant="outline" className="capitalize">{product.category}</Badge>
                <Badge variant="outline">Trendy</Badge>
              </div>
            </div>
            <div className="flex items-center mt-4">
              <span className="font-medium w-24">Share:</span>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                  </svg>
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Product Details Tabs */}
      <motion.div 
        className="mt-16"
        initial="initial"
        animate="animate"
        variants={fadeIn(0.3)}
      >
        <Tabs defaultValue="description">
          <TabsList className="w-full justify-start border-b rounded-none">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
            <TabsTrigger value="reviews">Reviews (42)</TabsTrigger>
          </TabsList>
          
          <TabsContent value="description" className="py-6">
            <div className="prose max-w-none">
              <p>{product.description}</p>
              <p>
                This premium quality {product.name.toLowerCase()} is designed to provide
                both style and comfort. Made from high-quality materials, it is perfect for 
                everyday wear or special occasions.
              </p>
              <h3>Features:</h3>
              <ul>
                <li>Premium quality materials</li>
                <li>Comfortable fit</li>
                <li>Stylish design</li>
                <li>Durable construction</li>
                <li>Easy care instructions</li>
              </ul>
            </div>
          </TabsContent>
          
          <TabsContent value="specifications" className="py-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Materials</h3>
                  <p className="text-muted-foreground">
                    Premium quality materials ensure comfort and durability.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Care Instructions</h3>
                  <p className="text-muted-foreground">
                    Machine wash cold, tumble dry low, do not bleach.
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Dimensions</h3>
                  <p className="text-muted-foreground">
                    Please refer to the size guide for detailed measurements.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Origin</h3>
                  <p className="text-muted-foreground">
                    Designed and manufactured with care.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="reviews" className="py-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-lg">Customer Reviews</h3>
                  <div className="flex items-center mt-1">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                      ))}
                    </div>
                    <span className="ml-2 text-muted-foreground">Based on 42 reviews</span>
                  </div>
                </div>
                <Button>Write a Review</Button>
              </div>
              
              <Separator />
              
              {/* Sample Reviews */}
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <h4 className="font-medium">John D.</h4>
                    <span className="text-muted-foreground text-sm">2 days ago</span>
                  </div>
                  <div className="flex mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-muted-foreground">
                    Great product! The quality is excellent and fits perfectly. Highly recommend.
                  </p>
                </div>
                
                <Separator />
                
                <div>
                  <div className="flex justify-between mb-2">
                    <h4 className="font-medium">Sarah M.</h4>
                    <span className="text-muted-foreground text-sm">1 week ago</span>
                  </div>
                  <div className="flex mb-2">
                    {[...Array(4)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                    {[...Array(1)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-muted" />
                    ))}
                  </div>
                  <p className="text-muted-foreground">
                    Very nice product, though sizing runs a bit small. Order one size up!
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <motion.div 
          className="mt-16"
          initial="initial"
          animate="animate"
          variants={fadeIn(0.4)}
        >
          <h2 className="text-2xl font-bold mb-6">You Might Also Like</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <motion.div
                key={relatedProduct.id}
                variants={scaleUp}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="group"
              >
                <Link href={`/shop/product/${relatedProduct.id}`}>
                  <div className="bg-card rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all">
                    <div className="relative aspect-square">
                      <Image
                        src={relatedProduct.images[0]}
                        alt={relatedProduct.name}
                        fill
                        style={{ objectFit: "cover" }}
                        className="transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium">{relatedProduct.name}</h3>
                      <div className="flex justify-between items-center mt-2">
                        <span className="font-semibold">${relatedProduct.price.toFixed(2)}</span>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="h-3 w-3 fill-primary text-primary" />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}