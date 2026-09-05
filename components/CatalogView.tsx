"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { items as allItems, type Item } from "@/data/items";
import { axes, label, type Axis } from "@/data/taxonomy";
import { useUrlQuery, setUrlQuery } from "@/lib/useUrlQuery";
import { plural } from "@/lib/brand";
import ProductCard from "./ProductCard";

type Sort = "new" | "price-asc" | "price-desc";

const AXIS_KEYS: Axis[] = ["country", "kind"];

/** Каталог фильтруется по двум осям одновременно: страна и тип вещи. */
export default function CatalogView() {
  const params = useUrlQuery();
  const [openFilters, setOpenFilters] = useState(false);

  const query = params.toString();

  const selected = useMemo(() => {
    const out: Record<Axis, string[]> = { country: [], kind: [] };
    for (const key of AXIS_KEYS) {
      const raw = params.get(key);
      if (raw) out[key] = raw.split(",").filter(Boolean);
    }
    return out;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  const sort = (params.get("sort") as Sort) || "new";

  const matches = (item: Item, ignore?: Axis) =>
    AXIS_KEYS.every((key) => {
      if (key === ignore) return true;
      const picked = selected[key];
      return picked.length === 0 || picked.includes(item[key]);
    });

  const filtered = useMemo(() => {
    const list = allItems.filter((i) => matches(i));
    return list.sort((a, b) => {
      // Проданное всегда в конце: витрина показывает то, что можно забрать.
      if (!!a.sold !== !!b.sold) return a.sold ? 1 : -1;
      if (sort === "price-asc" || sort === "price-desc") {
        // Вещи без цены не участвуют в сравнении и уходят в конец.
        if (!a.price || !b.price) return (a.price ? 0 : 1) - (b.price ? 0 : 1);
        return sort === "price-asc" ? a.price - b.price : b.price - a.price;
      }
      return b.addedAt.localeCompare(a.addedAt);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, sort]);

  /** Счётчик у фильтра считается по другим осям — так видно, что он даст. */
  const countFor = (axis: Axis, slug: string) =>
    allItems.filter((i) => i[axis] === slug && matches(i, axis)).length;

  const toggle = (axis: Axis, slug: string) => {
    const next = new URLSearchParams(query);
    const current = selected[axis];
    const updated = current.includes(slug)
      ? current.filter((s) => s !== slug)
      : [...current, slug];
    if (updated.length) next.set(axis, updated.join(","));
    else next.delete(axis);
    setUrlQuery(next.toString());
  };

  const changeSort = (value: Sort) => {
    const next = new URLSearchParams(query);
    if (value === "new") next.delete("sort");
    else next.set("sort", value);
    setUrlQuery(next.toString());
  };

  const reset = () => setUrlQuery("");

  const active = AXIS_KEYS.flatMap((axis) =>
    selected[axis].map((slug) => ({ axis, slug })),
  );

  return (
    <div className="catalog">
      <aside
        className={`filters${openFilters ? " is-open" : ""}`}
        aria-label="Фильтры каталога"
      >
        {axes.map((axis) => (
          <div key={axis.key} className="filterGroup">
            <div className="filterGroup__title">
              <span className="mega__title">{axis.title}</span>
              <span className="axis__index">{axis.index}</span>
            </div>
            <ul className="filterList">
              {axis.facets.map((f) => {
                const count = countFor(axis.key, f.slug);
                const on = selected[axis.key].includes(f.slug);
                return (
                  <li key={f.slug}>
                    <button
                      type="button"
                      className="filterBtn"
                      aria-pressed={on}
                      disabled={count === 0 && !on}
                      onClick={() => toggle(axis.key, f.slug)}
                    >
                      <span className="filterBtn__box" aria-hidden="true" />
                      <span>{f.label}</span>
                      <span className="filterBtn__count">{count}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </aside>

      <div>
        <div className="catalog__bar">
          <span className="catalog__count">
            {filtered.length} {plural(filtered.length)}
          </span>

          <button
            type="button"
            className="chip filtersToggle"
            onClick={() => setOpenFilters((v) => !v)}
            aria-expanded={openFilters}
          >
            {openFilters ? "Скрыть фильтры" : "Фильтры"}
          </button>

          <label className="sort">
            Порядок
            <select
              value={sort}
              onChange={(e) => changeSort(e.target.value as Sort)}
              aria-label="Порядок показа"
            >
              <option value="new">Сначала новое</option>
              <option value="price-asc">Цена по возрастанию</option>
              <option value="price-desc">Цена по убыванию</option>
            </select>
          </label>
        </div>

        {active.length > 0 && (
          <div className="catalog__bar catalog__bar--chips">
            {active.map(({ axis, slug }) => (
              <button
                key={`${axis}-${slug}`}
                type="button"
                className="chip"
                onClick={() => toggle(axis, slug)}
              >
                {label(axis, slug)}
                <span className="chip__x" aria-hidden="true">
                  ×
                </span>
                <span className="visually-hidden">— снять фильтр</span>
              </button>
            ))}
            <button type="button" className="reset" onClick={reset}>
              Сбросить фильтры
            </button>
          </div>
        )}

        {filtered.length === 0 ? (
          <div className="empty">
            <p className="rubric">Ничего не нашлось</p>
            <p className="text" style={{ maxWidth: "44ch" }}>
              Каждая вещь у нас в одном экземпляре, поэтому под узкий набор
              фильтров иногда не остаётся ничего. Снимите один из них или
              напишите — подберём под запрос.
            </p>
            <button type="button" className="btn btn--ghost" onClick={reset}>
              Сбросить фильтры
            </button>
          </div>
        ) : (
          <div className="grid">
            {filtered.map((item, i) => (
              <ProductCard key={item.slug} item={item} priority={i < 4} />
            ))}
          </div>
        )}

        <p className="catalog__note">
          Не нашли своё — <Link href="/contacts">напишите нам</Link>, поступления
          бывают каждую неделю.
        </p>
      </div>
    </div>
  );
}

