import Link from "next/link";
import { fillTokens, legalDate, sellerMissing, type Block, type Section } from "@/lib/legal";

const MISSING: Record<string, string> = {
  name: "ФИО предпринимателя",
  inn: "ИНН",
  ogrnip: "ОГРНИП",
  address: "адрес регистрации",
  email: "почта",
  phone: "телефон",
};

function Text({ text }: { text: string }) {
  return (
    <>
      {fillTokens(text).map((part, i) =>
        typeof part === "string" ? (
          part
        ) : (
          <mark key={i} className="legal__gap">
            {MISSING[part.missing]} — вписать
          </mark>
        ),
      )}
    </>
  );
}

function BlockView({ block }: { block: Block }) {
  if (Array.isArray(block)) {
    return (
      <ul>
        {block.map((line) => (
          <li key={line}>
            <Text text={line} />
          </li>
        ))}
      </ul>
    );
  }
  return (
    <p>
      <Text text={block} />
    </p>
  );
}

/** Оферта и политика: одна вёрстка, текст — в lib/legal.ts. */
export default function LegalDoc({
  crumb,
  title,
  lede,
  sections,
}: {
  crumb: string;
  title: string;
  lede: string;
  sections: Section[];
}) {
  return (
    <div className="shell">
      <nav className="crumbs" aria-label="Хлебные крошки">
        <Link href="/">Главная</Link>
        <span aria-hidden="true">·</span>
        <span>{crumb}</span>
      </nav>

      <div className="pageHead">
        <p className="rubric">Документы · редакция от {legalDate}</p>
        <h1>{title}</h1>
        <p className="lede">{lede}</p>
        {sellerMissing.length > 0 && (
          <p className="legal__gap legal__gap--note">
            Черновик: не хватает реквизитов — {sellerMissing.join(", ")}.
          </p>
        )}
      </div>

      <article className="legal">
        {sections.map((s) => (
          <section key={s.title}>
            <h2>{s.title}</h2>
            {s.blocks.map((b, i) => (
              <BlockView key={i} block={b} />
            ))}
          </section>
        ))}
      </article>
    </div>
  );
}
