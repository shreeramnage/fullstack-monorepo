import { greet } from "@repo/core";

export default function Page() {
  return (
    <main>
      <h1>{greet("formdrop")}</h1>
    </main>
  );
}
