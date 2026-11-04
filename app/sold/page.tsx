import type { Metadata } from "next";
import Link from "next/link";
import { contacts, plural } from "@/lib/brand";
import { soldItems } from "@/lib/sold";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Уже куплено",
  description:
    "Вещи, которые нашли владельца: архив галереи винтажа во Владимире. Повтора не будет, но посмотреть можно.",
};

/**
 * Архив галереи. Вещь ушла — но не исчезает: её страница остаётся, а
 * карточка переезжает сюда. Бренд-бук (полоса 10): вещь в единственном
 * экземпляре, и то, что её забрали, — часть истории галереи, а не повод
 * стереть страницу.
 *
 * Список собирается на сборке (lib/sold.ts): `sold` в data/items.ts плюс
 * вещи, которые CRM считает забранными.
 */
export default function SoldPage() {
  const count = soldItems.length;

  return (
    <>
      <div className="shell">
        <nav className="crumbs" aria-label="Хлебные крошки">
          <Link href="/">Главная</Link>
          <span aria-hidden="true">·</span>
          <span>Уже куплено</span>
        </nav>

        <div className="pageHead" style={{ borderBottom: 0 }}>
          <p className="rubric">Архив</p>
          <h1>Уже куплено</h1>
          <p className="lede">
            {count > 0 ? (
              <>
                {count} {plural(count)} нашли владельца. Повтора не будет —
                каждая была одна. Пусть останутся здесь: их стоит увидеть,
                даже если забрать уже нельзя.
              </>
            ) : (
              <>
                Пока отсюда ничего не ушло. Когда вещь найдёт владельца, она
                переедет на эту страницу — чтобы её было видно и дальше.
              </>
            )}
          </p>
        </div>
      </div>

      <section className="section section--tight" style={{ paddingTop: 0 }}>
        <div className="shell">
          {count === 0 ? (
            <div className="empty">
              <p className="rubric">Архив пуст</p>
              <p className="text" style={{ maxWidth: "46ch" }}>
                Всё, что есть у галереи, сейчас на витрине. Загляните в
                каталог — там вещи, которые ещё можно забрать.
              </p>
              <Link href="/catalog" className="btn btn--primary">
                Открыть каталог
              </Link>
            </div>
          ) : (
            <>
              <div className="grid">
                {soldItems.map((item, i) => (
                  <ProductCard key={item.slug} item={item} sold priority={i < 4} />
                ))}
              </div>

              <p className="catalog__note">
                Понравилось что-то из ушедшего —{" "}
                <a href={contacts.telegramHref} target="_blank" rel="noreferrer">
                  напишите нам
                </a>
                : подберём близкое по крою, цвету или эпохе. Поступления бывают
                каждую неделю.
              </p>
            </>
          )}
        </div>
      </section>

      <section className="section band">
        <div className="shell">
          <div className="band__grid">
            <Reveal>
              <div className="head">
                <p className="rubric">Витрина</p>
                <h2>Что есть сейчас</h2>
                <p className="text">
                  В каталоге — вещи, которые ещё ждут владельца. Каждая в
                  единственном экземпляре, поэтому витрина меняется каждую
                  неделю.
                </p>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "14px" }}>
                <Link href="/catalog" className="btn btn--primary">
                  Смотреть вещи
                </Link>
                <a
                  className="btn btn--onDark"
                  href={contacts.telegramHref}
                  target="_blank"
                  rel="noreferrer"
                >
                  Написать в Telegram
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
