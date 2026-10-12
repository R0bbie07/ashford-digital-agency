import { Phone } from "./Icons";

export interface MockSite {
  business: string;
  trade: string;
  town: string;
  colour: string;
  /** Text colour that is readable on `colour`. */
  onColour: string;
  headline: string;
  services: string[];
}

/**
 * A phone-sized preview of a demo site, drawn in HTML/CSS (no images, so it is
 * light and sharp). Always shown with a visible "Demo" label.
 */
export default function SiteMock({ site, label = "Demo site" }: { site: MockSite; label?: string }) {
  return (
    <figure className="relative mx-auto w-full max-w-[290px]">
      <div className="rounded-[2.4rem] border border-line-2 bg-[#05070a] p-2.5 shadow-[0_40px_80px_-40px_rgba(0,0,0,0.9)]">
        <div className="relative overflow-hidden rounded-[1.9rem] bg-[#f7f6f2] text-[#14171c]" aria-hidden>
          {/* status bar */}
          <div className="flex justify-center pt-2">
            <span className="h-5 w-24 rounded-full bg-[#05070a]" />
          </div>
          {/* site header */}
          <div className="flex items-center justify-between px-4 pt-3">
            <span className="text-[0.8rem] font-extrabold tracking-tight">{site.business}</span>
            <span className="space-y-1">
              <span className="block h-0.5 w-4 bg-[#14171c]" />
              <span className="block h-0.5 w-4 bg-[#14171c]" />
            </span>
          </div>
          {/* hero */}
          <div className="mx-3 mt-3 rounded-2xl p-4" style={{ background: site.colour, color: site.onColour }}>
            <p className="text-[0.62rem] font-bold uppercase tracking-wider opacity-80">
              {site.trade} · {site.town}
            </p>
            <p className="mt-1.5 font-display text-[1.15rem] font-extrabold leading-tight">{site.headline}</p>
            <span
              className="mt-3 inline-block rounded-lg px-3 py-1.5 text-[0.65rem] font-bold"
              style={{ background: site.onColour, color: site.colour }}
            >
              Get a free quote
            </span>
          </div>
          {/* services */}
          <div className="grid grid-cols-2 gap-2 px-3 pt-3">
            {site.services.map((s) => (
              <span key={s} className="rounded-xl bg-white px-2.5 py-2.5 text-[0.62rem] font-semibold shadow-sm">
                {s}
              </span>
            ))}
          </div>
          {/* photo quote strip */}
          <div className="mx-3 mt-3 rounded-xl border border-dashed border-[#c9c6bd] px-3 py-3 text-[0.6rem] text-[#555]">
            Send a photo + postcode for a quote
          </div>
          {/* pinned call button */}
          <div className="sticky bottom-0 mt-4 bg-[#f7f6f2] px-3 pb-4 pt-2">
            <span
              className="flex items-center justify-center gap-1.5 rounded-xl py-2.5 text-[0.72rem] font-bold"
              style={{ background: "#14171c", color: "#fff" }}
            >
              <Phone width={13} height={13} /> Call now
            </span>
          </div>
        </div>
      </div>
      <figcaption className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-line-2 bg-ink px-3 py-1 text-xs font-semibold text-cloud">
        {label}
      </figcaption>
    </figure>
  );
}

/** Made-up businesses used only to show the style. Not real clients. */
export const DEMO_SITES: MockSite[] = [
  {
    business: "Volt & Co Electrical",
    trade: "Electrician",
    town: "Gainsborough",
    colour: "#f6c90e",
    onColour: "#15130a",
    headline: "Fuse boards, rewires and EV chargers.",
    services: ["Fuse boards", "Rewires", "EV chargers", "Landlord checks"],
  },
  {
    business: "Clearflow Plumbing",
    trade: "Plumber",
    town: "Lincoln",
    colour: "#1d5fd6",
    onColour: "#ffffff",
    headline: "Leaks, bathrooms and blocked drains.",
    services: ["Leak repairs", "Bathrooms", "Drains", "Taps & toilets"],
  },
  {
    business: "Hearthside Gas",
    trade: "Gas engineer",
    town: "Retford",
    colour: "#c2410c",
    onColour: "#ffffff",
    headline: "Boiler repairs and yearly services.",
    services: ["Boiler repair", "Servicing", "Gas safety", "New boilers"],
  },
  {
    business: "Stoneway Builders",
    trade: "Builder",
    town: "Doncaster",
    colour: "#1f7a4a",
    onColour: "#ffffff",
    headline: "Extensions, garages and repairs.",
    services: ["Extensions", "Garages", "Brickwork", "Repairs"],
  },
];
