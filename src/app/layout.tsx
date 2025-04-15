import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Content from "../components/layout/content";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  applicationName: "rental-delivery",
  title: {
    default: "Rental-app",
    template: "%s | Rental-app",
  },
  description: "Rental delivery app",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Rental-app",
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: "Rental-app",
    title: {
      default: "Rental-app",
      template: "%s | Rental-app",
    },
    description: "Rental delivery app",
  },
  twitter: {
    card: "summary",
    title: {
      default: "Rental-app",
      template: "%s | Rental-app",
    },
    description: "Rental delivery app",
  },
};

export const viewport: Viewport = {
  themeColor: "#222222",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className="dark">
      <body className={`${inter.className} bg-gray-950`}>
        <Content>{children}</Content>
      </body>
    </html>
  );
}
