import { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { ChatFab } from "./ChatFab";

interface Props {
  children: ReactNode;
}

export const SiteLayout = ({ children }: Props) => (
  <div className="min-h-screen flex flex-col">
    <Header />
    <main id="main" className="flex-1">{children}</main>
    <Footer />
    <ChatFab />
  </div>
);
