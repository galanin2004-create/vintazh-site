import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { items, itemBySlug } from "@/data/items";
import { label } from "@/data/taxonomy";
import {
  CTA,
  CTA_SECOND,
  CTA_SOLD,
  HOLD_NOTE,
  askLink,
  brand,
  contacts,
  formatPrice,
} from "@/lib/brand";
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
      score: (i.kind === item.kind ? 2 : 0) + (i.era === item.era ? 1 : 0),
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
    material: item.material,
    sku: item.number,
    brand: { "@type": "Brand", name: brand.full },
    offers: {
      "@type": "Offer",
      price: item.price,
      priceCurrency: "RUB",
      availability: item.sold
        ? "https://schema.org/SoldOut"
        : "https://schema.org/InStock",
      itemCondition: "https://schema.org/UsedCondition",
    },
  };

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
              <p className="card__meta">
                {label("country", item.country)} · {label("era", item.era)} ·{" "}
                {label("kind", item.kind)}
              </p>

              <h1 className="item__title">{item.title}</h1>

              {item.sold ? (
                <p className="item__price item__price--sold">{CTA_SOLD}</p>
              ) : (
                <p className="item__price">{formatPrice(item.price)}</p>
              )}

              {/* История вещи — сразу под названием и ценой, до характеристик. */}
              <div className="story">
                <p className="rubric">История вещи</p>
                <p className="story__text">{item.story}</p>
              </div>

              <div className="item__actions">
                {item.sold ? (
                  <>
                    <span className="btn btn--sold">{CTA_SOLD}</span>
                    <a
                      className="btn btn--ghost"
                      href={askLink(item.title, item.number)}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Найти похожую
                    </a>
                  </>
                ) : (
                  <>
                    <a
                      className="btn btn--primary"
                      href={askLink(item.title, item.number)}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {CTA}
                    </a>
                    <a
                      className="btn btn--ghost"
                      href={askLink(item.title, item.number)}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {CTA_SECOND}
                    </a>
                    <p className="item__note">
                      {HOLD_NOTE}. Бронь бесплатная: вещь снимается с витрины, и
                      никто другой её не заберёт. Смотреть в галерее —{" "}
                      {brand.city}, по звонку на {contacts.phone}.
                    </p>
                  </>
                )}
              </div>

              <div className="specs">
                <div className="specs__row">
                  <span className="specs__key">Материал</span>
                  <span>{item.material}</span>
                </div>
                <div className="specs__row">
                  <span className="specs__key">Размер</span>
                  <span>{item.size}</span>
                </div>
                <div className="specs__row">
                  <span className="specs__key">Состояние</span>
                  <span>{item.condition}</span>
                </div>
                <div className="specs__row">
                  <span className="specs__key">Страна</span>
                  <span>{label("country", item.country)}</span>
                </div>
                <div className="specs__row">
                  <span className="specs__key">Эпоха</span>
                  <span>{label("era", item.era)}</span>
                </div>
                {item.measurements?.map((m) => (
                  <div className="specs__row" key={m.label}>
                    <span className="specs__key">{m.label}</span>
                    <span>{m.value}</span>
                  </div>
                ))}
                <div className="specs__row">
                  <span className="specs__key">Номер вещи</span>
                  <span>№ {item.number}</span>
                </div>
              </div>

              <p className="item__note">
                Номер связывает бирку на вещи с этой карточкой. Мерки сняты по
                вещи, разложенной на столе, — сверяйте с любимой вещью из своего
                гардероба.
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
