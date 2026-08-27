import type { Metadata } from "next";
import Link from "next/link";
import { brand, contacts, CTA, HOLD_NOTE } from "@/lib/brand";
import Reveal from "@/components/ui/Reveal";
import { ArrowRight } from "@/components/ui/Icons";

export const metadata: Metadata = {
  title: "Визит и бронь",
  description:
    "Как забронировать вещь на 24 часа, приехать в галерею во Владимире и получить отправку в другой город.",
};

const steps = [
  {
    t: "Бронь",
    d: "Нажимаете «Забронировать эксклюзив» — открывается Telegram с номером вещи. Мы снимаем её с витрины и держим за вами 24 часа. Бронь бесплатная.",
  },
  {
    t: "Примерка",
    d: "Приезжаете в галерею во Владимире. Смотрите вещь при дневном свете, меряете, трогаете фактуру. Мы рядом, но не стоим над душой.",
  },
  {
    t: "Проверка",
    d: "Показываем состав, состояние и все следы носки. Если что-то не так — говорим об этом до оплаты, а не после.",
  },
  {
    t: "Отправка",
    d: "Не получается приехать — снимаем подробное видео вещи и отправляем транспортной компанией по России. Упаковка в чехол и крафт.",
  },
];

export default function VisitPage() {
  return (
    <>
      <div className="shell">
        <nav className="crumbs" aria-label="Хлебные крошки">
          <Link href="/">Главная</Link>
          <span aria-hidden="true">·</span>
          <span>Визит и бронь</span>
        </nav>

        <div className="pageHead" style={{ borderBottom: 0 }}>
          <p className="rubric">Порядок</p>
          <h1>Визит и бронь</h1>
          <p className="lede">
            Вещь одна, поэтому главное действие на сайте — не «купить», а
            «забронировать». {HOLD_NOTE} — этого хватает, чтобы спокойно
            доехать и померить.
          </p>
        </div>
      </div>

      <section className="section section--tight" style={{ paddingTop: 0 }}>
        <div className="shell">
          <div className="steps">
            {steps.map((s, i) => (
              <Reveal key={s.t} delay={i * 80}>
                <div className="step">
                  <span className="step__num">{String(i + 1).padStart(2, "0")}</span>
                  <h2 className="step__title">{s.t}</h2>
                  <p className="step__text">{s.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="twoCol">
            <Reveal>
              <div className="head">
                <p className="rubric">Примерка</p>
                <h2>Что взять с собой</h2>
                <p className="text">
                  Винтажные размеры не совпадают с современными: «46» из
                  восьмидесятых сегодня может сесть как 44. Поэтому в каждой
                  карточке есть мерки по вещи.
                </p>
              </div>
            </Reveal>
            <Reveal delay={90}>
              <ul className="list">
                <li>Сантиметр — сверить мерки с любимой вещью из своего гардероба.</li>
                <li>Ту самую вещь, под которую подбираете: пальто поверх пиджака сидит иначе.</li>
                <li>Обувь на нужном каблуке, если смотрите платье или пальто в пол.</li>
                <li>Время: спешка — плохой советчик, когда вещь одна.</li>
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="twoCol">
            <Reveal>
              <div className="head">
                <p className="rubric">Оплата и отправка</p>
                <h2>Как рассчитаться</h2>
              </div>
            </Reveal>
            <Reveal delay={90}>
              <ul className="list">
                <li>В галерее — наличными или переводом.</li>
                <li>При отправке в другой город — предоплата переводом, затем отправление транспортной компанией.</li>
                <li>Доставка по Владимиру обсуждается отдельно.</li>
                <li>
                  Условия обмена и возврата уточняйте до оплаты — по каждой вещи
                  они обговариваются лично.
                </li>
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section band">
        <div className="shell">
          <div className="band__grid">
            <Reveal>
              <div className="head">
                <p className="rubric">{brand.city}</p>
                <h2>Смотреть в галерее</h2>
                <p className="text">
                  Приезд — по звонку: так мы успеем достать вещь и подготовить
                  примерочную. Позвоните или напишите в Telegram.
                </p>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "14px" }}>
                <a className="btn btn--primary" href={contacts.phoneHref}>
                  {contacts.phone}
                </a>
                <a
                  className="btn btn--onDark"
                  href={contacts.telegramHref}
                  target="_blank"
                  rel="noreferrer"
                >
                  Telegram
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <Reveal>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "18px",
              }}
            >
              <p className="hero__formula" style={{ maxWidth: "34ch" }}>
                Вещь, которую вы отложите сегодня, завтра может уйти к другому.
              </p>
              <Link href="/catalog" className="btn btn--primary">
                {CTA}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
