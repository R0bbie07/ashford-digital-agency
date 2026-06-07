import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Reveal from "../components/Reveal";
import {
  Arrow,
  Bolt,
  Check,
  Gauge,
  Globe,
  Pin,
  Quote,
  Rocket,
  Search,
  Shield,
  Star,
} from "../components/Icons";
import { PLANS, SITE } from "../lib/site";

const services = [
  {
    icon: Globe,
    title: "Professional Website",
    text: "A fast, modern site that makes your trade look established and trustworthy — built around the jobs you actually want.",
  },
  {
    icon: Gauge,
    title: "Lightning Hosting",
    text: "Hosted on Cloudflare’s global network. Loads in under a second on mobile, so you never lose a customer to a slow page.",
  },
  {
    icon: Search,
    title: "Local SEO (Pro)",
    text: "Optimised meta titles, descriptions and a consistent NAP so you show up when locals search for your trade.",
  },
  {
    icon: Pin,
    title: "Google Business (Pro)",
    text: "Your Google Business Profile set up properly — the map listing that drives calls from people ready to book.",
  },
  {
    icon: Shield,
    title: "Domain & Security",
    text: "We manage your DNS and SSL. Your domain stays yours, always. No tech headaches, ever.",
  },
  {
    icon: Bolt,
    title: "Ongoing Updates",
    text: "New service, new number, new photos? Message us and it’s done. Your site stays current without you lifting a finger.",
  },
];

const proof = [
  {
    quote:
      "Had three new enquiries in the first fortnight. The site looks miles better than anything my mates have.",
    name: "Dave R.",
    role: "Electrician · Lincolnshire",
  },
  {
    quote:
      "I’m on the first page of Google for ‘boiler repair’ in my town now. Phone hasn’t stopped.",
    name: "Mark T.",
    role: "Gas Engineer · Nottinghamshire",
  },
  {
    quote:
      "Dead simple. I sent a few photos and a week later I had a proper website. Worth every penny.",
    name: "Steve C.",
    role: "Builder · Yorkshire",
  },
];

const steps = [
  {
    n: "01",
    title: "Tell us about your trade",
    text: "Fill in the 5-minute onboarding form — your services, areas and brand.",
  },
  {
    n: "02",
    title: "We build your site",
    text: "Your professional website is designed and live within 24 hours of payment.",
  },
  {
    n: "03",
    title: "Start winning work",
    text: "Get found on Google, look the part, and turn searches into booked jobs.",
  },
];

export default function Home() {
  return (
    <>
      {/* ----------------------------------------------------------------- */}
      {/* HERO                                                              */}
      {/* ----------------------------------------------------------------- */}
      <section className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
        <div className="container-cs">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto max-w-3xl text-center"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-line bg-panel/60 px-4 py-1.5 text-xs font-medium text-mist">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
              For UK electricians, plumbers, gas engineers & builders
            </span>

            <h1 className="mt-6 text-4xl font-bold leading-[1.08] tracking-tight sm:text-6xl">
              Websites that{" "}
              <span className="text-gradient">win you work</span> — not just sit
              there.
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-mist sm:text-lg">
              {SITE.name} builds fast, professional websites for trades
              businesses. Hosting, domain and ongoing updates all included — from{" "}
              <span className="font-semibold text-cloud">£80/month</span>. No
              big upfront cost.
            </p>

            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link to="/onboarding" className="btn-primary w-full sm:w-auto">
                Get my website <Arrow width={18} height={18} />
              </Link>
              <a href="#pricing" className="btn-ghost w-full sm:w-auto">
                See pricing
              </a>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-mist">
              <span className="inline-flex items-center gap-2">
                <Check width={16} height={16} className="text-accent" /> Live in
                24 hours
              </span>
              <span className="inline-flex items-center gap-2">
                <Check width={16} height={16} className="text-accent" /> Cancel
                anytime (30 days’ notice)
              </span>
              <span className="inline-flex items-center gap-2">
                <Check width={16} height={16} className="text-accent" /> You own
                your domain
              </span>
            </div>
          </motion.div>

          {/* Mock browser preview built from pure CSS — no images */}
          <Reveal delay={0.15} className="mx-auto mt-16 max-w-4xl">
            <div className="glass rounded-3xl p-2 shadow-2xl">
              <div className="rounded-[1.25rem] bg-ink-2 ring-1 ring-line">
                <div className="flex items-center gap-2 border-b border-line px-4 py-3">
                  <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                  <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
                  <span className="h-3 w-3 rounded-full bg-[#28c840]" />
                  <span className="ml-3 flex-1 truncate rounded-md bg-panel px-3 py-1 text-xs text-mist">
                    rj-electrical.co.uk
                  </span>
                </div>
                <div className="grid gap-4 p-6 sm:grid-cols-[1.3fr_1fr]">
                  <div>
                    <div className="h-3 w-24 rounded-full bg-brand/60" />
                    <div className="mt-4 h-7 w-3/4 rounded-lg bg-cloud/80" />
                    <div className="mt-2 h-7 w-1/2 rounded-lg bg-cloud/40" />
                    <div className="mt-5 space-y-2">
                      <div className="h-2.5 w-full rounded-full bg-line" />
                      <div className="h-2.5 w-5/6 rounded-full bg-line" />
                    </div>
                    <div className="mt-6 flex gap-3">
                      <div className="h-9 w-28 rounded-full bg-gradient-to-r from-brand to-brand-2" />
                      <div className="h-9 w-24 rounded-full border border-line" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {[Globe, Shield, Gauge, Pin].map((Ic, i) => (
                      <div
                        key={i}
                        className="grid place-items-center rounded-xl border border-line bg-panel/60 py-6 text-brand-2"
                      >
                        <Ic width={26} height={26} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* SERVICES                                                          */}
      {/* ----------------------------------------------------------------- */}
      <section id="services" className="scroll-mt-24 py-20 sm:py-28">
        <div className="container-cs">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-brand-2">
              What you get
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Everything handled, for one monthly fee
            </h2>
            <p className="mt-4 text-mist">
              No web design jargon, no hidden costs. Just a website that works as
              hard as you do.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.05}>
                <article className="group h-full rounded-2xl border border-line bg-panel/40 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand/50 hover:bg-panel/70">
                  <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-brand/20 to-accent/20 text-brand-2 ring-1 ring-line transition-colors group-hover:text-accent">
                    <s.icon width={24} height={24} />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-mist">
                    {s.text}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* HOW IT WORKS                                                      */}
      {/* ----------------------------------------------------------------- */}
      <section className="py-12 sm:py-16">
        <div className="container-cs">
          <div className="grid gap-5 md:grid-cols-3">
            {steps.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.08}>
                <div className="relative h-full rounded-2xl border border-line bg-ink-2/60 p-6">
                  <span className="text-4xl font-bold text-gradient">{s.n}</span>
                  <h3 className="mt-3 text-lg font-semibold">{s.title}</h3>
                  <p className="mt-2 text-sm text-mist">{s.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* PRICING                                                           */}
      {/* ----------------------------------------------------------------- */}
      <section id="pricing" className="scroll-mt-24 py-20 sm:py-28">
        <div className="container-cs">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-brand-2">
              Simple pricing
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              One flat monthly fee. No surprises.
            </h2>
            <p className="mt-4 text-mist">
              Both plans include hosting, domain management and ongoing updates.
              Cancel any time with 30 days’ notice.
            </p>
          </Reveal>

          <div className="mx-auto mt-14 grid max-w-4xl gap-6 md:grid-cols-2">
            {PLANS.map((plan, i) => (
              <Reveal key={plan.id} delay={i * 0.08}>
                <div
                  className={`relative flex h-full flex-col rounded-3xl border p-8 ${
                    plan.highlighted
                      ? "border-brand/60 bg-gradient-to-b from-panel-2 to-panel shadow-[0_30px_80px_-40px_rgba(109,92,255,0.6)]"
                      : "border-line bg-panel/40"
                  }`}
                >
                  {plan.highlighted && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-brand to-brand-2 px-4 py-1 text-xs font-semibold text-white">
                      Most popular
                    </span>
                  )}
                  <h3 className="text-xl font-semibold">{plan.id}</h3>
                  <p className="mt-1 text-sm text-mist">{plan.blurb}</p>
                  <div className="mt-6 flex items-end gap-1">
                    <span className="text-5xl font-bold tracking-tight">
                      £{plan.price}
                    </span>
                    <span className="mb-1.5 text-mist">{plan.cadence}</span>
                  </div>

                  <ul className="mt-7 flex-1 space-y-3">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-3 text-sm">
                        <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand/20 text-brand-2">
                          <Check width={13} height={13} />
                        </span>
                        <span className="text-cloud/90">{f}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    to={`/onboarding?plan=${plan.id}`}
                    className={`mt-8 ${plan.highlighted ? "btn-primary" : "btn-ghost"}`}
                  >
                    Choose {plan.id} <Arrow width={18} height={18} />
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
          <p className="mt-6 text-center text-xs text-mist">
            Payments collected securely via Stripe. Prices in GBP. No setup fee.
          </p>
        </div>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* SOCIAL PROOF                                                      */}
      {/* ----------------------------------------------------------------- */}
      <section id="proof" className="scroll-mt-24 py-20 sm:py-28">
        <div className="container-cs">
          <Reveal className="mx-auto max-w-2xl text-center">
            <div className="mb-3 flex items-center justify-center gap-1 text-gold">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} width={20} height={20} />
              ))}
            </div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Trusted by trades who’d rather be on the tools
            </h2>
            <p className="mt-4 text-mist">
              Real results, plain and simple. Here’s what business owners say.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {proof.map((p, i) => (
              <Reveal key={p.name} delay={i * 0.06}>
                <figure className="flex h-full flex-col rounded-2xl border border-line bg-panel/40 p-6">
                  <Quote width={28} height={28} className="text-brand/50" />
                  <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-cloud/90">
                    “{p.quote}”
                  </blockquote>
                  <figcaption className="mt-6 flex items-center gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-brand to-brand-2 text-sm font-semibold text-white">
                      {p.name.charAt(0)}
                    </span>
                    <span>
                      <span className="block text-sm font-semibold">
                        {p.name}
                      </span>
                      <span className="block text-xs text-mist">{p.role}</span>
                    </span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1}>
            <div className="mt-12 grid gap-4 rounded-3xl border border-line bg-ink-2/60 p-8 sm:grid-cols-3">
              {[
                { stat: "24 hrs", label: "Average go-live time" },
                { stat: "< 1 sec", label: "Mobile load speed" },
                { stat: "£0", label: "Upfront cost" },
              ].map((m) => (
                <div key={m.label} className="text-center">
                  <p className="text-4xl font-bold text-gradient">{m.stat}</p>
                  <p className="mt-1 text-sm text-mist">{m.label}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* CTA                                                               */}
      {/* ----------------------------------------------------------------- */}
      <section className="pb-24">
        <div className="container-cs">
          <Reveal>
            <div className="relative overflow-hidden rounded-[2rem] border border-line bg-gradient-to-br from-panel-2 via-panel to-ink-2 px-6 py-14 text-center sm:px-12 sm:py-20">
              <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-brand/20 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />
              <div className="relative">
                <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-brand to-brand-2 text-white">
                  <Rocket width={26} height={26} />
                </div>
                <h2 className="mx-auto mt-6 max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">
                  Ready to look like the professional you are?
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-mist">
                  Get a website your customers trust — live within 24 hours.
                  Takes 5 minutes to get started.
                </p>
                <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                  <Link to="/onboarding" className="btn-primary w-full sm:w-auto">
                    Start now <Arrow width={18} height={18} />
                  </Link>
                  <a
                    href={`mailto:${SITE.email}`}
                    className="btn-ghost w-full sm:w-auto"
                  >
                    Ask a question
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
