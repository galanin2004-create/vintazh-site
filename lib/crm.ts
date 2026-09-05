/**
 * Связь витрины с CRM.
 *
 * Адрес задаётся одной переменной при сборке:
 *
 *     NEXT_PUBLIC_CRM_URL=http://localhost:8300
 *
 * Если её нет — а в сборке для GitHub Pages это так, — витрина работает
 * сама по себе: бронь уходит в Telegram, занятость берётся из data/items.ts.
 * Ничего не ломается, просто связи нет.
 */
const BASE = (process.env.NEXT_PUBLIC_CRM_URL ?? "").replace(/\/+$/, "");

export const crmEnabled = BASE !== "";

export const ordersEndpoint = crmEnabled ? `${BASE}/api/orders` : "";
export const availabilityEndpoint = crmEnabled ? `${BASE}/api/availability` : "";

/** Состояние вещи с точки зрения покупателя. */
export type ItemState = "free" | "reserved" | "sold";

export const stateLabel: Record<ItemState, string> = {
  free: "",
  reserved: "Отложена",
  sold: "Продано",
};
