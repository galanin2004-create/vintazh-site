"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { availabilityEndpoint } from "@/lib/crm";
import type { ItemState } from "@/lib/crm";

type Availability = {
  taken: Set<string>;
  reserved: Set<string>;
  /** false, пока ответ CRM не пришёл или её вовсе нет. */
  live: boolean;
};

const empty: Availability = { taken: new Set(), reserved: new Set(), live: false };

const AvailabilityContext = createContext<Availability>(empty);

/**
 * Спрашивает у CRM, какие вещи заняты, и держит ответ в памяти вкладки.
 *
 * Запрос один на загрузку страницы. Не ответила — молчим и показываем то,
 * что записано в data/items.ts: витрина не должна падать из-за CRM.
 */
export default function AvailabilityProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<Availability>(empty);

  useEffect(() => {
    if (!availabilityEndpoint) return;

    const abort = new AbortController();
    const timer = setTimeout(() => abort.abort(), 4000);

    fetch(availabilityEndpoint, { signal: abort.signal })
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (!data?.ok) return;
        setState({
          taken: new Set<string>(data.taken ?? []),
          reserved: new Set<string>(data.reserved ?? []),
          live: true,
        });
      })
      .catch(() => {
        /* CRM недоступна — остаёмся на данных витрины */
      })
      .finally(() => clearTimeout(timer));

    return () => {
      clearTimeout(timer);
      abort.abort();
    };
  }, []);

  const value = useMemo(() => state, [state]);

  return (
    <AvailabilityContext.Provider value={value}>{children}</AvailabilityContext.Provider>
  );
}

/**
 * Состояние вещи: сначала смотрим CRM, потом собственную пометку витрины.
 * `sold` в data/items.ts остаётся источником правды, если CRM молчит.
 */
export function useItemState(slug: string, sold?: boolean): ItemState {
  const { taken, reserved } = useContext(AvailabilityContext);
  if (sold || taken.has(slug)) return "sold";
  if (reserved.has(slug)) return "reserved";
  return "free";
}

export function useAvailabilityLive(): boolean {
  return useContext(AvailabilityContext).live;
}
