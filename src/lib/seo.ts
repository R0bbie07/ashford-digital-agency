// Page titles, descriptions and structured data (schema) for every route.
// Used by the build-time prerender (scripts/prerender.mjs) and by the
// browser when moving between pages.
import { FAQS } from "./content";
import { PLANS, SITE, planPrice } from "./site";

export interface RouteMeta {
  path: string;
  title: string;
  description: string;
  /** Leave out of the sitemap and ask search engines not to index. */
  noindex?: boolean;
  schema?: Record<string, unknown>[];
}

const abs = (p: string) => `${SITE.url}${p === "/" ? "/" : p}`;

const business = {
  "@type": "ProfessionalService",
  "@id": `${SITE.url}/#business`,
  name: SITE.name,
  url: SITE.url,
  logo: `${SITE.url}/icon-512.png`,
  image: `${SITE.url}/og-image.png`,
  email: SITE.email,
  ...(SITE.phone ? { telephone: SITE.phone } : {}),
  description:
    "Monthly website plans for UK small businesses, with a free demo built before you pay and an optional system for finding new customers.",
  address: {
    "@type": "PostalAddress",
    addressLocality: SITE.town,
    addressRegion: SITE.county,
    addressCountry: "GB",
  },
  areaServed: { "@type": "Country", name: "United Kingdom" },
  priceRange: "£29–£89 per month",
};

const organization = {
  "@type": "Organization",
  "@id": `${SITE.url}/#organization`,
  name: SITE.name,
  url: SITE.url,
  logo: `${SITE.url}/icon-512.png`,
  email: SITE.email,
};

const website = {
  "@type": "WebSite",
  "@id": `${SITE.url}/#website`,
  name: SITE.name,
  url: SITE.url,
  inLanguage: "en-GB",
  publisher: { "@id": `${SITE.url}/#organization` },
};

const faqPage = {
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const service = {
  "@type": "Service",
  name: "Website and customer-finding plans",
  provider: { "@id": `${SITE.url}/#business` },
  areaServed: { "@type": "Country", name: "United Kingdom" },
  offers: PLANS.map((p) => ({
    "@type": "Offer",
    name: `${p.id} plan`,
    price: planPrice(p).toFixed(2),
    priceCurrency: "GBP",
    description: p.forWho,
    url: abs("/pricing"),
  })),
};

export const ROUTES: RouteMeta[] = [
  {
    path: "/",
    title: "Websites for Local Businesses, from £29/month | Ashford Digital",
    description:
      "Monthly websites for UK small businesses. We build your demo first, free. Plans from £29 a month, and Pro adds the Customer Engine with a 60-day guarantee.",
    schema: [organization, website, business],
  },
  {
    path: "/pricing",
    title: "Pricing: Starter £29, Standard £49, Pro £89 | Ashford Digital",
    description:
      "Simple monthly website plans with no setup fee. Starter £29, Standard £49, Pro £89 (£59 for the first 5 Pro clients). See your site before you pay.",
    schema: [business, service],
  },
  {
    path: "/how-it-works",
    title: "How It Works: See Your Site, Then Decide | Ashford Digital",
    description:
      "Four steps: ask for your free demo, see your site, choose a monthly plan, and we keep it running and bringing in enquiries.",
    schema: [business],
  },
  {
    path: "/see-your-site-first",
    title: "See Your New Website Before You Pay | Ashford Digital",
    description:
      "Tell us your business name and town. We'll build a private demo of your new website from your Google listing, free, before you pay anything.",
    schema: [business],
  },
  {
    path: "/examples",
    title: "Example Website Designs (Demo Sites) | Ashford Digital",
    description:
      "Demo websites for made-up local businesses, showing the style, layout and features your site could have. Clearly labelled demos, not client work.",
  },
  {
    path: "/about",
    title: "About: A One-Person Web Business in Gainsborough | Ashford Digital",
    description:
      "Ashford Digital is run by Robbie in Gainsborough, Lincolnshire. Honest monthly prices, demos before you pay, and no made-up reviews.",
    schema: [business],
  },
  {
    path: "/faq",
    title: "Questions About Our Website Plans, Answered | Ashford Digital",
    description:
      "Straight answers about price, contracts, the free demo, Google ads, domains and the Pro 60-day guarantee.",
    schema: [faqPage],
  },
  {
    path: "/contact",
    title: "Contact Ashford Digital",
    description:
      "Email Ashford Digital in Gainsborough, Lincolnshire, or ask for your free website demo.",
    schema: [business],
  },
  {
    path: "/terms",
    title: "Terms & Conditions | Ashford Digital",
    description: "Terms and conditions for Ashford Digital website plans.",
  },
  {
    path: "/onboarding",
    title: "Set Up Your Website | Ashford Digital",
    description: "Send us your business details to start your Ashford Digital website.",
    noindex: true,
  },
];

export const NOT_FOUND: RouteMeta = {
  path: "/404",
  title: "Page not found | Ashford Digital",
  description: "That page doesn't exist.",
  noindex: true,
};

export const metaFor = (path: string): RouteMeta =>
  ROUTES.find((r) => r.path === path) ?? NOT_FOUND;

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** <head> tags for a route. Used at build time. */
export function headFor(r: RouteMeta): string {
  const url = abs(r.path);
  const tags = [
    `<title>${esc(r.title)}</title>`,
    `<meta name="description" content="${esc(r.description)}" />`,
    r.noindex
      ? `<meta name="robots" content="noindex" />`
      : `<link rel="canonical" href="${url}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${SITE.name}" />`,
    `<meta property="og:locale" content="en_GB" />`,
    `<meta property="og:title" content="${esc(r.title)}" />`,
    `<meta property="og:description" content="${esc(r.description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${SITE.url}/og-image.png" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="Ashford Digital: websites that get local businesses more customers" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
  ];
  if (r.schema?.length) {
    const json = JSON.stringify({ "@context": "https://schema.org", "@graph": r.schema });
    tags.push(`<script type="application/ld+json">${json.replace(/</g, "\\u003c")}</script>`);
  }
  return tags.join("\n    ");
}
