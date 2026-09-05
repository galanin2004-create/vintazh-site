"use client";

import Link from "next/link";
import type { Item } from "@/data/items";
import { label } from "@/data/taxonomy";
import { formatPrice, CTA_SOLD, PRICE_ON_REQUEST } from "@/lib/brand";
import { useItemState } from "./AvailabilityProvider";
import Photo from "./ui/Photo";
import { ItemMarks } from "./ui/Mark";

/**
 * Карточка в сетке. Порядок как в бренд-буке (полоса 11):
 * фото 3:4 → рубрика «страна · тип» → название → цена → состав.
 * Незаполненные поля не выдумываем и не прячем — пишем «по запросу».
 */
export default function ProductCard({
  item,
  priority = false,
}: {
  item: Item;
  priority?: boolean;
}) {
  const state = useItemState(item.slug, item.sold);
  const meta = `${label("country", item.country)} · ${label("kind", item.kind)}`;
  const spec = [item.material, item.size ? `размер ${item.size}` : null]
    .filter(Boolean)
    .join(" · ");

  return (
    <article className={`card${state === "sold" ? " card--sold" : ""}`}>
      <div className="card__frame">
        <div className="card__marks">
          <ItemMarks item={item} compact />
        </div>
        <div className="card__media">
          <Photo
            src={item.photos?.[0]}
            alt={item.title}
            label="Вещь целиком"
            priority={priority}
          />
        </div>
      </div>

      <p className="card__meta">{meta}</p>

      <h3 className="card__title">
        <Link href={`/catalog/${item.slug}`} className="card__link">
          {item.title}
        </Link>
      </h3>

      {state === "sold" ? (
        <p className="card__price card__price--sold">{CTA_SOLD}</p>
      ) : item.price ? (
        <p className="card__price">
          {formatPrice(item.price)}
          {state === "reserved" && (
            <span className="card__hold"> · отложена до конца брони</span>
          )}
        </p>
      ) : (
        <p className="card__price card__price--ask">{PRICE_ON_REQUEST}</p>
      )}

      {spec && <p className="card__spec">{spec}</p>}
    </article>
  );
}
