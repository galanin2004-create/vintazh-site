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
    d: "Не получается приехать — снимаем подробное видео вещи, показываем состав, состояние и все следы носки. После оплаты упаковываем в чехол и крафт и отправляем в тот же или на следующий день. Трек-номер присылаем сразу.",
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
                <h2>Как рассчитаться и как получить</h2>
              </div>
            </Reveal>
            <Reveal delay={90}>
              <ul className="list">
                <li>
                  <span>
                    <b>В галерее</b> — наличными или переводом. Смотрите, меряете,
                    платите — вещь ваша.
                  </span>
                </li>
                <li>
                  <span>
                    <b>Доставка по Владимиру</b> —
                    привезём сами или курьером Яндекса в день договорённости.
                    Стоимость обсуждаем при брони.
                  </span>
                </li>
                <li>
                  <span>
                    <b>Почта России</b> — в любое отделение страны, 3–7 дней. Оплата
                    переводом до отправки или <b>при получении</b>: посылку можно
                    вскрыть при операторе и отказаться, если что-то не так.
                    Комиссия Почты за оплату при получении — около 5 % от суммы,
                    её платит получатель.
                  </span>
                </li>
                <li>
                  <span>
                    <b>Яндекс Доставка</b> — в пункт выдачи или постамат, обычно
                    1–3 дня. Только по предоплате: у Яндекса нет оплаты при
                    получении.
                  </span>
                </li>
                <li>
                  <span>
                    <b>СДЭК</b> — до пункта выдачи или до двери, 1–3 дня. Для
                    незнакомых друг другу людей есть «Надёжная сделка»: вы платите
                    по ссылке от СДЭК, деньги замораживаются и уходят нам только
                    после того, как вы получили и осмотрели вещь.
                  </span>
                </li>
                <li>
                  <span>
                    <b>Доставку оплачивает покупатель</b> по тарифу службы. Точную
                    сумму называем до отправки — она видна в калькуляторе службы,
                    мы ничего сверху не добавляем.
                  </span>
                </li>
                <li>
                  <span>Каждая посылка идёт с объявленной ценностью на полную стоимость вещи.</span>
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
                    Деньги возвращаем в течение 10 дней с момента, как вы заявили
                    о возврате, тем же способом, каким платили.
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
