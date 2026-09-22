"use client";

import Link from "next/link";
import { useState } from "react";
import { itemBySlug } from "@/data/items";
import { label } from "@/data/taxonomy";
import {
  CTA,
  CTA_HOLD,
  askLink,
  brand,
  contacts,
  formatPrice,
  HOLD_NOTE,
  PAY_NOTE,
  PRICE_ON_REQUEST,
} from "@/lib/brand";
import { useUrlQuery } from "@/lib/useUrlQuery";
import { ordersEndpoint } from "@/lib/crm";
import { useItemState, usePayEnabled } from "./AvailabilityProvider";
import Photo from "./ui/Photo";

/*
  Адрес приёмника берётся из lib/crm. Пусто — форма не исчезает, а уводит
  в Telegram с готовым текстом: витрина на GitHub Pages, где своего сервера
  нет, всё равно принимает брони.
*/

type Delivery = "gallery" | "shipping";
type ShipMethod = "post" | "cdek" | "yandex" | "courier";
type Errors = Partial<Record<string, string>>;

/**
 * Службы доставки. Список правится здесь — форма подстроится сама.
 * Тот же список — в ship_methods() CRM, правятся вместе.
 * Доставка включена в цену вещи, поэтому способа расчёта здесь нет:
 * платят картой на сайте, сразу.
 */
const SHIP_METHODS: {
  value: ShipMethod;
  label: string;
  needsPostcode: boolean;
  addressHint: string;
  /** Срок — чтобы не ходить за этим на страницу «Визит». */
  hint: string;
}[] = [
  {
    value: "post",
    label: "Почта России",
    needsPostcode: true,
    addressHint: "Улица, дом, квартира",
    hint: "В любое отделение страны, 3–7 дней.",
  },
  {
    value: "cdek",
    label: "СДЭК",
    needsPostcode: false,
    addressHint: "Адрес пункта выдачи или его код",
    hint: "До пункта выдачи или до двери, 1–3 дня.",
  },
  {
    value: "yandex",
    label: "Яндекс Доставка",
    needsPostcode: false,
    addressHint: "Адрес пункта выдачи Яндекса или постамата",
    hint: "В пункт выдачи или постамат, обычно 1–3 дня.",
  },
  {
    value: "courier",
    label: `Курьер по городу ${brand.city}`,
    needsPostcode: false,
    addressHint: "Улица, дом, квартира",
    hint: "Привезём сами или курьером Яндекса в день договорённости.",
  },
];

export default function OrderForm() {
  const params = useUrlQuery();
  const slug = params.get("item") ?? "";
  const item = slug ? itemBySlug(slug) : undefined;
  const state = useItemState(slug, item?.sold);
  const pay = usePayEnabled();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [telegram, setTelegram] = useState("");
  const [city, setCity] = useState("");
  const [delivery, setDelivery] = useState<Delivery>("gallery");
  const [comment, setComment] = useState("");
  const [agreed, setAgreed] = useState(false);

  const [shipMethod, setShipMethod] = useState<ShipMethod>("post");
  const [recipient, setRecipient] = useState("");
  const [postcode, setPostcode] = useState("");
  const [region, setRegion] = useState("");
  const [address, setAddress] = useState("");

  const [errors, setErrors] = useState<Errors>({});
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState<{ code: string; holdHours: number } | null>(null);
  const [failed, setFailed] = useState<string | null>(null);

  const method = SHIP_METHODS.find((m) => m.value === shipMethod)!;
  const shipping = delivery === "shipping";

  if (!slug || !item) {
    return (
      <div className="empty">
        <p className="rubric">Вещь не выбрана</p>
        <p className="text" style={{ maxWidth: "44ch" }}>
          Забронировать можно из карточки вещи — там же видно фотографии и
          характеристики.
        </p>
        <Link href="/catalog" className="btn btn--primary">
          Открыть каталог
        </Link>
      </div>
    );
  }

  // Оплата сразу, а цены нет — платить нечего: про такую вещь спрашивают в Telegram
  if (pay && !item.price) {
    return (
      <div className="empty">
        <p className="rubric">Цена уточняется</p>
        <p className="text" style={{ maxWidth: "46ch" }}>
          У «{item.title}» цена пока не проставлена. Напишите нам — назовём
          и, если захотите, отложим вещь за вами.
        </p>
        <a
          className="btn btn--primary"
          href={askLink(item.title, item.number)}
          target="_blank"
          rel="noreferrer"
        >
          Узнать цену в Telegram
        </a>
      </div>
    );
  }

  // Занятость приходит из CRM: забирать уже отданное или отложенное нельзя.
  if (!done && state !== "free") {
    const sold = state === "sold";
    return (
      <div className="empty">
        <p className="rubric">{sold ? "Вещь ушла" : "Вещь отложена"}</p>
        <p className="text" style={{ maxWidth: "46ch" }}>
          {sold
            ? `«${item.title}» уже забрали. Напишите нам — подскажем, если появится что-то близкое.`
            : `«${item.title}» держат за другим покупателем. Если бронь сорвётся, вещь вернётся на витрину — напишите, и мы скажем вам первым.`}
        </p>
        <a
          className="btn btn--primary"
          href={askLink(item.title, item.number)}
          target="_blank"
          rel="noreferrer"
        >
          Написать в Telegram
        </a>
      </div>
    );
  }

  if (done) {
    return (
      <div className="empty">
        <p className="rubric">Заявка {done.code}</p>
        <h2 style={{ marginBlock: "6px 8px" }}>Вещь за вами</h2>
        <p className="text" style={{ maxWidth: "48ch" }}>
          Сняли «{item.title}» с витрины и держим {done.holdHours} часа.
          {shipping
            ? " Свяжемся, подтвердим адрес и пришлём трек-номер, как только посылка уйдёт."
            : " Свяжемся и договоримся о времени визита."}{" "}
          Если удобнее самим — звоните на {contacts.phone}.
        </p>
        <Link href="/catalog" className="btn btn--ghost">
          Вернуться к вещам
        </Link>
      </div>
    );
  }

  const validate = () => {
    const next: Errors = {};
    if (name.trim().length < 2) next.name = "Как к вам обращаться?";

    const digits = phone.replace(/\D/g, "");
    if (digits.length < 10 && telegram.trim() === "") {
      next.phone = "Оставьте телефон или Telegram — иначе мы не ответим";
    }
    if (shipping && digits.length < 10) {
      next.phone = "Для отправки нужен телефон: его требует служба доставки";
    }
    if (pay && digits.length < 10) {
      next.phone = "Для оплаты нужен телефон: на него придёт чек";
    }

    if (shipping) {
      if (recipient.trim().split(/\s+/).length < 2 || recipient.trim().length < 5) {
        next.recipient = "Фамилия, имя и отчество — как в паспорте";
      }
      if (method.needsPostcode && !/^\d{6}$/.test(postcode.trim())) {
        next.postcode = "Почте нужен индекс из шести цифр";
      }
      if (address.trim().length < 5) next.address = method.addressHint;
      if (city.trim().length < 2) next.city = "Укажите город доставки";
    }

    if (!agreed) next.agreed = "Без согласия не сможем принять заявку";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  /** Запасной путь: адреса приёмника нет — уводим в Telegram с готовым текстом. */
  const viaTelegram = () => {
    const lines = [
      `Здравствуйте! Бронирую «${item.title}»${item.number ? `, № ${item.number}` : ""}.`,
      `Имя: ${name}`,
      phone ? `Телефон: ${phone}` : "",
      shipping
        ? [
            `Отправка: ${method.label}`,
            `Получатель: ${recipient}`,
            `Адрес: ${[postcode, region, city, address].filter(Boolean).join(", ")}`,
          ].join("\n")
        : `Заберу в галерее${city ? `, ${city}` : ""}`,
      comment ? `Комментарий: ${comment}` : "",
    ].filter(Boolean);

    window.open(
      `${contacts.telegramHref}?text=${encodeURIComponent(lines.join("\n"))}`,
      "_blank",
      "noreferrer",
    );
  };

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setFailed(null);
    if (!validate()) return;

    if (!ordersEndpoint) {
      viaTelegram();
      return;
    }

    setSending(true);
    try {
      const response = await fetch(ordersEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          telegram: telegram.trim(),
          city: city.trim(),
          delivery,
          comment: comment.trim(),
          itemSlug: item.slug,
          itemTitle: item.title,
          itemPrice: item.price ?? null,
          ...(shipping
            ? {
                shipMethod,
                recipient: recipient.trim(),
                postcode: postcode.trim(),
                region: region.trim(),
                address: address.trim(),
              }
            : {}),
        }),
      });
      const data = await response.json().catch(() => null);

      if (response.ok && data?.ok && data.payUrl) {
        // Касса выставила счёт — уводим на страницу оплаты, кнопку не отпускаем
        window.location.assign(data.payUrl);
        return;
      }
      if (response.ok && data?.ok) {
        setDone({ code: data.code, holdHours: data.holdHours ?? 24 });
        return;
      }
      if (data?.errors) {
        setErrors(data.errors);
        return;
      }
      setFailed(data?.error ?? "Заявка не ушла. Попробуйте написать в Telegram.");
    } catch {
      setFailed("Не получилось связаться с галереей. Напишите нам в Telegram.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="order">
      <aside className="order__item">
        <div className="card__frame">
          <Photo src={item.photos?.[0]} alt={item.title} label="Вещь целиком" priority />
        </div>
        <p className="card__meta" style={{ marginTop: "14px" }}>
          {label("country", item.country)} · {label("kind", item.kind)}
        </p>
        <h2 className="card__title" style={{ marginTop: "6px" }}>
          {item.title}
        </h2>
        <p className={item.price ? "card__price" : "card__price card__price--ask"}>
          {item.price ? formatPrice(item.price) : PRICE_ON_REQUEST}
        </p>
        <p className="item__note" style={{ marginTop: "14px" }}>
          {pay
            ? `${PAY_NOTE}. Данные карты вводятся на защищённой странице ЮKassa, мы их не видим.`
            : `${HOLD_NOTE}. Бронь бесплатная и ни к чему не обязывает.`}
        </p>
        <Link
          href={`/catalog/${item.slug}`}
          className="reset"
          style={{ marginTop: "14px", display: "inline-block" }}
        >
          Вернуться к вещи
        </Link>
      </aside>

      <form className="order__form" onSubmit={submit} noValidate>
        <div className="field">
          <label htmlFor="name">Имя</label>
          <input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
            required
          />
          {errors.name && <span className="field__error">{errors.name}</span>}
        </div>

        <div className="order__pair">
          <div className="field">
            <label htmlFor="phone">Телефон</label>
            <input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+7 900 000-00-00"
              autoComplete="tel"
            />
            {errors.phone && <span className="field__error">{errors.phone}</span>}
          </div>

          <div className="field">
            <label htmlFor="telegram">Telegram</label>
            <input
              id="telegram"
              value={telegram}
              onChange={(e) => setTelegram(e.target.value)}
              placeholder="@username"
            />
          </div>
        </div>

        <fieldset className="field">
          <legend>Как заберёте вещь</legend>
          <div className="order__choices">
            {(
              [
                ["gallery", `Приеду в галерею, ${brand.city}`],
                ["shipping", "Нужна отправка в другой город"],
              ] as [Delivery, string][]
            ).map(([value, text]) => (
              <label key={value} className={`choice${delivery === value ? " is-on" : ""}`}>
                <input
                  type="radio"
                  name="delivery"
                  value={value}
                  checked={delivery === value}
                  onChange={() => setDelivery(value)}
                />
                <span>{text}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className="field">
          <label htmlFor="city">Город</label>
          <input
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder={brand.city}
            autoComplete="address-level2"
          />
          {errors.city && <span className="field__error">{errors.city}</span>}
        </div>

        {/* Данные для посылки спрашиваем только когда они нужны */}
        {shipping && (
          <div className="order__ship">
            <p className="rubric">Куда отправить</p>

            <fieldset className="field">
              <legend>Служба доставки</legend>
              <div className="order__choices">
                {SHIP_METHODS.map((m) => (
                  <label
                    key={m.value}
                    className={`choice${shipMethod === m.value ? " is-on" : ""}`}
                  >
                    <input
                      type="radio"
                      name="shipMethod"
                      value={m.value}
                      checked={shipMethod === m.value}
                      onChange={() => setShipMethod(m.value)}
                    />
                    <span>{m.label}</span>
                  </label>
                ))}
              </div>
              <span className="field__hint">{method.hint}</span>
              {errors.shipMethod && (
                <span className="field__error">{errors.shipMethod}</span>
              )}
            </fieldset>

            <div className="field">
              <label htmlFor="recipient">Получатель</label>
              <input
                id="recipient"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                placeholder="Фамилия Имя Отчество"
                autoComplete="name"
              />
              <span className="field__hint">
                Полностью, как в паспорте: по нему выдают посылку.
              </span>
              {errors.recipient && (
                <span className="field__error">{errors.recipient}</span>
              )}
            </div>

            <div className="order__pair">
              {method.needsPostcode && (
                <div className="field">
                  <label htmlFor="postcode">Индекс</label>
                  <input
                    id="postcode"
                    inputMode="numeric"
                    value={postcode}
                    onChange={(e) => setPostcode(e.target.value)}
                    placeholder="600000"
                    autoComplete="postal-code"
                  />
                  {errors.postcode && (
                    <span className="field__error">{errors.postcode}</span>
                  )}
                </div>
              )}

              <div className="field">
                <label htmlFor="region">Область, край или республика</label>
                <input
                  id="region"
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  placeholder="Владимирская область"
                  autoComplete="address-level1"
                />
              </div>
            </div>

            <div className="field">
              <label htmlFor="address">Адрес</label>
              <input
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder={method.addressHint}
                autoComplete="street-address"
              />
              {errors.address && <span className="field__error">{errors.address}</span>}
            </div>

            <p className="field__hint">
              Доставка по России включена в цену — доплат за посылку нет.
            </p>
          </div>
        )}

        <div className="field">
          <label htmlFor="comment">Комментарий</label>
          <textarea
            id="comment"
            rows={3}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder={
              shipping
                ? "Что уточнить по вещи, пожелания по отправке"
                : "Когда удобно приехать, что уточнить по вещи"
            }
          />
        </div>

        <label className="agree">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
          />
          <span>
            Согласен на обработку имени, контактов и адреса, чтобы галерея
            связалась со мной и отправила заказ
            {pay ? ", и на передачу платёжных данных ЮKassa для оплаты" : ""}.
          </span>
        </label>
        {errors.agreed && <span className="field__error">{errors.agreed}</span>}

        {failed && <p className="field__error field__error--wide">{failed}</p>}

        <div className="order__actions">
          <button className="btn btn--primary" type="submit" disabled={sending}>
            {sending
              ? pay
                ? "Открываем оплату…"
                : "Отправляем…"
              : pay
                ? item.price
                  ? `Оплатить ${formatPrice(item.price)}`
                  : CTA
                : CTA_HOLD}
          </button>
          <a
            className="btn btn--ghost"
            href={askLink(item.title, item.number)}
            target="_blank"
            rel="noreferrer"
          >
            Спросить в Telegram
          </a>
        </div>
      </form>
    </div>
  );
}
