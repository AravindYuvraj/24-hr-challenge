
import './globals.css';

export const metadata = {
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
      {/* Simplified body with no dynamic classes from fonts */}
      <body>
        {children}
      </body>
    </html>
  );
}
