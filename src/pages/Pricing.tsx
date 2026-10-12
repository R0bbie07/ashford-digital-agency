import { Fragment } from "react";
import { Link } from "react-router-dom";
import Reveal from "../components/Reveal";
import { CtaBand, FaqList, Guarantee, PageHero, PlanCards, SectionHeading } from "../components/ui";
import { Check } from "../components/Icons";
import { FAQS } from "../lib/content";
import { ALL_PLANS_INCLUDE, CUSTOMER_ENGINE, PLANS, planPrice } from "../lib/site";

type Cell = boolean | string;
const rows: { group: string; items: { label: string; cells: [Cell, Cell, Cell] }[] }[] = [
  {
    group: "Your website",
    items: [
      { label: "5-page site built for phones first", cells: [true, true, true] },
      { label: "Hosting, security and updates", cells: [true, true, true] },
      { label: "Call button that stays on screen", cells: [true, true, true] },
      { label: "Demo built before you pay", cells: [true, true, true] },
      { label: "Town pages with local content", cells: ["1", "3", "10"] },
    ],
  },
  {
    group: "Turning visitors into enquiries",
    items: [
      { label: "Dashboard of every enquiry", cells: [true, true, true] },
      { label: "Missed calls logged in your dashboard", cells: [false, true, true] },
      { label: "Photo quote form (photos + postcode)", cells: [false, true, true] },
      { label: "Automatic review requests", cells: [false, true, true] },
    ],
  },
  {
    group: "The Customer Engine",
    items: [
      ...CUSTOMER_ENGINE.map((c) => ({ label: c.title, cells: [false, false, true] as [Cell, Cell, Cell] })),
      { label: "Leads-by-source dashboard", cells: [false, false, true] },
      { label: "60-day results guarantee", cells: [false, false, true] },
    ],
  },
];

const pricingFaqs = FAQS.filter((f) =>
  /free month|tied in|Google ads|afford|domain/i.test(f.q)
);

function CellView({ v }: { v: Cell }) {
  if (v === true)
    return (
      <span className="tick mx-auto" title="Included">
        <Check width={13} height={13} aria-hidden />
        <span className="sr-only">Included</span>
      </span>
    );
  if (v === false)
    return (
      <span className="text-mist">
        <span aria-hidden>–</span>
        <span className="sr-only">Not included</span>
      </span>
    );
  return <span className="font-semibold">{v}</span>;
}

export default function Pricing() {
  return (
    <>
      <PageHero
        eyebrow="Pricing"
        title="Simple monthly prices. No setup fee."
        intro="Pick the plan that matches how much work you want us to bring in. You see your site before you pay, and after the first 2 payments you can cancel with 30 days' notice."
      />

      <section className="pb-16">
        <div className="container-cs">
          <PlanCards headingAs="h2" />
          <Reveal>
            <div className="card mt-6 p-6 sm:p-8">
              <h2 className="font-sans text-base font-semibold tracking-normal">Every plan includes</h2>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {ALL_PLANS_INCLUDE.map((f) => (
                  <li key={f} className="flex gap-3">
                    <span className="tick">
                      <Check width={13} height={13} aria-hidden />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Customer Engine highlight */}
      <section className="section border-y border-line bg-ink-2">
        <div className="container-cs">
          <SectionHeading
            eyebrow="Pro: the Customer Engine"
            title="Your website, plus a system that goes out and finds work."
            intro="Starter and Standard make it easy for people to find and contact you. Pro goes further and creates new enquiries."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {CUSTOMER_ENGINE.map((c, i) => (
              <Reveal key={c.title} delay={i * 0.05}>
                <div className="card h-full p-6">
                  <span className="font-display text-sm font-bold text-accent">0{i + 1}</span>
                  <h3 className="mt-2 text-xl font-bold">{c.title}</h3>
                  <p className="mt-2 text-mist">{c.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <p className="mx-auto mt-8 max-w-2xl text-center text-mist">
            We run the Engine by hand for each Pro client while we build the automation, so Pro is
            limited to 5 businesses for now. The first 5 get the founding price of £59 a month.
          </p>
          <div className="mt-12">
            <Guarantee />
          </div>
        </div>
      </section>

      {/* Comparison table */}
      <section className="section">
        <div className="container-cs">
          <SectionHeading eyebrow="Compare plans" title="Everything in each plan." />
          <Reveal>
            <div className="mt-10 overflow-hidden rounded-[1.25rem] border border-line">
              <table className="w-full table-fixed border-collapse text-left text-sm sm:text-base">
                <caption className="sr-only">What each plan includes</caption>
                <thead>
                  <tr className="bg-panel">
                    <th scope="col" className="w-[44%] p-3 text-sm font-semibold text-mist sm:w-auto sm:p-4">
                      Feature
                    </th>
                    {PLANS.map((p) => (
                      <th key={p.id} scope="col" className="px-1 py-3 text-center sm:p-4">
                        <span className="block font-display text-[0.95rem] font-bold sm:text-lg">{p.id}</span>
                        <span className="text-xs text-mist sm:text-sm">£{planPrice(p)}/mo</span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((g) => (
                    <Fragment key={g.group}>
                      <tr className="border-t border-line bg-ink-2">
                        <th colSpan={4} scope="colgroup" className="px-3 py-3 text-sm font-semibold text-accent sm:px-4">
                          {g.group}
                        </th>
                      </tr>
                      {g.items.map((r) => (
                        <tr key={r.label} className="border-t border-line">
                          <th scope="row" className="p-3 font-normal sm:p-4">
                            {r.label}
                          </th>
                          {r.cells.map((c, i) => (
                            <td key={i} className="px-1 py-3 text-center sm:p-4">
                              <CellView v={c} />
                            </td>
                          ))}
                        </tr>
                      ))}
                    </Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
          <p className="mt-4 text-sm text-mist">
            Prices are per month. Payments are taken securely by Stripe. Google ad spend on Pro is
            paid by you, directly to Google, up to the cap you set.
          </p>
        </div>
      </section>

      <section className="section pt-0">
        <div className="container-cs grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading
            center={false}
            eyebrow="Questions about price"
            title="Straight answers."
            intro={
              <>
                Already seen your demo and ready to go?{" "}
                <Link to="/onboarding" className="text-accent underline underline-offset-4">
                  Set up your website
                </Link>
                .
              </>
            }
          />
          <Reveal delay={0.06}>
            <FaqList items={pricingFaqs} />
          </Reveal>
        </div>
      </section>

      <CtaBand title="Not sure which plan? Start with your free demo." />
    </>
  );
}
