import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin", "cyrillic"], weight: ["400", "500", "600"],
  variable: "--font-cormorant", display: "swap",
});
const inter = Inter({
  subsets: ["latin", "cyrillic"], weight: ["300", "400", "500"],
  variable: "--font-inter", display: "swap",
});

export const metadata = {
  title: "Истова — пространство истинного ухода в Петербурге",
  description: "Спа-ритуалы и пространство красоты на Васильевском острове. ул. Беринга, 23 к. 2.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={`${cormorant.variable} ${inter.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
