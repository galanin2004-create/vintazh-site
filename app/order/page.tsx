import type { Metadata } from "next";
import Link from "next/link";
import OrderForm from "@/components/OrderForm";
import { HOLD_NOTE, PAY_NOTE } from "@/lib/brand";
import { payEnabled } from "@/lib/pay";

export const metadata: Metadata = {
  title: "Оформление",
  description: payEnabled
    ? "Оплатить вещь из галереи и забрать её или получить отправкой."
    : "Оставить вещь из галереи за собой на 24 часа.",
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
          <span>Оформление</span>
        </nav>

        <div className="pageHead" style={{ borderBottom: 0 }}>
          <p className="rubric">Оформление</p>
          <h1>{payEnabled ? "Забрать вещь себе" : "Оставить вещь за собой"}</h1>
          <p className="lede">
            {payEnabled ? (
              <>
                {PAY_NOTE}. Как только деньги пришли, вещь ваша: снимаем её с
                витрины и готовим к отправке или встрече в галерее.
              </>
            ) : (
              <>
                {HOLD_NOTE}: мы снимаем вещь с витрины и никому её не отдаём,
                пока вы решаете. Оплаты сейчас не будет — рассчитаемся при
                встрече или переводом перед отправкой.
              </>
            )}
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
