export function assetPath(path: string): string {
  const base = import.meta.env.BASE_URL
  return `${base}${path.replace(/^\//, '')}`
}

export const CARD_IMAGES = {
  matched: assetPath('assets/ce-card-matched.png'),
  gaps: assetPath('assets/ce-card-gaps.png'),
  market: assetPath('assets/ce-card-market.png'),
} as const
