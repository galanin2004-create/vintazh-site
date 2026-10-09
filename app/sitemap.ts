import type { MetadataRoute } from "next";
import { items } from "@/data/items";
import { SITE } from "@/lib/site";

/* Нужно для статической сборки (output: export). */
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/catalog", "/about", "/visit", "/contacts", "/oferta", "/privacy"].map((path) => ({
    url: `${SITE}${path}`,
    changeFrequency: path === "/catalog" ? ("weekly" as const) : ("monthly" as const),
    priority: path === "" ? 1 : path === "/oferta" || path === "/privacy" ? 0.3 : 0.8,
  }));

  const cards = items.map((item) => ({
    url: `${SITE}/catalog/${item.slug}`,
    lastModified: item.addedAt,
    changeFrequency: "weekly" as const,
    priority: item.sold ? 0.3 : 0.7,
  }));

  return [...pages, ...cards];
}
