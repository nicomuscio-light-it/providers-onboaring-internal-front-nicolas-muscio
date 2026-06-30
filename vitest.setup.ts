import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

// `@testing-library/react` does not auto-clean without globals enabled, so the
// rendered tree is torn down after every test to keep them isolated.
afterEach(() => {
  cleanup();
});
