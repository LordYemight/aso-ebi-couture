import { Playfair_Display, Inter } from 'next/font/google';
import './globals.css';

const headingFont = Playfair_Display({ 
  subsets: ['latin'], 
  variable: '--font-heading',
  weight: ['400', '700', '900']
});

const bodyFont = Inter({ 
  subsets: ['latin'], 
  variable: '--font-body',
  weight: ['300', '400', '500', '700']
});

export const metadata = {
  title: 'Aso Ebi Couture | Crafting Timeless Elegance',
  description: 'Bespoke, high-end traditional and modern African attire blending rich heritage with contemporary silhouettes.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${headingFont.variable} ${bodyFont.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}