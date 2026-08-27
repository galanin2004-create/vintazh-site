/**
 * Путь к файлу из public/.
 *
 * Обычному <img> Next не подставляет basePath — в отличие от next/image
 * и next/link. Поэтому все пути к картинкам прогоняем через эту функцию.
 *
 * NEXT_PUBLIC_BASE_PATH задаётся только при сборке в подпапку
 * (например, GitHub Pages); при обычном запуске он пустой.
 */
const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const asset = (path: string) => `${BASE}${path}`;
