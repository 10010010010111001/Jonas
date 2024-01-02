import Header from "@/components/header";
import type { Metadata } from "next";
import "@/globals.css";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "Clube Total Acesso",
  description: "Encontre os melhores eventos para você",
  icons: {
    icon: "https://cdn2.totalacesso.com/applications/shared/images/favicons/favicon.ico",
  },
};

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
