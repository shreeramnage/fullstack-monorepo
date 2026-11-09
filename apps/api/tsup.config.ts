import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/server.ts"],
  format: ["esm"],
  platform: "node",
  target: "node20",
  clean: true,
  // Source-only workspace packages must be inlined into the bundle.
  noExternal: [/^@repo\//],
});
