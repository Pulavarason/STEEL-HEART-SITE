import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ThemeProvider, themeInitScript } from "@/components/ThemeProvider";
import { site } from "@/config/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.fullName} | Built with heart. Forged in steel.`,
    template: `%s | ${site.fullName}`,
  },
  description: site.description,
  applicationName: site.fullName,
  keywords: [
    "Steel Heart Fitness Studio",
    "gym",
    "strength training",
    "personal training",
    "functional fitness",
    "performance training",
  ],
  openGraph: {
    type: "website",
    title: site.fullName,
    description: site.description,
    siteName: site.fullName,
    images: [{ url: "/brand/steel-heart-logo.png", width: 630, height: 630, alt: `${site.fullName} logo` }],
  },
  twitter: {
    card: "summary",
    title: site.fullName,
    description: site.description,
    images: ["/brand/steel-heart-logo.png"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#08090B" },
    { media: "(prefers-color-scheme: light)", color: "#F4F2EE" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
