import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "はーいっく",
  description: "はーいっく - 俳句と写真であなたの想像力を刺激しよう!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${inter.className} bg-[#F4EDE3]`}>
        <div>{children}</div>
        <Toaster />
      </body>
    </html>
  );
}
