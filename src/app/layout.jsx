import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "600", "700"], // optional
});

// app/layout.js
export const metadata = {
  metadataBase: new URL("https://sujocustomart.com"),
  title: "Sujo Clothing | Produsen Pakaian Custom",
  description:
    "SCA APPAREL adalah usaha pembuatan pakaian custom dengan kualitas tinggi dan desain yang dapat disesuaikan.",
  openGraph: {
    title: "Sujo Clothing | Produsen Pakaian Custom",
    description:
      "Pakaian custom berkualitas tinggi dengan desain sesuai keinginan Anda.",
    siteName: "Sujo Clothing",
    images: [
      {
        url: "/logo.png", // pastikan file ini ada di /public
        width: 1200,
        height: 630,
        alt: "Sujo Clothing",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    // apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.subsets}`}>
        <Navbar />
        <main className="pt-34">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
