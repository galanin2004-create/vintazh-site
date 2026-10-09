import type { Metadata } from "next";
import LegalDoc from "@/components/LegalDoc";
import { privacy } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Персональные данные",
  description: "Какие данные покупателей собирает галерея «Винтаж», зачем, кому передаёт и сколько хранит.",
};

export default function PrivacyPage() {
  return (
    <LegalDoc
      crumb="Персональные данные"
      title="Политика обработки персональных данных"
      lede="Что галерея узнаёт о покупателе при заказе, зачем, кому передаёт и как попросить данные удалить."
      sections={privacy}
    />
  );
}
