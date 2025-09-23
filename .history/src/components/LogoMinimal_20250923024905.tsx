// components/LogoMinimal.tsx
export default function LogoMinimal({ className = "h-8 w-auto" }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 48" className={className} role="img" aria-label="Invoice Generator">
      <defs>
        <linearGradient id="g1" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#0ea5e9" />
          <stop offset="1" stopColor="#3b82f6" />
        </linearGradient>
      </defs>

      <!-- Icon (paper + check) -->
      <g transform="translate(0,4)">
        <rect x="0" y="0" width="40" height="40" rx="6" fill="#0f172a" opacity="0.06" />
        <path d="M8 6h16v2H8zM8 12h16v2H8z" fill="#0f172a" opacity="0.3"/>
        <rect x="4" y="4" width="32" height="32" rx="4" fill="url(#g1)"/>
        <path d="M12 20l4 4 8-10" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
      </g>

      <!-- Text -->
      <g transform="translate(60,30)">
        <text x="0" y="-6" fontFamily="Inter, ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto" fontWeight="700" fontSize="18" fill="#0f172a">
          Invoice Generator
        </text>
        <text x="0" y="12" fontFamily="Inter, ui-sans-serif" fontSize="10" fill="#64748b">
          Create, download and send invoices
        </text>
      </g>
    </svg>
  );
}
