import type { Item } from "@/data/items";

/** Метка на фото. Бренд-бук, полоса 11. */
export function Mark({
  children,
  tone = "paper",
}: {
  children: React.ReactNode;
  tone?: "paper" | "ink" | "sold";
}) {
  const cls =
    tone === "ink" ? "mark mark--ink" : tone === "sold" ? "mark mark--sold" : "mark";
  return <span className={cls}>{children}</span>;
}

/**
 * Набор меток для вещи. «Один экземпляр» — основа ценности,
 * поэтому стоит на каждой вещи. Проданное помечается бордо.
 */
export function ItemMarks({ item, compact = false }: { item: Item; compact?: boolean }) {
  if (item.sold) return <Mark tone="sold">Продано</Mark>;
  return (
    <>
      <Mark>Один экземпляр</Mark>
      {!compact &&
        item.marks?.map((m) => (
          <Mark key={m} tone="ink">
            {m}
          </Mark>
        ))}
    </>
  );
}
