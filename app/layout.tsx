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
  title: {
    default: "Atharva Sonar — Student Founder & Software Developer | Mumbai",
    template: "%s | Atharva Sonar",
  },
  description:
    "Atharva Sonar is a student founder and full-stack software developer from Mumbai, India. Building AI-powered products like FinGrow, full-stack systems with Django & React, and ambitious technology experiments. Founder of Velquix.",
  keywords: [
    "Atharva Sonar",
    "Atharva Sonar developer",
    "Atharva Sonar portfolio",
    "Atharva Sonar Mumbai",
    "Student Founder",
    "Software Developer",
    "AI Developer",
    "Full Stack Developer",
    "FinGrow",
    "Velquix",
    "Mumbai developer",
    "Django developer",
    "React developer",
    "Python developer",
    "student founder India",
    "AI products India",
    "Bharat College of Engineering",
    "computer science student Mumbai",
  ],
  authors: [{ name: "Atharva Sonar", url: "https://atharvasonar.me" }],
  creator: "Atharva Sonar",
  publisher: "Atharva Sonar",
  openGraph: {
    type: "website",
    title: "Atharva Sonar — Student Founder & Software Developer",
    description:
      "Student founder building AI-powered products, full-stack systems and ambitious technology experiments. Creator of FinGrow and Velquix.",
    siteName: "Atharva Sonar",
    locale: "en_US",
    url: "https://atharvasonar.me",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Atharva Sonar — Student Founder & Software Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Atharva Sonar — Student Founder & Software Developer",
    description:
      "Building AI-powered products, full-stack systems and ambitious technology experiments.",
    creator: "@atharva404",
    images: ["/og-image.png"],
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
  alternates: {
    canonical: "https://atharvasonar.me",
  },
  metadataBase: new URL("https://atharvasonar.me"),
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
  verification: {
    google: "B18oGk-fF0zEKSH2Oun3PbZGLHpmhrvyOE5BHEO7Dcs",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${outfit.variable} ${geist.variable} ${geistMono.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <link rel="canonical" href="https://atharvasonar.me" />
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/favicon.png" />
        <meta name="theme-color" content="#FAFAF7" />
        <meta name="google-site-verification" content="B18oGk-fF0zEKSH2Oun3PbZGLHpmhrvyOE5BHEO7Dcs" />

        {/* JSON-LD Structured Data — Person */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "@id": "https://atharvasonar.me/#person",
              name: "Atharva Sonar",
              givenName: "Atharva",
              familyName: "Sonar",
              jobTitle: "Student Founder & Software Developer",
              description:
                "Student founder and full-stack software developer building AI-powered products, full-stack systems and ambitious technology experiments.",
              url: "https://atharvasonar.me",
              image: "https://atharvasonar.me/atharva sonar.jpeg",
              email: "atharvasonar23@gmail.com",
              sameAs: [
                "https://github.com/atharva-404",
                "https://www.linkedin.com/in/atharva-sonar-/",
              ],
              knowsAbout: [
                "Python",
                "Django",
                "React",
                "Artificial Intelligence",
                "Full Stack Development",
                "Product Development",
                "Fintech",
                "RAG Systems",
                "Machine Learning",
                "REST APIs",
              ],
              alumniOf: {
                "@type": "CollegeOrUniversity",
                name: "Bharat College of Engineering, Badlapur",
              },
              address: {
                "@type": "PostalAddress",
                addressLocality: "Mumbai",
                addressRegion: "Maharashtra",
                addressCountry: "IN",
              },
              worksFor: {
                "@type": "Organization",
                name: "Velquix",
                description: "Product Studio",
              },
            }),
          }}
        />

        {/* JSON-LD Structured Data — WebSite */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "@id": "https://atharvasonar.me/#website",
              name: "Atharva Sonar Portfolio",
              url: "https://atharvasonar.me",
              description:
                "Personal portfolio of Atharva Sonar — student founder and software developer building AI-powered products.",
              author: { "@id": "https://atharvasonar.me/#person" },
            }),
          }}
        />

        {/* JSON-LD Structured Data — ProfilePage */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfilePage",
              "@id": "https://atharvasonar.me/#profilepage",
              name: "Atharva Sonar",
              url: "https://atharvasonar.me",
              mainEntity: { "@id": "https://atharvasonar.me/#person" },
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
