import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? `https://${SITE.domain}`;
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/account", "/admin", "/auth/", "/reset-password"] }],
    sitemap: `${base}/sitemap.xml`,
  };
}
