import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const heading = Playfair_Display({ 
  subsets: ["latin"], 
  variable: "--font-heading",
  weight: ["400", "700", "900"]
});

const body = Inter({ 
  subsets: ["latin"], 
  variable: "--font-body" 
});

export const metadata: Metadata = {
  title: "Aso Ebi Couture | Tradition Meets Modern Elegance",
  description: "Curating bespoke, high-end traditional and contemporary African attire for unforgettable moments.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${heading.variable} ${body.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}