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
    return false;
  }
}
