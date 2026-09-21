import type { Metadata } from "next";
import Link from "next/link";
import OrderDone from "@/components/OrderDone";

export const metadata: Metadata = {
  title: "Оплата",
  description: "Итог оплаты вещи из галереи.",
  // Сюда приходят только с кассы — в поиске странице делать нечего.
  robots: { index: false, follow: false },
};

export default function OrderDonePage() {
  return (
    <>
      <div className="shell">
        <nav className="crumbs" aria-label="Хлебные крошки">
          <Link href="/">Главная</Link>
          <span aria-hidden="true">·</span>
          <Link href="/catalog">Каталог</Link>
          <span aria-hidden="true">·</span>
          <span>Оплата</span>
        </nav>
      </div>

      <section className="section section--tight">
        <div className="shell">
          <OrderDone />
        </div>
      </section>
    </>
  );
}
