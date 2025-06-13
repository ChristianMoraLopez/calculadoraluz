import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Calculadora de Luz - Edificio Paola T.",
  description: "Calculadora fácil para dividir los costos de luz y aseo entre apartamentos del Edificio Paola T. Calcula automáticamente los pagos individuales basados en el consumo de cada inquilino.",
  keywords: ["calculadora luz", "edificio paola t", "división costos", "servicios públicos", "apartamentos", "inquilinos"],
  authors: [{ name: "Edificio Paola T." }],
  openGraph: {
    title: "Calculadora de Luz - Edificio Paola T.",
    description: "Calculadora fácil para dividir costos de luz y aseo",
    type: "website",
    locale: "es_CO",
  },
  robots: {
    index: true,
    follow: true,
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es-CO">
      <head>
        <meta name="theme-color" content="#3B82F6" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Calculadora Luz" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 min-h-screen`}
      >
        <main className="relative">
          {children}
        </main>
      </body>
    </html>
  );
}