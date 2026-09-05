"use client";

import Link from "next/link";
import type { Item } from "@/data/items";
import { useItemState } from "./AvailabilityProvider";
import {
  CTA,
  CTA_SECOND,
  CTA_SOLD,
  HOLD_NOTE,
  askLink,
  brand,
  contacts,
  formatPrice,
  PRICE_ON_REQUEST,
} from "@/lib/brand";

/*
  Два отдельных блока, а не один: между ними стоит «История вещи».
  Бренд-бук (полоса 10) требует именно такого порядка — название, цена,
  история, и только потом характеристики и кнопки.

  Состояние обоих берётся у CRM: ушедшее не предлагаем бронировать,
  отложенное честно называем отложенным, но связаться не мешаем —
  бронь может сорваться.
*/

export function ItemPrice({ item }: { item: Item }) {
  const state = useItemState(item.slug, item.sold);

  if (state === "sold") {
    return <p className="item__price item__price--sold">{CTA_SOLD}</p>;
  }
  if (item.price) {
    return <p className="item__price">{formatPrice(item.price)}</p>;
  }
  return <p className="item__price item__price--ask">{PRICE_ON_REQUEST}</p>;
}

export function ItemActions({ item }: { item: Item }) {
  const state = useItemState(item.slug, item.sold);
  const ask = askLink(item.title, item.number);

  return (
    <div className="item__actions">
      {state === "sold" && (
        <>
          <span className="btn btn--sold">{CTA_SOLD}</span>
          <a className="btn btn--ghost" href={ask} target="_blank" rel="noreferrer">
            Найти похожую
          </a>
        </>
      )}

      {state === "reserved" && (
        <>
          <span className="btn btn--sold">Отложена за покупателем</span>
          <a className="btn btn--ghost" href={ask} target="_blank" rel="noreferrer">
            Сообщить, если освободится
          </a>
          <p className="item__note">
            Вещь держат за другим человеком до конца брони. Если он не заберёт,
            она вернётся на витрину — напишите, и мы скажем вам первым.
          </p>
        </>
      )}

      {state === "free" && (
        <>
          <Link className="btn btn--primary" href={`/order?item=${item.slug}`}>
            {CTA}
          </Link>
          <a className="btn btn--ghost" href={ask} target="_blank" rel="noreferrer">
            {CTA_SECOND}
          </a>
          <p className="item__note">
            {HOLD_NOTE}. Бронь бесплатная: вещь снимается с витрины, и никто
            другой её не заберёт. Смотреть в галерее — {brand.city}, по звонку
            на {contacts.phone}.
          </p>
        </>
      )}
    </div>
  );
}
