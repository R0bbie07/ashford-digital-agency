import Reveal from "../components/Reveal";
import { CtaBand, PageHero, ReviewsSlot } from "../components/ui";
import { Check } from "../components/Icons";
import { SITE } from "../lib/site";

const promises = [
  {
    title: "You deal with one person",
    text: "No account managers or call centres. The person who builds your site is the person you talk to.",
  },
  {
    title: "Prices on the page",
    text: "£29, £49 or £89 a month. No setup fee, and no surprise costs added later.",
  },
  {
    title: "You see it first",
    text: "We build your demo before you pay, so you never pay for something you haven't seen.",
  },
  {
    title: "No made-up proof",
    text: "No fake reviews, fake client logos or invented results. Real ones will go up as they come in.",
  },
];

export default function About() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="A one-person web business in Gainsborough."
        intro={`Ashford Digital is run by Robbie in ${SITE.town}, ${SITE.county}. It builds websites for small UK businesses and helps them get more customers.`}
      />

      <section className="pb-20">
        <div className="container-cs grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal>
            <div className="space-y-5 text-lg leading-relaxed text-mist">
              <p>
                Most small businesses don't need a big agency. They need the phone to ring, a site
                that looks trustworthy when someone checks them out, and someone who picks up when
                they need a change.
              </p>
              <p>
                Ashford Digital started with local trades: electricians, plumbers, gas engineers and
                builders. It now works with any local business that wants more customers.
              </p>
              <p>
                We're new, so there are no case studies yet. That's why every site starts as a free
                demo, and why Pro comes with a guarantee: your first tracked enquiry within 60 days
                of going live, or 3 months free.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <ul className="space-y-4">
              {promises.map((p) => (
                <li key={p.title} className="card flex gap-4 p-5">
                  <span className="tick">
                    <Check width={13} height={13} aria-hidden />
                  </span>
                  <div>
                    <p className="font-semibold">{p.title}</p>
                    <p className="mt-1 text-mist">{p.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="pb-20">
        <div className="container-cs">
          <ReviewsSlot />
        </div>
      </section>

      <CtaBand />
    </>
  );
}
