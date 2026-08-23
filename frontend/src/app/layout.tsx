import "./globals.css";
import type { Metadata } from "next";
import localFont from "next/font/local";
import ThemeRegistry from "@/providers/ThemeRegistry";
import { ToastContainer } from "react-toastify";
import StoreProvider from "@/providers/ReduxProvider";
import NextTopLoader from "nextjs-toploader";
import Script from "next/script";

const vazirmatn = localFont({
  src: [
    { path: "../fonts/Vazirmatn-Light.ttf", weight: "300" },
    { path: "../fonts/Vazirmatn-Regular.ttf", weight: "400" },
    { path: "../fonts/Vazirmatn-Medium.ttf", weight: "500" },
    { path: "../fonts/Vazirmatn-SemiBold.ttf", weight: "600" },
    { path: "../fonts/Vazirmatn-Bold.ttf", weight: "700" },
    { path: "../fonts/Vazirmatn-ExtraBold.ttf", weight: "800" },
    { path: "../fonts/Vazirmatn-Black.ttf", weight: "900" },
  ],
  variable: "--font-vazir",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "نسیه | مدیریت هوشمند حساب و فروش",
    template: "%s | نسیه",
  },
  description:
    "نسیه، ابزار ساده و حرفه‌ای برای مدیریت مشتریان، فروش، بدهی‌ها و پرداخت‌های فروشگاه شما.",
  applicationName: "نسیه",
  keywords: [
    "نسیه",
    "مدیریت نسیه",
    "دفتر نسیه",
    "مدیریت فروشگاه",
    "حساب مشتری",
    "مدیریت بدهی",
    "مدیریت فروش",
  ],
  authors: [{ name: "Nesiyeh" }],
  creator: "Nesiyeh",
  publisher: "Nesiyeh",

  robots: {
    index: true,
    follow: true,
  },

  icons: {
    icon: "/favicon.ico",
  },

  openGraph: {
    type: "website",
    locale: "fa_IR",
    siteName: "نسیه",
    title: "نسیه | مدیریت هوشمند حساب و فروش",
    description: "مدیریت مشتریان، فروش، بدهی‌ها و پرداخت‌ها با نسیه.",
  },

  twitter: {
    card: "summary_large_image",
    title: "نسیه | مدیریت هوشمند حساب و فروش",
    description: "مدیریت مشتریان، فروش، بدهی‌ها و پرداخت‌های فروشگاه با نسیه.",
  },
};
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <head>
        {/*<Script
          src="//unpkg.com/react-scan/dist/auto.global.js"
          crossOrigin="anonymous"
          strategy="beforeInteractive"
        />*/}
      </head>
      <body className={`${vazirmatn.variable}`}>
        <ToastContainer position="bottom-center" autoClose={1500} />
        <StoreProvider>
          <ThemeRegistry>
            {/*<NextTopLoader color="#1976d2" height={3} showSpinner={true} />*/}
            <NextTopLoader color="#ff9800" height={3} showSpinner={true} />
            {children}
          </ThemeRegistry>
        </StoreProvider>
      </body>
    </html>
  );
}
