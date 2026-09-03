import Link from "next/link";
import { asset } from "@/lib/asset";
import { brand, principles, contacts, CTA, plural } from "@/lib/brand";
import { items, sortNewestFirst } from "@/data/items";
import { axes } from "@/data/taxonomy";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/ui/Reveal";
import { ArrowRight, Wave } from "@/components/ui/Icons";

export default function HomePage() {
  const fresh = sortNewestFirst(items).slice(0, 8);
  const inStock = items.filter((i) => !i.sold).length;

  return (
    <>
      {/* ——— Обложка ——————————————————————————————————————— */}
      <section className="hero">
        <div className="shell">
          <div className="hero__inner">
            <div className="hero__body">
              <p className="rubric">
                {brand.city} · галерея винтажа · {inStock} {plural(inStock)} в наличии
              </p>
              <h1>Галерея, а не магазин</h1>
              <p className="hero__formula">{brand.formula}</p>
              <div className="hero__actions">
                <Link href="/catalog" className="btn btn--primary">
                  Смотреть вещи
                </Link>
                <Link href="/visit" className="link">
                  Как проходит визит
                  <ArrowRight className="link__arrow" />
                </Link>
              </div>
              <div className="hero__promise">
                {brand.promise.map((p) => (
                  <span key={p}>{p}</span>
                ))}
              </div>
            </div>

            <div className="hero__lock">
              <img src={asset("/logo.svg")} alt={brand.full} />
            </div>
          </div>
        </div>
      </section>

      {/* ——— Три принципа ————————————————————————————————— */}
      <section className="section">
        <div className="shell">
          <Reveal>
            <div className="head" style={{ marginBottom: "clamp(28px, 4vw, 48px)" }}>
              <p className="rubric">О бренде</p>
              <h2>Вещи, которые существуют в одном экземпляре</h2>
              <p className="text">
                Каждая вещь отобрана вручную, имеет происхождение, эпоху и свою
                историю. Мы говорим о них так, как галерея говорит о работах: с
                уважением к материалу, автору и времени.
              </p>
            </div>
          </Reveal>

          <div className="principles">
            {principles.map((p, i) => (
              <Reveal key={p.title} delay={i * 90}>
                <div className="principle">
                  <h3 className="principle__title">{p.title}</h3>
                  <p className="principle__text">{p.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ——— Новые поступления ————————————————————————————— */}
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
                marginBottom: "clamp(28px, 4vw, 44px)",
              }}
            >
              <div className="head">
                <p className="rubric">Новое</p>
                <h2>Последние поступления</h2>
              </div>
              <Link href="/catalog" className="link">
                Весь каталог
                <ArrowRight className="link__arrow" />
              </Link>
            </div>
          </Reveal>

          <div className="grid">
            {fresh.map((item, i) => (
              <Reveal key={item.slug} delay={(i % 4) * 70}>
                <ProductCard item={item} priority={i < 4} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ——— История вещи ————————————————————————————————— */}
      <section className="section band">
        <div className="shell">
          <div className="band__grid" style={{ alignItems: "start" }}>
            <Reveal>
              <div className="head">
                <p className="rubric">Фирменный элемент</p>
                <h2>История вещи</h2>
                <p className="text">
                  У каждой вещи в описании есть одно-два предложения о том,
                  откуда она и чем интересна. Это главное отличие галереи от
                  обычного каталога — и то, что покупатели пересказывают друг
                  другу.
                </p>
                <Wave
                  style={{ width: "180px", height: "22px", color: "var(--gold)" }}
                />
              </div>
            </Reveal>

            <div className="stories">
              {[
                {
                  n: "Пример 01",
                  t: "Кашемировое пальто, Милан, 1987. Куплено в бутике на Монтенаполеоне и носилось одной хозяйкой — подкладка и пуговицы родные.",
                },
                {
                  n: "Пример 02",
                  t: "Кожаная косуха, Германия, начало 90-х. Пришла из семейного архива в Дрездене: плотная кожа, разношенная по фигуре, латунная молния без замены.",
                },
              ].map((s, i) => (
                <Reveal key={s.n} delay={i * 100}>
                  <div className="storyCard">
                    <p className="rubric">{s.n}</p>
                    <p className="storyCard__text">{s.t}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ——— Три оси навигации ————————————————————————————— */}
      <section className="section">
        <div className="shell">
          <Reveal>
            <div className="head" style={{ marginBottom: "clamp(28px, 4vw, 44px)" }}>
              <p className="rubric">Навигация</p>
              <h2>Три способа найти своё</h2>
              <p className="text">
                Каталог фильтруется по трём осям одновременно. Любая вещь описана
                всеми тремя: страна изготовителя, эпоха, тип вещи.
              </p>
            </div>
          </Reveal>

          <div className="axes">
            {axes.map((axis, i) => (
              <Reveal key={axis.key} delay={i * 90}>
                <div className="axis">
                  <div className="axis__head">
                    <h3 className="axis__title">{axis.title}</h3>
                    <span className="axis__index">{axis.index}</span>
                  </div>
                  <ul className="axis__list">
                    {axis.facets.map((f) => (
                      <li key={f.slug}>
                        <Link href={`/catalog?${axis.key}=${f.slug}`}>
                          {f.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ——— Как забрать вещь ——————————————————————————————— */}
      <section className="section">
        <div className="shell">
          <Reveal>
            <div className="head" style={{ marginBottom: "clamp(28px, 4vw, 44px)" }}>
              <p className="rubric">Порядок</p>
              <h2>Как вещь попадает к вам</h2>
            </div>
          </Reveal>
          <div className="steps">
            {[
              {
                t: "Бронь",
                d: "Нажимаете «Забронировать эксклюзив» — вещь снимается с витрины и остаётся за вами на 24 часа.",
              },
              {
                t: "Примерка",
                d: "Приходите в галерею во Владимире. Можно померить, посмотреть швы и фактуру при дневном свете.",
              },
              {
                t: "Проверка",
                d: "Показываем всё: состав, состояние, следы носки. Ничего не прячем — потёртость честнее скидки.",
              },
              {
                t: "Отправка",
                d: "Если приехать не получается — снимаем видео вещи и отправляем транспортной компанией.",
              },
            ].map((s, i) => (
              <Reveal key={s.t} delay={i * 80}>
                <div className="step">
                  <span className="step__num">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="step__title">{s.t}</h3>
                  <p className="step__text">{s.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ——— Призыв ————————————————————————————————————————— */}
      <section className="section band">
        <div className="shell">
          <div className="band__grid">
            <Reveal>
              <div className="head">
                <p className="rubric">Владимир</p>
                <h2>Приходите смотреть вещи</h2>
                <p className="text">
                  Витрина обновляется каждую неделю. Если ищете что-то конкретное —
                  напишите, отложим и покажем первым.
                </p>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <div
                style={{ display: "flex", flexWrap: "wrap", gap: "14px" }}
              >
                <Link href="/catalog" className="btn btn--primary">
                  {CTA}
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
