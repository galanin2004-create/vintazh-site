/**
 * Переносит «Продано» из CRM в data/items.ts.
 *
 * Живой сайт — статика на GitHub Pages, и до локальной CRM он не достучится.
 * Пока CRM не выложена, занятость на живом сайте обновляется так: запустили
 * CRM, выполнили эту команду, закоммитили, запушили.
 *
 *     node scripts/sync-sold.mjs
 *     node scripts/sync-sold.mjs --dry      только показать разницу
 *     node scripts/sync-sold.mjs --strict   ещё и снять «Продано» там,
 *                                           где CRM о продаже не знает
 *     CRM_URL=https://crm.домен node scripts/sync-sold.mjs
 *
 * Переносится только «Забрана»: отложенное — состояние на сутки, в исходники
 * ему попадать незачем, его витрина берёт у CRM на лету.
 *
 * По умолчанию пометки только ставятся. Снимать их опасно: вещь могли продать
 * прямо в галерее, без всякой заявки с сайта, — и такая вещь вернулась бы на
 * витрину. Для сверки «CRM — единственный источник правды» есть --strict.
 */
import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const itemsFile = join(root, "data", "items.ts");

const crmUrl = (process.env.CRM_URL ?? "http://localhost:8300").replace(/\/+$/, "");
const dryRun = process.argv.includes("--dry");
const strict = process.argv.includes("--strict");

const taken = await fetchTaken();
const source = await readFile(itemsFile, "utf8");
const { text, added, removed, kept } = applySold(source, taken, strict);

for (const slug of added) console.log(`  + продано   ${slug}`);
for (const slug of removed) console.log(`  - вернулось ${slug}`);

if (kept.length > 0) {
  console.log(
    `\nПомечены проданными, но заявки в CRM нет (${kept.length}): ` + kept.join(", "),
  );
  console.log("Так и должно быть, если вещь ушла из галереи без заявки.");
  console.log("Снять пометки — node scripts/sync-sold.mjs --strict");
}

if (added.length === 0 && removed.length === 0) {
  console.log("\nПравить нечего: всё проданное по CRM уже отмечено.");
  process.exit(0);
}

if (dryRun) {
  console.log("\n--dry: файл не тронут.");
  process.exit(0);
}

await writeFile(itemsFile, text);
console.log(`\nОбновлено: data/items.ts (+${added.length}, -${removed.length}).`);
console.log("Проверьте diff, закоммитьте и запушьте — Pages пересоберётся сам.");

async function fetchTaken() {
  let response;
  try {
    response = await fetch(`${crmUrl}/api/availability`, {
      signal: AbortSignal.timeout(5000),
    });
  } catch {
    console.error(`CRM недоступна: ${crmUrl}`);
    console.error(
      "Запустите её: php -S localhost:8300 -t vintazh-crm/site vintazh-crm/router-dev.php",
    );
    process.exit(1);
  }
  if (!response.ok) {
    console.error(`CRM ответила ${response.status}.`);
    process.exit(1);
  }
  const data = await response.json();
  if (!data?.ok) {
    console.error("CRM вернула неожиданный ответ.");
    process.exit(1);
  }
  return new Set(data.taken ?? []);
}

/**
 * Правит файл построчно: внутри блока вещи ставит или убирает `sold: true`.
 * Так сохраняются комментарии и порядок полей — переписывать файл целиком
 * из разобранных данных мы не хотим.
 */
function applySold(source, taken, strict) {
  const lines = source.split("\n");
  const out = [];
  const added = [];
  const removed = [];
  const kept = [];

  let slug = null;
  let block = [];

  const flush = () => {
    if (slug === null) {
      out.push(...block);
      block = [];
      return;
    }
    const hasSold = block.some((l) => l.trim() === "sold: true,");
    const shouldBeSold = taken.has(slug);

    if (shouldBeSold && !hasSold) {
      const at = block.findIndex((l) => l.trim().startsWith("addedAt:"));
      const indent = at >= 0 ? block[at].match(/^\s*/)[0] : "    ";
      block.splice(at >= 0 ? at : block.length, 0, `${indent}sold: true,`);
      added.push(slug);
    } else if (!shouldBeSold && hasSold) {
      if (strict) {
        const at = block.findIndex((l) => l.trim() === "sold: true,");
        block.splice(at, 1);
        removed.push(slug);
      } else {
        kept.push(slug);
      }
    }

    out.push(...block);
    block = [];
    slug = null;
  };

  for (const line of lines) {
    const found = line.match(/^\s{4}slug: "([^"]+)",\s*$/);
    if (found) {
      flush();
      slug = found[1];
      block.push(line);
      continue;
    }
    block.push(line);
    // Закрывающая скобка вещи стоит ровно на двух пробелах
    if (slug !== null && /^\s{2}\},\s*$/.test(line)) {
      flush();
    }
  }
  flush();

  return { text: out.join("\n"), added, removed, kept };
}
