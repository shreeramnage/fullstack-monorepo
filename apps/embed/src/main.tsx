import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { hello } from "@repo/contracts";

const root = document.getElementById("root");
if (root) {
  createRoot(root).render(
    <StrictMode>
      <h1>{hello("embed")}</h1>
    </StrictMode>,
  );
}
