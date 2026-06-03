// Routes configuration
export const ROUTES = {
  NAV_LINKS: {
    PROGRAMAS: "/#programas",
    DESTINOS: {
      TODOS: "/idiomas/#destinos",
      ESTUDIA_Y_TRABAJA: {
        DUBAI: "/dubai",
        IRLANDA: "/irlanda",
        AUSTRALIA: "/idiomas/australia",
        MALTA: "/idiomas/malta",
        NEW_ZEALAND: "/idiomas/nueva-zelanda",
        CANADA: "/idiomas/canada",
      },
      PARA_APRENDER_FRANCES: {
        FRANCIA: "/francia",
        CANADA: "/idiomas/canada",
      },
      PARA_APRENDER_ALEMAN: "/idiomas/alemania",
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
    TERMINOS_Y_CONDICIONES: "#",
    POLITICA_DE_PRIVACIDAD: "#",
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
        NEW_ZEALAND: true,
        CANADA: true,
      },
      PARA_APRENDER_FRANCES: {
        FRANCIA: false,
        CANADA: true,
      },
      PARA_APRENDER_ALEMAN: true,
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
  // If not migrated, prepend to whatsapp link as backup
  return isMigrated
    ? path
    : "https://wa.me/573183795288?text=Hola%20Top%2C%20quiero%20saber%20m%C3%A1s%20sobre%20este%20programa%3A%20" +
        encodeURIComponent(path);
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
