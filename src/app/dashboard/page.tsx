"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Users,
  ShoppingBag,
  Package,
  DollarSign,
  PlusCircle,
  Search,
  ArrowUpRight,
  Edit,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { fadeIn } from "@/lib/animations";
import { products, categories } from "@/lib/mock-data";

export default function DashboardPage() {
  const router = useRouter();
  const { user, isAuthenticated, isAdmin } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated and is admin
    if (!isLoading && (!isAuthenticated || !isAdmin)) {
      router.push("/auth/login");
    }
    
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [isAuthenticated, isAdmin, isLoading, router]);

  // Mock statistics
  const statistics = [
    {
      title: "Total Sales",
      value: "$12,345.67",
      change: "+12.5%",
      icon: <DollarSign className="h-5 w-5" />,
      trend: "up",
    },
    {
      title: "Active Users",
      value: "1,234",
      change: "+7.2%",
      icon: <Users className="h-5 w-5" />,
      trend: "up",
    },
    {
      title: "Orders",
      value: "356",
      change: "+18.3%",
      icon: <ShoppingBag className="h-5 w-5" />,
      trend: "up",
    },
    {
      title: "Products",
      value: "89",
      change: "+4.5%",
      icon: <Package className="h-5 w-5" />,
      trend: "up",
    },
  ];

  // Mock recent orders
  const recentOrders = [
    {
      id: "ORD-001",
      customer: "John Doe",
      date: "2023-03-25",
      amount: "$129.99",
      status: "delivered",
    },
    {
      id: "ORD-002",
      customer: "Jane Smith",
      date: "2023-03-24",
      amount: "$79.99",
      status: "processing",
    },
    {
      id: "ORD-003",
      customer: "Bob Johnson",
      date: "2023-03-23",
      amount: "$249.99",
      status: "shipped",
    },
    {
      id: "ORD-004",
      customer: "Alice Williams",
      date: "2023-03-22",
      amount: "$59.99",
      status: "pending",
    },
    {
      id: "ORD-005",
      customer: "Charlie Brown",
      date: "2023-03-21",
      amount: "$199.99",
      status: "delivered",
    },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-8rem)]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        className="flex flex-col md:flex-row md:items-center md:justify-between mb-8"
        initial="initial"
        animate="animate"
        variants={fadeIn()}
      >
        <div>
          <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, {user?.name || "Admin"}
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex flex-wrap gap-3">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Product
          </Button>
          <Button variant="outline">
            Generate Reports
          </Button>
        </div>
      </motion.div>

      {/* Statistics Cards */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        initial="initial"
        animate="animate"
        variants={fadeIn(0.1)}
      >
        {statistics.map((stat, index) => (
          <Card key={index}>
            <CardContent className="flex flex-row items-center p-6">
              <div className="bg-primary/10 p-3 rounded-full mr-4">
                {stat.icon}
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">
                  {stat.title}
                </p>
                <h3 className="text-2xl font-bold">{stat.value}</h3>
                <p className={`text-xs ${
                  stat.trend === "up" ? "text-green-500" : "text-red-500"
                }`}>
                  {stat.change} from last month
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </motion.div>

      <Tabs defaultValue="products" className="mb-8">
        <motion.div 
          initial="initial"
          animate="animate"
          variants={fadeIn(0.2)}
        >
          <TabsList className="mb-6">
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="customers">Customers</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
          </TabsList>
        </motion.div>

        <TabsContent value="products">
          <motion.div 
            className="mb-4 flex justify-between items-center"
            initial="initial"
            animate="animate"
            variants={fadeIn(0.3)}
          >
            <h2 className="text-xl font-semibold">Products</h2>
            <div className="flex gap-4">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="pl-8 w-[250px]"
                />
              </div>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Product
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial="initial"
            animate="animate"
            variants={fadeIn(0.4)}
          >
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="capitalize">
                        {product.category}
                      </Badge>
                    </TableCell>
                    <TableCell>${product.price.toFixed(2)}</TableCell>
                    <TableCell>
                      <Badge className={product.inStock ? "bg-green-500" : "bg-red-500"}>
                        {product.inStock ? "In Stock" : "Out of Stock"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </motion.div>
        </TabsContent>

        <TabsContent value="orders">
          <motion.div 
            className="mb-4"
            initial="initial"
            animate="animate"
            variants={fadeIn(0.3)}
          >
            <h2 className="text-xl font-semibold">Recent Orders</h2>
          </motion.div>
          
          <motion.div
            initial="initial"
            animate="animate"
            variants={fadeIn(0.4)}
          >
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>{order.customer}</TableCell>
                    <TableCell>{order.date}</TableCell>
                    <TableCell>{order.amount}</TableCell>
                    <TableCell>
                      <Badge
                        className={
                          order.status === "delivered"
                            ? "bg-green-500"
                            : order.status === "shipped"
                            ? "bg-blue-500"
                            : order.status === "processing"
                            ? "bg-yellow-500"
                            : "bg-gray-500"
                        }
                      >
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        View Details
                        <ArrowUpRight className="ml-1 h-3 w-3" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </motion.div>
        </TabsContent>
        
        <TabsContent value="customers">
          <div className="flex items-center justify-center p-16">
            <p className="text-muted-foreground">Customer management coming soon</p>
          </div>
        </TabsContent>
        
        <TabsContent value="categories">
          <motion.div 
            className="mb-4 flex justify-between items-center"
            initial="initial"
            animate="animate"
            variants={fadeIn(0.3)}
          >
            <h2 className="text-xl font-semibold">Categories</h2>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Category
            </Button>
          </motion.div>
          
          <motion.div
            initial="initial"
            animate="animate"
            variants={fadeIn(0.4)}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {categories.map((category) => (
              <Card key={category.id}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{category.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">Slug: {category.slug}</p>
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="sm">
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </Button>
                    <Button variant="ghost" size="sm" className="text-destructive">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  );
}