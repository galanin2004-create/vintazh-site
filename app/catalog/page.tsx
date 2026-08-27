import type { Metadata } from "next";
import Link from "next/link";
import CatalogView from "@/components/CatalogView";

export const metadata: Metadata = {
  title: "Каталог",
  description:
    "Винтажная одежда и аксессуары в единственном экземпляре. Фильтр по стране, эпохе и типу вещи.",
};

export default function CatalogPage() {
  return (
    <>
      <div className="shell">
        <nav className="crumbs" aria-label="Хлебные крошки">
          <Link href="/">Главная</Link>
          <span aria-hidden="true">·</span>
          <span>Каталог</span>
        </nav>

        <div className="pageHead" style={{ borderBottom: 0 }}>
          <p className="rubric">Витрина</p>
          <h1>Каталог</h1>
          <p className="lede">
            Каждая позиция — одна. Повтора не будет: если вещь ушла, она
            помечена «Продано» и остаётся в каталоге как часть истории галереи.
          </p>
        </div>
      </div>

      <section className="section section--tight" style={{ paddingTop: 0 }}>
        <div className="shell">
          <CatalogView />
        </div>
      </section>
    </>
  );
}
