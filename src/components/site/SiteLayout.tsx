import { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { ChatFab } from "./ChatFab";
import { useReveal } from "@/hooks/useReveal";

interface Props {
  children: ReactNode;
}

export const SiteLayout = ({ children }: Props) => {
  // Re-scan for [data-reveal] elements on every route change.
  useLocation();
  useReveal();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main id="main" className="flex-1">{children}</main>
      <Footer />
      <ChatFab />
    </div>
  );
};
