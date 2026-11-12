import { items } from "@/data/items";

/*
 * Список всех вещей витрины для CRM — раздел «Вещи», где отмечают
 * проданное в галерее. В отличие от prices.json сюда попадают и вещи без
 * цены, и уже проданные: CRM должна видеть всё, что есть на сайте.
 * `sold` здесь — только пометка в data/items.ts; продажи, отмеченные в
 * самой CRM, она знает сама.
 */
export const dynamic = "force-static";

export function GET() {
  const list = items.map((item) => ({
    slug: item.slug,
    title: item.title,
    kind: item.kind,
    price: item.price ?? null,
    photo: item.photos?.[0] ?? null,
    sold: item.sold === true,
  }));
  return Response.json({ items: list, updated: new Date().toISOString() });
}
