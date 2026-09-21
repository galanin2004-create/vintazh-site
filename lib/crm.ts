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
/** Страница возврата после оплаты спрашивает статус здесь. */
export const payStatusEndpoint = crmEnabled ? `${BASE}/api/pay/status` : "";
/** Платёж не прошёл — выставить новый на ту же заявку. */
export const payRetryEndpoint = crmEnabled ? `${BASE}/api/pay/retry` : "";

/** Состояние вещи с точки зрения покупателя. */
export type ItemState = "free" | "reserved" | "sold";

export const stateLabel: Record<ItemState, string> = {
  free: "",
  reserved: "Отложена",
  sold: "Продано",
};
