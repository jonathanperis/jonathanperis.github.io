import type { Metadata } from "next";
import "./globals.css";
import Analytics from "./components/analytics";
import JsonLd from "./components/json-ld";

export const metadata: Metadata = {
  metadataBase: new URL("https://jonathanperis.github.io"),
  title: "Jonathan Peris — Software Engineer",
  description:
    "Software Engineer specializing in .NET and Fintech. 12+ years building enterprise-grade systems with modern cloud-native technologies.",
  alternates: {
    canonical: "/",
  },
  keywords: [
    "Jonathan Peris",
    "Software Engineer",
    ".NET",
    "C#",
    "Fintech",
    "Azure",
    "Microservices",
    "CQRS",
    "DDD",
    "Clean Architecture",
    "Backend Developer",
    "Cloud-Native",
  ],
  openGraph: {
    title: "Jonathan Peris — Software Engineer",
    description:
      "Software Engineer specializing in .NET and Fintech. 12+ years building enterprise-grade systems with modern cloud-native technologies.",
    url: "https://jonathanperis.github.io",
    siteName: "Jonathan Peris",
    images: [
      {
        url: "https://jonathanperis.github.io/profile-image-sharing.jpeg",
        width: 460,
        height: 844,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jonathan Peris — Software Engineer",
    description:
      "Software Engineer specializing in .NET and Fintech. 12+ years building enterprise-grade systems with modern cloud-native technologies.",
    creator: "@jperis_silva",
  },
  icons: {
    icon: "/favicon.svg",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta name="theme-color" content="#09090b" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:ital,wght@0,400;0,500;0,700;1,400&display=swap"
          rel="stylesheet"
        />
        <link rel="alternate" hrefLang="en" href="https://jonathanperis.github.io/" />
        <link rel="manifest" href="/manifest.json" />
        <JsonLd />
      </head>
      <body className="antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
