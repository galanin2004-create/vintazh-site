import Link from "next/link";
import type { Item } from "@/data/items";
import { label } from "@/data/taxonomy";
import { formatPrice, CTA_SOLD } from "@/lib/brand";
import Photo from "./ui/Photo";
import { ItemMarks } from "./ui/Mark";

/**
 * Карточка в сетке. Порядок как в бренд-буке (полоса 11):
 * фото 3:4 → рубрика «страна · эпоха · тип» → название → цена → состав.
 */
export default function ProductCard({
  item,
  priority = false,
}: {
  item: Item;
  priority?: boolean;
}) {
  return (
    <article className={`card${item.sold ? " card--sold" : ""}`}>
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

      <p className="card__meta">
        {label("country", item.country)} · {label("era", item.era)} ·{" "}
        {label("kind", item.kind)}
      </p>

      <h3 className="card__title">
        <Link href={`/catalog/${item.slug}`} className="card__link">
          {item.title}
        </Link>
      </h3>

      {item.sold ? (
        <p className="card__price card__price--sold">{CTA_SOLD}</p>
      ) : (
        <p className="card__price">{formatPrice(item.price)}</p>
      )}

      <p className="card__spec">
        {item.material} · размер {item.size}
      </p>
    </article>
  );
}
