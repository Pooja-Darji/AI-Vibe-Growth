import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";

export const metadata: Metadata = {
  title: "AI Vibe Growth - Marketing Intelligence Dashboard",
  description:
    "Monitor and analyze your ad campaign performance with our intelligent marketing dashboard. Filter, sort, and visualize campaign data with natural language prompts.",
  keywords: [
    "marketing dashboard",
    "ad campaign analytics",
    "marketing intelligence",
    "campaign performance",
    "CTR analysis",
    "conversion tracking",
  ],
  authors: [{ name: "AI Vibe Growth" }],
  creator: "AI Vibe Growth",
  publisher: "AI Vibe Growth",
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "AI Vibe Growth - Marketing Intelligence Dashboard",
    description:
      "Monitor and analyze your ad campaign performance with our intelligent marketing dashboard.",
    siteName: "AI Vibe Growth",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Vibe Growth - Marketing Intelligence Dashboard",
    description:
      "Monitor and analyze your ad campaign performance with our intelligent marketing dashboard.",
    creator: "@aivibegrowth",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
  alternates: {
    canonical: "/",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "AI Vibe Growth - Marketing Intelligence Dashboard",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description:
    "Monitor and analyze your ad campaign performance with our intelligent marketing dashboard. Filter, sort, and visualize campaign data with natural language prompts.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    ratingCount: "120",
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
        <Script
          id="json-ld"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <div className="font-sans antialiased">
          {children}
        </div>
      </body>
    </html>
  );
}
