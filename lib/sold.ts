import meta from "@/data/crm-meta.json";
import { items, type Item } from "@/data/items";

/**
 * Проданные вещи — снимок на момент сборки.
 *
 * Вещь уходит двумя путями: `sold: true` в data/items.ts (так помечают
 * то, что продали в галерее без заявки) и заявка в CRM со статусом
 * «Оплачена», «Отправлена» или «Забрана» — такие slug'и приходят в
 * `taken` из `/api/availability` и попадают сюда при сборке
 * (scripts/pull-crm-items.mjs).
 *
 * Снимок нужен потому, что страница «Уже куплено» статическая: она
 * должна быть собрана заранее, а не ждать ответа CRM в браузере. Вещь,
 * проданную между сборками, каталог всё равно сразу пометит «Забрано»
 * (это делает AvailabilityProvider живым запросом), а в архив она
 * переедет со следующей сборкой — то есть в течение четверти часа.
 */
const soldFromCrm: string[] = Array.isArray((meta as { sold?: string[] }).sold)
  ? ((meta as { sold?: string[] }).sold as string[])
  : [];

const soldSlugs = new Set(soldFromCrm);

export function isSold(item: Item): boolean {
  return item.sold === true || soldSlugs.has(item.slug);
}

/** Витрина: то, что ещё можно забрать. */
export const liveItems: Item[] = items.filter((i) => !isSold(i));

/** Архив: вещи, которые уже ушли. Сначала те, что ушли последними. */
export const soldItems: Item[] = items
  .filter((i) => isSold(i))
  .sort((a, b) => b.addedAt.localeCompare(a.addedAt));
