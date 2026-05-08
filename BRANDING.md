# Workflow Mirror — Brand Guide

Workflow Mirror is a peer-led AI workflow sharing product built on top of Chico.ai. The brand is editorial, confident, and human — designed to sit comfortably inside enterprise contexts without feeling corporate.

---

## Voice & Tone

- **Direct.** Short sentences. No filler. Say the thing, then stop.
- **Confident, not boastful.** State the bet plainly; let the logic do the work.
- **Human.** Peer-to-peer is the product idea and the tone. Write like a thoughtful colleague, not a vendor.
- **British English.** Spelling (behaviour, sceptical, labour, annualised) follows UK conventions throughout.

---

## Colour Palette

| Role | Name | Hex |
|---|---|---|
| Primary | Forest Green | `#166534` |
| Accent | Amber | `#92400E` |
| Background | Cream | `#FBF8F4` |
| Body Text | Charcoal | `#3A3A3A` |
| Muted Text | Warm Grey | `#8A7F70` |
| Rule / Divider | Sand | `#E5DBC8` |

**Usage notes**
- Forest Green is the anchor colour — progress bars, borders, numbered headings, icon fills.
- Amber is used sparingly: slide numbers, "riskiest" labels, accent marks. Never use it for large fills.
- Cream is the default slide/page background. It reads warm on screen and prints cleanly.
- Never place green text on the cream background at small sizes — contrast is insufficient. Use Charcoal for body copy.
- The inverted variant (forest green background, white type) is reserved for interstitial/transition moments only.

---

## Typography

### Display — Playfair Display
Used for: headlines, slide titles, pull quotes, large numerics, italic emphasis.

- **Weight:** Regular (400) for headlines and italics; Semi-bold (600) for large numeric callouts only.
- **Style:** Italic is preferred for editorial emphasis and pull quotes.
- **Never use bold Playfair for body text** — it reads as shouting at small sizes.

### Body — Inter
Used for: body paragraphs, labels, captions, UI chrome, table content.

- **Weight:** Regular (400) for prose; Medium (500) or Semi-bold (600) for uppercase labels and tracking text.
- **Uppercase labels** always carry `letter-spacing: 0.3em` or wider. Keep them short (2–3 words max).

### Pairing rules
- Playfair italic + Inter regular is the default pairing.
- Do not mix Playfair with another serif.
- Do not mix Inter with another sans-serif.

---

## Layout Principles

- **Left-aligned by default.** Centre alignment is reserved for full-bleed interstitial slides (The Demo, Thank You).
- **Generous white space.** The cream background earns its keep — do not crowd it.
- **Horizontal rules** use the Sand (`#E5DBC8`) token and are 1–2px. Use them to separate sections, not decorate headings.
- **Grid:** 12-column internal logic. Most slides split 7/5 or use a 3-column equal grid for component cards.
- **No images or illustrations.** Typography and colour do all the work. If a visual is needed, use an icon from Lucide at 1.5px stroke weight only.

---

## Iconography

Library: **Lucide React** — `strokeWidth={1.5}` only.

Icons appear in circular containers filled with `primary/10` (10% opacity forest green). Icon stroke is full `primary`. Do not use icons as decoration — each icon must correspond directly to a named component or concept.

---

## Slide Chrome

Every slide carries a shared chrome layer:
- **Top progress bar** — 0.55vh tall, fills left-to-right proportional to slide position. Colour: Forest Green (cream slides) or White/70 (inverted slides).
- **Header row** — "WORKFLOW MIRROR" wordmark (left) + zero-padded counter "08 / 12" (right). Both in Warm Grey, 1.5vw, uppercase, tracking wide.
- The chrome is the only element that appears on every slide. Nothing else is shared.

---

## Do / Don't

| Do | Don't |
|---|---|
| Use short, declarative headings | Use question-mark headings ("Could this work?") |
| Use Playfair italic for pull quotes | Use Playfair bold for emphasis |
| Keep slide copy scannable in 10 seconds | Stack more than 4 items in a list |
| Use GBP (£) for all currency | Mix currency symbols |
| Spell out "peer-to-peer", "opt-in" with hyphens | Write "peer to peer" without hyphens in adjectival position |
| Use the inverted (green) slide for transitions only | Use green as a background for content-heavy slides |
