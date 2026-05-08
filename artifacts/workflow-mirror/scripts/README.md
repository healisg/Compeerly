# Compass — build scripts

## One-pager PDF

`build-one-pager.mjs` regenerates `public/workflow-mirror-one-pager.pdf` — the single-page A4 takeaway that summarises the Compass pitch.

```bash
pnpm --filter @workspace/workflow-mirror exec node scripts/build-one-pager.mjs
```

The script uses `pdfkit` and the bundled TTF fonts under `scripts/fonts/` (Playfair Display Italic/Regular, Inter Regular). Brand tokens are mirrored from `BRANDING.md` at the top of the script.

**If any number changes (activation %, hourly rate, peer count, weekly/annual ROI), update it at the source first** — `artifacts/workflow-mirror-pitch/src/pages/slides/RoiModel.tsx` and `artifacts/workflow-mirror/src/pages/admin.tsx` — then update the matching strings in `build-one-pager.mjs` and re-run the script. The deck, the admin view, and the PDF must reconcile.
