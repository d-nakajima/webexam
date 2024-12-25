import { routing } from "@/_lib/i18n/routing";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import AppWrapper from "../_presets/_components/AppWrapper";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type Props = {
  params: { locale: string };
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const t = await getTranslations("metadata");
  return {
    title: {
      template: `%s | ${t("title")}`,
      default: t("title"),
    },
    description: t("description"),
    openGraph: {
      title: t("ogp.title"),
      description: t("ogp.description"),
      images: [`/og_${props.params.locale}.png`],
    },
    twitter: {
      title: t("ogp.title"),
      description: t("ogp.description"),
      card: "summary_large_image",
    },
  };
}

export default async function RoutingLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  if (!routing.locales.includes(locale)) notFound();

  return <AppWrapper locale={locale}>{children}</AppWrapper>;
}
