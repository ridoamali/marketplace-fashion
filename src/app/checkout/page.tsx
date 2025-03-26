"use client";

import { useState } from "react";
import Link from "next/link";
// import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { 
  CreditCard, 
  CheckCircle2, 
  ChevronLeft,
  ArrowLeft,
  Truck,
  ShieldCheck,
  ShoppingCart,
  Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { toast } from "sonner";
import { useCart } from "@/contexts/CartContext";
import { fadeIn, slideInLeft, slideInRight } from "@/lib/animations";

const shippingSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 characters"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  city: z.string().min(2, "City must be at least 2 characters"),
  state: z.string().min(2, "State must be at least 2 characters"),
  postalCode: z.string().min(5, "Postal code must be at least 5 characters"),
  country: z.string().min(2, "Country must be at least 2 characters"),
  shippingMethod: z.enum(["standard", "express", "overnight"]),
});

const paymentSchema = z.object({
  cardholderName: z.string().min(2, "Cardholder name must be at least 2 characters"),
  cardNumber: z.string().min(16, "Card number must be at least 16 characters"),
  expiryDate: z.string().min(5, "Expiry date must be in MM/YY format").regex(/^\d{2}\/\d{2}$/, "Must be in MM/YY format"),
  cvv: z.string().min(3, "CVV must be at least 3 characters"),
  sameAsShipping: z.boolean().optional(),
  billingAddress: z.string().optional(),
  billingCity: z.string().optional(),
  billingState: z.string().optional(),
  billingPostalCode: z.string().optional(),
  billingCountry: z.string().optional(),
});

type ShippingFormValues = z.infer<typeof shippingSchema>;
type PaymentFormValues = z.infer<typeof paymentSchema>;

export default function CheckoutPage() {
//   const router = useRouter();
  const { items, getCartTotal } = useCart();
//   const { items, getCartTotal, clearCart } = useCart();
  const [currentStep, setCurrentStep] = useState(1);
  const [shippingData, setShippingData] = useState<ShippingFormValues | null>(null);
  const [isProcessing] = useState(false);
//   const [isProcessing, setIsProcessing] = useState(false);

  const shippingForm = useForm<ShippingFormValues>({
    resolver: zodResolver(shippingSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
      shippingMethod: "standard",
    },
  });

  const paymentForm = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      cardholderName: "",
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      sameAsShipping: true,
      billingAddress: "",
      billingCity: "",
      billingState: "",
      billingPostalCode: "",
      billingCountry: "",
    },
  });

  const onShippingSubmit = (data: ShippingFormValues) => {
    setShippingData(data);
    setCurrentStep(2);
    // Scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

//   (data: PaymentFormValues)
  const onPaymentSubmit = async () => {
    // setIsProcessing(true);
    
    // // Simulate payment processing
    // try {
    //   await new Promise(resolve => setTimeout(resolve, 2000));
      
    //   // Successful payment
    //   toast.success("Payment successful! Your order has been placed.");
    //   clearCart();
      
    //   // Redirect to confirmation page
    //   setTimeout(() => {
    //     router.push("/checkout/confirmation");
    //   }, 1000);
    // } catch (error) {
    //   toast.error("Payment failed. Please try again.");
    //   setIsProcessing(false);
    // }
  };

  const shippingMethods = [
    {
      id: "standard",
      name: "Standard Shipping",
      description: "Delivery in 3-5 business days",
      price: 0,
    },
    {
      id: "express",
      name: "Express Shipping",
      description: "Delivery in 2-3 business days",
      price: 9.99,
    },
    {
      id: "overnight",
      name: "Overnight Shipping",
      description: "Delivery next business day",
      price: 19.99,
    },
  ];

  const getShippingCost = () => {
    if (!shippingData) return 0;
    
    const method = shippingMethods.find(m => m.id === shippingData.shippingMethod);
    return method ? method.price : 0;
  };

  const calculateTax = () => {
    return getCartTotal() * 0.1; // 10% tax rate
  };

  const calculateTotal = () => {
    return getCartTotal() + getShippingCost() + calculateTax();
  };

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] text-center">
        <ShoppingCart className="h-16 w-16 mb-4 text-muted-foreground" />
        <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
        <p className="text-muted-foreground mb-6 max-w-md">
          You dont have any items in your cart yet. Browse our products and add some items to proceed with checkout.
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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        className="flex items-center mb-8"
        initial="initial"
        animate="animate"
        variants={fadeIn()}
      >
        <Link href="/cart" className="flex items-center text-muted-foreground hover:text-foreground transition-colors">
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to Cart
        </Link>
      </motion.div>

      {/* Checkout Steps */}
      <motion.div 
        className="mb-12"
        initial="initial"
        animate="animate"
        variants={fadeIn(0.1)}
      >
        <h1 className="text-3xl font-bold mb-6">Checkout</h1>
        
        <div className="flex justify-between items-center relative">
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-muted -translate-y-1/2 z-0"></div>
          
          <div className="flex flex-col items-center z-10">
            <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
              currentStep >= 1 ? "bg-primary text-white" : "bg-muted text-muted-foreground"
            }`}>
              {currentStep > 1 ? <CheckCircle2 className="h-5 w-5" /> : 1}
            </div>
            <span className="mt-2 text-sm font-medium">Shipping</span>
          </div>
          
          <div className="flex flex-col items-center z-10">
            <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
              currentStep >= 2 ? "bg-primary text-white" : "bg-muted text-muted-foreground"
            }`}>
              {currentStep > 2 ? <CheckCircle2 className="h-5 w-5" /> : 2}
            </div>
            <span className="mt-2 text-sm font-medium">Payment</span>
          </div>
          
          <div className="flex flex-col items-center z-10">
            <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
              currentStep >= 3 ? "bg-primary text-white" : "bg-muted text-muted-foreground"
            }`}>
              3
            </div>
            <span className="mt-2 text-sm font-medium">Confirmation</span>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Checkout Form */}
        <motion.div 
          className="lg:col-span-2"
          initial="initial"
          animate="animate"
          variants={currentStep === 1 ? slideInLeft : slideInRight}
        >
          {/* Step 1: Shipping */}
          {currentStep === 1 && (
            <Card>
              <CardHeader>
                <CardTitle>Shipping Information</CardTitle>
              </CardHeader>
              <CardContent>
                <Form {...shippingForm}>
                  <form onSubmit={shippingForm.handleSubmit(onShippingSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={shippingForm.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>First Name</FormLabel>
                            <FormControl>
                              <Input placeholder="John" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={shippingForm.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Last Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={shippingForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email Address</FormLabel>
                            <FormControl>
                              <Input 
                                type="email" 
                                placeholder="john.doe@example.com" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={shippingForm.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <Input placeholder="(123) 456-7890" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={shippingForm.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Address</FormLabel>
                          <FormControl>
                            <Input placeholder="123 Fashion Street" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-2 gap-6">
                      <FormField
                        control={shippingForm.control}
                        name="city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>City</FormLabel>
                            <FormControl>
                              <Input placeholder="New York" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={shippingForm.control}
                        name="state"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>State/Province</FormLabel>
                            <FormControl>
                              <Input placeholder="NY" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <FormField
                        control={shippingForm.control}
                        name="postalCode"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Postal/ZIP Code</FormLabel>
                            <FormControl>
                              <Input placeholder="10001" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={shippingForm.control}
                        name="country"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Country</FormLabel>
                            <FormControl>
                              <Input placeholder="United States" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="space-y-4">
                      <FormLabel>Shipping Method</FormLabel>
                      <FormField
                        control={shippingForm.control}
                        name="shippingMethod"
                        render={({ field }) => (
                          <FormItem>
                            <div className="space-y-3">
                              {shippingMethods.map((method) => (
                                <div
                                  key={method.id}
                                  className={`flex items-center p-4 border rounded-md cursor-pointer ${
                                    field.value === method.id 
                                      ? "border-primary" 
                                      : "border-border hover:border-primary/50"
                                  }`}
                                  onClick={() => field.onChange(method.id)}
                                >
                                  <div className={`w-5 h-5 rounded-full border mr-3 flex items-center justify-center ${
                                    field.value === method.id ? "border-primary" : "border-muted-foreground"
                                  }`}>
                                    {field.value === method.id && (
                                      <div className="w-3 h-3 rounded-full bg-primary"></div>
                                    )}
                                  </div>
                                  <div className="flex-grow">
                                    <div className="flex justify-between">
                                      <span className="font-medium">{method.name}</span>
                                      <span className="font-semibold">
                                        {method.price === 0 ? "Free" : `$${method.price.toFixed(2)}`}
                                      </span>
                                    </div>
                                    <p className="text-muted-foreground text-sm">{method.description}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="flex justify-end">
                      <Button type="submit" size="lg">
                        Continue to Payment
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          )}

          {/* Step 2: Payment */}
          {currentStep === 2 && (
            <Card>
              <CardHeader>
                <CardTitle>Payment Information</CardTitle>
              </CardHeader>
              <CardContent>
                <Form {...paymentForm}>
                  <form onSubmit={paymentForm.handleSubmit(onPaymentSubmit)} className="space-y-6">
                    <div className="mb-4">
                      <Tabs defaultValue="card" className="w-full">
                        <TabsList className="grid grid-cols-1 md:grid-cols-3">
                          <TabsTrigger value="card" className="flex items-center">
                            <CreditCard className="mr-2 h-4 w-4" /> Credit Card
                          </TabsTrigger>
                          <TabsTrigger value="paypal" disabled>PayPal</TabsTrigger>
                          <TabsTrigger value="applepay" disabled>Apple Pay</TabsTrigger>
                        </TabsList>
                        <TabsContent value="card" className="mt-6">
                          <div className="space-y-6">
                            <FormField
                              control={paymentForm.control}
                              name="cardholderName"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Cardholder Name</FormLabel>
                                  <FormControl>
                                    <Input placeholder="John Doe" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={paymentForm.control}
                              name="cardNumber"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Card Number</FormLabel>
                                  <FormControl>
                                    <Input 
                                      placeholder="4111 1111 1111 1111" 
                                      {...field} 
                                      onChange={(e) => {
                                        // Format card number with spaces
                                        const value = e.target.value.replace(/\s/g, "");
                                        const formattedValue = value.replace(/(.{4})/g, "$1 ").trim();
                                        field.onChange(formattedValue);
                                      }}
                                      maxLength={19}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <div className="grid grid-cols-2 gap-6">
                              <FormField
                                control={paymentForm.control}
                                name="expiryDate"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Expiry Date</FormLabel>
                                    <FormControl>
                                      <Input 
                                        placeholder="MM/YY" 
                                        {...field} 
                                        onChange={(e) => {
                                          const value = e.target.value.replace(/[^\d]/g, "");
                                          if (value.length <= 4) {
                                            const formattedValue = value.length > 2 
                                              ? `${value.slice(0, 2)}/${value.slice(2)}`
                                              : value;
                                            field.onChange(formattedValue);
                                          }
                                        }}
                                        maxLength={5}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              
                              <FormField
                                control={paymentForm.control}
                                name="cvv"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>CVV</FormLabel>
                                    <FormControl>
                                      <Input 
                                        placeholder="123" 
                                        type="password" 
                                        {...field} 
                                        maxLength={4}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                          </div>
                        </TabsContent>
                      </Tabs>
                    </div>

                    <div className="flex items-center space-x-2 mb-4">
                      <input
                        type="checkbox"
                        id="sameAsShipping"
                        className="h-4 w-4 rounded border-border"
                        checked={paymentForm.watch("sameAsShipping")}
                        onChange={(e) => paymentForm.setValue("sameAsShipping", e.target.checked)}
                      />
                      <label
                        htmlFor="sameAsShipping"
                        className="text-sm text-muted-foreground"
                      >
                        Billing address same as shipping address
                      </label>
                    </div>

                    {!paymentForm.watch("sameAsShipping") && (
                      <div className="space-y-6">
                        <h3 className="font-medium">Billing Address</h3>
                        
                        <FormField
                          control={paymentForm.control}
                          name="billingAddress"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Address</FormLabel>
                              <FormControl>
                                <Input placeholder="123 Fashion Street" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <div className="grid grid-cols-2 gap-6">
                          <FormField
                            control={paymentForm.control}
                            name="billingCity"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>City</FormLabel>
                                <FormControl>
                                  <Input placeholder="New York" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={paymentForm.control}
                            name="billingState"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>State/Province</FormLabel>
                                <FormControl>
                                  <Input placeholder="NY" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                          <FormField
                            control={paymentForm.control}
                            name="billingPostalCode"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Postal/ZIP Code</FormLabel>
                                <FormControl>
                                  <Input placeholder="10001" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={paymentForm.control}
                            name="billingCountry"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Country</FormLabel>
                                <FormControl>
                                  <Input placeholder="United States" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    )}

                    <div className="space-y-4 pt-6">
                      <div className="flex items-center text-sm text-muted-foreground mb-6">
                        <ShieldCheck className="h-5 w-5 mr-2 text-green-500" />
                        Your payment information is secure and encrypted
                      </div>
                      
                      <div className="flex justify-between gap-4">
                        <Button 
                          type="button" 
                          variant="outline" 
                          onClick={() => setCurrentStep(1)}
                          disabled={isProcessing}
                        >
                          Back to Shipping
                        </Button>
                        
                        <Button 
                          type="submit" 
                          size="lg" 
                          disabled={isProcessing}
                        >
                          {isProcessing ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Processing...
                            </>
                          ) : (
                            "Place Order"
                          )}
                        </Button>
                      </div>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          )}
        </motion.div>

        {/* Order Summary */}
        <motion.div
          initial="initial"
          animate="animate"
          variants={fadeIn(0.3)}
        >
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="max-h-80 overflow-y-auto space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <div className="relative h-16 w-16 flex-shrink-0 rounded-md overflow-hidden">
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.name}
                        fill
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                    <div className="flex-grow">
                      <h4 className="font-medium text-sm line-clamp-1">{item.product.name}</h4>
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>Qty: {item.quantity}</span>
                        <span>${(item.product.price * item.quantity).toFixed(2)}</span>
                      </div>
                      {item.size && (
                        <span className="text-xs text-muted-foreground">Size: {item.size}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <Separator />
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${getCartTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>
                    {getShippingCost() === 0 
                      ? "Free" 
                      : `$${getShippingCost().toFixed(2)}`
                    }
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax</span>
                  <span>${calculateTax().toFixed(2)}</span>
                </div>
              </div>
              
              <Separator />
              
              <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span>${calculateTotal().toFixed(2)}</span>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <div className="w-full flex items-center text-sm text-muted-foreground">
                <Truck className="h-5 w-5 mr-2" />
                Estimated delivery: 3-5 business days
              </div>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}