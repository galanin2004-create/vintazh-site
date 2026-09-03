/**
 * Три оси навигации из бренд-бука (полоса 09).
 * Любая вещь описана всеми тремя: страна, эпоха, тип.
 * Списки черновые — заменяются на фактические, структура блоков не меняется.
 */

export type Axis = "country" | "era" | "kind";

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

export const eras: Facet[] = [
  { slug: "pre-1950", label: "До 1950-х" },
  { slug: "1950s", label: "50-е" },
  { slug: "1960s", label: "60-е" },
  { slug: "1970s", label: "70-е" },
  { slug: "1980s", label: "80-е" },
  { slug: "1990s", label: "90-е" },
  { slug: "2000s", label: "2000-е" },
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
  { key: "era", title: "Эпоха", index: "02", facets: eras },
  { key: "kind", title: "Тип вещи", index: "03", facets: kinds },
];

const byAxis: Record<Axis, Facet[]> = { country: countries, era: eras, kind: kinds };

export function label(axis: Axis, slug: string): string {
  return byAxis[axis].find((f) => f.slug === slug)?.label ?? slug;
}
