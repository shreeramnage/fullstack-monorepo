import { hello, type AppName } from "@repo/contracts";

/** Placeholder: core re-exposes a contracts helper so apps prove the app -> core -> contracts chain. */
export function greet(app: AppName): string {
  return hello(app);
}
