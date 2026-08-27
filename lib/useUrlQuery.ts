"use client";

import { useSyncExternalStore } from "react";

/**
 * Строка запроса как внешнее хранилище.
 *
 * Зачем не useSearchParams: он требует Suspense, и тогда каталог уезжает
 * из статического HTML — поисковик и человек без JS видят только «Загружаем
 * витрину…». Здесь сервер отдаёт полную витрину, а фильтры применяются
 * сразу после гидратации. Расхождения разметки нет: у useSyncExternalStore
 * отдельный серверный снимок.
 */

const EVENT = "vintazh:urlchange";
let patched = false;

/** history.pushState не шлёт popstate — оборачиваем, чтобы ловить переходы. */
function patchHistory() {
  if (patched || typeof window === "undefined") return;
  patched = true;
  for (const method of ["pushState", "replaceState"] as const) {
    const original = window.history[method];
    window.history[method] = function patchedMethod(
      this: History,
      ...args: Parameters<History["pushState"]>
    ) {
      const result = original.apply(this, args);
      window.dispatchEvent(new Event(EVENT));
      return result;
    };
  }
}

function subscribe(onChange: () => void) {
  patchHistory();
  window.addEventListener("popstate", onChange);
  window.addEventListener(EVENT, onChange);
  return () => {
    window.removeEventListener("popstate", onChange);
    window.removeEventListener(EVENT, onChange);
  };
}

export function useUrlQuery(): URLSearchParams {
  const search = useSyncExternalStore(
    subscribe,
    () => window.location.search,
    () => "",
  );
  return new URLSearchParams(search);
}

/** Меняем адрес без перезагрузки и без прыжка страницы наверх. */
export function setUrlQuery(query: string) {
  const { pathname } = window.location;
  window.history.replaceState(
    window.history.state,
    "",
    query ? `${pathname}?${query}` : pathname,
  );
}
