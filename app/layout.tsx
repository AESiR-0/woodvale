import type { Metadata } from "next";
import { Lora } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const lora = Lora({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-lora",
  display: "swap",
});

const seasons = localFont({
  src: [
    {
      path: "../public/fonts/Fontspring-DEMO-theseasons-lt.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Fontspring-DEMO-theseasons-bd.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-seasons",
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
    <html lang="en" className={`${lora.variable} ${seasons.variable}`}>
      <head>
        <meta property="og:image" content="/images/bg-image.jpg" />
      </head>
      <body className="font-body antialiased">{children}</body>
    </html>
  );
}