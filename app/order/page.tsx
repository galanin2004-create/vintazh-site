import type { Metadata } from "next";
import Link from "next/link";
import OrderForm from "@/components/OrderForm";
import { HOLD_NOTE } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Бронь вещи",
  description: "Забронировать вещь из галереи на 24 часа.",
  // Страница живая только с выбранной вещью — в поиске ей делать нечего.
  robots: { index: false, follow: true },
};

export default function OrderPage() {
  return (
    <>
      <div className="shell">
        <nav className="crumbs" aria-label="Хлебные крошки">
          <Link href="/">Главная</Link>
          <span aria-hidden="true">·</span>
          <Link href="/catalog">Каталог</Link>
          <span aria-hidden="true">·</span>
          <span>Бронь</span>
        </nav>

        <div className="pageHead" style={{ borderBottom: 0 }}>
          <p className="rubric">Бронь</p>
          <h1>Оставить вещь за собой</h1>
          <p className="lede">
            {HOLD_NOTE}: мы снимаем вещь с витрины и никому её не отдаём, пока
            вы решаете. Оплаты сейчас не будет — рассчитаемся при встрече или
            переводом перед отправкой.
          </p>
        </div>
      </div>

      <section className="section section--tight" style={{ paddingTop: 0 }}>
        <div className="shell">
          <OrderForm />
        </div>
      </section>
    </>
  );
}
