import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "600", "700"], // optional
});

export const metadata = {
  title: "Sujo Clothing",
  description: "Sujo Clothing penyedia berbagai macam custom pakaian",
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
