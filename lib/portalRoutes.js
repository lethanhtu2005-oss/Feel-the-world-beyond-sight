// Keep the partner & internal portal environments independent of the traveler shell.
// Exact prefix match prevents /partner-* and unrelated routes being hidden.
export const INTERNAL_PORTAL_PREFIXES = [
  "/admin",
  "/internal",
  "/staff",
  "/partner",
  "/business",
  "/guide",
  "/volunteer"
];

export function isInternalPortalPath(pathname = "") {
  return INTERNAL_PORTAL_PREFIXES.some(prefix => pathname === prefix || pathname.startsWith(prefix + "/"));
}
