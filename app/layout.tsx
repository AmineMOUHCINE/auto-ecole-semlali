import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "مؤسسة السملالي لتعليم السياقة وقانون السير",
  description:
    "مؤسسة السملالي لتعليم السياقة وقانون السير بقلعة السراغنة - تكوين شامل، مدربون مجربون، أوقات مرنة.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
