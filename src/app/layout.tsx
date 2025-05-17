
import type { Metadata } from 'next';
import { Inter } from 'next/font/google'; // Changed to Inter
import './globals.css';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { Toaster } from "@/components/ui/toaster";

// Setup for Inter font
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter', // Using a new variable name
});

export const metadata: Metadata = {
  title: 'SkillSwap',
  description: 'Peer-to-peer skill exchange platform by Firebase Studio',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* Using the Inter font variable */}
      <body className={`${inter.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
