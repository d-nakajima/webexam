import type { MetadataRoute } from "next";
import { routing } from "@/_lib/i18n/routing";
import { getVercelOrigin } from "./_presets/_utils/url";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...routing.locales.map((locale) => ({
      url: `${getVercelOrigin()}/${locale}`,
      lastModified: new Date(),
      alternates: {
        languages: Object.fromEntries(
          routing.locales
            .filter((_locale) => _locale !== locale)
            .map((_locale) => [_locale, `${getVercelOrigin()}/${_locale}`])
        ),
      },
    })),
  ];
}
