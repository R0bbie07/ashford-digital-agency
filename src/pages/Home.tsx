import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Reveal from "../components/Reveal";
import SiteMock, { DEMO_SITES } from "../components/SiteMock";
import {
  CtaBand,
  DemoButton,
  FaqList,
  Guarantee,
  PlanCards,
  ReviewsSlot,
  SectionHeading,
} from "../components/ui";
import {
  Arrow,
  Chart,
  Check,
  Eye,
  Lock,
  Phone,
  Pin,
  Search,
  Star,
} from "../components/Icons";
import { FAQS } from "../lib/content";
import { CUSTOMER_ENGINE, SITE } from "../lib/site";

const trust = [
  "See your site before you pay",
  "Prices on the page",
  "Cancel with 30 days' notice after 2 months",
  `Run from ${SITE.town}, ${SITE.county}`,
];

const pains = [
  {
    title: "Quiet months",
    text: "Word of mouth is great until it slows down, and you can't switch it back on.",
  },
  {
    title: "Losing to the business down the road",
    text: "People search for what you do, see a better website, and ring someone else.",
  },
  {
    title: "Burned before",
    text: "You paid a web company, got a slow site, and then couldn't get hold of them.",
  },
];

const steps = [
  {
    icon: Search,
    title: "Found when locals search",
    text: "Town pages with real local content for the areas you cover, so you show up beyond your own postcode.",
  },
  {
    icon: Phone,
    title: "Easy to call",
    text: "A call button that stays on screen, plus a photo quote form on Standard. Missed calls land in your dashboard so you can ring back.",
  },
  {
    icon: Star,
    title: "More reviews",
    text: "On Standard and Pro, your customers get a review request after each job, so your Google listing keeps growing.",
  },
  {
    icon: Chart,
    title: "You see what works",
    text: "Every enquiry shows in your dashboard. On Pro, you also see where each one came from.",
  },
];

export default function Home() {
  return (
    <>
      {/* HERO ------------------------------------------------------------ */}
      <section className="relative overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-24">
        <div className="hero-glow" aria-hidden />
        <div className="grid-lines" aria-hidden />
        <div className="container-cs relative grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-line-2 bg-panel/70 px-3.5 py-1.5 text-sm text-mist">
              <span className="h-2 w-2 rounded-full bg-brand" aria-hidden />
              Websites for UK small businesses
            </p>
            <h1 className="mt-6 text-[clamp(2.5rem,1.6rem+3.6vw,4.1rem)] font-extrabold">
              A website that brings in customers.{" "}
              <span className="text-brand">See it before you pay.</span>
            </h1>
            <p className="lead mt-6 max-w-xl">
              We build your new site from your Google listing first, for free. If you like it, it
              goes live from £29 a month. Pro adds the Customer Engine, which goes out and finds you
              work.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <DemoButton className="w-full sm:w-auto" />
              <Link to="/pricing" className="btn-ghost w-full sm:w-auto">
                See prices
              </Link>
            </div>
            <p className="mt-4 text-sm text-mist">Free. Takes about a minute. No card needed.</p>

            <ul className="mt-10 grid gap-x-6 gap-y-3 text-[0.95rem] sm:grid-cols-2">
              {trust.map((t) => (
                <li key={t} className="flex gap-3">
                  <span className="tick">
                    <Check width={13} height={13} aria-hidden />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </div>

          <motion.div
            className="relative hidden sm:block"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <SiteMock site={DEMO_SITES[0]} label="Example demo (made-up business)" />
            <div className="card absolute -left-4 bottom-16 hidden w-56 p-4 text-sm shadow-2xl xl:block" aria-hidden>
              <p className="flex items-center gap-2 font-semibold">
                <span className="h-2 w-2 rounded-full bg-good" /> Your dashboard
              </p>
              <p className="mt-2 text-mist">Every call and form in one list, with where it came from.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* PROBLEM --------------------------------------------------------- */}
      <section className="section border-t border-line bg-ink-2">
        <div className="container-cs">
          <SectionHeading
            eyebrow="Sound familiar?"
            title="You're good at the job. Getting the phone to ring is the hard part."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {pains.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.06}>
                <div className="card h-full p-6">
                  <h3 className="text-xl font-bold">{p.title}</h3>
                  <p className="mt-2 text-mist">{p.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SEE IT FIRST ---------------------------------------------------- */}
      <section className="section">
        <div className="container-cs grid items-center gap-12 lg:grid-cols-2">
          <SectionHeading
            center={false}
            eyebrow="See your site first"
            title="We build it before you decide."
            intro="Send us your business name and town. We use your Google listing to build a private demo of your new site, and you look at it on your own phone. Only pay if you want it."
          />
          <Reveal delay={0.08}>
            <ol className="space-y-4">
              {[
                { icon: Eye, t: "Ask for your demo", d: "One short form. About a minute." },
                { icon: Lock, t: "We build it privately", d: "Built from your Google listing. Nobody else sees it." },
                { icon: Check, t: "You decide", d: "Like it? Pick a plan and it goes live. If not, no charge." },
              ].map((s, i) => (
                <li key={s.t} className="card flex gap-4 p-5">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand/15 text-brand">
                    <s.icon width={22} height={22} aria-hidden />
                  </span>
                  <div>
                    <p className="font-semibold">
                      <span className="text-mist">{i + 1}.</span> {s.t}
                    </p>
                    <p className="text-mist">{s.d}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      {/* HOW WE GET YOU CUSTOMERS --------------------------------------- */}
      <section className="section border-y border-line bg-ink-2" id="how-we-get-you-customers">
        <div className="container-cs">
          <SectionHeading
            eyebrow="How we get you customers"
            title="What actually brings in enquiries."
            intro="A nice-looking site on its own won't make the phone ring. These are the parts that do the work."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {steps.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.05}>
                <div className="card h-full p-6">
                  <s.icon width={26} height={26} className="text-brand" aria-hidden />
                  <h3 className="mt-4 text-xl font-bold">{s.title}</h3>
                  <p className="mt-2 text-mist">{s.text}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.05}>
            <div className="mt-5 rounded-[1.4rem] border border-brand/50 bg-panel-2 p-7 sm:p-10">
              <p className="eyebrow">Pro only</p>
              <h3 className="mt-2 text-2xl font-bold sm:text-3xl">The Customer Engine goes looking for work.</h3>
              <div className="mt-6 grid gap-6 md:grid-cols-2">
                {CUSTOMER_ENGINE.map((c) => (
                  <div key={c.title} className="flex gap-3">
                    <span className="tick">
                      <Check width={13} height={13} aria-hidden />
                    </span>
                    <div>
                      <p className="font-semibold">{c.title}</p>
                      <p className="mt-1 text-mist">{c.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <div className="mt-5 grid gap-4 rounded-[1.4rem] border border-line p-6 sm:grid-cols-[auto_1fr] sm:p-8">
              <Pin width={26} height={26} className="text-mist" aria-hidden />
              <div>
                <p className="font-semibold">The honest bit</p>
                <p className="mt-1 text-mist">
                  Google decides search rankings, so nobody can promise you a top spot, and showing
                  up for new towns takes weeks rather than days. We can't answer your phone or do
                  the job either. If you answer calls and reply to enquiries, everything above
                  works much harder for you.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* PRICING ---------------------------------------------------------- */}
      <section className="section">
        <div className="container-cs">
          <SectionHeading
            eyebrow="Pricing"
            title="Pay monthly. No setup fee."
            intro="Every plan includes a 5-page site built for phones, hosting, a call button that stays on screen, and a dashboard of your enquiries."
          />
          <div className="mt-12">
            <PlanCards compact />
          </div>
          <p className="mt-8 text-center">
            <Link to="/pricing" className="inline-flex min-h-11 items-center gap-2 font-semibold text-accent hover:underline">
              Compare everything in each plan <Arrow width={16} height={16} aria-hidden />
            </Link>
          </p>
          <div className="mt-12">
            <Guarantee />
          </div>
        </div>
      </section>

      {/* EXAMPLES ------------------------------------------------------- */}
      <section className="section border-y border-line bg-ink-2">
        <div className="container-cs grid items-center gap-12 lg:grid-cols-2">
          <SectionHeading
            center={false}
            eyebrow="Examples"
            title="Built for the phone in your customer's hand."
            intro="Most people will find you on a phone, often in a hurry. Your site loads fast, shows what you do, and keeps the call button in reach."
          />
          <Reveal delay={0.08}>
            <div className="grid grid-cols-2 gap-6">
              <SiteMock site={DEMO_SITES[1]} label="Demo" />
              <div className="mt-10">
                <SiteMock site={DEMO_SITES[2]} label="Demo" />
              </div>
            </div>
            <p className="mt-6 text-center text-sm text-mist">
              Made-up businesses, shown as demos.{" "}
              <Link to="/examples" className="font-semibold text-accent underline underline-offset-4">
                See all examples
              </Link>
            </p>
          </Reveal>
        </div>
      </section>

      {/* REVIEWS ---------------------------------------------------------- */}
      <section className="section">
        <div className="container-cs">
          <ReviewsSlot />
        </div>
      </section>

      {/* FAQ -------------------------------------------------------------- */}
      <section className="section pt-0">
        <div className="container-cs grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading
            center={false}
            eyebrow="Questions"
            title="The things people ask first."
            intro={
              <>
                More answers on the{" "}
                <Link to="/faq" className="text-accent underline underline-offset-4">
                  FAQ page
                </Link>
                .
              </>
            }
          />
          <Reveal delay={0.06}>
            <FaqList items={FAQS.slice(0, 5)} />
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
