"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { contacts, formatPrice } from "@/lib/brand";
import { payRetryEndpoint, payStatusEndpoint } from "@/lib/crm";
import { useUrlQuery } from "@/lib/useUrlQuery";

/*
  Страница, на которую ЮKassa возвращает человека после оплаты.

  Статус спрашиваем у CRM сами, а не ждём вебхука: человек возвращается
  с кассы за секунду, уведомление идёт своим маршрутом. Пока касса ещё
  думает — опрашиваем каждые пару секунд, недолго. Код и ключ заявки
  живут в адресе, поэтому наружу CRM отдаёт только статус, вещь и сумму.
*/

type Status = "checking" | "paid" | "pending" | "canceled" | "missing" | "broken";

type Info = { code: string; itemTitle: string; itemSlug: string; amount: number; payUrl: string };

const POLL_MS = 2500;
const POLL_LIMIT = 16; // ≈ 40 секунд, дальше предлагаем проверить руками

export default function OrderDone() {
  const params = useUrlQuery();
  const code = params.get("code") ?? "";
  const key = params.get("key") ?? "";

  const [status, setStatus] = useState<Status>("checking");
  const [info, setInfo] = useState<Info | null>(null);
  const [retrying, setRetrying] = useState(false);
  const [retryError, setRetryError] = useState<string | null>(null);
  const polls = useRef(0);

  useEffect(() => {
    if (!code || !key || !payStatusEndpoint) {
      setStatus("missing");
      return;
    }
    let timer = 0;
    let stopped = false;

    const check = async () => {
      try {
        const url = `${payStatusEndpoint}?code=${encodeURIComponent(code)}&key=${encodeURIComponent(key)}`;
        const r = await fetch(url, { cache: "no-store" });
        const data = await r.json().catch(() => null);
        if (stopped) return;
        if (r.status === 404 || !data?.ok) {
          setStatus("missing");
          return;
        }
        setInfo({
          code: data.code,
          itemTitle: data.itemTitle,
          itemSlug: data.itemSlug,
          amount: data.amount,
          payUrl: data.payUrl ?? "",
        });
        if (data.status === "paid") {
          setStatus("paid");
          return;
        }
        if (data.status === "canceled") {
          setStatus("canceled");
          return;
        }
        polls.current += 1;
        if (polls.current >= POLL_LIMIT) {
          setStatus("pending");
          return;
        }
        timer = window.setTimeout(check, POLL_MS);
      } catch {
        if (!stopped) setStatus("broken");
      }
    };
    check();

    return () => {
      stopped = true;
      window.clearTimeout(timer);
    };
  }, [code, key]);

  /** Платёж не прошёл — просим CRM выставить новый и уходим на кассу. */
  const retry = async () => {
    setRetrying(true);
    setRetryError(null);
    try {
      const r = await fetch(payRetryEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, key }),
      });
      const data = await r.json().catch(() => null);
      if (data?.ok && data.status === "paid") {
        setStatus("paid");
        return;
      }
      if (data?.ok && data.payUrl) {
        window.location.assign(data.payUrl);
        return;
      }
      setRetryError(data?.error ?? "Не получилось выставить новый счёт. Напишите нам в Telegram.");
    } catch {
      setRetryError("Не получилось связаться с галереей. Напишите нам в Telegram.");
    } finally {
      setRetrying(false);
    }
  };

  const ask = `${contacts.telegramHref}?text=${encodeURIComponent(
    info ? `Здравствуйте! Заявка ${info.code}, «${info.itemTitle}».` : "Здравствуйте!",
  )}`;

  if (status === "checking") {
    return (
      <div className="empty">
        <p className="rubric">{info ? `Заявка ${info.code}` : "Оплата"}</p>
        <h2 style={{ marginBlock: "6px 8px" }}>Проверяем оплату…</h2>
        <p className="text" style={{ maxWidth: "44ch" }}>
          Обычно это занимает несколько секунд. Страницу можно не обновлять.
        </p>
      </div>
    );
  }

  if (status === "paid" && info) {
    return (
      <div className="empty">
        <p className="rubric">Заявка {info.code}</p>
        <h2 style={{ marginBlock: "6px 8px" }}>Оплачено. Вещь ваша</h2>
        <p className="text" style={{ maxWidth: "48ch" }}>
          «{info.itemTitle}» — {formatPrice(info.amount)}. Чек придёт на телефон.
          Мы свяжемся, чтобы договориться о встрече или подтвердить адрес, и
          пришлём трек-номер, как только посылка уйдёт. Если удобнее самим —
          звоните на {contacts.phone}.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", justifyContent: "center" }}>
          <Link href="/catalog" className="btn btn--primary">
            Вернуться к вещам
          </Link>
          <a className="btn btn--ghost" href={ask} target="_blank" rel="noreferrer">
            Написать в Telegram
          </a>
        </div>
      </div>
    );
  }

  if (status === "pending" && info) {
    return (
      <div className="empty">
        <p className="rubric">Заявка {info.code}</p>
        <h2 style={{ marginBlock: "6px 8px" }}>Оплата ещё не подтверждена</h2>
        <p className="text" style={{ maxWidth: "48ch" }}>
          Касса пока не ответила, что деньги за «{info.itemTitle}» пришли.
          Если вы закрыли страницу оплаты — вернитесь и завершите её; вещь
          держим за вами ещё около часа.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", justifyContent: "center" }}>
          {info.payUrl && (
            <a className="btn btn--primary" href={info.payUrl}>
              Вернуться к оплате
            </a>
          )}
          <button className="btn btn--ghost" type="button" onClick={() => window.location.reload()}>
            Проверить ещё раз
          </button>
        </div>
      </div>
    );
  }

  if (status === "canceled" && info) {
    return (
      <div className="empty">
        <p className="rubric">Заявка {info.code}</p>
        <h2 style={{ marginBlock: "6px 8px" }}>Оплата не прошла</h2>
        <p className="text" style={{ maxWidth: "48ch" }}>
          Банк не подтвердил платёж за «{info.itemTitle}» — так бывает, если
          закрыть окно оплаты или не хватило средств. Деньги не списаны.
          Можно попробовать ещё раз, пока вещь не забрал кто-то другой.
        </p>
        {retryError && <p className="field__error field__error--wide">{retryError}</p>}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", justifyContent: "center" }}>
          <button className="btn btn--primary" type="button" onClick={retry} disabled={retrying}>
            {retrying ? "Открываем оплату…" : `Оплатить ${formatPrice(info.amount)}`}
          </button>
          <a className="btn btn--ghost" href={ask} target="_blank" rel="noreferrer">
            Написать в Telegram
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="empty">
      <p className="rubric">{status === "broken" ? "Нет связи" : "Заявка не найдена"}</p>
      <p className="text" style={{ maxWidth: "46ch" }}>
        {status === "broken"
          ? "Не получилось связаться с галереей. Если деньги списаны — не волнуйтесь, оплата у нас отметится; напишите нам, и мы всё подтвердим."
          : "Ссылка неполная или устарела. Если вы только что платили — напишите нам, назовём статус по номеру заявки."}
      </p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", justifyContent: "center" }}>
        <a className="btn btn--primary" href={ask} target="_blank" rel="noreferrer">
          Написать в Telegram
        </a>
        <Link href="/catalog" className="btn btn--ghost">
          В каталог
        </Link>
      </div>
    </div>
  );
}
