"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { asset } from "@/lib/asset";
import { brand, contacts, nav } from "@/lib/brand";
import { axes } from "@/data/taxonomy";
import { Caret } from "./ui/Icons";

/**
 * Шапка по макету меню из бренд-бука (полоса 09):
 * слева знак и слово ВИНТАЖ, справа три оси фильтров и «Новое».
 */
export default function Header() {
  const pathname = usePathname();
  const [openAxes, setOpenAxes] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  // Любая смена страницы закрывает всё открытое.
  useEffect(() => {
    setOpenAxes(false);
    setOpenDrawer(false);
  }, [pathname]);

  useEffect(() => {
    if (!openAxes) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenAxes(false);
    };
    const onClick = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpenAxes(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [openAxes]);

  const isOn = (href: string) =>
    href === "/catalog" ? pathname.startsWith("/catalog") : pathname === href;

  return (
    <header className="header" ref={wrapRef} style={{ position: "sticky" }}>
      <div className="shell">
        <div className="header__inner">
          <Link href="/" className="brand" aria-label={brand.full}>
            <span className="brand__mark">
              <img src={asset("/logo.svg")} alt="" aria-hidden="true" />
            </span>
            <span>
              <span className="brand__word">Винтаж</span>
              <span className="brand__sub">Галерея Галаниной</span>
            </span>
          </Link>

          <nav className="nav" aria-label="Основное меню">
            <button
              type="button"
              className="navLink"
              aria-expanded={openAxes}
              aria-haspopup="true"
              onClick={() => setOpenAxes((v) => !v)}
            >
              Подбор
              <Caret className="navCaret" />
            </button>
            {nav.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className="navLink"
                aria-current={isOn(n.href) ? "page" : undefined}
              >
                {n.label}
              </Link>
            ))}
            <a className="header__phone" href={contacts.phoneHref}>
              {contacts.phone}
            </a>
          </nav>

          <button
            type="button"
            className="burger"
            aria-expanded={openDrawer}
            aria-label={openDrawer ? "Закрыть меню" : "Открыть меню"}
            onClick={() => setOpenDrawer((v) => !v)}
          >
            <span />
          </button>
        </div>

        {openDrawer && (
          <div className="drawer">
            <div className="drawer__links">
              {nav.map((n) => (
                <Link key={n.href} href={n.href}>
                  {n.label}
                </Link>
              ))}
            </div>
            <div className="drawer__axes">
              {axes.map((axis) => (
                <div key={axis.key} className="mega__col">
                  <div className="mega__head">
                    <span className="mega__title">{axis.title}</span>
                    <span className="axis__index">{axis.index}</span>
                  </div>
                  <ul className="mega__list">
                    {axis.facets.map((f) => (
                      <li key={f.slug}>
                        <Link href={`/catalog?${axis.key}=${f.slug}`}>{f.label}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <a className="btn btn--primary" href={contacts.phoneHref}>
              {contacts.phone}
            </a>
          </div>
        )}
      </div>

      {openAxes && (
        <div className="mega">
          <div className="shell">
            <div className="mega__grid">
              {axes.map((axis) => (
                <div key={axis.key} className="mega__col">
                  <div className="mega__head">
                    <span className="mega__title">{axis.title}</span>
                    <span className="axis__index">{axis.index}</span>
                  </div>
                  <ul className="mega__list">
                    {axis.facets.map((f) => (
                      <li key={f.slug}>
                        <Link href={`/catalog?${axis.key}=${f.slug}`}>{f.label}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
