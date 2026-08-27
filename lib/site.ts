/**
 * Адрес сайта — для canonical, Open Graph и sitemap.
 *
 * По умолчанию стоит будущий домен. На GitHub Pages сборка идёт с
 * NEXT_PUBLIC_SITE_URL, потому что там сайт лежит в подпапке.
 * Когда домен купят — достаточно убрать переменную из workflow.
 */
export const SITE =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://vintazh-galanina.ru";
