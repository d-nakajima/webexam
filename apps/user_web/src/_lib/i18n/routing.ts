import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";
import { intlConfig } from "@/app/_presets/_i18n/I18nConfig";

export const routing = defineRouting(intlConfig);

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);
