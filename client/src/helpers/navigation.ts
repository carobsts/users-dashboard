import { createNavigationConfig } from "next-safe-navigation";

export const { routes, useSafeParams, useSafeSearchParams } =
  createNavigationConfig((defineRoute) => ({
    dashboard: defineRoute("/dashboard"),
  }));
