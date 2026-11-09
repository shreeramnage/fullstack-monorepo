import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import boundaries from "eslint-plugin-boundaries";
import globals from "globals";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

/**
 * Layer rules (see docs/adr/0001):
 *   app -> feature -> core -> contracts
 *   no feature -> feature, api -> contracts only,
 *   embed -> contracts + form-renderer, form-renderer never -> core.
 */
export const boundaryElements = [
  { type: "app", pattern: ["apps/leadhub", "apps/formdrop"] },
  { type: "api", pattern: "apps/api" },
  { type: "embed", pattern: "apps/embed" },
  { type: "feature", pattern: "packages/feature-*", capture: ["name"] },
  { type: "form-renderer", pattern: "packages/form-renderer" },
  { type: "core", pattern: "packages/core" },
  { type: "contracts", pattern: "packages/contracts" },
  { type: "test-utils", pattern: "packages/test-utils" },
];

const allow = (from, ...to) => ({
  from: { element: { type: from } },
  allow: { to: { element: { type: to } } },
});

export const boundaryPolicies = [
  allow("app", "feature", "form-renderer", "core", "contracts"),
  allow("feature", "form-renderer", "core", "contracts"),
  allow("core", "contracts"),
  allow("form-renderer", "contracts"),
  allow("api", "contracts"),
  allow("embed", "contracts", "form-renderer"),
  allow("test-utils", "contracts"),
];

export default tseslint.config(
  {
    ignores: [
      "**/node_modules/**",
      "**/.next/**",
      "**/dist/**",
      "**/.turbo/**",
      "**/next-env.d.ts",
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    languageOptions: { globals: { ...globals.node, ...globals.browser } },
    plugins: { boundaries },
    settings: {
      "boundaries/root-path": repoRoot,
      "boundaries/elements": boundaryElements,
      "import/resolver": {
        typescript: {
          alwaysTryTypes: true,
          noWarnOnMultipleProjects: true,
          project: [
            path.join(repoRoot, "apps/*/tsconfig.json"),
            path.join(repoRoot, "packages/*/tsconfig.json"),
          ],
        },
      },
    },
    rules: {
      "boundaries/dependencies": ["error", { default: "disallow", policies: boundaryPolicies }],
      "@typescript-eslint/consistent-type-imports": "error",
    },
  },
);
