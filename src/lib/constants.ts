const BACKUP_URL = "https://content.wearetop.co";

// Routes configuration
export const ROUTES = {
  WEARETOP: BACKUP_URL,
  NAV_LINKS: {
    PROGRAMAS: "/#programas",
    DESTINOS: {
      TODOS: "/idiomas/#destinos",
      ESTUDIA_Y_TRABAJA: {
        DUBAI: "/dubai",
        IRLANDA: "/irlanda",
        AUSTRALIA: "/idiomas/australia",
        MALTA: "/idiomas/malta",
        NEW_ZEALAND: "/newzealand",
        CANADA: "/canada",
      },
      PARA_APRENDER_FRANCES: {
        FRANCIA: "/francia",
        CANADA: "/canada",
      },
      PARA_APRENDER_ALEMAN: "/para-aprender-aleman",
      PARA_APRENDER_ITALIANO: "/para-aprender-italiano",
    },
    SEGUROS_DE_VIAJE: "/seguros-de-viaje",
  },
  SOCIALS: {
    INSTAGRAM: "https://www.instagram.com/wearetop.co/",
    LINKEDIN: "https://co.linkedin.com/company/we-are-top",
    FACEBOOK: "https://www.facebook.com/wearetop.co",
    YOUTUBE: "https://www.youtube.com/@wearetopco",
  },
  FOOTER: {
    TERMINOS_Y_CONDICIONES: "https://content.wearetop.co/terminosycondiciones",
    POLITICA_DE_PRIVACIDAD:
      "https://content.wearetop.co/politica-de-proteccion-de-datos",
  },
} as const;

// Migration status: mark routes that are already migrated to Astro
// Set to true when the page is ready in the new site
export const MIGRATED_ROUTES = {
  NAV_LINKS: {
    PROGRAMAS: true,
    DESTINOS: {
      TODOS: true,
      ESTUDIA_Y_TRABAJA: {
        DUBAI: false,
        IRLANDA: false,
        AUSTRALIA: true,
        MALTA: true,
        NEW_ZEALAND: false,
        CANADA: false,
      },
      PARA_APRENDER_FRANCES: {
        FRANCIA: false,
        CANADA: false,
      },
      PARA_APRENDER_ALEMAN: false,
      PARA_APRENDER_ITALIANO: false,
    },
    SEGUROS_DE_VIAJE: true,
  },
} as const;

/**
 * Resolves a route path based on migration status
 * @param path - The route path
 * @param isMigrated - Whether the route has been migrated to Astro
 * @returns The full URL (backup or new site)
 */
export function resolveRoute(
  path: string,
  isMigrated: boolean = false,
): string {
  // Handle hash links (always local)
  if (path.startsWith("/#")) {
    return path;
  }

  // Handle external URLs (return as-is)
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  // If migrated, use relative path for Astro
  // If not migrated, prepend backup URL
  return isMigrated ? path : `${BACKUP_URL}${path}`;
}

/**
 * Gets migration status for a nested route
 * @param keys - Array of keys to traverse the MIGRATED_ROUTES object
 * @returns boolean indicating if the route is migrated
 */
export function isMigrated(...keys: string[]): boolean {
  let current: any = MIGRATED_ROUTES;

  for (const key of keys) {
    if (current[key] === undefined) {
      return false; // Default to not migrated if not found
    }
    current = current[key];
  }

  return typeof current === "boolean" ? current : false;
}

/**
 * Helper to get the resolved route for NAV_LINKS
 */
export function getNavRoute(path: string, ...keys: string[]): string {
  return resolveRoute(path, isMigrated("NAV_LINKS", ...keys));
}
