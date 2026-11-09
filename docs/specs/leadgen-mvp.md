# Lead-Gen Platform MVP (FormDrop feature set)

## Problem Statement

Marketing teams need lead-capture forms on their landing pages, but every new form, field change or campaign tweak currently goes through a developer. Forms are hand-coded per page, UTM attribution is wired up inconsistently, anyone with access can change a live campaign form, and submissions land in places the team can't easily search or export.

Alongside that, the developer building this platform wants every feature on their resume to exist as real, explainable code: a monorepo where two apps share a core, a drag-and-drop form builder with a JSON schema, role-based access, auto-save, versioning, an iframe + postMessage embed, and CI. The MVP has to be built so each of those can be demonstrated and discussed in depth.

## Solution

A multi-tenant lead-generation platform, delivered as two apps from one monorepo:

- **LeadHub**: the full platform. In the MVP it shows the same form features as FormDrop. Contacts, chat, analytics and the flow builder come after the MVP.
- **FormDrop**: a forms-only product. Workspaces and roles, the form builder, embedding and submissions.

Both apps are built from the same feature packages and talk to one shared API.

A marketer signs up, gets a personal workspace and invites teammates with roles. In a three-panel builder they drag fields onto a form, configure labels and validation rules, and see their work saved automatically. When ready, someone allowed to publish creates a version. Editing the draft afterwards never changes the live form.

The team copies a short snippet onto any landing page. The form loads in an auto-resizing iframe, picks up UTM parameters from the host page, validates input exactly as the builder preview did, and submits to the API, which checks everything again and filters out spam. Submissions appear in a paged table in the dashboard and can be exported to CSV by roles allowed to export.

## User Stories

### Accounts and sessions

1. As a new user, I want to sign up with my email and a password, so that I can start building forms.
2. As a new user, I want a personal workspace created automatically when I sign up, so that I can start working without any setup.
3. As a returning user, I want to log in with my email and password, so that I can reach my workspaces.
4. As a logged-in user, I want my session to renew silently while I work, so that I'm not logged out mid-edit.
5. As a logged-in user, I want to log out, so that nobody else can use my session on this device.
6. As a user whose refresh token was stolen and reused, I want every session from that login revoked, so that an attacker can't keep access.
7. As a user, I want a clear error when my credentials are wrong, so that I know to try again.
8. As a user with several tabs open, I want an expired access token to be refreshed only once, with the waiting requests replayed, so that the app doesn't fail or log me out.
9. As a demo visitor, I want seeded demo accounts for each role, so that I can try the app as Owner, Admin, Editor or Viewer without signing up.

### Workspaces and members

10. As a user, I want to belong to several workspaces, so that I can work with different teams or clients.
11. As a user, I want a workspace switcher, so that I can move between workspaces quickly.
12. As a user, I want the workspace in the URL, so that links I share open the right workspace.
13. As an Owner or Admin, I want to invite someone by email with a chosen role, so that they can join my workspace.
14. As an Owner or Admin, I want a copyable invite link, so that I can send it through any channel, since the MVP doesn't send emails.
15. As an invitee, I want to open an invite link and join the workspace with the role I was given, so that I can start collaborating.
16. As an invitee, I want expired invite links (older than 7 days) to be rejected with a clear message, so that I know to ask for a new one.
17. As an Owner or Admin, I want to change a member's role, so that access follows their responsibilities.
18. As an Owner or Admin, I want to remove a member, so that people who leave lose access.
19. As an Owner, I want the system to stop the last Owner from being removed or demoted, so that a workspace is never left without an owner.
20. As an Owner, I want only Owners to be able to make someone an Owner, so that Admins can't take over the workspace.
21. As any member, I want to be prevented from changing my own role, so that nobody can give themselves more access.
22. As an Owner, I want to delete the workspace, so that I can remove a client's data when the engagement ends.
23. As a member of workspace A, I want it to be impossible to see workspace B's forms or submissions, so that client data stays private.

### Roles and permissions

24. As an Editor, I want to create and edit form drafts, so that I can prepare campaign forms.
25. As an Editor, I want publishing to be unavailable to me, so that only approved people change live forms.
26. As an Admin, I want to publish and delete forms, so that I can control what's live.
27. As a Viewer, I want to see forms and submissions read-only, so that I can follow results without risking changes.
28. As a Viewer, I want buttons for actions I can't perform hidden or disabled, so that the interface doesn't invite me to fail.
29. As any user, I want the API to refuse actions my role doesn't allow, even if I call it directly, so that permissions can't be bypassed.
30. As an Owner, I want submission export limited to roles allowed to export, so that lead data doesn't leave the workspace without permission.

### Forms list

31. As a member, I want to see all forms in my workspace, so that I can find the one I need.
32. As a member, I want each form to show whether it's published and whether it has unpublished changes, so that I know what's live.
33. As an Editor, I want to create a new blank form, so that I can start a new campaign.
34. As an Admin, I want to delete a form, so that obsolete forms disappear.

### Builder: layout and fields

35. As an Editor, I want a field palette, a canvas and a settings panel, so that adding, arranging and configuring fields each have a clear place.
36. As an Editor, I want to drag a field type from the palette onto the canvas at a chosen position, so that I can build the form visually.
37. As an Editor, I want to click a field type to add it at the end, so that I don't have to drag.
38. As an Editor, I want to reorder fields by dragging on the canvas, so that the form flows logically.
39. As an Editor, I want to see a preview of the dragged field while dragging, so that I know where it will land.
40. As a keyboard user, I want to pick up, move and drop fields with the keyboard, so that I can build forms without a mouse.
41. As a screen-reader user, I want drag-and-drop moves announced, so that I know what happened.
42. As an Editor, I want Move up and Move down buttons on fields, so that I have a precise alternative to dragging.
43. As an Editor, I want to select a field and edit its label, help text, key, required flag and width (full or half), so that each field behaves as the campaign needs.
44. As an Editor, I want field keys to be unique and checked, so that submission data never has clashing columns.
45. As an Editor, I want text, textarea, email, phone, number and date fields, so that I can collect standard lead details.
46. As an Editor, I want select, radio and checkbox-group fields with editable options, so that leads can pick from choices.
47. As an Editor, I want a consent checkbox field, so that I can collect marketing consent explicitly.
48. As an Editor, I want hidden fields that take their value from a UTM parameter, the referrer or a fixed value, so that every lead is attributed to its campaign automatically.
49. As an Editor, I want heading fields, so that I can give the form a title or split it into parts visually.
50. As an Editor, I want to delete a field with the Delete key or a button, so that I can remove mistakes quickly.
51. As an Editor, I want to set form-level options such as submit button label, success message, optional redirect URL and theme, so that the form fits the campaign and the brand.

### Builder: validation rules

52. As an Editor, I want to set length limits and a pattern on text fields, so that bad input is rejected.
53. As an Editor, I want to set minimum, maximum and whole-number rules on number fields, so that numeric answers make sense.
54. As an Editor, I want to set a minimum and maximum number of choices on checkbox groups, so that leads choose the right amount.
55. As an Editor, I want only the rules that make sense for each field type, so that the settings panel isn't confusing.
56. As an Editor, I want an invalid or unsafe custom pattern rejected when I save, so that a broken regex can't break or hang the live form.
57. As an Editor, I want the preview to enforce exactly the same rules as the live form and the server, so that what I test is what visitors get.

### Builder: editing safety

58. As an Editor, I want my changes saved automatically shortly after I stop typing, so that I never lose work.
59. As an Editor, I want to see whether my work is saving, saved or retrying, so that I trust the auto-save.
60. As an Editor, I want failed saves retried automatically, so that a short network drop doesn't lose changes.
61. As an Editor, I want Ctrl+S to save immediately, so that I can force a save when I want to.
62. As an Editor, I want unsaved changes saved when I leave the builder, and a warning if I try to close the tab before they're saved, so that I don't lose work by accident.
63. As an Editor, I want undo and redo, including Ctrl+Z and Ctrl+Shift+Z, so that I can experiment safely.
64. As an Editor, I want one drag-and-drop move to be undone in one step, so that undo matches what I did.
65. As an Editor whose teammate saved the same form first, I want to be told and given the choice to load their version or overwrite with mine, so that nobody's work is silently lost.
66. As an Editor, I want auto-save paused while that conflict is unresolved, so that it doesn't overwrite anything in the meantime.
67. As a Viewer, I want to open the builder read-only, so that I can inspect a form's setup without editing it.

### Preview, publishing and versions

68. As an Editor, I want to preview the form at desktop and mobile widths, so that I know it works on both.
69. As an Editor, I want the preview to use the same renderer as the live embed, so that the preview is exact.
70. As an Admin, I want to publish the current draft as a new numbered version, so that the change goes live in one deliberate step.
71. As an Admin, I want publishing to either fully succeed or fully fail, so that the live form is never half-updated.
72. As a member, I want edits to the draft never to change the live form until published, so that campaigns stay stable while we work.
73. As a member, I want an "Unpublished changes" badge, so that I know when the draft differs from what's live.
74. As an Admin, I want to see the list of published versions, so that I can track a form's history.
75. As an Admin, I want to roll back by re-publishing an older version as a new version, so that I can undo a bad release without rewriting history.

### Embedding

76. As a marketer, I want a short copy-paste snippet for each form, so that I can put it on any landing page without a developer.
77. As a marketer, I want several forms to work on the same page, so that one page can carry different forms.
78. As a landing-page owner, I want the embed script to load asynchronously and be small, so that it doesn't slow my page.
79. As a landing-page owner, I want the form's styles isolated from my page, so that neither breaks the other.
80. As a landing-page owner, I want the iframe to resize to the form's height, so that there are no inner scrollbars.
81. As a marketer, I want UTM parameters, the referrer and the page URL passed from the host page into the form, so that hidden attribution fields are filled correctly.
82. As a landing-page developer, I want to subscribe to form events (ready, submitted, error) from my page, so that I can fire analytics or conversion pixels.
83. As a marketer, I want a form to redirect the visitor's whole page after submitting when a redirect URL is set, so that I can send leads to a thank-you page.
84. As a security-conscious owner, I want messages between the page and the iframe accepted only from the expected origins, so that other scripts can't fake or read form events.
85. As an Owner, I want to optionally restrict which domains a form may be embedded on, so that forms aren't reused on unknown sites.
86. As a visitor, I want only published forms to load, so that I never see half-finished drafts.

### Submitting (visitor)

87. As a visitor, I want inline validation messages as I fill in the form, so that I can fix mistakes before submitting.
88. As a visitor, I want a clear success message, or a redirect, after submitting, so that I know my details were received.
89. As a visitor, I want per-field error messages if the server rejects my input, so that I know what to fix.
90. As an Owner, I want every submission checked again on the server against the published version's rules, so that tampered requests are rejected.
91. As an Owner, I want each submission linked to the exact form version it was made with, so that old submissions still make sense after the form changes.
92. As an Owner, I want submissions rate-limited per visitor and form, so that floods don't swamp the data.
93. As an Owner, I want bots that fill hidden honeypot fields or submit too fast dropped silently, so that spam doesn't reach the table without tipping bots off.
94. As an Owner, I want oversized requests rejected, so that the API can't be abused with huge payloads.
95. As a privacy-conscious Owner, I want visitor IPs stored only as salted hashes, so that we keep rate-limit and abuse signals without keeping raw IPs.

### Submissions dashboard

96. As a member, I want a table of each form's submissions, newest first, so that I can follow leads.
97. As a member, I want the table to page through large result sets smoothly, so that big campaigns stay usable.
98. As a member, I want columns for every field that has ever existed across the form's versions, so that no data is hidden after the form changes.
99. As a member, I want to open a submission in a side panel with all values and attribution data, so that I can inspect a lead in full.
100. As a member allowed to export, I want to download submissions as CSV, so that I can load them into a CRM or spreadsheet.
101. As an Owner, I want CSV export to stream, so that large exports don't time out or exhaust memory.

### Two apps

102. As a FormDrop user, I want a focused forms product with a teal theme and top navigation, so that it feels like its own product.
103. As a LeadHub user, I want the same form features inside the full platform with an indigo theme and sidebar, so that forms sit alongside the modules coming later.
104. As a user of either app, I want light and dark modes, so that I can work comfortably.

### Developer experience and quality

105. As the developer, I want one command to start all apps and the API locally, so that the dev loop is fast.
106. As the developer, I want shared packages used directly from source, so that edits show up instantly without build steps.
107. As the developer, I want lint to fail when a package imports across a forbidden layer, so that the architecture can't erode.
108. As the developer, I want shared Zod contracts between frontend and backend, so that API changes break at compile time instead of in production.
109. As the developer, I want strict TypeScript everywhere, so that whole classes of bugs are caught before running.
110. As the developer, I want CI to lint, type-check, test, build, check the embed bundle size and run end-to-end tests on every PR, so that main always works.
111. As the developer, I want CI to check only the packages affected by a change and to cache results, so that it stays fast.
112. As the developer, I want commit messages checked as Conventional Commits and staged files linted before commit, so that history and code stay clean.
113. As the developer, I want the API to fail at startup when environment variables are missing or invalid, so that misconfiguration is obvious.
114. As the developer, I want every request and log line tagged with a request ID and secrets redacted, so that I can trace problems safely.
115. As the developer, I want consistent error responses with a code, message, details and request ID, so that the frontend can show errors uniformly.
116. As the developer, I want liveness and readiness endpoints and a clean shutdown, so that the API behaves well under a process manager.
117. As the developer, I want a seed command that creates demo workspaces, users for each role and sample forms, so that demos and manual testing are instant.
118. As the developer, I want an ADR for each major decision, so that I can explain the reasoning in interviews.

## Implementation Decisions

### Monorepo and modules

- **Tooling:** pnpm workspaces with Turborepo. The pnpm version is pinned through `packageManager` and the Node version through `.nvmrc` and `engines`. Turborepo tasks: dev, build, lint, typecheck, test, test:e2e.
- **Deployable apps:**
  - **leadhub**: Next.js, the full platform.
  - **formdrop**: Next.js, forms only.
  - **embed**: Vite + React, the iframe form app, plus the small vanilla-TypeScript loader script.
  - **api**: Express 5.
- **Shared packages**, all under the `@repo/*` scope:
  - **contracts**: Zod schemas and TypeScript types shared by the API and the frontend. Holds the form definition, field types, the validation compiler, the permission map, the postMessage protocol and the request and response shapes.
  - **core**: the feature-agnostic frontend base. Holds the UI kit, the API client, React Query setup, the Redux store factory, theming, auth hooks and the `<Can>`/`useCan` permission hints.
  - **form-renderer**: renders a form definition with validation. Shared by the builder preview and the embed.
  - **feature-workspaces**: auth screens, the workspace switcher, members and invites.
  - **feature-forms**: the forms list, the builder, publishing and versions.
  - **feature-submissions**: the submissions table, detail panel and export.
  - **config**: shared TypeScript, ESLint and Prettier presets.
  - **test-utils**: shared test data factories.
- **Source-only internal packages.** Each package's exports point at its TypeScript source. The Next apps compile them through `transpilePackages`, and the API is bundled with tsup, which inlines `contracts`.
- **Layer rules** (enforced by `eslint-plugin-boundaries` in lint):
  - Apps may import feature packages; feature packages may import `core`; `core` may import `contracts`.
  - Feature packages never import each other. If two features need the same thing, it moves into `core`, or they communicate through the API.
  - `core` knows nothing about specific features.
  - The API imports only `contracts`.
  - The embed app imports only `contracts` and `form-renderer`.
  - `form-renderer` never imports `core`.
- **Composition happens at build time.** Each app imports the feature packages it needs and mounts their pages on its own routes. There are no runtime feature flags and no micro frontends.
- **App scope:**
  - FormDrop gets auth, workspaces with roles, the form builder, embedding and submissions.
  - LeadHub gets the same in the MVP, with contacts, chat, analytics and the flow builder added after the MVP.

### Frontend architecture

- **Next.js App Router with thin route files.** Each page only renders a client component from a feature package. All data is fetched in the browser through React Query from the Express API. The Next server holds no business logic and fetches no data.
- **State ownership:**
  - **React Query** owns all server state.
  - **Redux Toolkit** owns only the builder's editor state: the field list, the selected field, undo/redo history and the dirty flag.
  - **Local component state** handles small UI state.
  - A draft is loaded through React Query and copied into the editor store. Auto-save sends the store's state back through a React Query mutation.
  - `core` provides the store factory and query client, and each app builds its store from its features' slices.
- **API client** (in `core`):
  - Attaches the in-memory access token to each request.
  - On a 401, runs one refresh and replays every request that was waiting.
  - Turns the API's error format into a typed error the UI can handle.
- **UI kit:**
  - Tailwind CSS v4 with its own shadcn-style components built on Radix, and variants defined with `cva`.
  - Design tokens are CSS variables. Each app has its own theme: LeadHub indigo with a sidebar, FormDrop teal with top navigation.
  - Dark mode uses `.dark` token overrides.
- **form-renderer** depends only on React, react-hook-form, Zod and `contracts`. It is themed with plain CSS variables from the form's theme settings, with no Tailwind.

### Data model (MongoDB with Mongoose)

- **Models:** User, Workspace, Membership (user + workspace + role), Invitation, Form, FormVersion, Submission, RefreshToken.
- **Form:** belongs to a workspace and holds:
  - one editable draft definition
  - a draft revision counter
  - a pointer to the published version
- **FormVersion:** a numbered, unchangeable snapshot of a definition.
- **Submission:**
  - The workspace, the form and the form version it was made with.
  - The submitted data.
  - Metadata: UTM values, referrer, page URL, user agent and a salted IP hash.
- **Invitation:** workspace, email, role, a hashed token and an expiry 7 days after creation.
- **RefreshToken:** stored only as a hash, grouped by login so that a reuse can revoke the whole group.
- **Indexes:** submissions are indexed on creation time plus ID, for cursor-based paging.
- **Transactions** (which need a replica set, provided by MongoDB Atlas) are used for publishing and for refresh-token rotation.
- **Validation order:** Zod schemas in `contracts` check every API input and output. Mongoose schemas only describe storage.
- **Secrets:** the database connection string and other secrets live only in `.env`. A committed `.env.example` lists the variable names.

### Form definition schema

This shape was settled during the design session:

```ts
FormDefinition {
  schemaVersion: 1,
  fields: Field[],                 // flat, ordered
  settings: { submitLabel, successMessage, redirectUrl?, theme }
}
Field base: { id, key /* unique; the data key */, label, helpText?, required, width: 'full' | 'half', validation? }
Field = discriminated union on `type`:
  text | textarea | email | phone | number | date
  | select | radio | checkbox_group
  | consent | hidden /* source: utm_* | referrer | static */ | heading
```

- **Field registry.** A single registry describes each field type once: its schema, default config, settings panel, renderer and icon.
- **Validation rules are stored as data** on each field, with only the rules that fit its type. Text gets length and pattern, number gets min, max and integer, and checkbox groups get a minimum and maximum number of selections.
- **One validation compiler.** A single function in `contracts` turns a form definition into a Zod submission schema that drops unknown keys. The builder preview, the embed (react-hook-form with zodResolver) and the API all use it.
- **Custom patterns are checked when the form is saved.** A pattern must compile, be at most 200 characters, and pass a guard against patterns that could hang the regex engine.
- **Caching:** the API caches compiled schemas for each form version, which is safe because published versions never change.

### Auth and permissions

- **Passwords** are hashed with argon2.
- **Access token:** a JWT lasting about 15 minutes, kept only in browser memory.
- **Refresh token:** lasts about 7 days and is stored in an httpOnly cookie. It is replaced with a new one on every refresh and stored only as a hash. Reusing an old one revokes every token from that login.
- **Roles** are set per membership: Owner, Admin, Editor and Viewer.
- **Permissions:** form:read, form:create, form:edit, form:publish, form:delete, submission:read, submission:export, member:manage, workspace:delete.
- **Role → permission map** (fixed in `contracts`):

| Role | Permissions |
|---|---|
| Owner | All of them. |
| Admin | All except workspace:delete. |
| Editor | form:read, form:create, form:edit (drafts), submission:read, submission:export. |
| Viewer | form:read, submission:read. |

- **Enforcement:** API middleware checks workspace membership, then the required permission. The UI's `<Can>` and `useCan` only hide or disable controls.
- **Membership safety rules:**
  - The last Owner can't be removed or demoted.
  - Only an Owner can make someone an Owner.
  - Nobody can change their own role.
- **Workspace URLs:** dashboard pages live under the workspace ID. API routes for a workspace live under that workspace's path.

### Drafts, auto-save and publishing

- **Auto-save** runs 1 second after the last edit. Only one save is in flight at a time, and edits made meanwhile are combined into the next save. The UI shows a status indicator, and failed saves are retried with increasing delays.
- **Forced saves and guards:** Ctrl+S and leaving the builder save immediately. The browser warns before closing with unsaved changes.
- **Conflict detection:** saving a draft sends the revision it started from. The API updates only if the stored revision still matches. Otherwise it responds 409 with the current draft, auto-save pauses, and the user chooses to load the server version or overwrite it.
- **No live co-editing.**
- **Publishing** runs in a transaction. It creates the next unchangeable FormVersion from the draft and points the form at it.
- **Rollback** re-publishes an old version's definition as a new version.
- **"Unpublished changes"** is shown when the draft differs from the published version.

### Builder interaction

- **Layout:** three panels (palette, canvas, settings) and a top bar (name, save status, undo/redo, Preview, Versions, Publish).
- **Drag and drop with dnd-kit:**
  - One `DndContext` handles both adding from the palette and reordering on the canvas.
  - The canvas is a sortable list, and a drag overlay shows the dragged item.
  - Keyboard dragging and screen-reader announcements are on.
  - Each drop dispatches exactly one store action, so it's one undo step.
- **Shortcuts:** undo, redo, save and delete.
- **Preview** at desktop and mobile widths uses form-renderer.
- **Viewers** see the builder read-only.

### Embed

- **The snippet** is a placeholder element carrying the form ID, plus an async script tag for the loader.
- **The loader** (about 3 KB, vanilla TypeScript) finds each placeholder, creates an iframe pointing at the embed app's form route, and exposes `window.FormDrop.on(event, callback)`.
- **The embed app** fetches the published definition from a public endpoint and renders it with form-renderer.
- **The postMessage protocol** is defined with Zod schemas in `contracts`:
  - **Host page → iframe:** `fd:init` carrying UTM values, referrer and page URL.
  - **Iframe → host page:** `fd:ready`, `fd:resize` (height measured with a ResizeObserver), `fd:submitted`, `fd:redirect` and `fd:error`.
- **Origin checks:** both sides check the other's origin and never use a wildcard target.
- **Allowed domains:** an optional list per form, checked softly.
- **Size budget:** the embed bundle must stay under 60 KB gzipped, enforced by size-limit in CI.

### Public submissions API

- **Endpoints:** a public endpoint returns a form's published definition. A public endpoint accepts submissions.
- **Submission responses:**
  - 404 if the form is unpublished.
  - 422 with per-field errors if the data fails the published version's compiled schema.
  - 201 on success.
- **Abuse protection:**
  - Rate limit per IP and form.
  - 32 KB request size limit.
  - A honeypot field; submissions that fill it are dropped silently.
  - A minimum fill time of about 2 seconds.
- **CORS:** public routes allow only the embed origin, and logged-in routes allow only the dashboard origins.
- **Dashboard endpoints:**
  - Cursor-paged submission lists.
  - Submission detail.
  - Streaming CSV export, which requires submission:export.
  - Table columns are every field key across all the form's versions.

### API structure

- **App and server are separate.** The app factory never listens, so tests can use it directly. A separate server entry connects to the database, listens and shuts down cleanly on SIGTERM.
- **Environment variables** are checked with Zod at startup.
- **Middleware:** request ID, authentication, membership, permission, Zod validation, rate limiting, helmet and a central error handler.
- **Modules** are organised per feature into routes, controller, service and model. Services know nothing about Express.
- **Errors** come from an application error hierarchy and are always returned in one shape: code, message, optional details and request ID.
- **Logging** uses pino with the request ID on every line and secrets redacted.
- **Health endpoints:** a liveness endpoint and a readiness endpoint that checks the database.

### Tooling and CI

- **Shared config package:**
  - Strict TypeScript, including no-unchecked-indexed-access.
  - ESLint flat-config presets, including the boundary rules.
  - Prettier.
- **Type checking** runs `tsc --noEmit` in each package.
- **Local ports:** leadhub 3000, formdrop 3001, embed 5173, api 4000, plus a static test page that hosts the embed.
- **Seed command:** creates demo workspaces, users for each role and sample forms.
- **Git hooks:** Husky with lint-staged, and commitlint enforcing Conventional Commits.
- **GitHub Actions CI** runs on every PR: lint → typecheck → test → build → size-limit → Playwright. It checks only affected packages and caches pnpm downloads. CI runs checks only and doesn't deploy in the MVP.

### Build order

The MVP is built in vertical slices. After each step the user reviews it, then it is committed and gets an ADR.

0. Foundation
1. Contracts (TDD)
2. API skeleton and auth (TDD)
3. Workspaces and RBAC (TDD)
4. Core frontend and both app shells
5. Forms API (TDD)
6. form-renderer
7. Builder UI
8. Embed
9. Submissions. The MVP is complete after this step.
10. Hardening: end-to-end tests, seed data, README, ADRs

## Testing Decisions

### What makes a good test

- **Test external behaviour through public interfaces only.** A test should survive a refactor that doesn't change behaviour.
- **Don't mock our own code.** Only true external boundaries are replaced: MSW stands in for the HTTP API in component tests, and an in-memory MongoDB stands in for Atlas.
- **Prefer the highest seam** that can show the behaviour.
- **Build test data with the shared factories** in the test-utils package, not with hand-written fixtures.
- **Test-first (red → green → refactor)** for `contracts` and the API.
- **Turborepo caches test results.**

### Seams

1. **The API over HTTP (main seam).** Supertest calls the in-process app, backed by an in-memory MongoDB replica set so transactions work. Covers:
   - signup, login, logout and refresh, including token rotation and reuse detection
   - membership and permission checks (403)
   - invite flows and the Owner safety rules
   - tenant isolation: workspace A can never read workspace B
   - saving drafts with a matching revision and the 409 conflict
   - publishing as all-or-nothing, and rollback
   - the public definition endpoint returning only published versions
   - public submissions: 404, 422 with per-field errors, 201, rate limiting, honeypot, minimum fill time and size limit
   - cursor paging, and CSV export permission and content

   Services and models are tested through this seam only.
2. **The public functions of `contracts`.** Unit tests for:
   - the validation compiler: each rule type, required fields, dropping unknown keys, and the regex guard
   - form definition parsing: valid and invalid shapes, and unique keys
   - the postMessage protocol schemas
   - the role → permission map
3. **Feature components** (React Testing Library with MSW). Only the UI behaviour the API can't show:
   - builder interactions such as adding, reordering, selecting and editing fields, with keyboard alternatives
   - auto-save combining edits, tested with fake timers through the store's public actions
   - the 409 conflict dialog
   - undo and redo
   - hiding and disabling controls by permission
   - form-renderer validation messages and submit behaviour
4. **The browser** (Playwright, 2–3 flows):
   - build a form → publish → embed it on the static test page → submit → see the submission in the dashboard table
   - a Viewer sees the builder read-only

### Prior art

The repo has no code yet. The first tests written in Step 1 (`contracts`) and Step 2 (API with Supertest) become the patterns that later steps follow.

## Out of Scope

- **LeadHub-only modules:** contacts with the query builder and virtualization, real-time chat over Socket.io, analytics dashboards and the flow builder. Each gets its own design session after the MVP.
- **Deployment and hosting**, including S3/CloudFront for the embed, Node hosting for the apps and API, and CI deploy jobs. Decided after the MVP.
- **Account features:** email sending of any kind, so no email verification, password reset or invite emails. Also OAuth and single sign-on.
- **Custom roles** or per-resource permissions.
- **Live co-editing** (CRDTs or Yjs) and live presence.
- **Advanced form features:** sections, multi-step forms, multi-column rows, conditional logic and templates.
- **Spam and integrations:** CAPTCHA, webhooks and integrations.
- **Submission tools:** filtering, search and virtualization (these come with Contacts).
- **Storybook**, which comes after the MVP.
- **Server-side data fetching** in Next.js (React Server Components).

## Further Notes

- **Purpose.** The project exists so that every resume bullet maps to real, explainable code. ADRs written after each build step double as interview notes, and several decisions were made partly for their value as interview answers:
  - build-time composition instead of micro frontends
  - client-side React Query instead of Server Components
  - an in-memory access token with a rotating httpOnly refresh token
- **Database.** MongoDB was chosen over PostgreSQL. Transactions therefore depend on a replica set, both in Atlas and in tests.
- **Issue tracking.** Issues for this work live in GitHub Issues on the public repo shreeramnage/fullstack-monorepo. Each build step is meant to become one ticket.
