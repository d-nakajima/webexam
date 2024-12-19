// PWAを有効にするためのマニフェストファイル

import { getTranslations } from "next-intl/server";
import { NextResponse, NextRequest } from "next/server";

const PWA_SCOPE = "/user_web/";
const PWA_START_PATH = "home/";

export async function GET(request: NextRequest) {
  const origin = request.nextUrl.origin;
  const locale = request.nextUrl.searchParams.get("locale") || "ja";
  const t = await getTranslations({ locale, namespace: "pwa" });

  return NextResponse.json({
    theme_color: "#f7f7f7",
    background_color: "#bdbdbd",
    icons: [
      {
        purpose: "maskable",
        sizes: "512x512",
        src: `${origin}/icon512_maskable.png`,
        type: "image/png",
      },
      {
        purpose: "any",
        sizes: "512x512",
        src: `${origin}/icon512_rounded.png`,
        type: "image/png",
      },
    ],
    orientation: "landscape",
    display: "standalone",
    dir: "auto",
    lang: locale,
    name: t("name"),
    short_name: t("shortName"),
    description: t("description"),
    scope: PWA_SCOPE,
    start_url: `${origin}/${locale}/${PWA_START_PATH}`,
    gcm_sender_ic: "103953800507", // 固定値
  });
}
