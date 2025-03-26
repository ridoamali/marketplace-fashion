"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle, ArrowRight, PackageCheck, Truck, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { fadeIn, staggerContainer } from "@/lib/animations";

export default function ConfirmationPage() {
  const [orderNumber, setOrderNumber] = useState("");
  
  useEffect(() => {
    // Generate a random order number
    const randomNum = Math.floor(10000000 + Math.random() * 90000000);
    setOrderNumber(`ORD-${randomNum}`);
  }, []);

  // Mock order details
  const order = {
    date: new Date().toLocaleDateString(),
    email: "customer@example.com",
    paymentMethod: "Credit Card",
    shippingMethod: "Standard Shipping",
    estimatedDelivery: (() => {
      const date = new Date();
      date.setDate(date.getDate() + 5); // Add 5 days for standard shipping
      return date.toLocaleDateString();
    })(),
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <motion.div
        className="text-center mb-12"
        initial="initial"
        animate="animate"
        variants={staggerContainer}
      >
        <motion.div 
          className="flex justify-center mb-6"
          variants={fadeIn()}
        >
          <div className="bg-green-100 rounded-full p-4">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
        </motion.div>
        
        <motion.h1 
          className="text-3xl md:text-4xl font-bold mb-3"
          variants={fadeIn(0.1)}
        >
          Order Confirmed!
        </motion.h1>
        
        <motion.p 
          className="text-lg text-muted-foreground max-w-xl mx-auto mb-8"
          variants={fadeIn(0.2)}
        >
          Thank you for your purchase. Your order has been placed successfully.
          We have sent an order confirmation to your email.
        </motion.p>
        
        <motion.div 
          className="bg-muted p-4 rounded-lg inline-block mb-6"
          variants={fadeIn(0.3)}
        >
          <h2 className="text-lg font-medium mb-1">Order Number</h2>
          <p className="text-2xl font-bold">{orderNumber}</p>
        </motion.div>
      </motion.div>

      <motion.div
        className="mb-12 grid grid-cols-1 md:grid-cols-3 gap-6"
        initial="initial"
        animate="animate"
        variants={staggerContainer}
      >
        <motion.div variants={fadeIn(0.3)}>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-primary/10 rounded-full p-3">
                  <ShoppingBag className="h-7 w-7 text-primary" />
                </div>
              </div>
              <h3 className="font-medium mb-1">Order Placed</h3>
              <p className="text-muted-foreground text-sm">{order.date}</p>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div variants={fadeIn(0.4)}>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-primary/10 rounded-full p-3">
                  <PackageCheck className="h-7 w-7 text-primary" />
                </div>
              </div>
              <h3 className="font-medium mb-1">Processing</h3>
              <p className="text-muted-foreground text-sm">Your order is being processed</p>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div variants={fadeIn(0.5)}>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-primary/10 rounded-full p-3">
                  <Truck className="h-7 w-7 text-primary" />
                </div>
              </div>
              <h3 className="font-medium mb-1">Estimated Delivery</h3>
              <p className="text-muted-foreground text-sm">{order.estimatedDelivery}</p>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      <motion.div 
        className="space-y-6"
        initial="initial"
        animate="animate"
        variants={fadeIn(0.6)}
      >
        <Card>
          <CardContent className="p-6 space-y-4">
            <h2 className="font-medium text-lg mb-4">Order Details</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Order Information</h3>
                <ul className="space-y-2">
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">Order Number:</span>
                    <span>{orderNumber}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">Date:</span>
                    <span>{order.date}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">Email:</span>
                    <span>{order.email}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">Payment Method:</span>
                    <span>{order.paymentMethod}</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Shipping Information</h3>
                <ul className="space-y-2">
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">Shipping Method:</span>
                    <span>{order.shippingMethod}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">Estimated Delivery:</span>
                    <span>{order.estimatedDelivery}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">Address:</span>
                    <span>123 Fashion St, New York, NY 10001</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
          <Link href="/shop">
            <Button size="lg">
              Continue Shopping
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button variant="outline" size="lg">
              Track Your Order
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}