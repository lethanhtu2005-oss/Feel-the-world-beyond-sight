import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
const base = fileURLToPath(new URL("../", import.meta.url));
test("TNV help center button routes to the existing /help page", () => {
  const source = readFileSync(path.join(base, "app/volunteer/page.jsx"), "utf8");
  assert.match(source, /href="\/help"/);
  assert.doesNotMatch(source, /href="\/help-center"/);
  assert.ok(existsSync(path.join(base, "app/help/page.jsx")));
});
