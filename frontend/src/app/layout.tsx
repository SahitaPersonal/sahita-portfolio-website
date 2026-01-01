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
  title: {
    default: "Sahita - Lead Software Engineer Portfolio",
    template: "%s | Sahita - Lead Software Engineer"
  },
  description: "Lead Software Engineer with 6+ years of experience building scalable web applications. Currently leading an 8-member team at Lloyds Technology Centre. Expertise in React, Node.js, TypeScript, and modern cloud technologies.",
  keywords: [
    "Lead Software Engineer",
    "Full-Stack Developer", 
    "React Developer",
    "Node.js Developer",
    "TypeScript Developer",
    "JavaScript Developer",
    "Frontend Developer",
    "Backend Developer",
    "Web Developer",
    "Software Engineer",
    "Dublin Ireland",
    "Lloyds Technology Centre",
    "Open Banking",
    "Payment Initiation Services",
    "React Native",
    "Xamarin",
    "Google Cloud",
    "Azure",
    "Portfolio",
    "Software Development",
    "Team Lead",
    "Technical Leadership"
  ],
  authors: [{ name: "Sahita", url: "https://www.linkedin.com/in/sahita-m-b01956213/" }],
  creator: "Sahita",
  publisher: "Sahita",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://sahita-portfolio-frontend.vercel.app",
    title: "Sahita - Lead Software Engineer Portfolio",
    description: "Lead Software Engineer with 6+ years of experience building scalable web applications. Currently leading an 8-member team at Lloyds Technology Centre.",
    siteName: "Sahita Portfolio",
    images: [
      {
        url: "/images/profile_main.jpg",
        width: 1200,
        height: 630,
        alt: "Sahita - Lead Software Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sahita - Lead Software Engineer Portfolio",
    description: "Lead Software Engineer with 6+ years of experience building scalable web applications. Currently leading an 8-member team at Lloyds Technology Centre.",
    images: ["/images/profile_main.jpg"],
  },
  alternates: {
    canonical: "https://sahita-portfolio-frontend.vercel.app",
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Sahita",
    "jobTitle": "Lead Software Engineer",
    "description": "Lead Software Engineer with 6+ years of experience building scalable web applications. Currently leading an 8-member team at Lloyds Technology Centre.",
    "url": "https://sahita-portfolio-frontend.vercel.app",
    "image": "https://sahita-portfolio-frontend.vercel.app/images/profile_main.jpg",
    "sameAs": [
      "https://www.linkedin.com/in/sahita-m-b01956213/",
      "https://github.com/SahitaPersonal"
    ],
    "worksFor": {
      "@type": "Organization",
      "name": "Lloyds Technology Centre"
    },
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Dublin",
      "addressCountry": "Ireland"
    },
    "knowsAbout": [
      "React",
      "Node.js",
      "TypeScript",
      "JavaScript",
      "React Native",
      "Xamarin",
      "Google Cloud",
      "Azure",
      "Open Banking",
      "Payment Initiation Services",
      "Full-Stack Development",
      "Technical Leadership"
    ],
    "alumniOf": {
      "@type": "EducationalOrganization",
      "name": "Vishnu Institute of Technology"
    }
  }

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
