import Link from "next/link";
import { asset } from "@/lib/asset";
import { brand, contacts, nav } from "@/lib/brand";

export default function Footer() {
  const year = 2026;
  return (
    <footer className="footer">
      <div className="shell">
        <div className="footer__top">
          <div className="footer__col">
            {/* Инверсная версия лока — для тёмного фона. Бренд-бук, полоса 04. */}
            <div className="footer__lock">
              <img src={asset("/logo-inverse.svg")} alt={brand.full} />
            </div>
            <p className="footer__note">
              Спасибо, что забрали эту вещь. Она была одна.
            </p>
          </div>

          <div className="footer__col">
            <p className="rubric">Разделы</p>
            {nav.map((n) => (
              <Link key={n.href} href={n.href}>
                {n.label}
              </Link>
            ))}
          </div>

          <div className="footer__col">
            <p className="rubric">Связь</p>
            <a href={contacts.phoneHref}>{contacts.phone}</a>
            <a href={contacts.telegramHref} target="_blank" rel="noreferrer">
              Telegram {contacts.telegram}
            </a>
            <a href={contacts.vkHref} target="_blank" rel="noreferrer">
              VK {contacts.vk}
            </a>
            <span>{brand.city}</span>
          </div>
        </div>

        <div className="footer__bottom">
          <span>
            {brand.lockup} · {brand.city}
          </span>
          <span>© {year}</span>
        </div>
      </div>
    </footer>
  );
}
