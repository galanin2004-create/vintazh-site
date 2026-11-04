import { liveItems } from "@/lib/sold";

/*
 * Прайс для CRM: касса берёт сумму платежа отсюда, а не из формы покупателя.
 * Собирается при сборке из data/items.ts — цена на карточке и в чеке всегда
 * одна и та же. Вещи без цены сюда не попадают: их на сайте не продают.
 * Проданное тоже исключено — счёт за ушедшую вещь выставиться не должен.
 */
export const dynamic = "force-static";

export function GET() {
  const priced: Record<string, { price: number; title: string }> = {};
  for (const item of liveItems) {
    if (item.price) {
      priced[item.slug] = { price: item.price, title: item.title };
    }
  }
  return Response.json({ items: priced, updated: new Date().toISOString() });
}
