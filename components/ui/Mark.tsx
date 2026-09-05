"use client";

import type { Item } from "@/data/items";
import { useItemState } from "@/components/AvailabilityProvider";

/** Метка на фото. Бренд-бук, полоса 11. */
export function Mark({
  children,
  tone = "paper",
}: {
  children: React.ReactNode;
  tone?: "paper" | "ink" | "sold" | "hold";
}) {
  const cls =
    tone === "ink"
      ? "mark mark--ink"
      : tone === "sold"
        ? "mark mark--sold"
        : tone === "hold"
          ? "mark mark--hold"
          : "mark";
  return <span className={cls}>{children}</span>;
}

/**
 * Набор меток для вещи. «Один экземпляр» — основа ценности, поэтому стоит
 * на каждой свободной вещи. Ушедшее и отложенное CRM подсказывает сама.
 */
export function ItemMarks({ item, compact = false }: { item: Item; compact?: boolean }) {
  const state = useItemState(item.slug, item.sold);

  if (state === "sold") return <Mark tone="sold">Продано</Mark>;
  if (state === "reserved") return <Mark tone="hold">Отложена</Mark>;

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
