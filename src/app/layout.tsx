import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { AuthProvider } from "@/context/AuthContext"; // 👈 importa el provider
import { ProvidersProvider } from "@/context/ProvidersContext";
import { Auth0Provider } from "@auth0/nextjs-auth0" // 👈 Importa el nuevo provider

export const metadata: Metadata = {
  title: "Vitta",
  description: "Aplicación de salud y bienestar – Proyecto Final",
  icons: {
    icon: "/logo-png-vitta.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="min-h-screen flex flex-col">
        <Auth0Provider>
          <ProvidersProvider>
            <AuthProvider>
              <Navbar />
              <main className="flex-grow">{children}</main>
              <Footer />
            </AuthProvider>
          </ProvidersProvider>
        </Auth0Provider>
      </body>
    </html>
  );
}




