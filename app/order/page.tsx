import type { Metadata } from "next";
import Link from "next/link";
import OrderForm from "@/components/OrderForm";
import { PAY_NOTE } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Оформление",
  description: "Оплатить вещь из галереи и забрать её или получить отправкой.",
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
          <h1>Забрать вещь себе</h1>
          <p className="lede">
            {PAY_NOTE}. Как только деньги пришли, вещь ваша: снимаем её с
            витрины и готовим к отправке или встрече в галерее.
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
