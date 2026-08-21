import type { Metadata } from "next";
import { Outfit, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Atharva Sonar — Student Founder & Software Developer",
  description:
    "Atharva Sonar is a student founder and software developer building AI-powered products, full-stack systems and ambitious technology experiments.",
  keywords: [
    "Atharva Sonar",
    "Student Founder",
    "Software Developer",
    "AI Developer",
    "Full Stack Developer",
    "FinGrow",
    "Velquix",
    "Mumbai",
    "Django",
    "React",
    "Python",
  ],
  authors: [{ name: "Atharva Sonar", url: "https://github.com/atharva-404" }],
  creator: "Atharva Sonar",
  openGraph: {
    type: "website",
    title: "Atharva Sonar — Student Founder & Software Developer",
    description:
      "Building AI-powered products, full-stack systems and ambitious technology experiments.",
    siteName: "Atharva Sonar Portfolio",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Atharva Sonar — Student Founder & Software Developer",
    description:
      "Building AI-powered products, full-stack systems and ambitious technology experiments.",
    creator: "@atharva404",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  metadataBase: new URL("https://atharvasonar.dev"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${outfit.variable} ${geist.variable} ${geistMono.variable}`}>
      <head>
        <link rel="canonical" href="https://atharvasonar.dev" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Atharva Sonar",
              jobTitle: "Student Founder & Software Developer",
              description:
                "Student founder and software developer building AI-powered products, full-stack systems and ambitious technology experiments.",
              url: "https://atharvasonar.dev",
              sameAs: [
                "https://github.com/atharva-404",
                "https://www.linkedin.com/in/atharva-sonar-/",
              ],
              knowsAbout: [
                "Python", "Django", "React", "Artificial Intelligence",
                "Full Stack Development", "Product Development", "Fintech",
              ],
              alumniOf: {
                "@type": "CollegeOrUniversity",
                name: "Bharat College of Engineering, Badlapur",
              },
            }),
          }}
        />
      </head>
      <body className="bg-[#FAFAF7] text-[#171A19] font-[family-name:var(--font-sans)] overflow-x-hidden antialiased">
        {children}
      </body>
    </html>
  );
}
