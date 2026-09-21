# Career Elevator — Structure (Pen SoT)

Source frames: **Desktop 1440** `bi8Au` · **Mobile 375** `R7UAM9`  
Root fills: `#F1F1F1`. Desktop `layout: vertical`, `alignItems: center`. Heights are mostly **hug**; fixed heights noted where present.

---

## Desktop 1440 — section order

Visual/DOM order (Nav is last in JSON children but `x=0,y=0` overlay, height 80 — treat as sticky top):

1. **Nav** (`AKkfA`) — overlay  
2. **Hero** (`Rx91g`)  
3. **What's Included** (`xRQCW`)  
4. **Who It's For** (`Z9VHx`)  
5. **How It Works** (`u1pdnb`)  
6. **What's Not Included** (`G5KMO`)  
7. **Proof** (`Vcipl`)  
8. **Pricing** (`I1agdB`)  
9. **FAQ** (`sl290`)  
10. **Closing CTA** (`kcFt3`)  
11. **Footer** (`A5uc18`)

### 1. Nav — `AKkfA`
- **Size:** 1440 × **80**; padding `[22, 48]`; fill transparent; `justifyContent: space_between`, `alignItems: center`
- **Layout:** Logo Wrap (gap 12) | Nav Right (gap 24, height 36)
- **Logo:** 32×32 mark `#2B2B2B` r6 with Frama `/` + “Career Elevator”
- **Links (Supply Mono 14/500):** WHAT'S INCLUDED · HOW IT WORKS · FAQ · PRICING (ghost stroke) · **GET — $49** (filled CTA)

### 2. Hero — `Rx91g`
- **Layout:** vertical, gap **20**, padding `[120, 80, 80, 80]`, align center, clip, fill `#F1F1F1`
- **Key text (verbatim):**
  - Eyebrow: `ONE-TIME RESEARCH ENGAGEMENT`
  - H1: `Career Elevator: a curated list of roles that actually fit your experience.`
  - Body: `Get a one-time, hand-built research engagement. You get the Opportunity Sheet: 10–20 open roles matched to your CV and your stated goals, with short notes on where your profile is thin and what the market is asking for right now.`
  - Audience: `Built for mid-level product and UX designers who are tired of scrolling job boards and applying into the void.`
  - CTA: `Get Career Elevator — $49`
  - Micro: `Your Opportunity Sheet, delivered in 3–5 days after intake.`
- **Components:** Hero CTA Wrap (gap 10, pad top 16) → pill CTA

### 3. What's Included — `xRQCW`
- **Layout:** vertical, gap **40**, padding `[96, 120]`, align center, fill `#F1F1F1`
- **Text:** Title `What's included` · Intro `Delivered as a clean, readable sheet you can work through at your own pace.`
- **Included Stack** (`d9jIck`): layout **none**, **920×544**
  - Three cards **520×440**, r24, fill white, stroke `#EAEAEA`, pad `[20,20,28,20]`, absolute:
    - Card Matched roles — x=200, **y=0** — media 260 + “10–20 matched roles.” + body
    - Card Gap notes — x=200, **y=32** — “Gap notes.”
    - Card Market notes — x=200, **y=64** — “Market notes”
  - Media images: `ce-card-matched.png` / `ce-card-gaps.png` / `ce-card-market.png`
- **Motion Notes Included** (Forge annotation, `#FFF5F8` r12):  
  `Scroll-pinned: cards enter one-by-one at full size; end of section = all 3 same dimensions stacked (identical W×H), slight Y offset + scale peek only during motion — final rest = aligned stack like incredibles.dev.`
- **Card copy (verbatim bodies):**
  - Matched: `Open positions aligned to your experience level, your target direction, and the constraints you give me (location, remote, industry, company size). Each with a link and a short line on why it's on your sheet.`
  - Gaps: `A light read on what these roles keep asking for that your CV doesn't currently show — the specific things worth tightening before you apply.`
  - Market: `What's actually showing up for your target right now: patterns in titles, requirements, and how these teams are describing the work.`

### 4. Who It's For — `Z9VHx`
- **Layout:** vertical, gap **40**, padding `[96, 120]`, fill `#FFFFFF`, justify center
- **Children:** Who For Col (w520, gap20) + Who Not Col (w520, pad28, fill `#F1F1F1`, r20, stroke `$border`)
- **Note:** SoT stacks columns vertically; each col is 520 wide — verify side-by-side vs stack against `desktop-full.png` / `ce-mid-who.png`.
- **For bullets** (8px ellipse `#FC4778`):
  - `Mid-level product or UX designers who are actively job hunting`
  - `People who have a CV and a portfolio already, and need direction on where to point them`
  - `Designers who know roughly what they want next but not where it exists`
  - `Anyone spending more time searching than applying`
- **Not for body:** `If you're looking for someone to rewrite your portfolio, coach you through interviews, or apply on your behalf, this isn't that. It's research, done carefully, and handed to you.`

### 5. How It Works — `u1pdnb`
- **Layout:** vertical, gap **40**, padding `[96, 120]`, fill `#F1F1F1`
- **How Steps:** horizontal gap **24**, width **1200** — three equal cards, white, r20, pad 28, stroke `$border`
- **Each step:** Badge 40×40 `#111111` r999 + title (Neue Montreal 40/500) + body
  1. `You pay and complete the intake.` / `A short form: your CV, your portfolio link, what you're looking for, and what you'd rather avoid. It takes about 15 minutes to fill out properly.`
  2. `I build your Opportunity Sheet.` / `Manual research against your actual profile and goals — not a keyword filter or an automated feed.`
  3. `You get it in 3–5 days.` / `Counted from a complete intake. If something in your intake is unclear, I'll ask before I start, and the clock starts once we're aligned.`

### 6. What's Not Included — `G5KMO`
- **Layout:** vertical, gap **32**, padding `[96, 120]`, fill (section white-ish — check MEASURES; list rows white r12)
- **Title:** `What's not included` · Intro: `Stated plainly so there are no surprises:`
- **Rows** (gap4, pad `[16,20]`, r12):
  - No 1:1 coaching. — `The sheet stands on its own. (Coaching exists separately if you ever want it — it's not part of this.)`
  - No resume or portfolio rewrite. — `I'll tell you what's thin. Tightening it is your work.`
  - No applying on your behalf. — `You apply. You interview. You decide.`
  - No ongoing updates. — `This is a one-time deliverable, not a subscription. The sheet reflects the market at the time it's built.`
  - No guaranteed interviews or offers. — `Nobody can honestly promise that. What you get is better targeting and less wasted effort.`

### 7. Proof — `Vcipl`
- **Layout:** vertical, gap **28**, padding `[96, 120]`, fill `#F1F1F1`
- **ABOUT** pill (`#FFF0F5`, r999, pad `[6,12]`)
- **Title:** `Built by Adonay — not a job board.`
- **Body:** `Product and UX design mentor and career coach. I've helped more than 3,000 students around the world, with mentoring and teaching experience at DesignLab, Crehana, CareerFoundry and more. I mentor designers, and my work keeps me close to how hiring decisions actually get made.`

### 8. Pricing — `I1agdB`
- **Layout:** vertical, gap **28**, padding `[96, 120]`, align center, fill `#FFFFFF`
- **Price Card:** w480, pad40, gap16, r24, stroke `$border`, align center
  - `$49 — one time.`
  - `No subscription, no renewal, nothing recurring. You pay once, you get the sheet.`
  - `Payment via PayPal or crypto.`
  - Pill CTA `Get Career Elevator — $49`
  - `Prefer to see the intake questions first? View the intake form.`

### 9. FAQ — `sl290`
- **Layout:** vertical, gap **32**, padding `[96, 120]`, fill `#F1F1F1`
- **FAQ Head** (w900, space_between, align end): title `Answers to your questions` + support `Need more information?` / `Feel free to reach out`
- **FAQ List** w900 — accordion rows pad20; open row has answer + `×`; closed `+`
  - Qs: How current are the roles? · What if the roles aren't a good fit? (**open**, answer present) · Is this automated? · Where do the roles come from? · Who builds Career Elevator? · Can I get more than one sheet? · Do you do coaching?
  - **Only one answer in SoT:** `That usually means the intake was too vague. The more specific you are about direction, constraints, and what you don't want, the sharper the sheet. Take the intake seriously and it does its job.`
- **Motion Notes FAQ:** `One open at a time. Thin light-gray dividers; open row expands inline with × (no pink border). Closed rows show +.`

### 10. Closing CTA — `kcFt3`
- **Layout:** vertical, gap **16**, padding `[40, 80, 24, 80]`, fill `#F1F1F1`, stroke `#E0E0E0`
- **Close Panel:** fill_container × **480**, fill `#F2F2F2`, r**32**, stroke `#E0E0E0`, layout **none**
  - Close Body absolute ~`(60,59)` w575
  - Close H2 absolute ~`(60,146)` w871 — `Stop searching.` / `Start applying.` (Frama 100)
  - Close CTA absolute ~`(811,330)` — pill `#1A1A1A`
- **Body verbatim:** `Career Elevator gives you an Opportunity Sheet: 10–20 roles matched to your experience, with honest notes on your gaps and the market. One payment, delivered in 3–5 days.` + `Built by someone who has guided 3,000+ designers through this exact transition.`

### 11. Footer — `A5uc18`
- **Layout:** vertical, padding `[18, 80, 24, 80]`, fill `#FFFFFF`
- **Footer Cols:** gap48, space_between — Explore / Product / Contact (each w200, gap12)
- **Links:** What's included, How it works, Pricing, FAQ · Opportunity Sheet, Intake form, Checkout · Email Adonay, LinkedIn, Coaching (separate)
- **Bar:** Career Elevator · `© 2026 Adonay Lizardo. Research, not a job board.`
- **SoT caveat:** column titles painted `#FFFFFF` on white footer (invisible) — confirm intended dark footer vs dark titles from PNG.

---

## Mobile 375 — section order

1. **M Nav** (`tAJrN`) — overlay 375×56  
2. **M Hero** (`o1B6K`)  
3. **M Included** (`cq8Bz`)  
4. **M Who** (`sqZvb`)  
5. **M How** (`O0qP1`)  
6. **M Not Inc** (`p6dA95`)  
7. **M Pricing** (`XHPvQ`)  
8. **M FAQ** (`DT6W6`)  
9. **M Close** (`no0fo`) — copyright + close panel (no Proof, no link footer)

### Mobile highlights
- **M Hero:** pad `[80,24,48,24]`, gap16; eyebrow `ONE-TIME RESEARCH` (shorter); H1 same; body slightly different wording (starts `Career Elevator is a one-time…`); full-width pill CTA `#111111`
- **M Included:** frame **335×392** but inner stack **335×920** — cards 300×320 at y=0/24/48 (scroll-pin stack). Title only; no intro line in SoT.
- **M Who:** stacked for-list + not box r16; no two-column
- **M How:** stacked steps w335, badges 32, r16
- **M Not Inc:** five compact rows (shorter bodies than desktop)
- **M Pricing:** card w335 pad28 r20; CTA fill `#111111` (label fill bug `#656565` in SoT)
- **M FAQ:** title only (no support column); same 7 questions; one open answer
- **M Close:** `© 2026 Adonay Lizardo` then panel 360 tall r24; H `Stop searching. Start applying.`; shorter body; CTA w260
- **M Nav:** logo + ☰ + GET — $49 (h32)

---

## Motion / scroll-pin (Forge)

Documented **only** as annotation frames + stacked absolute cards (not real timeline data):

| Viewport | Stack | Card size | Positions |
|----------|-------|-----------|-----------|
| Desktop | Included Stack 920×544 | 520×440 | x=200; y=0,32,64 |
| Mobile | M Included Stack 335×920 | 300×320 | x=18; y=0,24,48 |

Implement: scroll-pinned section; cards enter one-by-one at full size; rest state = equal W×H aligned stack (incredibles.dev pattern). FAQ: single-open accordion, gray dividers, × when open.

---

## Biggest structural deltas vs current Vite preview (from PR8 QA + SoT)

These explain “far from Pen”:

1. **Hero** — Pen requires pink Supply Mono eyebrow `ONE-TIME RESEARCH ENGAGEMENT`, Frama 64 / lh 0.88 / ls -2.8, compact Neue Montreal body; preview omitted eyebrow and used heavier type/different copy.
2. **Included stack** — Pen is a **fixed-size stacked card cluster** (520×440 ×3 with 32px Y offsets) + pink motion callout; preview inflated mobile section (~2600px) with staged animation states and wrong card proportions.
3. **Closing CTA panel** — Pen: bordered `#F2F2F2` r32 panel **480** tall with absolute Frama 100 headline + CTA at right; preview lacked matching rounded panel composition.
4. **Type system** — Pen ships **Frama + Neue Montreal + Supply Mono** (not Inter); section titles Neue Montreal **40/500** lh 0.9 ls -0.8; preview spacing/type scale much looser.
5. **FAQ** — Pen heading `Answers to your questions` + right support blurb + one open row + pink annotation; preview used bare `FAQ`, all closed, different layout.
6. **Who / Proof / Footer** — Pen has specific two-col who, ABOUT pill + “Built by Adonay…”, and footer link columns; preview scaled wider/larger and diverged About heading.

See also `/workspace/ce-pr8-qa/COMPARE.md`.
