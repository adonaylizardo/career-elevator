# Career Elevator — Type Scale (Desktop focus)

Extracted from Desktop 1440 sections: **Hero, Nav, What's Included, Who It's For, FAQ, Closing CTA, Footer**.  
(How / Not / Proof / Pricing reuse the same Neue Montreal 40/500 title + 16/300 body patterns.)

Legend: `family | size | weight | line-height | letter-spacing | color | align`

---

## Display / headings

| Style | Spec | Where |
|-------|------|-------|
| Close display | **Frama** · **100** · normal · lh **1.2** · ls **-2** · `#2B2B2B` | Closing CTA › Close H2 — `Stop searching. / Start applying.` |
| Hero H1 | **Frama** · **64** · normal · lh **0.88** · ls **-2.8** · `#2B2B2B` · center | Hero › Hero H1 |
| Section / card title | **Neue Montreal** · **40** · **500** · lh **0.9** · ls **-0.8** · `#2B2B2B` | Included title (center); card titles; Who titles; FAQ title; also How/Pricing/Not/Proof titles outside focus set |
| FAQ +/- icon | **Neue Montreal** · **20** · **500** · lh **1.15** · ls **-0.3** · `#2B2B2B` | FAQ › Icon (`+` / `×`) |
| Logo slash | **Frama** · **18** · normal · ls **-0.5** · `#FFFFFF` | Nav › Logo Slash |

---

## Body / UI

| Style | Spec | Where |
|-------|------|-------|
| Hero body | **Neue Montreal** · **17** · **300** · lh **1.35** · `#2B2B2B` · center | Hero › Hero Body |
| Body muted | **Neue Montreal** · **16** · **300** · lh **1.35** · `#656565` | Included intro (center), card bodies, motion body, Who bullets/not body, FAQ support (right) |
| FAQ question | **Neue Montreal** · **16** · **500** · lh **1.4** · `#2B2B2B` | FAQ › Q |
| Hero audience | **Neue Montreal** · **15** · **300** · lh **1.4** · `#656565` · center | Hero › Hero Audience |
| FAQ answer | **Neue Montreal** · **15** · **300** · lh **1.4** · `#656565` | FAQ › A |
| Close body | **Neue Montreal** · **15** · normal · lh **1.45** · `#656565` | Closing CTA › Close Body |
| Nav logo wordmark | **Neue Montreal** · **14** · **500** · lh **1.3** · ls **-0.2** · `#2B2B2B` | Nav › Logo |
| Footer links | **Neue Montreal** · **14** · normal · lh **1.3** · `#8A8A8A` | Footer link rows |
| Hero micro | **Neue Montreal** · **13** · normal · lh **1.3** · `#2B2B2B` · center | Hero › Hero Micro |
| Close CTA label | **Neue Montreal** · **13** · **600** · lh **1.2** · `#FFFFFF` | Closing CTA button |
| Footer legal | **Neue Montreal** · **12** · normal · lh **1.3** · `#8A8A8A` | Foot Brand / Foot Copy |

---

## Mono / labels

| Style | Spec | Where |
|-------|------|-------|
| Nav links / CTA | **Supply Mono** · **14** · **500** · lh **1.2** · ls **0.2** · `#2B2B2B` or `#FFFFFF` on CTA | Nav |
| Footer col titles | **Supply Mono** · **13** · **500** · lh **1.3** · `#FFFFFF` | Footer › Col Tit * (visibility caveat on white footer) |
| Hero eyebrow | **Supply Mono** · **12** · **500** · lh **1.3** · ls **1.2** · `#FC4778` · center | Hero › Hero Eyebrow |
| Hero / Price CTA label | **Supply Mono** · **12** · **500** · lh **1.2** · ls **0.3** · `#FFFFFF` | Hero CTA, Price CTA |
| Motion / FAQ annotation label | **Supply Mono** · **12** · **500** · lh **1.3** · ls **0.8** · `#656565` | Motion Notes |

---

## Distinct style count (focus sections)

**25** unique (family, size, weight, lh, ls, color, align) combinations in the focus set.

### Quick CSS-oriented tokens (suggested)

```css
--font-display: "Frama", sans-serif;
--font-body: "Neue Montreal", sans-serif;
--font-mono: "Supply Mono", ui-monospace, monospace;

--text-hero: 64px/0.88 "Frama"; letter-spacing: -2.8px;
--text-close: 100px/1.2 "Frama"; letter-spacing: -2px;
--text-h2: 40px/0.9 "Neue Montreal"; font-weight: 500; letter-spacing: -0.8px;
--text-body: 16px/1.35 "Neue Montreal"; font-weight: 300; color: #656565;
--text-hero-body: 17px/1.35 "Neue Montreal"; font-weight: 300; color: #2B2B2B;
--text-eyebrow: 12px/1.3 "Supply Mono"; font-weight: 500; letter-spacing: 1.2px; color: #FC4778;
--text-nav: 14px/1.2 "Supply Mono"; font-weight: 500; letter-spacing: 0.2px;
--text-cta-pill: 12px/1.2 "Supply Mono"; font-weight: 500; letter-spacing: 0.3px; color: #fff;
```

### Outside focus but shared (for Forge completeness)

| Style | Spec | Where |
|-------|------|-------|
| How step titles | Same as section title 40/500 | How It Works |
| How / Not / Proof / Price body | 16/300 `#656565` lh 1.35 | those sections |
| Not-included row title+body | Neue Montreal **15/300** lh 1.4 `#656565` | What's Not Included |
| ABOUT tag | Supply Mono 12/500 ls 0.8 `#656565` | Proof |
| Price amount | Neue Montreal 40/500 (same H2) | Pricing |
| Price intake | Neue Montreal 13 normal `#6B6B6B` | Pricing |
| Step badge numeral | Supply Mono 12/500 ls 0.8 `#656565` on `#111111` badge | How (low contrast in SoT — consider `#FFFFFF` if matching PNG) |
