import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { profile, SITE_URL } from "@/data/profile";
import { MotionProvider } from "@/components/layout/MotionProvider";
import { DEFAULT_OG_IMAGE, SITE_NAME } from "@/lib/seo/site";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk", display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains-mono", display: "swap" });

/**
 * Site-wide defaults. Each page sets its own title, description, canonical,
 * Open Graph and Twitter tags through `pageMetadata()` in lib/seo/site.ts, and
 * its own JSON-LD graph from lib/seo/schema.ts.
 */
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: `${SITE_NAME} | AI Engineer, Full-Stack Developer & Founder`, template: `%s | ${SITE_NAME}` },
  applicationName: SITE_NAME,
  authors: [{ name: profile.name, url: `${SITE_URL}/` }],
  creator: profile.name,
  publisher: profile.name,
  referrer: "strict-origin-when-cross-origin",
  formatDetection: { email: false, telephone: false, address: false },
  openGraph: { siteName: SITE_NAME, locale: "en_IN", images: [DEFAULT_OG_IMAGE] },
  twitter: { card: "summary_large_image" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  icons: {
    icon: [
      { url: "/favicon-48.png", sizes: "48x48", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  verification: { google: "B18oGk-fF0zEKSH2Oun3PbZGLHpmhrvyOE5BHEO7Dcs" },
};

export const viewport: Viewport = {
  themeColor: "#080808",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only fixed left-4 top-4 z-[70] rounded-full bg-accent px-4 py-2 font-semibold text-bg focus:not-sr-only"
        >
          Skip to content
        </a>
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
