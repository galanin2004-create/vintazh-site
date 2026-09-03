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
  return `${value.toLocaleString("ru-RU")} ₽`;
}

/** «1 вещь», «3 вещи», «9 вещей» — счётчик нужен и каталогу, и главной. */
export function plural(n: number) {
  const d10 = n % 10;
  const d100 = n % 100;
  if (d10 === 1 && d100 !== 11) return "вещь";
  if (d10 >= 2 && d10 <= 4 && (d100 < 10 || d100 >= 20)) return "вещи";
  return "вещей";
}

/** Вещь есть, а цена ещё не проставлена. Лучше сказать честно, чем выдумать. */
export const PRICE_ON_REQUEST = "Цена по запросу";
