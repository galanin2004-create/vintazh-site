import { asset } from "@/lib/asset";
import { Hanger } from "./Icons";

/**
 * Кадр вещи. Кадрирование 3:4 для каталога (бренд-бук, полоса 12).
 *
 * Пока в item.photos пусто — рисуем спокойную заглушку в цвете «бумага»:
 * без рамок, наклеек и цветных подложек. Как только появятся реальные
 * снимки, компонент подставит их без правок вёрстки.
 */
export default function Photo({
  src,
  alt,
  label,
  ratio = "3 / 4",
  priority = false,
  className = "",
}: {
  src?: string;
  alt: string;
  label?: string;
  ratio?: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`photo${className ? ` ${className}` : ""}`}
      style={{ aspectRatio: ratio }}
    >
      {src ? (
        <img
          src={asset(src)}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
        />
      ) : (
        <div className="photoStub" role="img" aria-label={alt}>
          <Hanger />
          <span className="photoStub__label">{label ?? "Фото 3:4"}</span>
        </div>
      )}
    </div>
  );
}

/** Стандартный набор кадров на вещь: минимум четыре (бренд-бук, полоса 12). */
export const SHOT_LABELS = [
  "Вещь целиком",
  "Спина",
  "Фактура крупно",
  "Деталь и износ",
];
