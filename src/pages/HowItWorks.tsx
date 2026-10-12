import { Link } from "react-router-dom";
import Reveal from "../components/Reveal";
import { CtaBand, DemoButton, PageHero, SectionHeading } from "../components/ui";
import { Camera, Check, Eye, Phone, Repeat, Search } from "../components/Icons";

const steps = [
  {
    icon: Eye,
    title: "Ask for your free demo",
    text: "Tell us your name, business, town and phone number. It takes about a minute and there's no card or commitment.",
  },
  {
    icon: Search,
    title: "We build your demo",
    text: "We use your Google listing to build a private version of your new site, with your services, your area and a call button. Then we get in touch with your private link.",
  },
  {
    icon: Check,
    title: "You decide",
    text: "Look at it on your phone. If you want it, pick a plan and pay monthly through Stripe. You send your list of services and some photos, and we finish your site and put it live.",
  },
  {
    icon: Repeat,
    title: "We keep it working",
    text: "We look after hosting, updates and your town pages. Enquiries show in your dashboard. On Pro, we switch on the Customer Engine.",
  },
];

const needs = [
  { icon: Phone, text: "Answer your calls, or ring back the missed ones in your dashboard." },
  { icon: Camera, text: "Send us photos of your work and a list of what you offer." },
  { icon: Check, text: "Tell us when something changes, like a new service or a new area." },
];

export default function HowItWorks() {
  return (
    <>
      <PageHero
        eyebrow="How it works"
        title="See your site, then decide."
        intro="Four steps from your first message to a website that brings in enquiries. You only pay once you've seen your site and want it."
      >
        <div className="mt-8">
          <DemoButton />
        </div>
      </PageHero>

      <section className="pb-20">
        <div className="container-cs">
          <ol className="relative grid gap-5 md:grid-cols-2">
            {steps.map((s, i) => (
              <Reveal as="li" key={s.title} delay={i * 0.06} className="card h-full p-7">
                  <div className="flex items-center gap-4">
                    <span className="grid h-12 w-12 place-items-center rounded-xl bg-brand/15 text-brand">
                      <s.icon width={24} height={24} aria-hidden />
                    </span>
                    <span className="font-display text-sm font-bold text-mist">Step {i + 1}</span>
                  </div>
                  <h2 className="mt-5 text-2xl font-bold">{s.title}</h2>
                  <p className="mt-2 text-mist">{s.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="section border-y border-line bg-ink-2">
        <div className="container-cs grid gap-10 lg:grid-cols-2">
          <SectionHeading
            center={false}
            eyebrow="Your part"
            title="What we need from you."
            intro="Not much. But a website can only bring in work if someone answers when it does."
          />
          <Reveal delay={0.06}>
            <ul className="space-y-4">
              {needs.map((n) => (
                <li key={n.text} className="card flex gap-4 p-5">
                  <n.icon width={22} height={22} className="mt-0.5 shrink-0 text-brand" aria-hidden />
                  <span>{n.text}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container-cs max-w-3xl">
          <SectionHeading
            eyebrow="After you go live"
            title="Pay monthly, leave when you want."
            intro={
              <>
                The minimum is 2 monthly payments. After that, cancel any time with 30 days'
                notice. Full details are in our{" "}
                <Link to="/terms" className="text-accent underline underline-offset-4">
                  terms
                </Link>
                .
              </>
            }
          />
        </div>
      </section>

      <CtaBand />
    </>
  );
}
