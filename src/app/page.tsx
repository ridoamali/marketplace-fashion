"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { products, categories } from "@/lib/mock-data";
import { 
  fadeIn, 
  staggerContainer, 
  slideInLeft, 
  cardHover,
  bounce 
} from "@/lib/animations";

export default function Home() {
  const [featuredProducts] = useState(products.slice(0, 4));
  
  const { ref: heroRef, inView: heroInView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const { ref: categoriesRef, inView: categoriesInView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const { ref: productsRef, inView: productsInView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const { ref: ctaRef, inView: ctaInView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="relative h-[90vh] flex items-center overflow-hidden"
      >
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1470&auto=format&fit=crop"
            alt="Fashion model"
            fill
            style={{ objectFit: "cover" }}
            priority
            quality={100}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
          <motion.div
            className="max-w-xl text-white"
            initial="initial"
            animate={heroInView ? "animate" : "initial"}
            variants={staggerContainer}
          >
            <motion.h1 
              className="text-5xl md:text-6xl font-bold tracking-tight mb-6"
              variants={slideInLeft}
            >
              Elevate Your Style with Trending Fashion
            </motion.h1>
            <motion.p 
              className="text-lg md:text-xl mb-8 text-white/80"
              variants={slideInLeft}
            >
              Discover the latest fashion trends and elevate your wardrobe with our premium collection of clothing and accessories.
            </motion.p>
            <motion.div 
              className="flex flex-wrap gap-4"
              variants={fadeIn(0.3)}
            >
              <Link href="/shop">
                <Button size="lg" className="text-md font-medium">
                  Shop Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/shop/categories">
                <Button size="lg" variant="outline" className="text-md font-medium bg-transparent text-white border-white hover:bg-white/10">
                  Browse Categories
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Categories Section */}
      <section 
        ref={categoriesRef}
        className="py-20 bg-muted"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="initial"
            animate={categoriesInView ? "animate" : "initial"}
            variants={staggerContainer}
            className="text-center mb-12"
          >
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-4"
              variants={fadeIn(0.1)}
            >
              Shop by Category
            </motion.h2>
            <motion.p 
              className="text-lg text-muted-foreground max-w-2xl mx-auto"
              variants={fadeIn(0.2)}
            >
              Browse our curated collection of fashion categories designed to match your style and preferences.
            </motion.p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
            initial="initial"
            animate={categoriesInView ? "animate" : "initial"}
            variants={staggerContainer}
          >
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                variants={fadeIn(0.1 * index)}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <Link href={`/shop/${category.slug}`}>
                  <Card className="overflow-hidden h-full hover:shadow-md transition-shadow">
                    <div className="relative h-40 w-full">
                      <Image 
                        src={category.image || ''}
                        alt={category.name}
                        fill
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                    <CardContent className="p-4 text-center">
                      <h3 className="font-medium">{category.name}</h3>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section 
        ref={productsRef} 
        className="py-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="initial"
            animate={productsInView ? "animate" : "initial"}
            variants={staggerContainer}
            className="text-center mb-12"
          >
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-4"
              variants={fadeIn(0.1)}
            >
              Featured Products
            </motion.h2>
            <motion.p 
              className="text-lg text-muted-foreground max-w-2xl mx-auto"
              variants={fadeIn(0.2)}
            >
              Our handpicked selection of premium fashion products, designed to help you stand out.
            </motion.p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            initial="initial"
            animate={productsInView ? "animate" : "initial"}
            variants={staggerContainer}
          >
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                variants={fadeIn(0.1 * index)}
                {...cardHover}
                className="group"
              >
                <Link href={`/shop/product/${product.id}`}>
                  <Card className="overflow-hidden h-full border-none shadow-sm hover:shadow-md transition-shadow">
                    <div className="relative h-64 w-full overflow-hidden">
                      <Image 
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        style={{ objectFit: "cover" }}
                        className="transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-medium text-lg mb-1">{product.name}</h3>
                      <div className="flex items-center mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                        ))}
                        <span className="ml-2 text-sm text-muted-foreground">(24)</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-lg">${product.price.toFixed(2)}</span>
                        <Button size="sm" variant="ghost" className="opacity-0 group-hover:opacity-100 transition-opacity">
                          View
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          <motion.div 
            className="text-center mt-12"
            initial="initial"
            animate={productsInView ? "animate" : "initial"}
            variants={fadeIn(0.5)}
          >
            <Link href="/shop">
              <Button size="lg" variant="outline">
                View All Products
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section 
        ref={ctaRef}
        className="py-20 bg-primary text-primary-foreground"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center"
            initial="initial"
            animate={ctaInView ? "animate" : "initial"}
            variants={bounce}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Join Our Fashion Community
            </h2>
            <p className="text-lg max-w-2xl mx-auto mb-8 text-primary-foreground/90">
              Subscribe to our newsletter for exclusive deals, style tips, and new arrivals.
            </p>
            <form className="flex flex-col sm:flex-row max-w-md mx-auto gap-4">
              <input
                type="email"
                placeholder="Your email address"
                className="px-4 py-2 rounded-md flex-grow text-foreground"
                required
              />
              <Button className="bg-background text-primary hover:bg-background/90">
                Subscribe
              </Button>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
}