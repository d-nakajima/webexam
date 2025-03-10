import { getTranslations, setRequestLocale } from "next-intl/server";
import { Metadata } from "next";
import { routing } from "@/_lib/i18n/routing";
import { getVercelOrigin } from "../../_presets/_utils/url";
import JsonLinkedData from "../../_presets/_components/JsonLinkedData";
import HomeScreen from "./_components/HomeScreen";
import PageLayout from "./_components/PageLayout";

type Props = {
  params: { locale: string };
};

export const generateMetadata = (props: Props): Metadata => {
  const locale = props.params.locale;
  const locales = routing.locales;
  const defaultLocale = routing.defaultLocale;

  return {
    alternates: {
      canonical: `${getVercelOrigin()}/${defaultLocale}/`,
      languages: {
        ...Object.fromEntries(
          locales
            .filter((_locale) => _locale !== locale)
            .map((_locale) => [_locale, `${getVercelOrigin()}/${_locale}/`])
        ),
        "x-default": `${getVercelOrigin()}/${defaultLocale}/`,
      },
    },
  };
};

export default async function Home(props: Props) {
  setRequestLocale(props.params.locale);

  const metaT = await getTranslations("metadata");

  return (
    <div className="h-full">
      <JsonLinkedData
        locale={props.params.locale}
        name={metaT("title")}
        description={metaT("description")}
        url={`${getVercelOrigin()}/${props.params.locale}/`}
      />
      <main className="px-16 py-8 h-full flex justify-center items-center max-sm:px-5">
        <PageLayout title="WebExam">
          <HomeScreen />
        </PageLayout>
      </main>
    </div>
  );
}
