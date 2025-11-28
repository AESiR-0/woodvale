import { ReactNode } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface MenuLayoutProps {
  children: ReactNode;
}

export default function MenuLayout({ children }: MenuLayoutProps) {
  return (
    <div>
      <Navbar textColor="text-black" scrolledTextColor="text-white" />
      {children}
      <Footer />
    </div>
  );
}
