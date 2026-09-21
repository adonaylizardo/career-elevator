# Career Elevator — Design Tokens (Pen SoT)

Source: `/workspace/ce-pen-source/career-elevator.pen` (JSON version **2.18**)  
Primary frames: **Desktop 1440** (`bi8Au`), **Mobile 375** (`R7UAM9`)  
Reference-only frames (incredibles.dev imports): `tEebE`, `VddJ4`, `i0NQK`, `zjfKW` — do not treat as CE product SoT.

## Fonts

### Declared in file `fonts[]` (woff2 from incredibles.dev)
| Family | Weights in file |
|--------|-----------------|
| **Frama** | normal (default), 500 |
| **Neue Montreal** | 300, normal (400), 500 |
| **Supply Mono** | 500 |

### Actual usage on product frames
- **Frama** — display/hero (H1 64, Close H2 100), logo slash
- **Neue Montreal** — body, section titles, FAQ, most UI
- **Supply Mono** — eyebrows, nav links, primary CTA labels, motion labels, footer column titles, step badges

> Variable `font-body` = `Inter` is **unused** in the product frames. Do not ship Inter for CE unless intentionally replacing Neue Montreal.

## Colors

### Named variables (`variables`)
| Token | Value |
|-------|-------|
| `bg` | `#FFFFFF` |
| `bg-soft` | `#F7F7F5` |
| `bg-dark` | `#111111` |
| `text-primary` | `#111111` |
| `text-muted` | `#6B6B6B` |
| **`accent`** | **`#FC4778`** |
| `border` | `#E6E6E3` |

### Exact pink / accent
**`#FC4778`** — used for hero eyebrow, who-for bullets, and as `variables.accent`. Soft pink surfaces: `#FFF5F8` (motion callouts), `#FFF0F5` (ABOUT tag).

### Fills / text colors actually painted on Desktop+Mobile
| Hex | Role (observed) |
|-----|-----------------|
| `#F1F1F1` | Page / section canvas (hero, included, how, proof, FAQ, close wrap); desktop root fill |
| `#FFFFFF` | Cards, who section, pricing, not-included, footer, nav ghost |
| `#F2F2F2` | Closing CTA panel |
| `#2B2B2B` | Primary text + primary buttons (hero/nav/price CTA) |
| `#656565` | Secondary / muted body (most common muted) |
| `#6B6B6B` | Alt muted (hero mobile body, price intake, variable text-muted) |
| `#8A8A8A` | Footer links / copyright |
| `#111111` | Dark badges / some mobile CTAs / bg-dark |
| `#1A1A1A` | Closing CTA button |
| `#FC4778` | Accent pink |
| `#EAEAEA` / `#E0E0E0` / `#DEDEDE` | Card / panel / FAQ strokes |
| `#E6E6E3` | `$border` variable strokes on who-not, steps, price card |
| `#FFF5F8` | Motion annotation panels |
| `#FFF0F5` | ABOUT pill |
| transparent `#FFFFFF00` | Nav bar, some FAQ rows |

**No drop shadows / effects** on product frames (effects array empty).

## Radii
| Value | Typical use |
|------:|-------------|
| **999** | Pills / primary CTAs / ABOUT tag / step badges |
| **32** | Desktop Close Panel |
| **24** | Included cards, Price Card; mobile Close Panel |
| **20** | Who-not card, How steps; mobile included cards / price card |
| **16** | Card media corners; mobile who-not / how steps |
| **12** | Motion notes, not-included rows, FAQ open row |
| **6** | Nav CTA, logo mark, pricing ghost |

## Spacing scale (observed gaps)
Common gaps: **4, 6, 8, 10, 12, 14, 16, 20, 24, 28, 32, 40, 48**.

### Section padding (Desktop)
| Section | padding |
|---------|---------|
| Hero | `[120, 80, 80, 80]` (T R B L) |
| Included / Who / How / Not / Proof / Pricing / FAQ | `[96, 120]` (TB, LR) |
| Closing CTA | `[40, 80, 24, 80]` |
| Footer | `[18, 80, 24, 80]` |
| Nav | `[22, 48]`, height **80** |

### Section padding (Mobile)
| Section | padding |
|---------|---------|
| M Hero | `[80, 24, 48, 24]` |
| M Included | `[56, 20]` |
| M Who / How / Not / Pricing / FAQ | `[48, 20]` |
| M Close | `[24, 20, 16, 20]` |
| M Nav | `[12, 24]`, height **56** |

Horizontal content widths often **900–1200** desktop (cards stack 920, FAQ 900, how steps 1200); mobile content ~**335**.

## Button styles

### Primary pill CTA (Hero + Pricing desktop)
- Fill `#2B2B2B`, radius **999**, padding **`[16, 28]`**, align center
- Label: Supply Mono **12 / 500**, letter-spacing **0.3**, line-height **1.2**, color `#FFFFFF`
- Copy: `Get Career Elevator — $49`

### Closing CTA button
- Fill `#1A1A1A`, radius **999**, padding **`[16, 28]`**
- Label: Neue Montreal **13 / 600**, lh **1.2**, `#FFFFFF`

### Nav CTA (desktop)
- Height **36**, radius **6**, padding **`[11, 16]`**, fill `#2B2B2B`
- Label: Supply Mono **14 / 500**, ls **0.2**, `#FFFFFF` — `GET — $49`
- Ghost Pricing: same size, transparent fill, stroke `#2B2B2B` 1px

### Mobile CTAs
- Hero / Price: fill `#111111`, radius 999, padding `[14, 22]`, width fill; label Neue Montreal 14/500 `#FFFFFF` (hero). **Price label fill in SoT is `#656565` — treat as bug; use white.**
- Close: fill `#1A1A1A`, radius 999, padding `[14, 20]`, width 260; Neue Montreal 13/600 `#FFFFFF`
- Nav: height 32, radius 6, padding `[8, 12]`; Supply Mono 11/500 ls 0.2 `#FFFFFF`

## Strokes
- Included cards: `#EAEAEA` 1
- Who-not / How steps / Price card: `$border` → `#E6E6E3` 1
- FAQ rows: `#DEDEDE` (top/bottom or full)
- Close Panel: `#E0E0E0` 1, radius 32, height 480
- Nav Pricing Ghost: `#2B2B2B` 1

## Image assets (card media)
Relative URLs in pen fills:
- `career-elevator-assets/ce-card-matched.png`
- `career-elevator-assets/ce-card-gaps.png`
- `career-elevator-assets/ce-card-market.png`
Mode: `fill`. Desktop media frame height **260**, radius **16**; mobile media height **140**, radius **12**.
