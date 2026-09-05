/**
 * Оси навигации. Любая вещь описана обеими: страна и тип.
 *
 * Бренд-бук (полоса 09) предполагал третью ось — эпоху. Её убрали:
 * год по вещам не определяется, а фильтр, под который ничего не подходит,
 * хуже, чем его отсутствие. Чтобы вернуть эпоху, добавьте её обратно в
 * `axes` и в `Axis`, а по вещам проставьте поле `era` (в типе оно есть).
 */

export type Axis = "country" | "kind";

export type Facet = { slug: string; label: string };

export const countries: Facet[] = [
  { slug: "italy", label: "Италия" },
  { slug: "france", label: "Франция" },
  { slug: "germany", label: "Германия" },
  { slug: "uk", label: "Великобритания" },
  { slug: "japan", label: "Япония" },
  { slug: "usa", label: "США" },
  { slug: "ussr", label: "СССР" },
  { slug: "other", label: "Другие" },
];

export const kinds: Facet[] = [
  { slug: "outerwear", label: "Верхняя одежда" },
  { slug: "suits", label: "Пиджаки и костюмы" },
  { slug: "waistcoats", label: "Жилеты" },
  { slug: "dresses", label: "Платья" },
  { slug: "knitwear", label: "Трикотаж" },
  { slug: "shirts", label: "Рубашки и блузы" },
  { slug: "fur-leather", label: "Мех и кожа" },
  { slug: "bags", label: "Сумки" },
  { slug: "shoes", label: "Обувь" },
  { slug: "hats", label: "Аксессуары и шляпы" },
  { slug: "jewelry", label: "Украшения" },
];

export const axes: { key: Axis; title: string; index: string; facets: Facet[] }[] = [
  { key: "country", title: "Страна", index: "01", facets: countries },
  { key: "kind", title: "Тип вещи", index: "02", facets: kinds },
];

const byAxis: Record<Axis, Facet[]> = { country: countries, kind: kinds };

export function label(axis: Axis, slug: string): string {
  return byAxis[axis].find((f) => f.slug === slug)?.label ?? slug;
}
