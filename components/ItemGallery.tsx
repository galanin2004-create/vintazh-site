"use client";

import { useState } from "react";
import type { Item } from "@/data/items";
import Photo, { SHOT_LABELS } from "./ui/Photo";
import { ItemMarks } from "./ui/Mark";

/**
 * Галерея вещи: крупный кадр и четыре превью.
 * Минимум четыре кадра на вещь — целиком, спина, фактура, дефект
 * (бренд-бук, полоса 12). Дефект не прячем, он отдельным кадром.
 */
export default function ItemGallery({ item }: { item: Item }) {
  const shots = item.photos?.length
    ? item.photos.map((src, i) => ({ src, label: SHOT_LABELS[i] ?? `Кадр ${i + 1}` }))
    : SHOT_LABELS.map((label) => ({ src: undefined, label }));

  const [active, setActive] = useState(0);
  const shot = shots[active];

  return (
    <div className="item__gallery">
      <div className="item__stage">
        <div className="item__marks">
          <ItemMarks item={item} />
        </div>
        <Photo
          src={shot.src}
          alt={`${item.title} — ${shot.label.toLowerCase()}`}
          label={shot.label}
          priority
        />
      </div>

      <div className="item__thumbs" role="tablist" aria-label="Кадры вещи">
        {shots.map((s, i) => (
          <button
            key={s.label}
            type="button"
            role="tab"
            className="item__thumb"
            aria-selected={i === active}
            aria-label={s.label}
            onClick={() => setActive(i)}
          >
            <Photo src={s.src} alt="" label={s.label} ratio="1 / 1" />
          </button>
        ))}
      </div>
    </div>
  );
}
