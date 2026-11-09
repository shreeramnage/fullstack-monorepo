# 0001 — Monorepo, layering and source-only packages

Status: accepted (2026-11-09)

## Context

Two products (LeadHub, FormDrop) plus an embeddable form and an API share most of their code. We want one place to change shared code, fast local feedback, and an architecture that cannot erode silently.

## Decisions

1. **pnpm workspaces + Turborepo.** One repo, one lockfile. Turbo gives task graph, caching and `--affected` runs for CI. pnpm and Node versions are pinned (`packageManager`, `.nvmrc`, `engines`).
2. **Layers, enforced by lint.** `apps → feature-* → core → contracts`.
   - features never import each other (shared things move to `core`, or features talk through the API)
   - `core` is feature-agnostic
   - `api` imports `contracts` only
   - `embed` imports `contracts` and `form-renderer` only
   - `form-renderer` never imports `core`

   Enforced with `eslint-plugin-boundaries` (`boundaries/dependencies`, default disallow) in `packages/config/eslint.mjs`. A violation fails `pnpm lint`.

3. **Source-only internal packages.** Each `@repo/*` package's `exports` points at its TypeScript source. No build step per package; edits appear instantly. Next apps compile them via `transpilePackages`; Vite handles them natively; the API is bundled with `tsup` (`noExternal: [/^@repo\//]`) so `contracts` is inlined.
4. **Build-time composition.** Apps import the feature packages they need. No micro frontends, no runtime flags.

## Consequences

- Fast dev loop, no publish/build ceremony for internal packages.
- Packages can't be published as-is; fine, they are private.
- Adding a new package type means updating the element list and policies in the shared ESLint config.
- Tooling note: TypeScript is pinned to 6.x because typescript-eslint does not yet support 7.
