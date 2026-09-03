/**
 * Единственный источник правды по бренду.
 * Всё взято из бренд-бука «Винтаж — Галерея Галаниной», редакция 1.0.
 * Меняем контакты и формулировки здесь, а не по компонентам.
 */

export const brand = {
  name: "Винтаж",
  full: "Винтаж — Галерея Галаниной",
  lockup: "ВИНТАЖ · ГАЛЕРЕЯ ГАЛАНИНОЙ",
  city: "Владимир",
  formula:
    "Винтажная одежда и аксессуары в единственном экземпляре — отобранные, атрибутированные и рассказанные.",
  promise: [
    "Вы не встретите эту вещь на другом человеке.",
    "Вы знаете, откуда она, из чего сделана и в каком году появилась.",
  ],
} as const;

/** Главное действие. Бренд-бук: вместо «Купить» и «В корзину». */
export const CTA = "Забронировать эксклюзив";
export const CTA_SECOND = "Спросить о вещи в Telegram";
export const CTA_SOLD = "Забрано · вещь ушла";
export const HOLD_NOTE = "Оставить за собой на 24 часа";

export const contacts = {
  phone: "+7 (900) 476-26-33",
  phoneHref: "tel:+79004762633",
  telegram: "@vintage_galanina",
  telegramHref: "https://t.me/vintage_galanina",
  vk: "@vintage_vo_vladimire",
  vkHref: "https://vk.com/vintage_vo_vladimire",
  instagram: "в процессе создания",
} as const;

/** Три принципа с полосы «О бренде». */
export const principles = [
  {
    title: "Один экземпляр",
    text: "Каждая позиция уникальна. Повтора не будет — это основа ценности и основа тона всех коммуникаций.",
  },
  {
    title: "Натуральные материалы",
    text: "Шерсть, кашемир, шёлк, кожа, замша, мех. Материал называем всегда и первым.",
  },
  {
    title: "Тяжёлый люкс",
    text: "Крой, вес, фурнитура, подкладка. Качество, которое чувствуется в руках, а не в логотипе.",
  },
] as const;

export const nav = [
  { href: "/catalog", label: "Каталог" },
  { href: "/about", label: "О галерее" },
  { href: "/visit", label: "Визит и бронь" },
  { href: "/contacts", label: "Контакты" },
] as const;

/** Ссылка «спросить о конкретной вещи» — с подставленным названием. */
export function askLink(itemTitle?: string, itemNumber?: string) {
  if (!itemTitle) return contacts.telegramHref;
  const text = itemNumber
    ? `Здравствуйте! Интересует «${itemTitle}», № ${itemNumber}.`
    : `Здравствуйте! Интересует «${itemTitle}».`;
  return `${contacts.telegramHref}?text=${encodeURIComponent(text)}`;
}

export function formatPrice(value: number) {
  return `${value.toLocaleString("ru-RU")} \u20BD`;
}

/** \u0412\u0435\u0449\u044C \u0435\u0441\u0442\u044C, \u0430 \u043F\u043E\u043B\u0435 \u0435\u0449\u0451 \u043D\u0435 \u0437\u0430\u043F\u043E\u043B\u043D\u0435\u043D\u043E. \u041B\u0443\u0447\u0448\u0435 \u0441\u043A\u0430\u0437\u0430\u0442\u044C \u0447\u0435\u0441\u0442\u043D\u043E, \u0447\u0435\u043C \u0432\u044B\u0434\u0443\u043C\u0430\u0442\u044C. */
export const PRICE_ON_REQUEST = "\u0426\u0435\u043D\u0430 \u043F\u043E \u0437\u0430\u043F\u0440\u043E\u0441\u0443";
export const TBD = "\u0423\u0442\u043E\u0447\u043D\u044F\u0435\u0442\u0441\u044F";
