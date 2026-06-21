# UniReg Design System

UniReg is a university operations portal — not a marketing site. The UI should feel institutional, calm, and dense enough for daily admin work while still looking polished enough to stand out in a capstone demo.

## Brand Direction

**School palette: burgundy + forest green**

| Token | Use | Value |
| --- | --- | --- |
| Burgundy (`primary`, login panel) | Buttons, brand marks, accent bar | `#7A1F2E` |
| Burgundy gradient (`bg-unireg-shell-gradient`) | Login brand panel and portal sidebar | `#7A1F2E` → `#561722` |
| Forest green (`unireg-success`) | Success badges, completed states | `#1B6B4F` |
| Slate neutrals | Page canvas, sidebar surface, borders | shadcn semantic tokens |
| Amber (`unireg-warning`) | Pending / attention states | `#B45309` |

Green is **semantic only**. Burgundy owns brand accents.

## Typography

- **UI font:** Plus Jakarta Sans
- **Scale:** compact portal rhythm — titles `text-xl`/`text-2xl`, tables `text-sm`

## Layout Shell

```text
┌ Sidebar         ┬─ Topbar ─────────────────────────┐
│ UniReg + nav    │ session · user menu              │
├─────────────────┴──────────────────────────────────┤
│ PageHeader + tables / forms / cards                │
└────────────────────────────────────────────────────┘
```

- Sidebar: burgundy gradient shell, white nav text, **no heavy shadows**
- Collapse: `250px` → `70px`, mobile drawer below `md`
- Shortcut: `Cmd/Ctrl+B`

## shadcn-First Rule

If shadcn ships it, use it. Check `components/ui/` before creating custom UI.

Add missing primitives with the shadcn CLI instead of hand-writing replacements.

## Frontend Data Layer

```text
features/{role}/api/use-*.ts   → React Query hooks
lib/api/*.ts                   → fetch functions (mock or FastAPI)
lib/api/client.ts              → apiGet / apiPost
lib/api/query-keys.ts          → stable invalidation keys
content/data/                  → static app copy, navigation, portal context
content/mock/                  → seed-aligned mock rows (mock mode only)
types/academic.ts              → UI row models
types/api.ts                   → wire-format + mappers
```

- Default data source: **`NEXT_PUBLIC_DATA_SOURCE=api`** (live PostgreSQL via FastAPI)
- Mock fallback: any other `NEXT_PUBLIC_DATA_SOURCE` value → `content/mock/` through `lib/api/`
- Views must not import `content/mock/` directly; read through `lib/api/` hooks instead

## Components

### shadcn primitives (`components/ui/`)

`button`, `badge`, `card`, `input`, `label`, `select`, `table`, `dialog`, `sheet`, `tabs`, `separator`, `skeleton`, `textarea`, `tooltip`, `dropdown-menu`, `avatar`, `form`, `field`, `pagination`

### Shared patterns (`components/shared/`)

| Component | Purpose |
| --- | --- |
| `DataTable` | Paginated TanStack + shadcn table (required for list screens) |
| `DataTableToolbar` | Search, select filters, mobile filter sheet, reset |
| `DataTableFilterTabs` | Quick status tabs with counts |
| `DataTablePagination` | Page size + navigation controls |
| `DataTableEmpty` | Empty state inside tables |
| `QueryState` | Loading and error wrapper for query-driven views (see `.cursor/rules/skeleton-loading-states.mdc`) |
| `TableSkeleton`, `DashboardSkeleton`, etc. | Layout-matching loading placeholders in `components/shared/skeletons.tsx` |
| `StatCard` | Dashboard metric summary |
| `StatusBadge` | Registration / result / audit status |

### Layout (`components/layout/`)

| Component | Purpose |
| --- | --- |
| `PortalShell` | Sidebar + topbar + main frame |
| `PageHeader` | Title, description, optional actions |

### Features (`features/`)

| Area | Purpose |
| --- | --- |
| `portal/components/` | `PortalPage` |
| `{role}/components/` | Role views |
| `{role}/api/` | TanStack Query hooks |
| `auth/components/` | Login form + brand panel |

## Tables Rule

All operational list screens must use `DataTable`:

- sorting, filtering, and pagination via TanStack Table
- search + select filters via `DataTableToolbar` when needed
- empty state via `DataTableEmpty`
- student-facing dense lists (registration, results, transcript) should pass `renderMobileCard` for a card layout below `md`

Do not use one-off static HTML tables for scalable list pages.

## Skeleton and QueryState Rule

- Every query-driven block must use `QueryState` with a **layout-matching** skeleton (`variant` or explicit `skeleton`).
- Prefer the `query={useQuery(...)}` overload and render-prop children when wiring new screens.
- Use `variant="table"` for `DataTable` pages, `variant="dashboard"` for stat-card dashboards, `variant="list"` for activity feeds.
- Do not use a generic full-width skeleton block for table or dashboard layouts.
- Empty results belong in `DataTable` empty states, not in `QueryState`.

## Forms Rule

- Schemas: `frontend/schemas/`
- Helpers/utils: `frontend/lib/`
- Client forms: `react-hook-form` + `zodResolver`
- UI: shadcn `Form`, `FormField`, `FormItem`, `FormLabel`, `FormControl`, `FormMessage`

## Visual Rules

- **Radius:** `rounded-lg` max on cards and panels
- **Shadows:** avoid heavy elevation; prefer borders
- **Sidebar:** burgundy gradient shell (`bg-unireg-shell-gradient`), white nav text, minimal elevation
- **Cards:** use shadcn `Card`, `CardHeader`, `CardContent` defaults only — do not add extra `p-*`, `pb-*`, or `pt-*` on card slots
- **Mobile lists:** prefer card rows over horizontal table scroll on student-facing screens

## Content Ownership

- Navigation: `frontend/content/data/navigation.ts`
- Portal context: `frontend/content/data/portal.ts`
- SEO copy: `frontend/content/data/seo.ts`
- Mock rows: `frontend/content/mock/` (consumed by `lib/api/` in mock mode)
- Shared table filters: `frontend/content/data/table-filters.ts`

## Metadata

- Factories: `frontend/lib/metadata.ts`
- Copy source: `frontend/content/data/seo.ts`
- Route files export metadata and render a feature view
