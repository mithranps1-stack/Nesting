export function LogoMark({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true" focusable="false">
      <rect x="1.5" y="1.5" width="29" height="29" rx="9" fill="none" stroke="currentColor" strokeWidth="2.2" />
      <rect x="7.5" y="7.5" width="17" height="17" rx="5.5" fill="none" stroke="currentColor" strokeWidth="2.2" />
      <rect x="13" y="13" width="6" height="6" rx="2" fill="currentColor" />
    </svg>
  );
}
