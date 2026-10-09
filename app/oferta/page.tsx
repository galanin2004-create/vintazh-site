import type { Metadata } from "next";
import LegalDoc from "@/components/LegalDoc";
import { oferta } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Оферта",
  description: "Условия продажи вещей галереи «Винтаж» на сайте: оплата, доставка, возврат.",
};

export default function OfertaPage() {
  return (
    <LegalDoc
      crumb="Оферта"
      title="Договор-оферта"
      lede="Условия, на которых галерея продаёт вещи через сайт: как оплатить, как получить и как вернуть, если вещь не подошла."
      sections={oferta}
    />
  );
}
