"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/contexts/CartContext";
import { fadeIn, staggerContainer } from "@/lib/animations";

export default function CartPage() {
  const { items, removeItem, updateItemQuantity, clearCart, getCartTotal } = useCart();
  const [isUpdating, setIsUpdating] = useState(false);

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    setIsUpdating(true);
    updateItemQuantity(itemId, newQuantity);
    setTimeout(() => setIsUpdating(false), 500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        initial="initial"
        animate="animate"
        variants={staggerContainer}
        className="mb-8"
      >
        <motion.h1 
          className="text-3xl font-bold mb-2"
          variants={fadeIn()}
        >
          Your Shopping Cart
        </motion.h1>
        <motion.p 
          className="text-muted-foreground"
          variants={fadeIn(0.1)}
        >
          Review and manage your items below.
        </motion.p>
      </motion.div>

      {items.length === 0 ? (
        <motion.div 
          initial="initial"
          animate="animate"
          variants={fadeIn()}
          className="text-center py-16"
        >
          <ShoppingBag className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
          <h2 className="text-2xl font-medium mb-4">Your cart is empty</h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            Looks like you havent added any items to your cart yet. Go ahead and explore our products.
          </p>
          <Link href="/shop">
            <Button size="lg">
              Continue Shopping
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div 
            className="lg:col-span-2 space-y-4"
            initial="initial"
            animate="animate"
            variants={staggerContainer}
          >
            {items.map((item, index) => (
              <motion.div 
                key={item.id}
                variants={fadeIn(0.05 * index)}
                className="bg-card rounded-lg shadow-sm overflow-hidden"
              >
                <div className="flex flex-col sm:flex-row p-4">
                  <div className="relative w-full sm:w-32 h-32 flex-shrink-0 mx-auto sm:mx-0 mb-4 sm:mb-0">
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      fill
                      style={{ objectFit: "cover" }}
                      className="rounded-md"
                    />
                  </div>
                  <div className="flex-grow sm:ml-6">
                    <div className="flex justify-between">
                      <h3 className="text-lg font-medium">{item.product.name}</h3>
                      <span className="font-semibold">${(item.product.price * item.quantity).toFixed(2)}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                      {item.product.description.substring(0, 100)}...
                    </p>
                    {item.size && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-muted text-muted-foreground mr-2">
                        Size: {item.size}
                      </span>
                    )}
                    {item.color && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-muted text-muted-foreground">
                        Color: {item.color}
                      </span>
                    )}
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          disabled={isUpdating || item.quantity <= 1}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-12 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          disabled={isUpdating}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                        onClick={() => removeItem(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            <div className="flex justify-between items-center mt-6">
              <Button variant="outline" onClick={clearCart}>
                Clear Cart
              </Button>
              <Link href="/shop">
                <Button variant="outline">
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </motion.div>

          <motion.div 
            className="lg:col-span-1"
            initial="initial"
            animate="animate"
            variants={fadeIn(0.3)}
          >
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${getCartTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax</span>
                  <span>${(getCartTotal() * 0.1).toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>${(getCartTotal() * 1.1).toFixed(2)}</span>
                </div>
              </CardContent>
              <CardFooter>
                <Link href="/checkout" className="w-full">
                  <Button className="w-full" size="lg">
                    Proceed to Checkout
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </motion.div>
        </div>
      )}
    </div>
  );
}