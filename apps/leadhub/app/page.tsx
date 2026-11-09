import { greet } from "@repo/core";

export default function Page() {
  return (
    <main>
      <h1>{greet("leadhub")}</h1>
    </main>
  );
}
