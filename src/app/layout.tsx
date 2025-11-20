import type { Metadata } from "next";
import { Geist, Geist_Mono,El_Messiri } from "next/font/google";
import "./globals.css";
import Header from "./components/header";
import PlayBar from "./components/playBar";
import Provider from "./providers/QueryClientProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = El_Messiri({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "رادیو جوان – پخش آنلاین موسیقی فارسی",
  description: "پلتفرم موسیقی مدرن برای شنیدن، کشف و دنبال کردن آهنگ‌ها و هنرمندان ایرانی.",
  keywords: ["رادیو جوان", "موسیقی ایرانی", "آهنگ جدید", "پخش آنلاین", "هنرمندان", "آلبوم"],
  authors: [
    { name: "Radio Javan", url: "https://radio-javan.mohammademamiproject.ir/" }
  ],
  creator: "Mohammad Emami",
  publisher: "Mohammad Emami",
  alternates: {
    canonical: "https://radio-javan.mohammademamiproject.ir/",
    languages: {
      "fa": "https://radio-javan.mohammademamiproject.ir/",
    }
  },
  openGraph: {
    title: "رادیو جوان – پخش آنلاین موسیقی فارسی",
    description: "بهترین پلتفرم موسیقی ایرانی برای کشف و پخش آهنگ‌ها و هنرمندان جدید.",
    url: "https://radio-javan.mohammademamiproject.ir/",
    siteName: "رادیو جوان",
    images: [
      {
        url: "https://yourdomain.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "رادیو جوان – موسیقی فارسی",
      }
    ],
    locale: "fa_IR",
    type: "website",
  },
  icons: {
    icon: [
      { url: "/icons/icon-32x32.png" },
      { url: "/icons/icon-48x48.png" },
      { url: "/icons/icon-192x192.png" }
    ],
    shortcut: { url: "/icons/icon-192x192.png" },
    apple: { url: "/icons/icon-192x192.png" },
  },
  themeColor: "#000000",
  manifest: "/manifest.json"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body
        className={` ${geistMono.variable} antialiased bg-neutral-900 flex justify-between items-center flex-wrap`}
      >
        <Provider>
          {children}
        </Provider>
      </body>
    </html>
  );
}
