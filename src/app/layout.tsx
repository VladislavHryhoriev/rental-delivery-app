import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Header from "../components/header";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  applicationName: "rental-delivery",
  title: {
    default: "rental-app",
    template: "%s | rental-app",
  },
  description: "Rental delivery app",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "rental-app",
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: "rental-app",
    title: {
      default: "rental-app",
      template: "%s | rental-app",
    },
    description: "Rental delivery app",
  },
  twitter: {
    card: "summary",
    title: {
      default: "rental-app",
      template: "%s | rental-app",
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
    <html lang="ru">
      <body className={`${inter.className} bg-gray-950`}>
        <Header>{children}</Header>
      </body>
    </html>
  );
}
