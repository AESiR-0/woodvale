import type { Metadata } from "next";
import { Lora, Bodoni_Moda } from "next/font/google";
import "./globals.css";

const lora = Lora({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-lora",
  display: "swap",
});

// Replaced Seasons with Bodoni Moda (Google Fonts)
const bodoni = Bodoni_Moda({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-bodoni",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Woodvale Restaurant & Banquet",
  description:
    "Experience the perfect blend of speakeasy elegance and exotic-grove ambiance at Woodvale. Savor classic flavors with contemporary twists in our warm, plant-filled dining space.",
  keywords:
    "restaurant, banquet, speakeasy, tropical, fine dining, private events",
  authors: [{ name: "Woodvale Restaurant" }],
  icons: {
    icon: "/static/logos/2D.PNG",
    shortcut: "/static/logos/2D.PNG",
    apple: "/static/logos/2D.PNG",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${lora.variable} ${bodoni.variable}`}>
      <head>
        <meta property="og:image" content="/images/bg-image.jpg" />
      </head>
      <body className="font-body antialiased">{children}</body>
    </html>
  );
}
