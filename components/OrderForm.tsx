"use client";

import Link from "next/link";
import { useState } from "react";
import { itemBySlug } from "@/data/items";
import { label } from "@/data/taxonomy";
import {
  CTA,
  askLink,
  brand,
  contacts,
  formatPrice,
  HOLD_NOTE,
  PRICE_ON_REQUEST,
} from "@/lib/brand";
import { useUrlQuery } from "@/lib/useUrlQuery";
import { ordersEndpoint } from "@/lib/crm";
import { useItemState } from "./AvailabilityProvider";
import Photo from "./ui/Photo";

/*
  Адрес приёмника берётся из lib/crm. Пусто — форма не исчезает, а уводит
  в Telegram с готовым текстом: витрина на GitHub Pages, где своего сервера
  нет, всё равно принимает брони.
*/

type Delivery = "gallery" | "shipping";
type Errors = Partial<Record<string, string>>;

export default function OrderForm() {
  const params = useUrlQuery();
  const slug = params.get("item") ?? "";
  const item = slug ? itemBySlug(slug) : undefined;
  const state = useItemState(slug, item?.sold);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [telegram, setTelegram] = useState("");
  const [city, setCity] = useState("");
  const [delivery, setDelivery] = useState<Delivery>("gallery");
  const [comment, setComment] = useState("");
  const [agreed, setAgreed] = useState(false);

  const [errors, setErrors] = useState<Errors>({});
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState<{ code: string; holdHours: number } | null>(null);
  const [failed, setFailed] = useState<string | null>(null);

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

  // Занятость приходит из CRM: бронировать уже отданное или отложенное нельзя.
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
        <p className="text" style={{ maxWidth: "46ch" }}>
          Сняли «{item.title}» с витрины и держим {done.holdHours} часа. Свяжемся
          в ближайшее время — если удобнее самим, звоните на {contacts.phone}.
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
    if (phone.replace(/\D/g, "").length < 10 && telegram.trim() === "") {
      next.phone = "Оставьте телефон или Telegram — иначе мы не ответим";
    }
    if (!agreed) next.agreed = "Без согласия не сможем принять заявку";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  /** Запасной путь: адреса приёмника нет — уводим в Telegram с готовым текстом. */
  const viaTelegram = () => {
    const how = delivery === "gallery" ? "заберу в галерее" : "нужна отправка";
    const text =
      `Здравствуйте! Бронирую «${item.title}»` +
      (item.number ? `, № ${item.number}` : "") +
      `.\nИмя: ${name}` +
      (phone ? `\nТелефон: ${phone}` : "") +
      (city ? `\nГород: ${city}` : "") +
      `\nПолучение: ${how}` +
      (comment ? `\nКомментарий: ${comment}` : "");
    window.open(
      `${contacts.telegramHref}?text=${encodeURIComponent(text)}`,
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
        }),
      });
      const data = await response.json().catch(() => null);

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
          {HOLD_NOTE}. Бронь бесплатная и ни к чему не обязывает.
        </p>
        <Link href={`/catalog/${item.slug}`} className="reset" style={{ marginTop: "14px", display: "inline-block" }}>
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

        <div className="field">
          <label htmlFor="city">Город</label>
          <input
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder={brand.city}
            autoComplete="address-level2"
          />
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
          <label htmlFor="comment">Комментарий</label>
          <textarea
            id="comment"
            rows={3}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Когда удобно приехать, что уточнить по вещи"
          />
        </div>

        <label className="agree">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
          />
          <span>
            Согласен на обработку имени и контактов, чтобы галерея связалась со
            мной по этой заявке.
          </span>
        </label>
        {errors.agreed && <span className="field__error">{errors.agreed}</span>}

        {failed && <p className="field__error field__error--wide">{failed}</p>}

        <div className="order__actions">
          <button className="btn btn--primary" type="submit" disabled={sending}>
            {sending ? "Отправляем…" : CTA}
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
