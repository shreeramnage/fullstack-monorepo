/** Placeholder proving the contracts wiring; real schemas arrive in later tickets. */
export const APP_NAMES = ["leadhub", "formdrop", "embed", "api"] as const;
export type AppName = (typeof APP_NAMES)[number];

export function hello(app: AppName): string {
  return `Hello from ${app} (via @repo/contracts)`;
}
