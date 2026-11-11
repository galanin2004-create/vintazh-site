/**
 * Каталог галереи.
 *
 * Здесь только реальные вещи галереи: съёмки владелицы и то, что пришло
 * через бота приёмки (data/crm-items.json). Демонстрационные позиции убраны
 * 09.10.2026. Бренд-бук (полоса 10) прямо запрещает придуманные факты о
 * происхождении: если история вещи неизвестна — пишем про крой, фактуру и
 * деталь, а не выдумываем владельца; чего не знаем — поле не заполняем.
 *
 * Фотографии: положить кадры в public/items/<slug>/ и перечислить в photos.
 * Пока массив пуст — карточка рисует спокойную заглушку в цвете «бумага».
 */

export type Condition = "Отличное" | "Очень хорошее" | "Хорошее, со следами носки";

export type Item = {
  slug: string;
  /** Номер с бирки — связывает вещь, карточку и историю. */
  number?: string;
  title: string;
  country: string;
  /**
   * Эпоха. Сейчас нигде не показывается: галерея год по вещам не
   * определяет, и ось «Эпоха» убрана из навигации. Поле оставлено на
   * случай, если эпоху начнут проставлять — см. data/taxonomy.ts.
   */
  era?: string;
  kind: string;
  /** Без цены карточка показывает «Цена по запросу». */
  price?: number;
  /** Материал называем всегда и первым (бренд-бук, полоса 02). */
  material?: string;
  size?: string;
  condition?: Condition;
  /** 1–2 предложения, до 240 знаков: факт о происхождении + факт о вещи. */
  story: string;
  /** Мерки в сантиметрах — снимаем по вещи, разложенной на столе. */
  measurements?: { label: string; value: string }[];
  /** Дополнительные метки поверх фото. «Один экземпляр» ставится всегда. */
  marks?: string[];
  sold?: boolean;
  /** Стекло, фарфор, зеркала, крупные вещи: отправка по договорённости, а не «включена в цену». */
  fragile?: boolean;
  /** Для сортировки «сначала новое». */
  addedAt: string;
  photos?: string[];
};

/**
 * Вещи, принятые через Telegram-бота, живут в CRM. Перед сборкой
 * scripts/pull-crm-items.mjs забирает их в data/crm-items.json вместе
 * с кадрами; локально файл пустой, и витрина показывает только то, что
 * записано ниже.
 */
import crmItems from "./crm-items.json";

/** Вещи, записанные руками: съёмки владелицы. */
const staticItems: Item[] = [
  /* ——— Ложечки, присланы 11.11.2026. Со слов владелицы: Италия, клеймо
     ITALY (видно на обороте черпачка), посеребрение, 1350 ₽ за штуку,
     формы разные, есть парные. Сначала было шесть карточек, в тот же день
     сведены в одну: набор из шести за 8100 ₽ (6 × 1350), поштучно —
     через сообщение (решение от 11.11.2026). По общему кадру три пары:
     лилия, лев, орёл в венке. Кадры: 8 — после нейросети (обрезан из
     квадрата в 3:4; металл черпачков на нём чуть теплее настоящего),
     1–2 — все шесть, 3 — клеймо, 4 — орёл, 5–7 — лев. Размер не назван. */
  {
    slug: "lozhechki-italiya-nabor",
    title: "Шесть ложечек с фигурными ручками",
    country: "italy",
    kind: "interior",
    price: 8100,
    material: "Посеребрённый металл",
    story:
      "Шесть маленьких ложечек, три пары: на ручках геральдическая лилия, лев и орёл в венке. На обороте клеймо ITALY. Для кофе, соли и пряностей. Можно взять и поштучно — 1350 ₽ за ложечку, напишите нам.",
    marks: ["Набор"],
    addedAt: "2026-11-11",
    photos: [8, 1, 2, 3, 4, 7, 5, 6].map((p) => `/items/lozhechki-italiya/${p}.jpg`),
  },

  /* ——— Жакет, прислан 11.11.2026. С бирки: Италия, твид, шерсть 100 %,
     4500 ₽; ярлык внутри — CHARISMA, Made in Italy. Размер не назван.
     Блеск нити виден на всех снимках, хотя на бирке — шерсть 100 %.
     Платок в кармане входит в цену (ответ владельца 11.11.2026).
     Кадры: 7 — после нейросети (первый, обрезан из квадрата в 3:4;
     блеск нити на нём ярче, пуговицы чуть упрощены), 1–2 — спереди,
     3 — спина, 4 — пуговицы, 5 — карман, 6 — ярлык. */
  {
    slug: "zhaket-charisma-tvid-kletka",
    title: "Твидовый жакет Charisma в клетку",
    country: "italy",
    kind: "suits",
    price: 4500,
    material: "Шерсть 100 %, твид",
    story:
      "Твид в чёрно-серо-белую клетку с блестящей нитью. Круглый вырез без воротника, пять металлических пуговиц с кремовой серединой, нагрудный карман, два клапана по низу, по пуговице на манжетах. Кремовый платок из кармана — в комплекте. Ярлык Charisma, Made in Italy.",
    addedAt: "2026-11-11",
    photos: [7, 1, 2, 3, 4, 5, 6].map((p) => `/items/zhaket-charisma-tvid-kletka/${p}.jpg`),
  },

  /* ——— Кардиган, прислан 11.11.2026. Со слов владелицы: Австрия, шерсть
     80 % (остальной состав не назван), мерки ниже, 5100 ₽. Кадры: 4 — после
     нейросети (первый, обрезан из квадрата в 3:4; пуговицы на нём
     нарисованы чуть иначе), 1 — спереди, 2 — вблизи, 3 — спина. */
  {
    slug: "zhaket-vyazanyy-zelenyy-krasnyy-vorotnik",
    title: "Зелёный кардиган с красным воротником",
    country: "austria",
    kind: "knitwear",
    price: 5100,
    material: "Шерсть 80 %",
    story:
      "Зелёная пушистая вязка, красный воротник и красная отстрочка крупным стежком по швам и бортам. Пять пуговиц с рисунком, карманы и манжеты с красной окантовкой, на локтях красные заплатки.",
    measurements: [
      { label: "Полуобхват груди (ПОГ)", value: "44 см" },
      { label: "Полуобхват талии (ПОТ)", value: "44 см" },
      { label: "Плечо", value: "11 см" },
      { label: "Длина рукава", value: "60 см" },
      { label: "Ширина плеч", value: "40 см" },
      { label: "Длина по спинке", value: "80 см" },
    ],
    addedAt: "2026-11-11",
    photos: [4, 1, 2, 3].map((p) => `/items/zhaket-vyazanyy-zelenyy-krasnyy-vorotnik/${p}.jpg`),
  },

  /* ——— Юбка, прислана 11.11.2026. Со слов владелицы: Австрия, размер 50,
     хлопок 100 %, 3500 ₽. Кадры: 1 — спереди, 2 — вышивка у кармана,
     3 — спина. Поло на манекене — не часть лота. */
  {
    slug: "yubka-dzhinsovaya-vyshivka-avstriya",
    title: "Джинсовая юбка с вышивкой и пуговицами",
    country: "austria",
    kind: "skirts",
    price: 3500,
    material: "Хлопок 100 %",
    size: "50",
    story:
      "Синий деним, расклёшенная юбка ниже колена из клиньев. Застёжка на металлические пуговицы по всей длине, зелёный кант по планке и карманам, резинка в поясе по бокам. Вышитые эдельвейсы, шляпа с цветами. Поло на кадре в цену не входит.",
    addedAt: "2026-11-11",
    photos: [1, 2, 3].map((p) => `/items/yubka-dzhinsovaya-vyshivka-avstriya/${p}.jpg`),
  },

  /* ——— Кимоно, прислано владелицей. Шёлк 100 %, Япония, 17 000 ₽ — с её
     слов. Размер не назван. Первым кадр после нейросети (14.jpg, вышивка на нём
     перерисована по-своему), затем все снимки как есть, в том числе на
     владелице (она сама разрешила их ставить). */
  {
    slug: "kimono-shelk-chernoe-vyshivka",
    title: "Чёрное шёлковое кимоно с вышивкой по подолу",
    country: "japan",
    kind: "dresses",
    price: 17000,
    material: "Шёлк 100 %",
    story:
      "Чёрное шёлковое кимоно с белым воротником и гербами-камон на груди, спине и рукавах. По подолу — хризантемы и связка лент, вышитая золотой и серебряной нитью, с букетом цветов в красных, синих и сиреневых тонах.",
    addedAt: "2026-11-08",
    photos: [
      "/items/kimono-shelk-chernoe-vyshivka/14.jpg",
      "/items/kimono-shelk-chernoe-vyshivka/1.jpg",
      "/items/kimono-shelk-chernoe-vyshivka/2.jpg",
      "/items/kimono-shelk-chernoe-vyshivka/3.jpg",
      "/items/kimono-shelk-chernoe-vyshivka/4.jpg",
      "/items/kimono-shelk-chernoe-vyshivka/5.jpg",
      "/items/kimono-shelk-chernoe-vyshivka/6.jpg",
      "/items/kimono-shelk-chernoe-vyshivka/7.jpg",
      "/items/kimono-shelk-chernoe-vyshivka/8.jpg",
      "/items/kimono-shelk-chernoe-vyshivka/9.jpg",
      "/items/kimono-shelk-chernoe-vyshivka/10.jpg",
      "/items/kimono-shelk-chernoe-vyshivka/11.jpg",
      "/items/kimono-shelk-chernoe-vyshivka/12.jpg",
      "/items/kimono-shelk-chernoe-vyshivka/13.jpg",
    ],
  },

  /* ——— Жакет, прислан владелицей. С бирки: твид, шерсть 25 %, 4500 ₽.
     Страна, остальной состав и размер не указаны. Первым кадр после
     нейросети (3.jpg), затем снимки как есть. */
  {
    slug: "zhaket-tvid-zeleno-sinyaya-kletka",
    title: "Твидовый жакет в зелёно-синюю клетку",
    country: "other",
    kind: "suits",
    price: 4500,
    material: "Шерсть 25 %",
    story:
      "Тёмная клетка в тёмно-синих, зелёных и чёрных тонах, саржевое плетение. Свободный крой, однобортный на одну пуговицу, широкие лацканы, прорезные карманы.",
    addedAt: "2026-11-08",
    photos: [
      "/items/zhaket-tvid-zeleno-sinyaya-kletka/3.jpg",
      "/items/zhaket-tvid-zeleno-sinyaya-kletka/1.jpg",
      "/items/zhaket-tvid-zeleno-sinyaya-kletka/2.jpg",
    ],
  },

  /* ——— Жакет, прислан владелицей. С бирки: твид, Европа, шерсть, 4500 ₽;
     мерки — с её бирки замеров. Размер не указан. Первым кадр после
     нейросети (5.jpg, на нём нет чёрного канта на лацканах), затем снимки
     как есть. */
  {
    slug: "zhaket-tvid-sinyaya-kletka-evropa",
    title: "Твидовый жакет в сине-зелёную клетку",
    country: "europe",
    kind: "suits",
    price: 4500,
    material: "Шерсть",
    story:
      "Твид в клетку: ярко-синие и зелёные полосы с рыжей нитью и серебристыми вкраплениями. Приталенный, на три чёрные пуговицы, лацканы с чёрным кантом, карманы с клапанами.",
    measurements: [
      { label: "Полуобхват груди (ПОГ)", value: "40 см" },
      { label: "Полуобхват талии (ПОТ)", value: "39 см" },
      { label: "Плечо", value: "13 см" },
      { label: "Длина рукава", value: "59 см" },
      { label: "Ширина плеч", value: "40 см" },
      { label: "Длина по спинке", value: "63 см" },
    ],
    addedAt: "2026-11-08",
    photos: [
      "/items/zhaket-tvid-sinyaya-kletka-evropa/5.jpg",
      "/items/zhaket-tvid-sinyaya-kletka-evropa/1.jpg",
      "/items/zhaket-tvid-sinyaya-kletka-evropa/2.jpg",
      "/items/zhaket-tvid-sinyaya-kletka-evropa/3.jpg",
      "/items/zhaket-tvid-sinyaya-kletka-evropa/4.jpg",
    ],
  },

  /* ——— Жакет, прислан владелицей. С бирки: Германия, жаккард, 6500 ₽.
     Размер не назван. Кадр 1 — после нейросети (жакет во всю ширину, фон
     дотянут вверх), 2–5 — снимки из галереи как есть. */
  {
    slug: "zhaket-zhakkard-rozy-germaniya",
    title: "Жакет из жаккарда с розами",
    country: "germany",
    kind: "suits",
    price: 6500,
    material: "Жаккард",
    story:
      "Тёмный жаккард с вытканными розами и мелкими цветами в красных, оранжевых и малиновых тонах, золотистые листья с металлическим блеском. Круглый вырез без воротника, шесть металлических пуговиц, низ клином.",
    addedAt: "2026-11-08",
    photos: [
      "/items/zhaket-zhakkard-rozy-germaniya/1.jpg",
      "/items/zhaket-zhakkard-rozy-germaniya/2.jpg",
      "/items/zhaket-zhakkard-rozy-germaniya/3.jpg",
      "/items/zhaket-zhakkard-rozy-germaniya/4.jpg",
      "/items/zhaket-zhakkard-rozy-germaniya/5.jpg",
    ],
  },

  /* ——— Жакет, прислан владелицей. С бирки: Италия, твид, шерсть 60 %,
     альпака 20 % (остальные 20 % не указаны), нюанс — «подклад», 4500 ₽.
     Что с подкладом, не уточнено. Размер не назван. Первым кадр после нейросети (5.jpg), затем снимки
     как есть. */
  {
    slug: "zhaket-tvid-alpaka-golubaya-kletka",
    sold: true,
    title: "Твидовый жакет в голубую клетку, шерсть с альпакой",
    country: "italy",
    kind: "suits",
    price: 4500,
    material: "Шерсть 60 %, альпака 20 %",
    story:
      "Твид в крупную клетку: серо-бежевая основа, тёмно-синие и голубые полосы, тонкая красная и рыжая нить. Однобортный на две золотистые пуговицы, карманы с клапанами. Есть нюанс с подкладкой — подробности по запросу.",
    addedAt: "2026-11-08",
    photos: [
      "/items/zhaket-tvid-alpaka-golubaya-kletka/5.jpg",
      "/items/zhaket-tvid-alpaka-golubaya-kletka/1.jpg",
      "/items/zhaket-tvid-alpaka-golubaya-kletka/2.jpg",
      "/items/zhaket-tvid-alpaka-golubaya-kletka/3.jpg",
      "/items/zhaket-tvid-alpaka-golubaya-kletka/4.jpg",
    ],
  },

  /* ——— Жакет, прислан владелицей. С бирки: Италия, шерсть 25 % (остальной
     состав не указан), 3500 ₽; размер 42 — с её слов. Первым кадр после
     нейросети (4.jpg), затем снимки из галереи как есть. */
  {
    slug: "zhaket-gusinaya-lapka-kosaya-molniya",
    title: "Жакет в гусиную лапку с косой молнией",
    country: "italy",
    kind: "suits",
    price: 3500,
    material: "Шерсть 25 %",
    size: "42",
    story:
      "Крупная чёрно-белая гусиная лапка с чёрной фактурной тканью на лацканах, планке и поясе. Косая молния по образцу косухи, приталенный силуэт, широкие лацканы.",
    addedAt: "2026-11-08",
    photos: [
      "/items/zhaket-gusinaya-lapka-kosaya-molniya/4.jpg",
      "/items/zhaket-gusinaya-lapka-kosaya-molniya/1.jpg",
      "/items/zhaket-gusinaya-lapka-kosaya-molniya/2.jpg",
      "/items/zhaket-gusinaya-lapka-kosaya-molniya/3.jpg",
    ],
  },

  /* ——— Жакет, прислан владелицей. С бирки: ручная работа, шерсть, 8300 ₽.
     Страна и размер не названы, валяние — по кадру. Первым кадр после
     нейросети (7.jpg), затем снимки из галереи. */
  {
    slug: "zhaket-valyanyy-ruchnaya-rabota",
    title: "Валяный жакет ручной работы с цветами",
    country: "other",
    kind: "suits",
    price: 8300,
    material: "Шерсть",
    story:
      "Жакет из валяной шерсти ручной работы: тёмно-зелёное полотно с ввалянными цветами — красными, сиреневыми, жёлтыми — и салатовыми стеблями. Воротник-стойка, баска, застёжка на петли с металлическими пуговицами-спиралями.",
    marks: ["Ручная работа"],
    addedAt: "2026-11-08",
    photos: [
      "/items/zhaket-valyanyy-ruchnaya-rabota/7.jpg",
      "/items/zhaket-valyanyy-ruchnaya-rabota/1.jpg",
      "/items/zhaket-valyanyy-ruchnaya-rabota/2.jpg",
      "/items/zhaket-valyanyy-ruchnaya-rabota/3.jpg",
      "/items/zhaket-valyanyy-ruchnaya-rabota/4.jpg",
      "/items/zhaket-valyanyy-ruchnaya-rabota/5.jpg",
      "/items/zhaket-valyanyy-ruchnaya-rabota/6.jpg",
    ],
  },

  /* ——— Жакет, прислан владелицей. С бирки: твид, Италия, ткань Loro Piana,
     шерсть 85 %, кашемир 15 %, 7350 ₽; Kamanta — с ярлыка в вороте, Loro
     Piana — с ярлыка ткани. Размер не назван. Первым кадр после
     нейросети (7.jpg, клетка на нём ровнее и теплее настоящей), затем
     снимки из галереи. */
  {
    slug: "zhaket-tvid-kamanta-loro-piana",
    title: "Твидовый жакет Kamanta из ткани Loro Piana",
    country: "italy",
    kind: "suits",
    price: 7350,
    material: "Шерсть 85 %, кашемир 15 % (ткань Loro Piana)",
    story:
      "Твид в мелкую гусиную лапку с клеткой: оливковые, бежевые и коричневые тона с рыжей нитью. Ткань Loro Piana — шерсть 85 %, кашемир 15 %. Однобортный, на одной пуговице, карманы с клапанами, ярлык Kamanta, сделано в Италии.",
    addedAt: "2026-11-08",
    photos: [
      "/items/zhaket-tvid-kamanta-loro-piana/7.jpg",
      "/items/zhaket-tvid-kamanta-loro-piana/1.jpg",
      "/items/zhaket-tvid-kamanta-loro-piana/2.jpg",
      "/items/zhaket-tvid-kamanta-loro-piana/3.jpg",
      "/items/zhaket-tvid-kamanta-loro-piana/4.jpg",
      "/items/zhaket-tvid-kamanta-loro-piana/5.jpg",
      "/items/zhaket-tvid-kamanta-loro-piana/6.jpg",
    ],
  },

  /* ——— Жакет, прислан владелицей. Christian Lacroix, шёлк 100 %, Франция,
     размер 42–44 рос. (на ярлыке 36), 9500 ₽ — с её слов и ярлыка.
     Первым кадр после нейросети (7.jpg, стена дотянута вверх), затем
     снимки из галереи. */
  {
    slug: "zhaket-christian-lacroix-shelk",
    title: "Жакет Christian Lacroix, шёлк в полоску",
    country: "france",
    kind: "suits",
    price: 9500,
    material: "Шёлк 100 %",
    size: "42–44 (на ярлыке 36)",
    story:
      "Шёлк с переливом в оливковых и золотистых тонах, тонкая коричневая и розовая полоска. Широкий воротник, клапаны на груди, округлые накладные карманы, короткий рукав; пуговицы с рельефными цветами под янтарной эмалью.",
    addedAt: "2026-11-08",
    photos: [
      "/items/zhaket-christian-lacroix-shelk/7.jpg",
      "/items/zhaket-christian-lacroix-shelk/1.jpg",
      "/items/zhaket-christian-lacroix-shelk/2.jpg",
      "/items/zhaket-christian-lacroix-shelk/3.jpg",
      "/items/zhaket-christian-lacroix-shelk/4.jpg",
      "/items/zhaket-christian-lacroix-shelk/5.jpg",
      "/items/zhaket-christian-lacroix-shelk/6.jpg",
    ],
  },

  /* ——— Бомбер, прислан владелицей. С бирки: винтаж, Америка, кожа 100 %,
     шерсть (процент на бирке обрезан), 9500 ₽; Lizsport — с ярлыка в
     вороте. Размер не назван. Первым кадр после нейросети (6.jpg,
     буквы на нашивке на нём неразборчивы), затем снимки из галереи. */
  {
    slug: "bomber-sherst-kozha-malinovyy",
    title: "Бомбер Lizsport: малиновая шерсть и чёрная кожа",
    country: "usa",
    kind: "outerwear",
    price: 9500,
    material: "Шерсть, рукава — кожа 100 %",
    story:
      "Бомбер из малиновой шерсти с рукавами из чёрной кожи: полосатая трикотажная резинка на воротнике, манжетах и поясе, застёжка на кнопки, на груди нашивка-герб с короной и лавровым венком. Ярлык Lizsport.",
    addedAt: "2026-11-08",
    photos: [
      "/items/bomber-sherst-kozha-malinovyy/6.jpg",
      "/items/bomber-sherst-kozha-malinovyy/1.jpg",
      "/items/bomber-sherst-kozha-malinovyy/2.jpg",
      "/items/bomber-sherst-kozha-malinovyy/3.jpg",
      "/items/bomber-sherst-kozha-malinovyy/4.jpg",
      "/items/bomber-sherst-kozha-malinovyy/5.jpg",
    ],
  },

  /* ——— Ботинки, присланы владелицей. С бирки: кожа питона 100 %, 9500 ₽,
     в нюансах «шнурки» — понято как износ шнурков, они потёрты на кадрах.
     Страна, бренд и размер не названы. Первым кадр после нейросети
     (5.jpg, стена дотянута вверх), затем снимки из галереи. */
  {
    slug: "botinki-kozha-pitona-chernye",
    title: "Чёрные ботинки из кожи питона на шнуровке",
    country: "other",
    kind: "shoes",
    price: 9500,
    material: "Кожа питона 100 %",
    story:
      "Высокие ботинки на шнуровке: боковая молния, ряды блочек и шипов на голенище, рифлёная подошва на низком каблуке. Шнурки потёрты, их стоит заменить; на мысках и подошве заметны следы носки.",
    addedAt: "2026-11-04",
    photos: [
      "/items/botinki-kozha-pitona-chernye/5.jpg",
      "/items/botinki-kozha-pitona-chernye/1.jpg",
      "/items/botinki-kozha-pitona-chernye/2.jpg",
      "/items/botinki-kozha-pitona-chernye/3.jpg",
      "/items/botinki-kozha-pitona-chernye/4.jpg",
    ],
  },

  /* ——— Казаки, присланы владелицей. С бирки: Америка, кожа 100 %,
     13 000 ₽. Размер и бренд не названы. Потёртости описаны по кадру.
     Первым кадр после нейросети (4.jpg, на нём казаки свежее настоящих),
     затем снимки из галереи. */
  {
    slug: "kazaki-kozha-korichnevye",
    title: "Казаки из кожи, коричневые с рыжей вставкой",
    country: "usa",
    kind: "shoes",
    price: 13000,
    material: "Кожа 100 %",
    story:
      "Высокое голенище из коричневой кожи с декоративной строчкой и ушками, рыжая кожа с накладным узором на мыске и пятке, острый нос и скошенный каблук. На мысках, рантах и боковых швах заметны потёртости.",
    addedAt: "2026-11-04",
    photos: [
      "/items/kazaki-kozha-korichnevye/4.jpg",
      "/items/kazaki-kozha-korichnevye/1.jpg",
      "/items/kazaki-kozha-korichnevye/2.jpg",
      "/items/kazaki-kozha-korichnevye/3.jpg",
    ],
  },

  /* ——— Сумка, прислана владелицей. С бирки: винтаж, Италия, кожа 100 %,
     19 500 ₽. Размер и бренд не названы. Потёртости описаны по кадру.
     Первым кадр после нейросети (2.jpg, стена дотянута вверх), вторым снимок
     из галереи (1.jpg). */
  {
    slug: "sumka-dorozhnaya-konyachnaya-kozha",
    title: "Большая кожаная сумка, коньячная",
    country: "italy",
    kind: "bags",
    price: 19500,
    material: "Кожа 100 %",
    story:
      "Плотная коньячная кожа с контрастной строчкой: две круглые ручки, ремень с пряжкой вокруг корпуса, накладные клапаны и плечевой ремень. На коже заметны заломы и потёртости.",
    addedAt: "2026-11-04",
    photos: [
      "/items/sumka-dorozhnaya-konyachnaya-kozha/2.jpg",
      "/items/sumka-dorozhnaya-konyachnaya-kozha/1.jpg",
    ],
  },

  /* ——— Вешалка, прислана владелицей. Италия, бронза, дерево, примерно
     1900–1920-е, 45 000 ₽ — с её текста. Высота не названа. Первым кадр после
     нейросети (6.jpg), затем снимки из галереи: 1 и 2 подогнаны под 3:4
     размытым полем по бокам, одежда на них — для показа. */
  {
    slug: "veshalka-antikvarnaya-kariatidy",
    fragile: true,
    title: "Антикварная вешалка с бронзовыми кариатидами",
    country: "italy",
    kind: "interior",
    price: 45000,
    material: "Бронза, дерево",
    story:
      "Напольная вешалка, начало XX века (примерно 1900–1920-е годы). Основание — три бронзовые кариатиды с античными профилями, винтовая ножка из дерева, наверху бронзовый купол с рожками. Одежда на кадрах в цену не входит.",
    marks: ["Антиквариат"],
    addedAt: "2026-11-04",
    photos: [
      "/items/veshalka-antikvarnaya-kariatidy/6.jpg",
      "/items/veshalka-antikvarnaya-kariatidy/1.jpg",
      "/items/veshalka-antikvarnaya-kariatidy/2.jpg",
      "/items/veshalka-antikvarnaya-kariatidy/3.jpg",
      "/items/veshalka-antikvarnaya-kariatidy/4.jpg",
      "/items/veshalka-antikvarnaya-kariatidy/5.jpg",
    ],
  },

  /* ——— Зеркало, прислано владелицей. Флоренция, вторая половина XX века,
     неорококо, лепнина (гипс/композит), золочение, ручная роспись, высота
     около 85 см, мелкие сходы краски, 32 500 ₽ — с её текста. Снимки из
     галереи, кадры 1 и 2 подогнаны под 3:4 размытым полем по бокам. */
  {
    slug: "zerkalo-neorokoko-florenciya",
    fragile: true,
    title: "Овальное зеркало в стиле неорококо, Флоренция",
    country: "italy",
    kind: "interior",
    price: 32500,
    material: "Лепнина (гипс/композит), золочение, ручная роспись",
    size: "Высота около 85 см",
    story:
      "Овальное зеркало в стиле неорококо, флорентийская школа, вторая половина XX века. Лепнина с золочением и ручной росписью: завитки, ажурный рельеф, алые розы. Высота около 85 см. Встречаются мелкие сходы краски.",
    addedAt: "2026-11-04",
    photos: [
      "/items/zerkalo-neorokoko-florenciya/1.jpg",
      "/items/zerkalo-neorokoko-florenciya/2.jpg",
      "/items/zerkalo-neorokoko-florenciya/3.jpg",
      "/items/zerkalo-neorokoko-florenciya/4.jpg",
    ],
  },

  /* ——— Бусы, присланы владелицей. Япония, перламутр, серебряная застёжка,
     4300 ₽ — с её слов; проба застёжки не присылалась, длина не названа.
     Первым кадр после нейросети (4.jpg), вторая попытка: первая разложила
     бусы в два кривых ряда. Бусин на нём больше, чем на настоящих снимках. */
  {
    slug: "busy-perlamutr-serebryanaya-zastezhka",
    title: "Бусы из перламутра с серебряной застёжкой",
    country: "japan",
    kind: "jewelry",
    price: 4300,
    material: "Перламутр, серебро",
    story:
      "Круглые бусины из перламутра с природными белыми разводами и мягким переливом. Рисунок у каждой бусины свой. Застёжка серебряная.",
    addedAt: "2026-11-04",
    photos: [
      "/items/busy-perlamutr-serebryanaya-zastezhka/4.jpg",
      "/items/busy-perlamutr-serebryanaya-zastezhka/1.jpg",
      "/items/busy-perlamutr-serebryanaya-zastezhka/2.jpg",
    ],
  },

  /* ——— Зажим, прислан владелицей. Swank, лимитированный выпуск, нефрит,
     с серебром, 3000 ₽ — с её слов, клеймо не присылали. Страна — США, по
     бренду, как у платка Valentino. Первым кадр после нейросети (2.jpg),
     вторым снимок из галереи (1.jpg). */
  {
    slug: "zazhim-swank-klyushka-nefrit",
    title: "Зажим Swank: клюшка для гольфа с нефритовым шариком",
    country: "usa",
    kind: "jewelry",
    price: 3000,
    material: "С серебром, нефрит",
    story:
      "Лимитированный выпуск Swank: клюшка для гольфа с серебром и шарик из нефрита. Подойдёт для галстука, рубашки, шарфа или ворота жакета. В родной коробочке, старенькой, со следами времени.",
    addedAt: "2026-11-04",
    photos: ["/items/zazhim-swank-klyushka-nefrit/2.jpg", "/items/zazhim-swank-klyushka-nefrit/1.jpg"],
  },

  /* ——— Запонки, присланы 04.11.2026. С бирки: Англия, винтаж, 2300 ₽;
     Sea Lord — с коробки. Металл и материал центра не названы, по кадру
     «золотистая оправа», слова «золото» нет. Кадр 1 — после нейросети
     (без коробки, лён дотянут вниз), 2 и 3 — снимки из галереи. */
  {
    slug: "zaponki-sea-lord-gornyy-kozel",
    title: "Запонки Sea Lord с горным козлом",
    country: "uk",
    kind: "jewelry",
    price: 2300,
    story:
      "Круглые запонки в золотистой оправе с косыми насечками: на бордовом фоне рельефный горный козёл с длинными рогами. В родной коробке Sea Lord.",
    addedAt: "2026-11-04",
    photos: [
      "/items/zaponki-sea-lord-gornyy-kozel/1.jpg",
      "/items/zaponki-sea-lord-gornyy-kozel/2.jpg",
      "/items/zaponki-sea-lord-gornyy-kozel/3.jpg",
    ],
  },

  /* ——— Сумка, прислана 04.11.2026. С бирки: Италия, кожа питона 100 %,
     16 000 ₽. Бренд, размер и состояние не названы. Кадр 1 — после
     нейросети (ремень на нём шире настоящего), фон дотянут вверх; 2–4 —
     снимки из галереи, на 2 виден настоящий ремень, на 4 — чешуя вблизи. */
  {
    slug: "sumka-kozha-pitona",
    title: "Сумка из кожи питона, коньячная",
    country: "italy",
    kind: "bags",
    price: 16000,
    material: "Кожа питона 100 %",
    story:
      "Плоская сумка с клапаном на тонком ремне. Кожа питона коньячного цвета с крупной чешуёй и тёмным контуром, собрана из нескольких панелей.",
    addedAt: "2026-11-04",
    photos: [
      "/items/sumka-kozha-pitona/1.jpg",
      "/items/sumka-kozha-pitona/2.jpg",
      "/items/sumka-kozha-pitona/3.jpg",
      "/items/sumka-kozha-pitona/4.jpg",
    ],
  },

  /* ——— Сумка, прислана 04.11.2026. С бирки: Италия, кожа 100 %, 9000 ₽;
     Montini — с ярлыка внутри. Настоящая ящерица или тиснение — не названо,
     пока пишем тиснение. Размер и состояние не названы. Кадр 1 — после
     нейросети (ремень на нём дорисован, пряжки нет), фон дотянут вверх;
     2–4 — снимки из галереи, на кадре 2 видна пряжка, на 4 — ярлык. */
  {
    slug: "sumka-montini-bezhevaya",
    sold: true,
    title: "Сумка Montini, бежевая кожа под ящерицу",
    country: "italy",
    kind: "bags",
    price: 9000,
    material: "Кожа 100 %",
    story:
      "Светло-бежевая кожа с тиснением под ящерицу, сумка с клапаном и регулируемым ремнём на металлической пряжке. Внутри карман на молнии и ярлык Montini.",
    addedAt: "2026-11-04",
    photos: [
      "/items/sumka-montini-bezhevaya/1.jpg",
      "/items/sumka-montini-bezhevaya/2.jpg",
      "/items/sumka-montini-bezhevaya/3.jpg",
      "/items/sumka-montini-bezhevaya/4.jpg",
    ],
  },

  /* ——— Колье-манишка, прислано 04.11.2026. С бирки: авторская работа
     художника, 6500 ₽. Имя художника и страна неизвестны, кофта в цену не
     входит — со слов владельца. Материалы — по кадру. Первым кадр после
     нейросети (2.jpg), вторым снимок из галереи (1.jpg). */
  {
    slug: "kole-manishka-avtorskoe",
    title: "Авторское колье-манишка с вышивкой и бисером",
    country: "other",
    kind: "jewelry",
    price: 6500,
    material: "Бархат, бисер, вышивка",
    story:
      "Авторская работа художника: коралловый бархат с принтом, вышитый серебристый цветок с пайетками, бисерные листья и ягоды, внизу мятый бархат и бахрома из бисера. Кофта на кадре в цену не входит.",
    marks: ["Авторская работа"],
    addedAt: "2026-11-04",
    photos: ["/items/kole-manishka-avtorskoe/2.jpg", "/items/kole-manishka-avtorskoe/1.jpg"],
  },

  /* ——— Платок, прислан 04.11.2026. С бирки: Valentino, для Японии,
     хлопок 100 %, 2700 ₽; с наклейки: Токио, Kawabe. Страна — Италия, по
     бренду; что сделан для Японии, сказано в описании. Размер и состояние
     не названы. Кадр 1 — после нейросети, фон дотянут до 3:4; 2 и 3 —
     снимки из галереи (наклейка с логотипом и сам платок в складках). */
  {
    slug: "platok-valentino-garavani-irisy",
    title: "Носовой платок valentino garavani с ирисами",
    country: "italy",
    kind: "hats",
    price: 2700,
    material: "Хлопок 100 %",
    story:
      "Тонкий бледно-голубой хлопок с рисунком ирисов и зелёных листьев, зубчатый край с голубой линией. Сделан для Японии: на фирменной наклейке — Токио, Kawabe, хлопок 100 %.",
    addedAt: "2026-11-04",
    photos: [
      "/items/platok-valentino-garavani-irisy/1.jpg",
      "/items/platok-valentino-garavani-irisy/2.jpg",
      "/items/platok-valentino-garavani-irisy/3.jpg",
    ],
  },

  /* ——— Шарф, прислан 04.11.2026. С бирки: ETRO, Италия, шёлк 100 %,
     4700 ₽. Размер и состояние не названы. Кадр 1 — после нейросети,
     2 и 3 — снимки из галереи. */
  {
    slug: "sharf-etro-shelk-peysli",
    title: "Шёлковый шарф ETRO, серо-бежевый пейсли",
    country: "italy",
    kind: "hats",
    price: 4700,
    material: "Шёлк 100 %",
    story:
      "Тонкий шёлк с рисунком из пейсли, медальонов и узорных полос в серо-бежевых тонах, по краям короткая бахрома. С фирменной биркой ETRO Milano.",
    addedAt: "2026-11-04",
    photos: [
      "/items/sharf-etro-shelk-peysli/1.jpg",
      "/items/sharf-etro-shelk-peysli/2.jpg",
      "/items/sharf-etro-shelk-peysli/3.jpg",
    ],
  },

  /* ——— Юбка, прислана 04.11.2026. С бирки: Германия, лён 34 %, хлопок
     26 %, вискоза 40 %, 4500 ₽. Размер и состояние не названы. Кадр 1 —
     после нейросети, кадр 2 — снимок из галереи, человек в зеркале размыт. */
  {
    slug: "yubka-v-skladku-cvetochnyy-print",
    title: "Длинная юбка в складку, цветочный принт",
    country: "germany",
    kind: "skirts",
    price: 4500,
    material: "Лён 34 %, хлопок 26 %, вискоза 40 %",
    story:
      "Серо-зелёная основа с полосами принта: розы, синие цветы в ромбах, эдельвейсы. Над подолом кружевная вставка и ленты — тёмно-синие, зелёные и красная бархатная, по краю кружево.",
    addedAt: "2026-11-04",
    photos: ["/items/yubka-v-skladku-cvetochnyy-print/1.jpg", "/items/yubka-v-skladku-cvetochnyy-print/2.jpg"],
  },

  /* ——— Пресс-папье, прислано 04.11.2026. «Муранское стекло, Италия»
     (в сообщении опечатка «мурманское»), 5200 ₽ — со слов владельца;
     подтверждения (клейма, наклейки) не прислано. Кадр 1 — после нейросети
     (синее дно на нём темнее настоящего), 2 и 3 — снимки из галереи. */
  {
    slug: "press-pape-muranskoe-steklo",
    fragile: true,
    title: "Пресс-папье из муранского стекла, белый цветок",
    country: "italy",
    kind: "interior",
    price: 5200,
    material: "Муранское стекло",
    story:
      "Прозрачный стеклянный шар: внутри белый цветок с лепестками в тонкую сеточку, пузырёк воздуха в центре и кобальтово-синее дно.",
    addedAt: "2026-11-04",
    photos: [
      "/items/press-pape-muranskoe-steklo/1.jpg",
      "/items/press-pape-muranskoe-steklo/2.jpg",
      "/items/press-pape-muranskoe-steklo/3.jpg",
    ],
  },

  /* ——— Шкатулка, прислана 04.11.2026. С бирки: антиквариат, Италия,
     10 500 ₽. Материалы — по виду; возраст, размер и ключ не названы.
     Бусы и брошь на кадре 3 — со своими бирками, считаются отдельными
     вещами. Кадр 1 — после нейросети (ящик на нём слегка выдвинут),
     2–4 — снимки из галереи. */
  {
    slug: "shkatulka-antikvarnaya-barhat",
    title: "Антикварная шкатулка с ящиком, оливковый бархат",
    country: "italy",
    kind: "interior",
    price: 10500,
    material: "Дерево, бархат, металл",
    story:
      "Верх и низ обтянуты оливковым бархатом с тесьмой и латунными гвоздиками, деревянный ящик с перегородками и металлической розеткой с кольцом. Потёртости на углах и ящике. Украшения на кадре в цену не входят.",
    marks: ["Антиквариат"],
    addedAt: "2026-11-04",
    photos: [
      "/items/shkatulka-antikvarnaya-barhat/1.jpg",
      "/items/shkatulka-antikvarnaya-barhat/2.jpg",
      "/items/shkatulka-antikvarnaya-barhat/3.jpg",
      "/items/shkatulka-antikvarnaya-barhat/4.jpg",
    ],
  },

  /* ——— Шкатулка, прислана 04.11.2026. С бирки: Lamart, Италия, стиль
     Сацума, 7500 ₽. Керамика — по виду; размер, клеймо и состояние не
     присланы. Кадр 1 — после нейросети, фон дотянут вверх до 3:4; 2 и 3 —
     снимки из галереи. */
  {
    slug: "shkatulka-lamart-satsuma",
    fragile: true,
    title: "Круглая шкатулка Lamart в стиле Сацума",
    country: "italy",
    kind: "interior",
    price: 7500,
    material: "Керамика",
    story:
      "Круглая шкатулка с крышкой Lamart в стиле Сацума. Глазурь с сеткой кракелюра — задуманный приём, а не дефект; пионы и хризантемы с золотым контуром, по низу — пояс из рельефных золочёных панелей.",
    addedAt: "2026-11-04",
    photos: [
      "/items/shkatulka-lamart-satsuma/1.jpg",
      "/items/shkatulka-lamart-satsuma/2.jpg",
      "/items/shkatulka-lamart-satsuma/3.jpg",
    ],
  },

  /* ——— Ваза, прислана 04.11.2026. С бирки: Bavaria, 1949–1995, 8200 ₽.
     Германия — по названию Bavaria, фарфор — по виду; клеймо и состояние
     не присланы. Кадр 1 — после нейросети, кадр 2 — снимок из галереи. */
  {
    slug: "vaza-bavaria-farfor",
    fragile: true,
    title: "Ваза с крышкой Bavaria, кремовый фарфор",
    country: "germany",
    era: "1949–1995",
    kind: "interior",
    price: 8200,
    material: "Фарфор",
    story:
      "Ваза с крышкой Bavaria, период 1949–1995. Кремовая глазурь, рисунок из розовых цветов и серо-зелёных пальмовых листьев, позолота на ножке, крае крышки и навершии.",
    addedAt: "2026-11-04",
    photos: ["/items/vaza-bavaria-farfor/1.jpg", "/items/vaza-bavaria-farfor/2.jpg"],
  },

  /* ——— Лампы, присланы 02.11.2026. Со слов владелицы: электрические
     керосинки, Италия, бронза, дерево, рабочие, 9000 ₽ за штуку, продаются
     парой — 18 000 ₽ (решение от 2026-11). Провода разные. Кадр 1 — после нейросети
     (стекло на нём чуть светлее настоящего), кадр 2 — снимок из галереи. */
  {
    slug: "lampy-para-bronza-steklo",
    fragile: true,
    title: "Пара электрических керосинок, бронза и янтарное стекло",
    country: "italy",
    kind: "interior",
    price: 18000,
    material: "Бронза, дерево, стекло",
    story:
      "Две электрические керосинки: колпаки из янтарного стекла с гравировкой, основания из бронзы и дерева. Рабочие. Провода разные, белый и коричневый: в один интерьер их лучше заменить на одинаковые. Создадут тепло и уют.",
    marks: ["Пара"],
    addedAt: "2026-11-04",
    photos: ["/items/lampy-para-bronza-steklo/1.jpg", "/items/lampy-para-bronza-steklo/2.jpg"],
  },

  /* ——— Кольцо, прислано 24.10.2026. «Австрия, раздвижное, 1700» — со
     слов владелицы; металл не назван (латунь или бронза — по кадру не
     сказать), состояние не названо. Потёртости росписи описаны по кадру:
     видны на обоих снимках. Кадр 3 (первый) — после нейросети, сверху в
     перламутровой тарелочке: вид сбоку нейросеть замыкала шинку. */
  {
    slug: "kolco-buket-roz-razdvizhnoe",
    title: "Кольцо-букет из металлических роз, раздвижное",
    country: "austria",
    kind: "jewelry",
    price: 1700,
    size: "Раздвижное",
    story:
      "Букет объёмных металлических роз с росписью: кремовые, розовые и зелёные лепестки, местами краска стёрта до металла. Шинка из проволоки разомкнута — кольцо раздвигается под размер.",
    addedAt: "2026-10-24",
    photos: [
      "/items/kolco-buket-roz-razdvizhnoe/3.jpg",
      "/items/kolco-buket-roz-razdvizhnoe/1.jpg",
      "/items/kolco-buket-roz-razdvizhnoe/2.jpg",
    ],
  },

  /* ——— Кольцо, прислано 24.10.2026. «Керамика, розовые цветы, Япония,
     раздвижное, 3000» — со слов владелицы; металл и состояние не названы.
     Кадр 4 (первый) — после нейросети, сцена «старая книга»; 1–3 —
     снимки владелицы. */
  {
    slug: "kolco-keramika-rozovye-cvety",
    title: "Кольцо с керамикой, розовые цветы, раздвижное",
    country: "japan",
    kind: "jewelry",
    price: 3000,
    material: "Керамика",
    size: "Раздвижное",
    story:
      "Овальная вставка из розовой керамики с объёмными цветами: голубые серединки, белый контур лепестков и тонкая сетка трещин по глазури. Бортик с зернью, ажурная шинка; кольцо раздвигается под размер.",
    addedAt: "2026-10-24",
    photos: [
      "/items/kolco-keramika-rozovye-cvety/4.jpg",
      "/items/kolco-keramika-rozovye-cvety/1.jpg",
      "/items/kolco-keramika-rozovye-cvety/2.jpg",
      "/items/kolco-keramika-rozovye-cvety/3.jpg",
    ],
  },

  /* ——— Кольцо, прислано 24.10.2026. «Миллефиори, Япония, 2600,
     раздвижное» — со слов владелицы; металл и состояние не названы.
     Кадр 1 — после нейросети (новая сцена: лён и шкатулка, чтобы украшения
     не повторяли друг друга), 2 и 3 — снимки владелицы. */
  {
    slug: "kolco-millefiori-razdvizhnoe",
    sold: true,
    title: "Кольцо с миллефиори, раздвижное",
    country: "japan",
    kind: "jewelry",
    price: 2600,
    material: "Стекло миллефиори",
    size: "Раздвижное",
    story:
      "Купол из стекла миллефиори: оранжевые, красные, жёлтые и тёмно-бирюзовые цветы на мятном фоне, в оправе со жгутиком по краю. Шинка разомкнута и заканчивается шариками — кольцо раздвигается под размер.",
    addedAt: "2026-10-24",
    photos: [
      "/items/kolco-millefiori-razdvizhnoe/1.jpg",
      "/items/kolco-millefiori-razdvizhnoe/2.jpg",
      "/items/kolco-millefiori-razdvizhnoe/3.jpg",
    ],
  },

  /* ——— Запонки, присланы 24.10.2026. «Клуазоне, Япония, 3200» — со слов
     владелицы; металл, размер и состояние не названы. Кадр 1 — после
     нейросети (эмаль слегка перерисована), 2 и 3 — снимки владелицы. */
  {
    slug: "zaponki-kluazone-cvety",
    title: "Запонки с эмалью клуазоне, цветы на чёрном",
    country: "japan",
    kind: "jewelry",
    price: 3200,
    material: "Эмаль клуазоне",
    story:
      "Перегородчатая эмаль клуазоне: розовые, малиновые, белые и сиреневые цветы с золотистым контуром на чёрном фоне, под прозрачным куполом. Ободок с алмазной гранью; цветы на двух запонках разные.",
    addedAt: "2026-10-24",
    photos: [
      "/items/zaponki-kluazone-cvety/1.jpg",
      "/items/zaponki-kluazone-cvety/2.jpg",
      "/items/zaponki-kluazone-cvety/3.jpg",
    ],
  },

  /* ——— Брошь, прислана 24.10.2026. Клеймо Catherine Popesco France — на
     обороте (кадр 3). La Vie Parisienne, медный сплав с покрытием, горячая
     эмаль, 1980-е и 4000 ₽ — со слов владелицы. Её оговорки «серебро или
     14-каратное золото» и «часто Swarovski» в карточку не вынесены: это
     предположения, а бренд-бук запрещает утверждать неподтверждённое.
     Кадр 1 — после нейросети, 2 и 3 — снимки владелицы. */
  {
    slug: "brosh-catherine-popesco",
    sold: true,
    title: "Брошь Catherine Popesco с винной эмалью",
    country: "france",
    era: "1980-е",
    kind: "jewelry",
    price: 4000,
    material: "Медный сплав с покрытием, горячая эмаль, стразы",
    story:
      "На обороте клеймо Catherine Popesco France, дизайн в духе её коллекции La Vie Parisienne. Винная эмаль с золотистыми линиями, бортик с зернью, стразы по краю и ажурный центр с узлом из лент; по клейму и дизайну — 1980-е.",
    addedAt: "2026-10-24",
    photos: [
      "/items/brosh-catherine-popesco/1.jpg",
      "/items/brosh-catherine-popesco/2.jpg",
      "/items/brosh-catherine-popesco/3.jpg",
    ],
  },

  /* ——— Джемпер, прислан 23.10.2026. Со слов владелицы — только «винтаж,
     3000»; страна неизвестна (стоит «Другие»), состав, размер и
     состояние не названы. Потёртостей нет — со слов владелицы (на первом
     кадре у левой манжеты были видны нитки, второй кадр — после обработки).
     Фон дотянут до 3:4. */
  {
    slug: "dzhemper-v-vyrez-temno-siniy",
    title: "Джемпер с V-образным вырезом, тёмно-синий",
    country: "other",
    kind: "knitwear",
    price: 3000,
    story:
      "Тёмно-синяя вязка, на груди — клин из гладкой голубой вставки, рельефных полос с блестящей нитью, золотистой и зелёной отделки.",
    addedAt: "2026-10-23",
    // Первым — на манекене (после нейросети), вторым — разложенный
    photos: ["/items/dzhemper-v-vyrez-temno-siniy/2.jpg", "/items/dzhemper-v-vyrez-temno-siniy/1.jpg"],
  },

  /* ——— Платье, прислано 23.10.2026. «Бавария, вышивка, 3800» — со слов
     владелицы; состав, размер и состояние не названы. Кадр — после
     нейросети, на манекене. */
  {
    slug: "plate-bavarskoe-vyshivka",
    title: "Баварское платье с вышивкой, сине-зелёное",
    country: "germany",
    kind: "dresses",
    price: 3800,
    story:
      "Сине-зелёное платье баварского кроя: квадратный вырез с розовым кантом, лиф с вышитыми розами и декоративными пуговицами, юбка в складку с вышитой каймой из роз по подолу.",
    addedAt: "2026-10-23",
    photos: ["/items/plate-bavarskoe-vyshivka/1.jpg"],
  },

  /* ——— Свитер, прислан 23.10.2026. Страна, состав и цена — со слов
     владелицы («винтаж, Европа, шерсть, 3500»); размер и состояние не
     названы, описание составлено по кадру. */
  {
    slug: "sviter-zhakkard-vyshivka",
    title: "Шерстяной свитер с жаккардом и вышивкой",
    country: "europe",
    kind: "knitwear",
    price: 3500,
    material: "Шерсть",
    story:
      "Жаккардовый узор в серо-бежевых и тёмно-зелёных тонах с бордовыми полосами. Поверх вязки — вышивка шерстяной нитью: сиреневые и жёлтые цветы, свободные линии, синие штопки; горловина обшита сиреневым через край.",
    addedAt: "2026-10-23",
    // Первым — на манекене (обработан нейросетью), по просьбе владельца;
    // вторым — её снимок на коричневой бумаге, фон дотянут до 3:4
    photos: ["/items/sviter-zhakkard-vyshivka/2.jpg", "/items/sviter-zhakkard-vyshivka/1.jpg"],
  },

  /* ——— Реальные вещи. Съёмка владелицы, папка «Японские вещи → Жакеты».
     Кадры 22.09.2026 заменены на пересъёмку от 18.09.2026 — те же девять
     жилетов на коричневом фоне, по просьбе владельца.
     Описания составлены по фотографиям: крой, цвет, фактура, фурнитура.
     Цена — 3500 ₽ за штуку, со слов владелицы. Состав, размер и состояние
     не проставлены: по кадру их не определить, а бренд-бук запрещает
     додумывать. Эти поля заполняет владелица. */
  {
    slug: "zhilet-kremovyy-uzkaya-poloska",
    title: "Жилет в узкую полоску, кремовый",
    country: "japan",
    kind: "waistcoats",
    price: 3500,
    story:
      "Светлое полотно в частую красно-серо-синюю полоску, четыре пуговицы под перламутр. Два накладных кармана по бёдрам и прорезной на груди, спинка и подкладка — кремовая ткань в тон.",
    addedAt: "2026-09-03",
    photos: ["/items/zhilet-kremovyy-uzkaya-poloska/1.jpg"],
  },
  {
    slug: "zhilet-siniy-tonkaya-poloska",
    title: "Жилет в тонкую полоску, тёмно-синий",
    country: "japan",
    kind: "waistcoats",
    price: 3500,
    story:
      "Тёмно-синее полотно с частой светлой полоской, пять пуговиц в цвет, четыре прорезных кармана. Спинка атласная, синяя, с регулировкой по талии.",
    addedAt: "2026-09-03",
    photos: ["/items/zhilet-siniy-tonkaya-poloska/1.jpg"],
  },
  {
    slug: "zhilet-sherst-krasnaya-poloska",
    title: "Жилет в красно-серую полоску",
    country: "japan",
    kind: "waistcoats",
    price: 3500,
    story:
      "Тёмное ворсистое полотно с красными и серыми буклированными полосами — фактура читается даже на кадре. Пять пуговиц, прорезной карман на груди и два по бёдрам, спинка — коричневый атлас.",
    marks: ["Тяжёлый люкс"],
    addedAt: "2026-09-03",
    photos: ["/items/zhilet-sherst-krasnaya-poloska/1.jpg"],
  },
  {
    slug: "zhilet-bezhevyy-shirokaya-poloska",
    title: "Жилет в широкую полоску, бежевый",
    country: "japan",
    kind: "waistcoats",
    price: 3500,
    story:
      "Широкая полоска — кремовая, песочная, серая и пыльно-розовая, полотно с рельефным переплетением. Пять светлых пуговиц, два прорезных кармана, спинка белая.",
    addedAt: "2026-09-03",
    photos: ["/items/zhilet-bezhevyy-shirokaya-poloska/1.jpg"],
  },
  {
    slug: "zhilet-siniy-belaya-kletka",
    title: "Жилет в белую клетку, тёмно-синий",
    country: "japan",
    kind: "waistcoats",
    price: 3500,
    story:
      "Крупная белая клетка по тёмно-синему полю, линия набрана мелким зигзагом. Пять пуговиц в тон, два прорезных кармана, спинка — синий атлас.",
    addedAt: "2026-09-03",
    photos: ["/items/zhilet-siniy-belaya-kletka/1.jpg"],
  },
  {
    slug: "zhilet-bordovyy-odnotonnyy",
    title: "Жилет однотонный, бордовый",
    country: "japan",
    kind: "waistcoats",
    price: 3500,
    story:
      "Ровный бордовый цвет без рисунка, матовое полотно. Пять тёмных пуговиц, два прорезных кармана по бёдрам, спинка и подкладка — атлас в тон.",
    addedAt: "2026-09-03",
    photos: ["/items/zhilet-bordovyy-odnotonnyy/1.jpg"],
  },
  {
    slug: "zhilet-siniy-melovaya-poloska",
    title: "Жилет в меловую полоску, тёмно-синий",
    country: "japan",
    kind: "waistcoats",
    price: 3500,
    story:
      "Классическая меловая полоска по тёмно-синему, шаг широкий. Пять пуговиц, четыре прорезных кармана, спинка — чёрный атлас.",
    addedAt: "2026-09-03",
    photos: ["/items/zhilet-siniy-melovaya-poloska/1.jpg"],
  },
  {
    slug: "zhilet-siniy-kletka-ton-v-ton",
    title: "Жилет в клетку тон в тон, тёмно-синий",
    country: "japan",
    kind: "waistcoats",
    price: 3500,
    story:
      "Клетка набрана тон в тон — рисунок виден только вблизи и на свету. Пять пуговиц, четыре прорезных кармана, спинка — серо-стальной атлас.",
    addedAt: "2026-09-03",
    photos: ["/items/zhilet-siniy-kletka-ton-v-ton/1.jpg"],
  },
  {
    slug: "zhilet-seryy-uzor-bandana",
    title: "Жилет с узором бандана, серый",
    country: "japan",
    kind: "waistcoats",
    price: 3500,
    story:
      "Серое поле с чёрным узором бандана, собранным в ромбы, — рисунок печатный, плотный по всей площади. Пять пуговиц, два прорезных кармана, спинка чёрная атласная.",
    addedAt: "2026-09-03",
    photos: ["/items/zhilet-seryy-uzor-bandana/1.jpg"],
  },

  /* ——— Съёмка 18.09.2026: папки «Австрийские вещи», «Без страны»,
     «Ручная работа», «Японские вещи → Украшения». Описания составлены по
     кадру, как и у жилетов: цена, состав, размер и состояние не проставлены —
     их заполняет владелица. Групповые кадры (лоток с украшениями, стопка
     жилетов) вещами не стали. Папка «Жакеты» в той же съёмке — те же девять
     жилетов, что уже на витрине, на коричневом фоне; не дублируем. */
  {
    slug: "plate-kletka-terrakota",
    sold: true,
    title: "Платье в крупную клетку, терракотовое",
    country: "austria",
    kind: "dresses",
    story:
      "Крупная клетка в оранжевых, красных и коричневых тонах, круглый вырез, планка на мелких пуговицах до самого низа, короткий рукав. Юбка присборена от талии, низ оставлен с бахромой из нитей.",
    addedAt: "2026-09-22",
    photos: ["/items/plate-kletka-terrakota/1.jpg"],
  },
  {
    slug: "sarafan-len-kruzhevo",
    title: "Сарафан с кружевной вставкой, бежевый",
    country: "austria",
    kind: "dresses",
    story:
      "Неокрашенное полотно, по фактуре — лён. Вдоль планки ажурная тесьма с кружевом, на талии две металлические пуговицы-цветка и завязки по бокам. Соседи по вешалке на кадре — небелёный, кремовый, тёмно-зелёный и чёрный — о них спрашивайте отдельно.",
    addedAt: "2026-09-22",
    photos: ["/items/sarafan-len-kruzhevo/1.jpg"],
  },
  {
    slug: "pidzhak-zamshevaya-otdelka",
    title: "Пиджак с замшевой отделкой, тёмно-зелёный",
    country: "other",
    kind: "suits",
    story:
      "Плотное тёмно-зелёное полотно с матовой, чуть бархатистой поверхностью; воротник, клапаны карманов и обшлага — светлой замшей. На лацкане вышит эдельвейс, пуговицы под рог. Крой альпийского типа, застёжка на три пуговицы.",
    addedAt: "2026-09-22",
    photos: ["/items/pidzhak-zamshevaya-otdelka/1.jpg"],
  },
  {
    slug: "kostyum-vyazanyy-zhaket-yubka",
    sold: true,
    title: "Вязаный костюм: жакет и юбка, серо-голубой меланж",
    country: "other",
    kind: "suits",
    story:
      "Связан вручную из меланжевой пряжи — голубой, серый, розовый и оливковый в одной нити, с лёгким ворсом. Короткий жакет без застёжки с рукавом три четверти, юбка на шнурке с разрезом сбоку. Блуза, бусы и сумка на кадре — стилизация.",
    marks: ["Ручная работа"],
    addedAt: "2026-09-22",
    photos: ["/items/kostyum-vyazanyy-zhaket-yubka/1.jpg"],
  },
  {
    slug: "sergi-zhemchug-biser",
    sold: true,
    title: "Серьги с жемчужиной и бисером",
    country: "japan",
    kind: "jewelry",
    story:
      "Крупная бусина под жемчуг в облаке прозрачного бисера и стекляруса, у основания — дорожка мелких страз. Оправа золотистая.",
    addedAt: "2026-09-22",
    photos: ["/items/sergi-zhemchug-biser/1.jpg"],
  },
  {
    slug: "sergi-kameya-profil",
    sold: true,
    title: "Серьги-камеи с женским профилем, голубые",
    country: "japan",
    kind: "jewelry",
    story:
      "Овальные камеи: белый профиль на голубом фоне, тонкая золотистая оправа. Замок винтовой — для ушей без прокола.",
    addedAt: "2026-09-22",
    photos: ["/items/sergi-kameya-profil/1.jpg"],
  },
  {
    slug: "sergi-kameya-roza",
    sold: true,
    title: "Серьги-камеи с розой, бирюзовые",
    country: "japan",
    kind: "jewelry",
    story:
      "Круглые камеи с рельефной розой цвета слоновой кости на бирюзовом фоне, оправа серебристая. Замок винтовой, без прокола.",
    addedAt: "2026-09-22",
    photos: ["/items/sergi-kameya-roza/1.jpg"],
  },
  {
    slug: "brosh-tri-lista-korall",
    sold: true,
    title: "Брошь «Три листа» с бусинами кораллового цвета",
    country: "japan",
    kind: "jewelry",
    story:
      "Три листа с перламутровой эмалью в золотистой проволочной оправе, в центре — три бусины кораллового цвета.",
    addedAt: "2026-09-22",
    photos: ["/items/brosh-tri-lista-korall/1.jpg"],
  },
];

/** Витрина целиком: сначала то, что пришло из CRM, потом записанное руками. */
export const items: Item[] = [...(crmItems as Item[]), ...staticItems];

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
