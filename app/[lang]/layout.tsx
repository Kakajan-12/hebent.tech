import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "@/i18n/routing";
import "./globals.css";
import Header from "../components/Header/Header";
import ReduxProvider from "../ProviderRedux";
import Footer from "../components/Footer/Footer";
import { Toaster } from "sonner";
import favicon from "@/public/favicon.ico";

export const metadata: Metadata = {
  title: "Hebent Technology",
  description:
    "End-to-end digital solutions — from strategy and design to development and launch.",
  icons: {
    icon: favicon.src,
  },
};

export function generateStaticParams() {
  return routing.locales.map((lang) => ({ lang }));
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;
  if (!hasLocale(routing.locales, lang)) {
    notFound();
  }
  setRequestLocale(lang);
  const messages = await getMessages();

  return (
    <html lang={lang} suppressHydrationWarning>
      <body className="flex min-h-screen flex-col font-sans antialiased">
        <ReduxProvider>
          <NextIntlClientProvider locale={lang} messages={messages}>
            <Header />
            {children}
            <Toaster position="top-center" richColors />
            <Footer />
          </NextIntlClientProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
