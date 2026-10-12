// Central place for business details and config used across the site.
// Edit this file to change contact details, prices or plan contents.

export const SITE = {
  name: "Ashford Digital",
  url: "https://ashforddigital.uk",
  tagline: "Websites that get local businesses more customers.",
  email: "ashforddigital10@gmail.com",
  town: "Gainsborough",
  county: "Lincolnshire",

  // ---------------------------------------------------------------------
  // ⚠️ ENTER YOUR NUMBERS HERE. Leave as "" to hide the buttons that use them.
  // phone:    shown as the "Call" button, e.g. "07123 456789"
  // whatsapp: international format, digits only, e.g. "447123456789"
  //           (opens a WhatsApp chat the visitor starts themselves; nothing
  //           is sent automatically)
  // ---------------------------------------------------------------------
  phone: "07359200526",
  whatsapp: "447359200526",

  // Founding Pro price is open until 5 Pro clients have signed up.
  // true  = site shows £59 and uses the £59 Stripe link.
  // false = site shows £89 and uses the £89 Stripe link (stripeProFullLink).
  foundingProOpen: true,

  // Stripe Payment Links (public links, safe to keep here). A Cloudflare
  // VITE_STRIPE_* variable overrides the link if one is set.
  stripeStarterLink:
    import.meta.env.VITE_STRIPE_STARTER_LINK ||
    "https://buy.stripe.com/fZubJ13Hqau63Nt66A2sM02", // £29
  stripeStandardLink:
    import.meta.env.VITE_STRIPE_STANDARD_LINK ||
    "https://buy.stripe.com/5kQfZhguceKm1FlamQ2sM03", // £49
  // Pro uses the founding link while foundingProOpen is true, then the full one.
  stripeProFoundingLink:
    import.meta.env.VITE_STRIPE_PRO_LINK ||
    "https://buy.stripe.com/dRm5kDem4gSucjZ3Ys2sM04", // £59, limited to 5 in Stripe
  stripeProFullLink:
    import.meta.env.VITE_STRIPE_PRO_FULL_LINK ||
    "https://buy.stripe.com/fZu14ncdW7hU6ZF7aE2sM05", // £89
} as const;

export const telHref = (n: string) => `tel:${n.replace(/[^\d+]/g, "")}`;
export const waHref = (n: string, text = "Hi Robbie, I'd like to ask about a website.") =>
  `https://wa.me/${n.replace(/\D/g, "")}?text=${encodeURIComponent(text)}`;

export type PlanId = "Starter" | "Standard" | "Pro";

export interface Plan {
  id: PlanId;
  price: number;
  /** Founding price, shown while SITE.foundingProOpen is true. */
  foundingPrice?: number;
  forWho: string;
  townPages: number;
  features: string[];
  highlighted?: boolean;
}

/** What every plan includes. */
export const ALL_PLANS_INCLUDE = [
  "5-page website built for phones first",
  "Hosting, security and updates",
  "Call button that stays on screen",
  "Your demo built before you pay",
  "Dashboard showing every enquiry",
];

export const PLANS: Plan[] = [
  {
    id: "Starter",
    price: 29,
    forWho: "Get online properly and look the part.",
    townPages: 1,
    features: [
      "5-page site with hosting and updates",
      "Call button and enquiry dashboard",
      "1 town page with local content",
    ],
  },
  {
    id: "Standard",
    price: 49,
    forWho: "Turn more visitors into enquiries.",
    townPages: 3,
    features: [
      "Everything in Starter",
      "3 town pages with local content",
      "Missed calls logged in your dashboard",
      "Photo quote form: photos and postcode become a job brief",
      "Automatic review requests to your customers",
    ],
  },
  {
    id: "Pro",
    price: 89,
    foundingPrice: 59,
    forWho: "We go out and find you work.",
    townPages: 10,
    highlighted: true,
    features: [
      "Everything in Standard",
      "10 town pages with local content",
      "The Customer Engine (see below)",
      "Leads-by-source dashboard",
      "60-day results guarantee",
    ],
  },
];

export const planPrice = (p: Plan) =>
  SITE.foundingProOpen && p.foundingPrice ? p.foundingPrice : p.price;

/** The four parts of the Customer Engine (Pro). */
export const CUSTOMER_ENGINE = [
  {
    title: "Ads that switch on when people need you",
    text: "Google ads timed to local weather, seasons and events, like a cold snap for boiler repairs. You set a monthly spend cap and pay Google directly.",
  },
  {
    title: "Past customers, back again",
    text: "Reminders to people you've already worked for when something is due, like a boiler service, gas safety check or PAT test.",
  },
  {
    title: "Referrals you can track",
    text: "Each customer gets their own referral code, so you can see who sent work your way and thank them.",
  },
  {
    title: "Introductions to local partners",
    text: "We contact letting agents and builders near you who regularly need your kind of work.",
  },
];

export const GUARANTEE = {
  short: "Your first tracked enquiry within 60 days of going live, or 3 months free.",
  terms: [
    "You answer your calls and reply to enquiries.",
    "You send us your photos and list of services.",
    "Your site has been live for 60 days.",
    "The Customer Engine is switched on.",
  ],
};

export const BUSINESS_TYPES = [
  "Electrician",
  "Plumber",
  "Gas engineer",
  "Builder",
  "Heating engineer",
  "Carpenter / joiner",
  "Roofer",
  "Plasterer",
  "Landscaper / gardener",
  "Painter & decorator",
  "Cleaner",
  "Hair & beauty",
  "Café / food",
  "Shop / retail",
  "Other",
] as const;
