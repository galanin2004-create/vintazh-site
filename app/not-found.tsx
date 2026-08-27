import Link from "next/link";

export default function NotFound() {
  return (
    <section className="section">
      <div className="shell">
        <div className="empty" style={{ maxWidth: "56ch", margin: "0 auto" }}>
          <p className="rubric">Страница не найдена</p>
          <h1 style={{ fontSize: "var(--h2)" }}>Здесь ничего нет</h1>
          <p className="text" style={{ maxWidth: "44ch" }}>
            Возможно, вещь уже ушла к новому владельцу, а страница вместе с ней.
            Посмотрите, что есть на витрине сейчас.
          </p>
          <Link href="/catalog" className="btn btn--primary">
            Открыть каталог
          </Link>
        </div>
      </div>
    </section>
  );
}
