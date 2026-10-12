import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import Reveal from "./Reveal";
import { Arrow, Check, Plus, Shield, Star } from "./Icons";
import { FAQS, REVIEWS, type Faq } from "../lib/content";
import { GUARANTEE, PLANS, SITE, planPrice, telHref } from "../lib/site";

/** The one main button used on every page. */
export function DemoButton({
  className = "",
  children = "See your site first",
}: {
  className?: string;
  children?: ReactNode;
}) {
  return (
    <Link to="/see-your-site-first" className={`btn-primary ${className}`}>
      {children} <Arrow width={18} height={18} aria-hidden />
    </Link>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  center = true,
  as: Tag = "h2",
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  center?: boolean;
  as?: "h1" | "h2";
}) {
  return (
    <Reveal className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <Tag className={`${Tag === "h1" ? "text-[clamp(2.2rem,1.5rem+3.4vw,3.75rem)] font-extrabold" : "h-section"} mt-3`}>
        {title}
      </Tag>
      {intro && <p className="lead mt-5">{intro}</p>}
    </Reveal>
  );
}

/** Top of every inner page. Not animated, so the heading paints straight away. */
export function PageHero({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden pt-32 pb-14 sm:pt-40 sm:pb-20">
      <div className="hero-glow" aria-hidden />
      <div className="container-cs relative">
        <div className="max-w-3xl">
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="mt-4 text-[clamp(2.2rem,1.5rem+3.4vw,3.75rem)] font-extrabold">{title}</h1>
          {intro && <p className="lead mt-6 max-w-2xl">{intro}</p>}
          {children}
        </div>
      </div>
    </section>
  );
}

export function PlanCards({
  compact = false,
  headingAs: H = "h3",
}: {
  compact?: boolean;
  headingAs?: "h2" | "h3";
}) {
  return (
    <div className="grid gap-5 lg:grid-cols-3">
      {PLANS.map((plan, i) => {
        const price = planPrice(plan);
        const founding = price !== plan.price;
        return (
          <Reveal key={plan.id} delay={i * 0.06} className="h-full">
            <div
              className={`relative flex h-full flex-col rounded-[1.4rem] border p-7 ${
                plan.highlighted
                  ? "border-brand/70 bg-panel-2 shadow-[0_30px_80px_-40px_rgba(245,181,61,0.45)]"
                  : "border-line bg-panel"
              }`}
            >
              {plan.highlighted && (
                <span className="absolute -top-3 left-7 rounded-full bg-brand px-3 py-1 text-xs font-bold text-on-brand">
                  Includes the Customer Engine
                </span>
              )}
              <H className="text-2xl font-bold">{plan.id}</H>
              <p className="mt-1 text-mist">{plan.forWho}</p>

              <div className="mt-6 flex items-end gap-2">
                <span className="font-display text-5xl font-extrabold tracking-tight">£{price}</span>
                <span className="mb-1.5 text-mist">a month</span>
              </div>
              {founding ? (
                <p className="mt-2 text-sm text-mist">
                  <span className="font-semibold text-accent">Founding price</span> for the first 5 Pro
                  clients. Normally <s>£{plan.price}</s>.
                </p>
              ) : (
                <p className="mt-2 text-sm text-mist">No setup fee.</p>
              )}

              {!compact && (
                <ul className="mt-6 flex-1 space-y-3">
                  {plan.features.map((f) => (
                    <li key={f} className="flex gap-3 text-[0.95rem]">
                      <span className="tick">
                        <Check width={13} height={13} aria-hidden />
                      </span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              )}
              {compact && <div className="flex-1" />}

              <Link
                to={`/see-your-site-first?plan=${plan.id}`}
                className={`mt-7 ${plan.highlighted ? "btn-primary" : "btn-ghost"}`}
                aria-label={`See your site first, ${plan.id} plan`}
              >
                See your site first
              </Link>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}

export function Guarantee() {
  return (
    <Reveal>
      <div className="card grid gap-8 p-7 sm:p-10 md:grid-cols-[auto_1fr]">
        <div className="grid h-16 w-16 place-items-center rounded-2xl bg-brand/15 text-brand">
          <Shield width={32} height={32} aria-hidden />
        </div>
        <div>
          <p className="eyebrow">Pro guarantee</p>
          <h3 className="mt-2 text-2xl font-bold sm:text-3xl">{GUARANTEE.short}</h3>
          <p className="mt-4 text-mist">The guarantee applies when:</p>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {GUARANTEE.terms.map((t) => (
              <li key={t} className="flex gap-3">
                <span className="tick">
                  <Check width={13} height={13} aria-hidden />
                </span>
                <span>{t}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-mist">
            A tracked enquiry is a call, form or message that comes through your site or the Customer
            Engine and shows in your dashboard. Full wording is in our{" "}
            <Link to="/terms#guarantee" className="text-accent underline underline-offset-4">
              terms
            </Link>
            .
          </p>
        </div>
      </div>
    </Reveal>
  );
}

export function FaqList({ items = FAQS }: { items?: Faq[] }) {
  return (
    <div className="divide-y divide-line rounded-[1.25rem] border border-line bg-panel">
      {items.map((f) => (
        <details key={f.q} className="group px-6 py-1 [&_summary::-webkit-details-marker]:hidden">
          <summary className="flex min-h-14 items-center justify-between gap-4 py-4 text-left font-semibold">
            <span>{f.q}</span>
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-line-2 text-mist transition-transform duration-200 group-open:rotate-45">
              <Plus width={16} height={16} aria-hidden />
            </span>
          </summary>
          <p className="pb-5 text-mist">{f.a}</p>
        </details>
      ))}
    </div>
  );
}

/**
 * Reviews slot. Shows real reviews from src/lib/content.ts (REVIEWS) when
 * there are any. Until then, it says honestly that there are none yet.
 */
export function ReviewsSlot() {
  if (REVIEWS.length) {
    return (
      <div className="grid gap-5 md:grid-cols-3">
        {REVIEWS.map((r) => (
          <figure key={r.name} className="card p-6">
            <div className="flex gap-1 text-brand" aria-hidden>
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} width={16} height={16} />
              ))}
            </div>
            <blockquote className="mt-4">“{r.quote}”</blockquote>
            <figcaption className="mt-5 text-sm text-mist">
              <span className="font-semibold text-cloud">{r.name}</span> · {r.business}
            </figcaption>
          </figure>
        ))}
      </div>
    );
  }
  return (
    <div className="rounded-[1.25rem] border border-dashed border-line-2 p-8 text-center sm:p-12">
      <p className="eyebrow">Reviews</p>
      <h3 className="mt-3 text-2xl font-bold">No reviews yet, and we won't make any up.</h3>
      <p className="mx-auto mt-3 max-w-xl text-mist">
        We're taking on our first clients now. Their real reviews will go here. Until then, judge
        us on your free demo.
      </p>
    </div>
  );
}

export function CtaBand({
  title = "See your new website before you pay a penny.",
  text = "Tell us your business name and town. We'll build a private demo from your Google listing, free.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section className="section pt-0">
      <div className="container-cs">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] border border-line bg-panel px-6 py-14 text-center sm:px-12 sm:py-20">
            <div className="hero-glow" aria-hidden />
            <div className="relative">
              <h2 className="h-section mx-auto max-w-2xl">{title}</h2>
              <p className="lead mx-auto mt-4 max-w-xl">{text}</p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <DemoButton className="w-full sm:w-auto" />
                {SITE.phone ? (
                  <a href={telHref(SITE.phone)} className="btn-ghost w-full sm:w-auto">
                    Call {SITE.phone}
                  </a>
                ) : (
                  <Link to="/pricing" className="btn-ghost w-full sm:w-auto">
                    See prices
                  </Link>
                )}
              </div>
              <p className="mt-4 text-sm text-mist">Free. Takes about a minute. No card needed.</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
