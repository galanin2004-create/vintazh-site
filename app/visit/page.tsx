import type { Metadata } from "next";
import Link from "next/link";
import { brand, contacts, CTA, PAY_NOTE } from "@/lib/brand";
import Reveal from "@/components/ui/Reveal";
import { ArrowRight } from "@/components/ui/Icons";

export const metadata: Metadata = {
  title: "Визит и покупка",
  description:
    "Как оплатить вещь на сайте, забрать её в галерее во Владимире или получить отправкой в другой город.",
};

const steps = [
  {
    t: "Выбор",
    d: "Смотрите вещь в карточке: фотографии, мерки, состав, следы носки. Что-то непонятно — спросите в Telegram, снимем подробное видео. Хотите увидеть вживую — приезжайте по звонку, вещь придержим на время визита.",
  },
  {
    t: "Оплата",
    d: "Заполняете короткую форму — имя, телефон, как забираете — и платите картой на защищённой странице ЮKassa. Чек приходит на телефон. С этой секунды вещь ваша и снята с витрины.",
  },
  {
    t: "Получение",
    d: "Забираете в галерее во Владимире, когда удобно, — или отправляем Почтой, Яндекс Доставкой или СДЭК. Доставка по России включена в цену. Упаковка в чехол и крафт, трек-номер присылаем сразу.",
  },
  {
    t: "Если не подошла",
    d: "Семь дней на возврат после получения — без объяснения причин. Деньги возвращаем на карту в течение десяти дней. Подробности ниже.",
  },
];

export default function VisitPage() {
  return (
    <>
      <div className="shell">
        <nav className="crumbs" aria-label="Хлебные крошки">
          <Link href="/">Главная</Link>
          <span aria-hidden="true">·</span>
          <span>Визит и покупка</span>
        </nav>

        <div className="pageHead" style={{ borderBottom: 0 }}>
          <p className="rubric">Порядок</p>
          <h1>Визит и покупка</h1>
          <p className="lede">
            Вещь одна, поэтому очереди нет: кто оплатил — того и вещь.{" "}
            {PAY_NOTE}.
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
                <h2>Как рассчитаться и как получить</h2>
              </div>
            </Reveal>
            <Reveal delay={90}>
              <ul className="list">
                <li>
                  <span>
                    <b>Оплата</b> — картой на сайте через ЮKassa: Мир, Visa,
                    Mastercard, СБП. Данные карты мы не видим. Чек по 54-ФЗ
                    приходит на телефон.
                  </span>
                </li>
                <li>
                  <span>
                    <b>В галерее</b> — оплаченную вещь забираете в удобное время,
                    о встрече договоримся в Telegram или по телефону.
                  </span>
                </li>
                <li>
                  <span>
                    <b>Доставка по Владимиру</b> — привезём сами или курьером
                    Яндекса в день договорённости.
                  </span>
                </li>
                <li>
                  <span>
                    <b>Почта России</b> — в любое отделение страны, 3–7 дней.
                  </span>
                </li>
                <li>
                  <span>
                    <b>Яндекс Доставка</b> — в пункт выдачи или постамат, обычно
                    1–3 дня.
                  </span>
                </li>
                <li>
                  <span>
                    <b>СДЭК</b> — до пункта выдачи или до двери, 1–3 дня.
                  </span>
                </li>
                <li>
                  <span>
                    <b>Доставка по России включена в цену</b> — доплат за посылку
                    нет. Отправляем в тот же или на следующий день после оплаты,
                    с объявленной ценностью на полную стоимость вещи.
                  </span>
                </li>
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
                <p className="rubric">Возврат</p>
                <h2>Если вещь не подошла</h2>
              </div>
            </Reveal>
            <Reveal delay={90}>
              <ul className="list">
                <li>
                  <span>
                    Вещь, полученную отправкой, можно вернуть <b>в течение 7 дней</b>{" "}
                    после получения — без объяснения причин.
                  </span>
                </li>
                <li>
                  <span>
                    Условие одно: вещь в том же состоянии, в каком уехала, — без
                    новых следов носки, чистки и переделок, с нашей биркой.
                  </span>
                </li>
                <li>
                  <span>
                    Напишите нам в Telegram до отправки назад — скажем адрес и
                    службу. Обратную пересылку оплачивает покупатель.
                  </span>
                </li>
                <li>
                  <span>
                    Деньги возвращаем на карту, с которой платили, в течение 10
                    дней с момента, как вы заявили о возврате.
                  </span>
                </li>
                <li>
                  <span>
                    Вещь, забранную в галерее после примерки, вернуть нельзя: вы
                    видели её вживую. Скрытый дефект, который мы не показали, —
                    это наша ошибка, и её мы исправляем за свой счёт.
                  </span>
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
