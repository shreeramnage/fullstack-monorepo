import express from "express";
import { hello } from "@repo/contracts";

/** App factory: never listens, so tests can use it directly. */
export function createApp() {
  const app = express();
  app.get("/", (_req, res) => {
    res.json({ message: hello("api") });
  });
  return app;
}
