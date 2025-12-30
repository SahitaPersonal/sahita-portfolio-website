import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  title: "Sahita - Full-Stack Engineer Portfolio",
  description: "Full-stack engineer with 6+ years of experience building scalable web applications. Explore my projects, skills, and professional journey.",
  keywords: ["full-stack developer", "web developer", "React", "Node.js", "TypeScript", "portfolio"],
  authors: [{ name: "Sahita" }],
  robots: "index, follow",
  openGraph: {
    title: "Sahita - Full-Stack Engineer Portfolio",
    description: "Full-stack engineer with 6+ years of experience building scalable web applications.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sahita - Full-Stack Engineer Portfolio",
    description: "Full-stack engineer with 6+ years of experience building scalable web applications.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
