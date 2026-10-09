/**
 * Забрать опубликованные вещи из CRM перед сборкой.
 *
 *     CRM_URL=https://vintazh-crm.site-chas.ru node scripts/pull-crm-items.mjs
 *
 * Вещи, принятые через Telegram-бота, живут в CRM, а не в data/items.ts.
 * Скрипт спрашивает /api/items, скачивает кадры в public/crm/<slug>/ (папка не в git),
 * режет их до 3:4 под сетку каталога и пишет data/crm-items.json —
 * его подхватывает data/items.ts при сборке. Заодно записывает в
 * data/crm-meta.json, подключена ли касса: от этого зависят тексты
 * страниц (оплата картой или бесплатная бронь).
 *
 * Без CRM_URL (локальная разработка) ничего не делает. Если CRM указана,
 * но не отвечает, — падает: лучше оставить на Pages прошлую сборку, чем
 * выложить витрину без половины вещей.
 */
import { mkdirSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import sharp from "sharp";

const base = (process.env.CRM_URL ?? process.env.NEXT_PUBLIC_CRM_URL ?? "").replace(/\/+$/, "");
const out = "data/crm-items.json";
const metaOut = "data/crm-meta.json";

if (!base) {
  console.log("CRM_URL не задан — вещи из CRM не забираем, data/crm-items.json остаётся как есть.");
  process.exit(0);
}

const res = await fetch(`${base}/api/items`, { signal: AbortSignal.timeout(20_000) });
if (!res.ok) {
  console.error(`CRM ответила ${res.status} на /api/items`);
  process.exit(1);
}
const data = await res.json();
if (!data?.ok || !Array.isArray(data.items)) {
  console.error("CRM вернула не список вещей");
  process.exit(1);
}

const items = [];
for (const item of data.items) {
  const dir = join("public/crm", item.slug);
  mkdirSync(dir, { recursive: true });
  const photos = [];
  let n = 0;
  for (const url of item.photos ?? []) {
    n += 1;
    const file = join(dir, `${n}.jpg`);
    try {
      const r = await fetch(url, { signal: AbortSignal.timeout(30_000) });
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      const buf = Buffer.from(await r.arrayBuffer());
      // Кадр 3:4 по центру, 1200×1600 — как у остальных вещей
      await sharp(buf).rotate().resize(1200, 1600, { fit: "cover" }).jpeg({ quality: 82, mozjpeg: true }).toFile(file);
      photos.push(`/crm/${item.slug}/${n}.jpg`);
    } catch (e) {
      console.warn(`  кадр ${url} не скачался: ${e.message}`);
      if (existsSync(file)) photos.push(`/crm/${item.slug}/${n}.jpg`);
    }
  }
  const { photos: _drop, ...rest } = item;
  items.push({ ...rest, photos });
  console.log(`  ${item.slug} — ${photos.length} кадр(а)`);
}

// Подключена ли касса — от этого зависят тексты страниц: пока ключей
// ЮKassa нет, сайт говорит о бесплатной брони, а не об оплате картой.
const availability = await fetch(`${base}/api/availability`, { signal: AbortSignal.timeout(15_000) })
  .then((r) => r.json())
  .catch(() => null);
if (!availability?.ok) {
  console.error("CRM не ответила на /api/availability");
  process.exit(1);
}
writeFileSync(metaOut, JSON.stringify({ pay: availability.pay === true }, null, 2) + "\n");
console.log(availability.pay === true
  ? "Касса подключена — тексты про оплату картой"
  : "Кассы нет — тексты про бесплатную бронь");

writeFileSync(out, JSON.stringify(items, null, 2) + "\n");
console.log(`Из CRM: ${items.length} вещей → ${out}`);
