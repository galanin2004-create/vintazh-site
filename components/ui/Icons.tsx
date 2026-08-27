/** Иконки — одна краска, толщина линии 1, без заливок и теней. */

export function ArrowRight({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="18"
      height="8"
      viewBox="0 0 18 8"
      fill="none"
      aria-hidden="true"
    >
      <path d="M0 4h16M12.5 1 16 4l-3.5 3" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

export function Caret({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="9"
      height="6"
      viewBox="0 0 9 6"
      fill="none"
      aria-hidden="true"
    >
      <path d="m1 1 3.5 3.5L8 1" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

/** Волна из лока — фирменный разделитель. */
export function Wave({
  className,
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      className={className}
      style={style}
      viewBox="0 0 200 24"
      fill="none"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M4 16C48 2 92 26 136 12c24-7 44-4 60 2"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Hanger({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="46"
      height="30"
      viewBox="0 0 46 30"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M23 11c-3 0-4.6-1.7-4.6-3.9C18.4 4.7 20.4 3 23 3s4.6 1.7 4.6 4.1M23 11v3M23 14 3 25.5c-1.3.8-.8 2.5.8 2.5h38.4c1.6 0 2.1-1.7.8-2.5L23 14Z"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinejoin="round"
      />
    </svg>
  );
}
