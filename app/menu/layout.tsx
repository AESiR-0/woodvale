import { ReactNode } from "react";

interface MenuLayoutProps {
    children: ReactNode;
}

export default function MenuLayout({ children }: MenuLayoutProps) {
    return (
        <div className=" bg-white">
            {children}
        </div >
    );
}