import type { Metadata } from "next";
import Link from "next/link";
import { brand, contacts, CTA, CTA_HOLD, HOLD_NOTE, PAY_NOTE } from "@/lib/brand";
import { payEnabled } from "@/lib/pay";
import Reveal from "@/components/ui/Reveal";
import { ArrowRight } from "@/components/ui/Icons";

export const metadata: Metadata = {
  title: payEnabled ? "Визит и покупка" : "Визит и бронь",
  description: payEnabled
    ? "Как оплатить вещь на сайте, забрать её в галерее во Владимире или получить отправкой в другой город."
    : "Как забронировать вещь на 24 часа, приехать в галерею во Владимире и получить отправку в другой город.",
};

/* Порядок зависит от того, подключена ли касса: пока её нет, вещь
   бронируют бесплатно и платят при встрече — обещать оплату картой,
   которой ещё нет, нельзя. */
const paySteps = [
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

const holdSteps = [
  {
    t: "Бронь",
    d: "Заполняете короткую форму — имя, телефон и куда отправлять, если не приедете. Мы снимаем вещь с витрины и держим за вами 24 часа. Бронь бесплатная и ни к чему не обязывает.",
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
    d: "Не получается приехать — снимаем подробное видео вещи. После оплаты переводом упаковываем в чехол и крафт и отправляем в тот же или на следующий день. Трек-номер присылаем сразу.",
  },
];

const steps = payEnabled ? paySteps : holdSteps;

export default function VisitPage() {
  return (
    <>
      <div className="shell">
        <nav className="crumbs" aria-label="Хлебные крошки">
          <Link href="/">Главная</Link>
          <span aria-hidden="true">·</span>
          <span>{payEnabled ? "Визит и покупка" : "Визит и бронь"}</span>
        </nav>

        <div className="pageHead" style={{ borderBottom: 0 }}>
          <p className="rubric">Порядок</p>
          <h1>{payEnabled ? "Визит и покупка" : "Визит и бронь"}</h1>
          <p className="lede">
            {payEnabled ? (
              <>Вещь одна, поэтому очереди нет: кто оплатил — того и вещь. {PAY_NOTE}.</>
            ) : (
              <>
                Вещь одна, поэтому главное действие на сайте — не «купить», а
                «забронировать». {HOLD_NOTE} — этого хватает, чтобы спокойно
                доехать и померить.
              </>
            )}
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
                {payEnabled ? (
                  <>
                    <li>
                      <span>
                        <b>Оплата</b> — картой на сайте через ЮKassa: Мир, Visa,
                        Mastercard, СБП. Данные карты мы не видим. Чек по 54-ФЗ
                        приходит на телефон.
                      </span>
                    </li>
                    <li>
                      <span>
                        <b>В галерее</b> — оплаченную вещь забираете в удобное
                        время, о встрече договоримся в Telegram или по телефону.
                      </span>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <span>
                        <b>Оплата</b> — пока только при встрече или переводом
                        перед отправкой: оплату картой на сайте подключаем.
                      </span>
                    </li>
                    <li>
                      <span>
                        <b>В галерее</b> — наличными или переводом. Смотрите,
                        меряете, платите — вещь ваша.
                      </span>
                    </li>
                  </>
                )}
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
                {!payEnabled && (
                  <li>
                    <span>
                      Пока оплата картой не подключена, деньги берём переводом
                      перед отправкой или наличными при встрече.
                    </span>
                  </li>
                )}
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
                    Деньги возвращаем в течение 10 дней с момента, как вы
                    заявили о возврате, тем же способом, каким платили.
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
                {payEnabled ? CTA : CTA_HOLD}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
