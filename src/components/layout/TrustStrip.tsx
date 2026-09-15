const TRUST_ITEMS = [
  '3,000+ students',
  'DesignLab',
  'Crehana',
  'CareerFoundry',
] as const

export function TrustStrip() {
  return (
    <div className="border-b border-border/60 py-4">
      <div className="mx-auto max-w-5xl px-4 sm:px-8">
        <p className="font-mono-label text-center text-[10px] text-muted sm:text-[11px]">
          {TRUST_ITEMS.map((item, i) => (
            <span key={item}>
              {i > 0 && <span className="text-pink mx-2">·</span>}
              {item}
            </span>
          ))}
        </p>
      </div>
    </div>
  )
}
