import "./globals.css";

export const metadata = {
  title: "Истова — пространство истинного ухода в Петербурге",
  description: "Спа-ритуалы и пространство красоты на Васильевском острове. ул. Беринга, 23 к. 2.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body className="font-sans">{children}</body>
    </html>
  );
}
