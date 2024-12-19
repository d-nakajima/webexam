import "@/app/globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import AuthProvider from "@/_lib/firebase/FirebaseAuthProvider";
import FirebaseInitializer from "@/_lib/firebase/FirebaseInitializer";
import { routing } from "@/_lib/i18n/routing";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Toaster } from "@/_lib/shadcn/components/ui/toaster";
import { intlConfig } from "../../_i18n/I18nConfig";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function AppWrapper({
  children,
  locale,
}: {
  children: React.ReactNode;
  locale: (typeof intlConfig.locales)[number];
}) {
  if (!routing.locales.includes(locale)) notFound();

  const messages = await getMessages();
  setRequestLocale(locale);

  return (
    <html lang={locale}>
      <head>
        <link rel="manifest" href={`/api/manifest?locale=${locale}`} />
        <link rel="apple-touch-icon" href="/icon.png"></link>
        <meta name="theme-color" content="#f7f7f7" />
      </head>
      <body className="antialiased">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <FirebaseInitializer>
            <AuthProvider loginComponent={undefined}>{children}</AuthProvider>
          </FirebaseInitializer>
        </NextIntlClientProvider>
        <Toaster />
      </body>
    </html>
  );
}
