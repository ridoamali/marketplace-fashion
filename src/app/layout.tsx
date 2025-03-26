import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SmoothScrollProvider from "@/components/layout/SmoothScrollProvider";
import Providers from "./Providers";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FashionMart | Trendy Fashion Marketplace",
  description: "Your one-stop destination for all fashion needs. Find trendy clothes, accessories, and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        <SmoothScrollProvider>
          <Providers>
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-grow pt-16 md:pt-20">
                {children}
              </main>
              <Footer />
            </div>
            <Toaster position="top-center" />
          </Providers>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}