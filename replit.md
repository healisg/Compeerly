# Compass

A peer-led AI workflow sharing prototype for Chico.ai — lets employees browse, capture, and share AI workflows so non-adopters can learn from peers doing the same job.

## Run & Operate

- `pnpm --filter @workspace/workflow-mirror run dev` — run the frontend (port assigned by Replit)
- `pnpm --filter @workspace/api-server run dev` — run the API server (port 8080)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- Required env: `ANTHROPIC_API_KEY` — Claude API key for workflow structuring

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React + Vite + Wouter + Tailwind CSS + shadcn/ui
- API: Express 5, Anthropic SDK
- Validation: Zod (`zod/v4`)
- API codegen: Orval (from OpenAPI spec in `lib/api-spec/openapi.yaml`)

## Where things live

- Frontend: `artifacts/workflow-mirror/src/`
  - Pages: `src/pages/feed.tsx`, `src/pages/capture.tsx`, `src/pages/detail.tsx`
  - State: `src/lib/workflows.tsx` — WorkflowContext with seeded data + add/increment
  - Card component: `src/components/workflow-card.tsx`
- Backend route: `artifacts/api-server/src/routes/structureWorkflow.ts`
- API contract: `lib/api-spec/openapi.yaml`
- Generated hooks: `lib/api-client-react/src/generated/api.ts`

## Architecture decisions

- All workflow state is in-memory React context (no database) — intentional for prototype reliability
- Claude is called server-side via the Anthropic SDK; API key never exposed to frontend
- OpenAPI-first: single `POST /api/structure-workflow` endpoint drives the Claude capture flow
- File `src/lib/workflows.tsx` uses `.tsx` extension because it contains JSX (React context provider)

## Product

- **Feed (/)**: Browse 6 seeded peer workflows, filter by Role / AI Tool / Category, click any card to see detail
- **Capture (/capture)**: Describe a workflow in plain text, Claude structures it into a card, user edits and publishes to the feed
- **Detail (/workflow/:id)**: Full workflow view with steps, tips, "This worked for me" counter (increments in state), and "Try this workflow" link

## User preferences

- Chico.ai brand: primary #5B1F8A purple, light purple #F0E8F7, charcoal #1E1E1E
- No authentication, no database — pure in-memory prototype
- Professional SaaS feel, Inter font, no emojis in UI

## Gotchas

- `src/lib/workflows.tsx` must stay as `.tsx` (not `.ts`) — it contains JSX and Vite will reject it otherwise
- The Google Fonts `@import url(...)` in `index.css` must be the very first line — PostCSS fails silently if it's not
- When changing the OpenAPI spec, always re-run codegen before editing routes or frontend

## Pointers

- See the `pnpm-workspace` skill for workspace structure and TypeScript setup
- See the `react-vite` skill for frontend conventions
