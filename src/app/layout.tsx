
import type { Metadata } from 'next';
import './globals.css';

// Temporarily remove Font imports, ThemeProvider, and Toaster to isolate the issue.

export const metadata: Metadata = {
  title: 'SkillSwap (Debugging)',
  description: 'Debugging 404 issue for SkillSwap.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* Simplified body class */}
      <body>
        {/* <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        > */}
          {children}
          {/* <Toaster /> */}
        {/* </ThemeProvider> */}
      </body>
    </html>
  );
}
