import type { MetadataRoute } from "next";
import { ARTICLES } from "@/lib/articles";
import { SITE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? `https://${SITE.domain}`;
  const pages = ["", "/pricing", "/founders", "/work/gatsapp", "/resources", "/start", "/privacy", "/terms"];
  return [
    ...pages.map((p) => ({ url: `${base}${p}` })),
    ...ARTICLES.map((a) => ({ url: `${base}/resources/${a.slug}`, lastModified: a.date })),
  ];
}
