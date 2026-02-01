import type { ReactNode } from "react";
import TopHeader from "./TopHeader"; // Adjust path if needed
import Header from "./Header/Header";
import Footer from "./Footer";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <TopHeader />
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}
