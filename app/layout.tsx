import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Woodvale Restaurant & Banquet",
  description: "Experience the perfect blend of speakeasy elegance and tropical ambiance at Woodvale. Savor classic flavors with contemporary twists in our warm, plant-filled dining space.",
  keywords: "restaurant, banquet, speakeasy, tropical, fine dining, private events",
  authors: [{ name: "Woodvale Restaurant" }],
  icons: {
    icon: "/static/logo/2D.png",
    shortcut: "/static/logo/2D.png",
    apple: "/static/logo/2D.png",
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
    <html lang="en" className={poppins.variable}>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
