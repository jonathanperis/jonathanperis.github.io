import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jonathan Peris | Senior Software Engineer",
  description:
    "Jonathan Peris is a senior software engineer who builds robust, scalable back-end systems and full-stack applications using .NET and modern cloud technologies.",
  openGraph: {
    title: "Jonathan Peris | Senior Software Engineer",
    description:
      "Jonathan Peris is a senior software engineer who builds robust, scalable back-end systems and full-stack applications using .NET and modern cloud technologies.",
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
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
