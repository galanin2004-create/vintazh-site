import type { Metadata } from "next";
import Link from "next/link";
import { brand, contacts } from "@/lib/brand";
import Reveal from "@/components/ui/Reveal";
import { ArrowRight } from "@/components/ui/Icons";

export const metadata: Metadata = {
  title: "Контакты",
  description: `Телефон, Telegram и VK галереи «Винтаж» во Владимире.`,
};

const rows = [
  { key: "Телефон", value: contacts.phone, href: contacts.phoneHref },
  { key: "Telegram", value: contacts.telegram, href: contacts.telegramHref },
  { key: "VK", value: contacts.vk, href: contacts.vkHref },
  { key: "Город", value: brand.city },
];

export default function ContactsPage() {
  return (
    <>
      <div className="shell">
        <nav className="crumbs" aria-label="Хлебные крошки">
          <Link href="/">Главная</Link>
          <span aria-hidden="true">·</span>
          <span>Контакты</span>
        </nav>

        <div className="pageHead" style={{ borderBottom: 0 }}>
          <p className="rubric">Связь</p>
          <h1>Где нас найти</h1>
          <p className="lede">
            Быстрее всего — Telegram: там же присылаем видео вещи, если приехать
            не получается. По телефону договариваемся о времени визита.
          </p>
        </div>
      </div>

      <section className="section section--tight" style={{ paddingTop: 0 }}>
        <div className="shell">
          <div className="contactList">
            {rows.map((r, i) =>
              r.href ? (
                <Reveal key={r.key} delay={i * 60}>
                  <a
                    className="contactRow"
                    href={r.href}
                    target={r.href.startsWith("http") ? "_blank" : undefined}
                    rel={r.href.startsWith("http") ? "noreferrer" : undefined}
                    style={{ display: "flex" }}
                  >
                    <span className="meta">{r.key}</span>
                    <span className="contactRow__value">{r.value}</span>
                  </a>
                </Reveal>
              ) : (
                <Reveal key={r.key} delay={i * 60}>
                  <div className="contactRow">
                    <span className="meta">{r.key}</span>
                    <span className="contactRow__value">{r.value}</span>
                  </div>
                </Reveal>
              ),
            )}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="twoCol">
            <Reveal>
              <div className="head">
                <p className="rubric">Визит</p>
                <h2>Приезд по звонку</h2>
                <p className="text">
                  Галерея во Владимире. Точный адрес и время встречи называем при
                  созвоне — так мы успеваем достать отложенную вещь и
                  подготовить примерочную.
                </p>
                <Link href="/visit" className="link">
                  Как проходит визит
                  <ArrowRight className="link__arrow" />
                </Link>
              </div>
            </Reveal>

            <Reveal delay={90}>
              <div className="segment">
                <div className="segment__head">
                  <h3 className="segment__title">Продать нам вещь</h3>
                </div>
                <p className="segment__text">
                  Если у вас есть винтажная вещь из натурального материала с
                  понятной историей — напишите в Telegram: пришлите четыре кадра
                  (целиком, спина, фактура, бирка) и всё, что знаете о её
                  происхождении.
                </p>
                <a
                  className="btn btn--ghost"
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

      <section className="section band">
        <div className="shell">
          <div className="band__grid">
            <Reveal>
              <div className="head">
                <p className="rubric">{brand.lockup}</p>
                <h2>Спросить о конкретной вещи</h2>
                <p className="text">
                  Назовите номер с карточки — он же стоит на бирке вещи. Так мы
                  сразу поймём, о чём речь.
                </p>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "14px" }}>
                <a
                  className="btn btn--primary"
                  href={contacts.telegramHref}
                  target="_blank"
                  rel="noreferrer"
                >
                  Telegram
                </a>
                <a className="btn btn--onDark" href={contacts.phoneHref}>
                  {contacts.phone}
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
