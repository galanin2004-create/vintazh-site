/**
 * Каталог галереи.
 *
 * ВНИМАНИЕ: тексты и цены здесь — демонстрационные, чтобы витрина выглядела
 * готовой. Перед публикацией заменить на реальные вещи. Бренд-бук (полоса 10)
 * прямо запрещает придуманные факты о происхождении: если история вещи
 * неизвестна — пишем про крой, фактуру и деталь, а не выдумываем владельца.
 *
 * Фотографии: положить кадры в public/items/<slug>/ и перечислить в photos.
 * Пока массив пуст — карточка рисует спокойную заглушку в цвете «бумага».
 */

export type Condition = "Отличное" | "Очень хорошее" | "Хорошее, со следами носки";

export type Item = {
  slug: string;
  /** Номер с бирки — связывает вещь, карточку и историю. */
  number: string;
  title: string;
  country: string;
  era: string;
  kind: string;
  price: number;
  /** Материал называем всегда и первым (бренд-бук, полоса 02). */
  material: string;
  size: string;
  condition: Condition;
  /** 1–2 предложения, до 240 знаков: факт о происхождении + факт о вещи. */
  story: string;
  /** Мерки в сантиметрах — снимаем по вещи, разложенной на столе. */
  measurements?: { label: string; value: string }[];
  /** Дополнительные метки поверх фото. «Один экземпляр» ставится всегда. */
  marks?: string[];
  sold?: boolean;
  /** Для сортировки «сначала новое». */
  addedAt: string;
  photos?: string[];
};

export const items: Item[] = [
  {
    slug: "palto-sherst-shirokoe-plecho",
    number: "0147",
    title: "Пальто из шерсти с широким плечом",
    country: "italy",
    era: "1980s",
    kind: "outerwear",
    price: 24000,
    material: "Шерсть 100%",
    size: "46–48",
    condition: "Отличное",
    story:
      "Куплено в Милане в 1987 году и носилось одной хозяйкой — подкладка и пуговицы родные.",
    measurements: [
      { label: "Плечи", value: "44 см" },
      { label: "Грудь", value: "56 см" },
      { label: "Рукав", value: "60 см" },
      { label: "Длина", value: "112 см" },
    ],
    marks: ["Тяжёлый люкс"],
    addedAt: "2026-08-18",
  },
  {
    slug: "kosuha-kozha-latunnaya-molniya",
    number: "0148",
    title: "Косуха из плотной кожи",
    country: "germany",
    era: "1990s",
    kind: "fur-leather",
    price: 32000,
    material: "Кожа телёнка, подкладка — хлопок",
    size: "44–46",
    condition: "Очень хорошее",
    story:
      "Пришла из семейного архива в Дрездене: плотная кожа, разношенная по фигуре, латунная молния без замены.",
    measurements: [
      { label: "Плечи", value: "41 см" },
      { label: "Грудь", value: "50 см" },
      { label: "Рукав", value: "62 см" },
      { label: "Длина", value: "58 см" },
    ],
    marks: ["Тяжёлый люкс"],
    addedAt: "2026-08-17",
  },
  {
    slug: "kashemirovoe-palto-skrytaya-zastezhka",
    number: "0143",
    title: "Кашемировое пальто со скрытой застёжкой",
    country: "italy",
    era: "1980s",
    kind: "outerwear",
    price: 46000,
    material: "Кашемир 100%, подкладка — вискоза в тон",
    size: "48–50",
    condition: "Отличное",
    story:
      "Кашемир двойного плетения, скрытая планка, подкладка в тон. Крой держит форму без подкладных плеч — так шили в Италии в конце восьмидесятых.",
    measurements: [
      { label: "Плечи", value: "46 см" },
      { label: "Грудь", value: "58 см" },
      { label: "Рукав", value: "63 см" },
      { label: "Длина", value: "118 см" },
    ],
    marks: ["Тяжёлый люкс"],
    addedAt: "2026-08-15",
  },
  {
    slug: "tvidovyy-pidzhak-elochka",
    number: "0139",
    title: "Твидовый пиджак в ёлочку",
    country: "uk",
    era: "1970s",
    kind: "suits",
    price: 18500,
    material: "Шерстяной твид, локти — замшевые накладки",
    size: "50",
    condition: "Очень хорошее",
    story:
      "Плотный твид в мелкую ёлочку, две шлицы, замшевые накладки на локтях. Подкладка родная, на внутреннем кармане сохранилась портновская бирка.",
    measurements: [
      { label: "Плечи", value: "47 см" },
      { label: "Грудь", value: "55 см" },
      { label: "Рукав", value: "63 см" },
      { label: "Длина", value: "76 см" },
    ],
    addedAt: "2026-08-14",
  },
  {
    slug: "shelkovoe-plate-drapirovka",
    number: "0136",
    title: "Шёлковое платье с драпировкой на плече",
    country: "france",
    era: "1970s",
    kind: "dresses",
    price: 21000,
    material: "Шёлк 100%",
    size: "44",
    condition: "Отличное",
    story:
      "Тонкий шёлк, драпировка собрана на одном плече и уходит в косой шов. Ткань сохранила блеск — стирки не было, только чистка.",
    measurements: [
      { label: "Грудь", value: "46 см" },
      { label: "Талия", value: "36 см" },
      { label: "Длина", value: "132 см" },
    ],
    addedAt: "2026-08-12",
  },
  {
    slug: "plate-futlyar-krep",
    number: "0131",
    title: "Платье-футляр из плотного крепа",
    country: "france",
    era: "1960s",
    kind: "dresses",
    price: 27000,
    material: "Шерстяной креп, подкладка — шёлк",
    size: "42–44",
    condition: "Отличное",
    story:
      "Шестидесятые в чистом виде: круглая горловина, вытачки под грудь, потайная молния в боковом шве. Креп тяжёлый, платье стоит по фигуре само.",
    measurements: [
      { label: "Грудь", value: "44 см" },
      { label: "Талия", value: "35 см" },
      { label: "Бёдра", value: "47 см" },
      { label: "Длина", value: "98 см" },
    ],
    marks: ["Тяжёлый люкс"],
    addedAt: "2026-08-11",
  },
  {
    slug: "dzhemper-shetlandskaya-sherst",
    number: "0128",
    title: "Джемпер из шетландской шерсти",
    country: "uk",
    era: "1980s",
    kind: "knitwear",
    price: 7900,
    material: "Шетландская шерсть 100%",
    size: "48",
    condition: "Хорошее, со следами носки",
    story:
      "Шетландская шерсть жёсткого прядения, круглая горловина в резинку. На левом рукаве лёгкий катышковый след — показан отдельным кадром.",
    measurements: [
      { label: "Грудь", value: "54 см" },
      { label: "Рукав", value: "60 см" },
      { label: "Длина", value: "66 см" },
    ],
    addedAt: "2026-08-10",
  },
  {
    slug: "kardigan-krupnoy-vyazki",
    number: "0125",
    title: "Кардиган крупной вязки с кожаными пуговицами",
    country: "italy",
    era: "1990s",
    kind: "knitwear",
    price: 9800,
    material: "Шерсть с добавлением альпаки",
    size: "46–48",
    condition: "Очень хорошее",
    story:
      "Крупная коса по полочке, кожаные пуговицы-бочонки, накладные карманы. Полотно плотное, вещь тяжелее, чем кажется на фото.",
    measurements: [
      { label: "Грудь", value: "52 см" },
      { label: "Рукав", value: "61 см" },
      { label: "Длина", value: "70 см" },
    ],
    addedAt: "2026-08-09",
  },
  {
    slug: "bluza-krepdeshin",
    number: "0122",
    title: "Блуза из шёлкового крепдешина",
    country: "italy",
    era: "1990s",
    kind: "shirts",
    price: 8400,
    material: "Шёлк-крепдешин 100%",
    size: "44–46",
    condition: "Отличное",
    story:
      "Матовый крепдешин, мягкий воротник-стойка, перламутровые пуговицы. Ткань холодная на ощупь и почти не мнётся.",
    measurements: [
      { label: "Грудь", value: "50 см" },
      { label: "Рукав", value: "58 см" },
      { label: "Длина", value: "62 см" },
    ],
    addedAt: "2026-08-08",
  },
  {
    slug: "sorochka-egipetskiy-hlopok",
    number: "0119",
    title: "Сорочка из египетского хлопка",
    country: "uk",
    era: "1980s",
    kind: "shirts",
    price: 6200,
    material: "Хлопок 100%, двойное кручение",
    size: "41 / 16",
    condition: "Очень хорошее",
    story:
      "Хлопок двойного кручения, воротник на косточках, одинарная кокетка. Швы в четыре нити — такую сорочку шили в расчёте на десятилетия.",
    measurements: [
      { label: "Грудь", value: "58 см" },
      { label: "Рукав", value: "64 см" },
      { label: "Длина", value: "80 см" },
    ],
    addedAt: "2026-08-07",
  },
  {
    slug: "shuba-strizhenaya-norka",
    number: "0114",
    title: "Шуба из стриженой норки",
    country: "germany",
    era: "1980s",
    kind: "fur-leather",
    price: 89000,
    material: "Норка стриженая, подкладка — шёлк",
    size: "46–48",
    condition: "Отличное",
    story:
      "Стриженая норка ровного тона, поперечный раскрой, шёлковая подкладка с ручной подшивкой. Мех эластичный, мездра мягкая — вещь хранилась в чехле.",
    measurements: [
      { label: "Плечи", value: "44 см" },
      { label: "Грудь", value: "54 см" },
      { label: "Длина", value: "92 см" },
    ],
    marks: ["Тяжёлый люкс"],
    addedAt: "2026-08-05",
  },
  {
    slug: "dublenka-ovchina",
    number: "0110",
    title: "Дублёнка на овчине",
    country: "ussr",
    era: "1970s",
    kind: "fur-leather",
    price: 16000,
    material: "Овчина натуральная",
    size: "50–52",
    condition: "Хорошее, со следами носки",
    story:
      "Тяжёлая овчина, широкий воротник-шаль, деревянные пуговицы-клыки. Потёртость на правом обшлаге не скрываем — она есть на отдельном кадре.",
    measurements: [
      { label: "Плечи", value: "48 см" },
      { label: "Грудь", value: "60 см" },
      { label: "Длина", value: "104 см" },
    ],
    addedAt: "2026-08-04",
  },
  {
    slug: "sumka-ramochnyy-zamok",
    number: "0106",
    title: "Сумка из зернистой кожи с рамочным замком",
    country: "france",
    era: "1960s",
    kind: "bags",
    price: 34000,
    material: "Зернистая кожа, латунная фурнитура",
    size: "26 × 18 × 9 см",
    condition: "Очень хорошее",
    story:
      "Рамочный замок с латунным щелчком, короткая ручка, внутри — кожаный карман на кнопке. Кожа набрала патину, форма держится без наполнителя.",
    marks: ["Тяжёлый люкс"],
    addedAt: "2026-08-03",
  },
  {
    slug: "portfel-latunnaya-furnitura",
    number: "0103",
    title: "Кожаный портфель с латунной фурнитурой",
    country: "germany",
    era: "1970s",
    kind: "bags",
    price: 23000,
    material: "Кожа растительного дубления",
    size: "38 × 28 × 10 см",
    condition: "Хорошее, со следами носки",
    story:
      "Растительное дубление, два замка-язычка, ручка перешита один раз — шов виден и показан крупно. Углы целые, дно не продавлено.",
    addedAt: "2026-08-02",
  },
  {
    slug: "botinki-na-rante",
    number: "0098",
    title: "Ботинки на ранте, тёмная кожа",
    country: "uk",
    era: "1990s",
    kind: "shoes",
    price: 14500,
    material: "Кожа, подошва — кожа на ранте",
    size: "42 (UK 8)",
    condition: "Очень хорошее",
    story:
      "Рантовая конструкция — подошву можно переставить, и ботинки проживут ещё столько же. Верх без заломов до перегиба, набойки заменены.",
    addedAt: "2026-08-01",
  },
  {
    slug: "lodochki-zamsha",
    number: "0094",
    title: "Лодочки из замши",
    country: "italy",
    era: "1980s",
    kind: "shoes",
    price: 11000,
    material: "Замша, кожаная стелька",
    size: "38",
    condition: "Очень хорошее",
    story:
      "Замша глубокого тона, каблук 6 см, кожаная стелька с тиснением мастерской. Носок узкий — на полноту выше средней будет тесно.",
    sold: true,
    addedAt: "2026-07-30",
  },
  {
    slug: "fetrovaya-shlyapa-shirokie-polya",
    number: "0090",
    title: "Фетровая шляпа с широкими полями",
    country: "italy",
    era: "1950s",
    kind: "hats",
    price: 12000,
    material: "Кроличий фетр, лента — репс",
    size: "57",
    condition: "Очень хорошее",
    story:
      "Кроличий фетр, репсовая лента с плоским бантом, поля 8 см. Форма держится, внутри сохранилась кожаная налобная лента с тиснением.",
    addedAt: "2026-07-29",
  },
  {
    slug: "platok-arhitekturnyy-print",
    number: "0086",
    title: "Шёлковый платок с архитектурным принтом",
    country: "france",
    era: "1990s",
    kind: "hats",
    price: 9500,
    material: "Шёлк-твил 100%",
    size: "88 × 88 см",
    condition: "Отличное",
    story:
      "Шёлк-твил, печать в восемь красок, край подшит вручную — валик ровный по всему периметру. Цвет не выгорел.",
    addedAt: "2026-07-28",
  },
  {
    slug: "brosh-gornyy-hrustal",
    number: "0081",
    title: "Брошь с горным хрусталём в серебре",
    country: "ussr",
    era: "1950s",
    kind: "jewelry",
    price: 13000,
    material: "Серебро 875 пробы, горный хрусталь",
    size: "4,5 × 3 см",
    condition: "Очень хорошее",
    story:
      "Серебро 875 пробы, глухие касты, камни без сколов и помутнения. Замок-иголка родной, ход тугой — держит плотную ткань.",
    addedAt: "2026-07-26",
  },
  {
    slug: "chasy-braslet-pozolota",
    number: "0077",
    title: "Часы-браслет в позолоте",
    country: "japan",
    era: "1990s",
    kind: "jewelry",
    price: 15000,
    material: "Сталь с позолотой, минеральное стекло",
    size: "Браслет 18 см",
    condition: "Очень хорошее",
    story:
      "Кварцевый механизм, позолота ровная, потёртости только на застёжке. Батарея заменена, ход проверен — расхождение в пределах нормы.",
    addedAt: "2026-07-25",
  },
  {
    slug: "trench-gabardin",
    number: "0072",
    title: "Тренч из хлопкового габардина",
    country: "uk",
    era: "1990s",
    kind: "outerwear",
    price: 26000,
    material: "Хлопковый габардин, подкладка — вискоза",
    size: "48",
    condition: "Отличное",
    story:
      "Плотный габардин, погоны, штормовой клапан, пояс с кольцами. Подкладка родная, все пуговицы на месте, крой прямой без затяжки в талии.",
    marks: ["Тяжёлый люкс"],
    addedAt: "2026-07-24",
  },
  {
    slug: "bomber-nylon",
    number: "0068",
    title: "Бомбер из плотного нейлона",
    country: "japan",
    era: "1990s",
    kind: "outerwear",
    price: 19000,
    material: "Нейлон, подкладка — сатин",
    size: "48–50",
    condition: "Очень хорошее",
    story:
      "Плотный нейлон с матовой поверхностью, резинки на манжетах не растянуты, молния идёт мягко. Подкладка контрастная, без потёртостей.",
    addedAt: "2026-07-22",
  },
  {
    slug: "smoking-atlasnye-latskany",
    number: "0063",
    title: "Смокинг с атласными лацканами",
    country: "italy",
    era: "1960s",
    kind: "suits",
    price: 38000,
    material: "Шерсть, лацканы — шёлковый атлас",
    size: "50",
    condition: "Отличное",
    story:
      "Шерсть с шёлковыми лацканами, одна пуговица, шлицы нет — как и полагалось шестидесятым. Атлас без затёков и заломов.",
    sold: true,
    marks: ["Тяжёлый люкс"],
    addedAt: "2026-07-20",
  },
  {
    slug: "dzhinsovka-selvidzh",
    number: "0059",
    title: "Джинсовая куртка из селвидж-денима",
    country: "usa",
    era: "1990s",
    kind: "outerwear",
    price: 12000,
    material: "Селвидж-деним 14 oz",
    size: "48",
    condition: "Хорошее, со следами носки",
    story:
      "Кромка селвидж по боковому шву, деним 14 унций, потёртости естественные — по швам и на локтях. Пуговицы и заклёпки родные.",
    addedAt: "2026-07-18",
  },
  {
    slug: "palto-redingot",
    number: "0054",
    title: "Пальто-редингот из плотной шерсти",
    country: "france",
    era: "pre-1950",
    kind: "outerwear",
    price: 42000,
    material: "Шерсть 100%, подкладка — вискоза",
    size: "42–44",
    condition: "Хорошее, со следами носки",
    story:
      "Приталенный редингот с расклешённой юбкой и обтяжными пуговицами. Подкладка менялась однажды — шов виден изнутри и показан на кадре.",
    measurements: [
      { label: "Плечи", value: "38 см" },
      { label: "Грудь", value: "46 см" },
      { label: "Талия", value: "38 см" },
      { label: "Длина", value: "116 см" },
    ],
    addedAt: "2026-07-16",
  },
  {
    slug: "sumka-lakirovannaya-kozha",
    number: "0049",
    title: "Сумка из лакированной кожи",
    country: "italy",
    era: "2000s",
    kind: "bags",
    price: 17000,
    material: "Лакированная кожа, подкладка — текстиль",
    size: "30 × 20 × 12 см",
    condition: "Очень хорошее",
    story:
      "Лак ровный, без сетки трещин, две ручки и съёмный ремень. Внутри — карман на молнии, ткань подкладки чистая.",
    addedAt: "2026-07-14",
  },
  {
    slug: "lodenovoe-palto",
    number: "0045",
    title: "Лоденовое пальто с пелериной",
    country: "other",
    era: "1970s",
    kind: "outerwear",
    price: 20000,
    material: "Лоден: валяная шерсть 100%",
    size: "48–50",
    condition: "Очень хорошее",
    story:
      "Альпийский лоден — валяная шерсть, которая держит дождь. Пелерина на плечах, роговые пуговицы, встречная складка на спине.",
    measurements: [
      { label: "Плечи", value: "46 см" },
      { label: "Грудь", value: "58 см" },
      { label: "Длина", value: "110 см" },
    ],
    addedAt: "2026-07-12",
  },
];

export function itemBySlug(slug: string) {
  return items.find((i) => i.slug === slug);
}

/** Сначала новое; проданное всегда уходит в конец. */
export function sortNewestFirst(list: Item[]) {
  return [...list].sort((a, b) => {
    if (!!a.sold !== !!b.sold) return a.sold ? 1 : -1;
    return b.addedAt.localeCompare(a.addedAt);
  });
}
