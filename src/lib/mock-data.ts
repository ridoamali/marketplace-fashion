import { Product, Category, User } from "@/types";

export const products: Product[] = [
  {
    id: "1",
    name: "Classic White T-Shirt",
    description: "A timeless classic white t-shirt made from 100% cotton for maximum comfort and breathability.",
    price: 29.99,
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1480&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1583744946564-b52d01e7f922?q=80&w=1374&auto=format&fit=crop"
    ],
    category: "shirts",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["White", "Black", "Gray"],
    inStock: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    name: "Slim Fit Jeans",
    description: "Modern slim fit jeans with a touch of stretch for comfort throughout the day.",
    price: 59.99,
    images: [
      "https://images.unsplash.com/photo-1582552938357-32b906df40cb?q=80&w=1374&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1604176424472-3e0c6a4a987a?q=80&w=1374&auto=format&fit=crop"
    ],
    category: "pants",
    sizes: ["28", "30", "32", "34", "36"],
    colors: ["Blue", "Black", "Gray"],
    inStock: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "3",
    name: "Leather Jacket",
    description: "Premium leather jacket with stylish design and comfortable fit.",
    price: 199.99,
    images: [
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=1470&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?q=80&w=1392&auto=format&fit=crop"
    ],
    category: "jackets",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "Brown"],
    inStock: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "4",
    name: "Summer Dress",
    description: "Light and flowy summer dress perfect for warm days and casual outings.",
    price: 49.99,
    images: [
      "https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?q=80&w=1530&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=1473&auto=format&fit=crop"
    ],
    category: "dresses",
    sizes: ["XS", "S", "M", "L"],
    colors: ["Floral", "Blue", "Pink"],
    inStock: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "5",
    name: "Running Shoes",
    description: "Lightweight running shoes with excellent cushioning and support.",
    price: 89.99,
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1470&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=1374&auto=format&fit=crop"
    ],
    category: "shoes",
    sizes: ["7", "8", "9", "10", "11", "12"],
    colors: ["Black/Red", "Blue/White", "Gray/Yellow"],
    inStock: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "6",
    name: "Designer Handbag",
    description: "Elegant designer handbag made from premium materials.",
    price: 129.99,
    images: [
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1470&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?q=80&w=1471&auto=format&fit=crop"
    ],
    category: "accessories",
    colors: ["Black", "Brown", "Tan"],
    inStock: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export const categories: Category[] = [
  {
    id: "1",
    name: "Shirts",
    slug: "shirts",
    image: "https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?q=80&w=1374&auto=format&fit=crop"
  },
  {
    id: "2",
    name: "Pants",
    slug: "pants",
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=1626&auto=format&fit=crop"
  },
  {
    id: "3",
    name: "Jackets",
    slug: "jackets",
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1336&auto=format&fit=crop"
  },
  {
    id: "4",
    name: "Dresses",
    slug: "dresses",
    image: "https://images.unsplash.com/photo-1644416877002-97a861bb5862?q=80&w=1414&auto=format&fit=crop"
  },
  {
    id: "5",
    name: "Shoes",
    slug: "shoes",
    image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=1480&auto=format&fit=crop"
  },
  {
    id: "6",
    name: "Accessories",
    slug: "accessories",
    image: "https://images.unsplash.com/photo-1611923134239-b9be5816e23c?q=80&w=1471&auto=format&fit=crop"
  },
];

export const users: User[] = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@example.com",
    image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1480&auto=format&fit=crop",
    role: "admin",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    name: "John Doe",
    email: "john@example.com",
    image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=1374&auto=format&fit=crop",
    role: "user",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];