// Now, let's set up the database models to store our products, users, and orders. 
export type Product = {
    id: string;
    name: string;
    description: string;
    price: number;
    images: string[];
    category: string;
    sizes?: string[];
    colors?: string[];
    inStock: boolean;
    createdAt: Date;
    updatedAt: Date;
  };
  
  export type User = {
    id: string;
    name: string;
    email: string;
    image?: string;
    role: 'user' | 'admin';
    createdAt: Date;
    updatedAt: Date;
  };
  
  export type CartItem = {
    id: string;
    productId: string;
    product: Product;
    quantity: number;
    size?: string;
    color?: string;
  };
  
  export type Order = {
    id: string;
    userId: string;
    items: CartItem[];
    status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
    totalAmount: number;
    shippingAddress: Address;
    paymentStatus: 'pending' | 'paid' | 'failed';
    createdAt: Date;
    updatedAt: Date;
  };
  
  export type Address = {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  
  export type Category = {
    id: string;
    name: string;
    slug: string;
    image?: string;
  };