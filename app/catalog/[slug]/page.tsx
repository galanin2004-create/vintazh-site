import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { items, itemBySlug } from "@/data/items";
import { label } from "@/data/taxonomy";
import { brand } from "@/lib/brand";
import { ItemPrice, ItemActions } from "@/components/ItemBooking";
import ItemGallery from "@/components/ItemGallery";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/ui/Reveal";
import { ArrowRight } from "@/components/ui/Icons";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return items.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const item = itemBySlug(slug);
  if (!item) return { title: "Вещь не найдена" };
  return {
    title: item.title,
    description: item.story,
    openGraph: { title: `${item.title} · ${brand.name}`, description: item.story },
  };
}

export default async function ItemPage({ params }: Params) {
  const { slug } = await params;
  const item = itemBySlug(slug);
  if (!item) notFound();

  const related = items
    .filter((i) => i.slug !== item.slug && !i.sold)
    .map((i) => ({
      item: i,
      score:
        (i.kind === item.kind ? 2 : 0) + (i.country === item.country ? 1 : 0),
    }))
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 4)
    .map((r) => r.item);

  const ld = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: item.title,
    description: item.story,
    ...(item.material ? { material: item.material } : {}),
    ...(item.number ? { sku: item.number } : {}),
    brand: { "@type": "Brand", name: brand.full },
    offers: {
      "@type": "Offer",
      // Без цены оферту с нулём не отдаём — поисковик покажет её как «0 ₽».
      ...(item.price ? { price: item.price, priceCurrency: "RUB" } : {}),
      availability: item.sold
        ? "https://schema.org/SoldOut"
        : "https://schema.org/InStock",
      itemCondition: "https://schema.org/UsedCondition",
    },
  };

  const metaLine = `${label("country", item.country)} · ${label("kind", item.kind)}`;

  const specs: { key: string; value: string }[] = [
    ...(item.material ? [{ key: "Материал", value: item.material }] : []),
    ...(item.size ? [{ key: "Размер", value: item.size }] : []),
    ...(item.condition ? [{ key: "Состояние", value: item.condition }] : []),
    { key: "Страна", value: label("country", item.country) },
    ...(item.measurements?.map((m) => ({ key: m.label, value: m.value })) ?? []),
    ...(item.number ? [{ key: "Номер вещи", value: `№ ${item.number}` }] : []),
  ];

  /** Чего про вещь пока не знаем — перечисляем прямо, а не замалчиваем. */
  const unknown = [
    !item.material ? "состав" : null,
    !item.size ? "размер" : null,
    !item.condition ? "состояние" : null,
  ].filter(Boolean);

  return (
    <>
      <div className="shell">
        <nav className="crumbs" aria-label="Хлебные крошки">
          <Link href="/">Главная</Link>
          <span aria-hidden="true">·</span>
          <Link href="/catalog">Каталог</Link>
          <span aria-hidden="true">·</span>
          <Link href={`/catalog?kind=${item.kind}`}>{label("kind", item.kind)}</Link>
        </nav>
      </div>

      <section className="section section--tight">
        <div className="shell">
          <div className="item">
            <ItemGallery item={item} />

            <div className="item__info">
              <p className="card__meta">{metaLine}</p>

              <h1 className="item__title">{item.title}</h1>

              {/* Цена зависит от занятости — её знает только CRM. */}
              <ItemPrice item={item} />

              {/* История вещи — сразу под названием и ценой, до характеристик. */}
              <div className="story">
                <p className="rubric">История вещи</p>
                <p className="story__text">{item.story}</p>
              </div>

              <ItemActions item={item} />

              <div className="specs">
                {specs.map((s) => (
                  <div className="specs__row" key={s.key}>
                    <span className="specs__key">{s.key}</span>
                    <span>{s.value}</span>
                  </div>
                ))}
                {unknown.length > 0 && (
                  <div className="specs__row">
                    <span className="specs__key">Уточняется</span>
                    <span>{unknown.join(", ")} — спросите в Telegram</span>
                  </div>
                )}
              </div>

              <p className="item__note">
                {item.measurements
                  ? "Мерки сняты по вещи, разложенной на столе, — сверяйте с любимой вещью из своего гардероба."
                  : "Мерки снимем по вашей просьбе и пришлём вместе с дополнительными кадрами."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section">
          <div className="shell">
            <Reveal>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "flex-end",
                  justifyContent: "space-between",
                  gap: "18px",
                  marginBottom: "clamp(24px, 3vw, 40px)",
                }}
              >
                <div className="head">
                  <p className="rubric">Рядом на витрине</p>
                  <h2>Похожие вещи</h2>
                </div>
                <Link href="/catalog" className="link">
                  Весь каталог
                  <ArrowRight className="link__arrow" />
                </Link>
              </div>
            </Reveal>
            <div className="grid">
              {related.map((r, i) => (
                <Reveal key={r.slug} delay={i * 70}>
                  <ProductCard item={r} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
      />
    </>
  );
}
