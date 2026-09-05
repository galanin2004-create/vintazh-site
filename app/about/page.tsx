import type { Metadata } from "next";
import Link from "next/link";
import { asset } from "@/lib/asset";
import { brand, principles } from "@/lib/brand";
import Reveal from "@/components/ui/Reveal";
import { ArrowRight } from "@/components/ui/Icons";

export const metadata: Metadata = {
  title: "О галерее",
  description:
    "Как устроена «Винтаж — Галерея Галаниной»: отбор, атрибуция и честный рассказ о каждой вещи.",
};

const segments = [
  {
    title: "Творческие женщины",
    age: "30–65",
    text: "Художницы, блогеры, театралы, дизайнеры, модели, реставраторы. Увлечены модой и историей, ищут нестандартный стиль, ценят натуральные материалы.",
    hook: "Происхождение вещи, фактура, крой",
  },
  {
    title: "Стильная молодёжь",
    age: "18–25",
    text: "Неформальные стили: рокеры, трендовые, любители аниме, субкультур и люкса. Собирают образ из редкого, а не из нового.",
    hook: "80-е и 90-е, тяжёлый люкс, единственный экземпляр",
  },
  {
    title: "Ценители качества",
    age: "40–60",
    text: "Предприниматели и публичные люди. Знают люксовые бренды, требовательны к материалу, крою и состоянию вещи.",
    hook: "Бренд, состав, состояние, аккуратный сервис",
  },
];

export default function AboutPage() {
  return (
    <>
      <div className="shell">
        <nav className="crumbs" aria-label="Хлебные крошки">
          <Link href="/">Главная</Link>
          <span aria-hidden="true">·</span>
          <span>О галерее</span>
        </nav>

        <div className="pageHead" style={{ borderBottom: 0 }}>
          <p className="rubric">О бренде</p>
          <h1>Галерея, а не магазин</h1>
          <p className="lede">{brand.formula}</p>
        </div>
      </div>

      <section className="section section--tight" style={{ paddingTop: 0 }}>
        <div className="shell">
          <div className="twoCol">
            <Reveal>
              <div style={{ display: "flex", flexDirection: "column", gap: "22px" }}>
                <p className="text">
                  «{brand.full}» продаёт вещи, которые существуют в единственном
                  экземпляре. Каждая вещь отобрана вручную, имеет происхождение,
                  и свою историю. Мы говорим о них так, как галерея говорит
                  о работах: с уважением к материалу, автору и времени.
                </p>
                <p className="text">
                  Мы не уговариваем и не торопим. Наша работа — описать вещь
                  точно: что это за материал, как она сшита, в каком она
                  состоянии и откуда пришла. Дальше решение за вами.
                </p>
                <div className="hero__promise" style={{ maxWidth: "46ch" }}>
                  {brand.promise.map((p) => (
                    <span key={p}>{p}</span>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={90}>
              <div className="hero__lock" style={{ borderColor: "var(--linen)" }}>
                <img
                  src={asset("/logo.svg")}
                  alt={brand.full}
                  style={{ width: "min(300px, 100%)" }}
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <Reveal>
            <div className="head" style={{ marginBottom: "clamp(28px, 4vw, 44px)" }}>
              <p className="rubric">Основа</p>
              <h2>Три вещи, на которых всё держится</h2>
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

      <section className="section">
        <div className="shell">
          <div className="twoCol">
            <Reveal>
              <div className="head">
                <p className="rubric">Отбор</p>
                <h2>Как вещь попадает на витрину</h2>
                <p className="text">
                  До витрины доходит малая часть того, что мы смотрим. Критерии
                  простые и не меняются от вещи к вещи.
                </p>
              </div>
            </Reveal>
            <Reveal delay={90}>
              <ul className="list">
                <li>Натуральный материал: шерсть, кашемир, шёлк, кожа, замша, мех.</li>
                <li>Понятная конструкция: крой и фурнитура рассказывают о вещи больше бирки.</li>
                <li>Целая конструкция: швы, подкладка, застёжки — родные или честно заменённые.</li>
                <li>Состояние, которое можно показать при дневном свете без оговорок.</li>
                <li>Никаких реплик и вещей «в стиле бренда» — только оригиналы.</li>
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section band">
        <div className="shell">
          <div className="band__grid" style={{ alignItems: "start" }}>
            <Reveal>
              <div className="head">
                <p className="rubric">Честность</p>
                <h2>Дефект показываем отдельным кадром</h2>
                <p className="text">
                  Потёртость, замененная подкладка, след от катышков — всё это
                  часть возраста вещи, а не то, что нужно прятать. Мы снимаем
                  каждую вещь минимум в четырёх кадрах: целиком, со спины,
                  крупно по фактуре и отдельно — по износу.
                </p>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <div className="stories" style={{ gridTemplateColumns: "1fr" }}>
                <div className="storyCard">
                  <p className="rubric">Чего вы не увидите</p>
                  <ul className="list" style={{ color: "rgba(246,243,238,0.76)" }}>
                    <li>Слов «секонд-хенд», «б/у» и «поношенное».</li>
                    <li>Скидок, таймеров и «успей забрать».</li>
                    <li>Реплик и вещей «в стиле бренда».</li>
                    <li>Фильтров, которые вытягивают цвет ткани.</li>
                  </ul>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <Reveal>
            <div className="head" style={{ marginBottom: "clamp(28px, 4vw, 44px)" }}>
              <p className="rubric">Кому это близко</p>
              <h2>Три очень разных человека</h2>
              <p className="text">
                Общее у них одно: желание вещи с историей и нежелание встретить
                её на ком-то ещё.
              </p>
            </div>
          </Reveal>
          <div className="segments">
            {segments.map((s, i) => (
              <Reveal key={s.title} delay={i * 90}>
                <div className="segment">
                  <div className="segment__head">
                    <h3 className="segment__title">{s.title}</h3>
                    <span className="segment__age">{s.age}</span>
                  </div>
                  <p className="segment__text">{s.text}</p>
                  <p className="meta">Что цепляет: {s.hook}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section band">
        <div className="shell">
          <div className="band__grid">
            <Reveal>
              <div className="head">
                <p className="rubric">Витрина</p>
                <h2>Посмотрите, что есть сейчас</h2>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <Link href="/catalog" className="link" style={{ color: "var(--paper)" }}>
                Открыть каталог
                <ArrowRight className="link__arrow" />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
