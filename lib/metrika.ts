/**
 * Яндекс Метрика. Номер счётчика — NEXT_PUBLIC_YM_ID в workflow сборки;
 * пока его нет, счётчик не грузится, а goal() ничего не делает.
 *
 * Цели, которые сайт отправляет сам (в Метрике завести их как
 * «JavaScript-событие» с тем же идентификатором):
 *
 *   order_sent  — заявка принята как бронь (касса выключена)
 *   pay_start   — заявка принята, покупателя увели на оплату
 *   paid        — страница возврата увидела, что оплата прошла
 *
 * «Открыл вещь» и «открыл оформление» — цели по адресу (/catalog/…,
 * /order), звонок и переход в Telegram Метрика ловит автоматически.
 */
export const YM_ID = Number(process.env.NEXT_PUBLIC_YM_ID ?? "") || 0;

type Ym = (id: number, method: string, ...args: unknown[]) => void;

export function goal(name: "order_sent" | "pay_start" | "paid") {
  if (!YM_ID || typeof window === "undefined") return;
  const ym = (window as unknown as { ym?: Ym }).ym;
  ym?.(YM_ID, "reachGoal", name);
}
