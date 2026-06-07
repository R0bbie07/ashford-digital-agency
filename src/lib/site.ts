// Central place for business details and config used across the site.

export const SITE = {
  name: "Ashford Digital",
  tagline: "Websites that win work for UK trades.",
  email: "ashforddigital10@gmail.com",
  // Set these in your environment / Cloudflare Pages project settings.
  // Create them as Stripe Payment Links in your Stripe dashboard.
  stripeStandardLink:
    import.meta.env.VITE_STRIPE_STANDARD_LINK ||
    "https://buy.stripe.com/test_standard_placeholder",
  stripeProLink:
    import.meta.env.VITE_STRIPE_PRO_LINK ||
    "https://buy.stripe.com/test_pro_placeholder",
} as const;

export type PlanId = "Standard" | "Pro";

export interface Plan {
  id: PlanId;
  price: number;
  cadence: string;
  blurb: string;
  features: string[];
  highlighted?: boolean;
}

export const PLANS: Plan[] = [
  {
    id: "Standard",
    price: 80,
    cadence: "/month",
    blurb: "Everything you need to look professional online and get found.",
    features: [
      "Custom professional website",
      "Fast Cloudflare Pages hosting",
      "Domain management (DNS handled for you)",
      "Ongoing updates whenever you need them",
      "Mobile-first, loads in under a second",
      "SSL & security included",
    ],
  },
  {
    id: "Pro",
    price: 120,
    cadence: "/month",
    blurb: "Get found on Google and turn local searches into phone calls.",
    highlighted: true,
    features: [
      "Everything in Standard",
      "Google Business Profile set-up",
      "Local SEO: meta titles & descriptions",
      "Consistent NAP across the web",
      "Optimised to rank in your local area",
      "Priority support",
    ],
  },
];

export const TRADES = [
  "Electrician",
  "Plumber",
  "Gas Engineer",
  "Builder",
  "Heating Engineer",
  "Carpenter / Joiner",
  "Roofer",
  "Plasterer",
  "Landscaper / Gardener",
  "Painter & Decorator",
  "Tiler",
  "Bricklayer",
  "Other",
] as const;
