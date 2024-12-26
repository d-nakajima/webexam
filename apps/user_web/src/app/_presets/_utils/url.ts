export function getVercelOrigin() {
  if (typeof window === "undefined") {
    const domain = process.env.VERCEL_URL;
    if (domain.includes("localhost") || domain.includes("127.0.0.1")) {
      return `http://${domain}`;
    } else {
      return `https://${domain}`;
    }
  } else {
    return window.location.origin;
  }
}

export function isUrl(url: string) {
  try {
    new URL(url);
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
}

export function getVercelProjectProductionOrigin() {
  const domain =
    process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL ||
    process.env.VERCEL_PROJECT_PRODUCTION_URL;
  return `https://${domain}`;
}
