import type { Metadata } from "next";

const SITE_NAME = "UniReg";

export type PortalRole = "Admin" | "Lecturer" | "Student";

export type PageSeoEntry = {
  title: string;
  description: string;
  path: string;
};

function portalSuffix(portal: PortalRole): string {
  if (portal === "Admin") return `${SITE_NAME} Admin`;
  if (portal === "Lecturer") return `${SITE_NAME} Lecturer`;
  return `${SITE_NAME} Student`;
}

export function createSiteMetadata(): Metadata {
  return {
    title: {
      default: SITE_NAME,
      template: `%s | ${SITE_NAME}`,
    },
    description: "University course registration and result management system.",
    applicationName: SITE_NAME,
    robots: {
      index: false,
      follow: false,
    },
  };
}

export function createAuthMetadata({
  title,
  description,
}: PageSeoEntry): Metadata {
  return {
    title: {
      absolute: `${title} | ${SITE_NAME}`,
    },
    description,
    robots: {
      index: false,
      follow: false,
    },
  };
}

export function createPortalMetadata(
  entry: PageSeoEntry,
  portal: PortalRole,
): Metadata {
  const resolvedTitle = `${entry.title} | ${portalSuffix(portal)}`;

  return {
    title: {
      absolute: resolvedTitle,
    },
    description: entry.description,
    alternates: {
      canonical: entry.path,
    },
    robots: {
      index: false,
      follow: false,
    },
  };
}
