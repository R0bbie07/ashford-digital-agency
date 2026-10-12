import Reveal from "../components/Reveal";
import SiteMock, { DEMO_SITES } from "../components/SiteMock";
import { CtaBand, PageHero } from "../components/ui";
import { Check } from "../components/Icons";

const features = [
  "Call button pinned to the bottom of the screen",
  "Your services listed clearly, with prices if you want them",
  "Photo quote form on Standard and Pro",
  "Colours to suit your trade or your existing van and logo",
];

export default function Examples() {
  return (
    <>
      <PageHero
        eyebrow="Examples"
        title="What your site could look like."
        intro="These are demo sites for made-up businesses. We don't have client sites to show yet, and we won't pretend otherwise. Your own demo will use your name, services and area."
      />

      <section className="pb-20">
        <div className="container-cs">
          <div className="grid gap-x-8 gap-y-16 pt-4 sm:grid-cols-2 lg:grid-cols-4">
            {DEMO_SITES.map((s, i) => (
              <Reveal key={s.business} delay={i * 0.06}>
                <SiteMock site={s} label="Demo: made-up business" />
                <div className="mt-5 text-center">
                  <h2 className="text-lg font-bold">{s.business}</h2>
                  <p className="text-sm text-mist">
                    {s.trade} demo · not a real business
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="card mt-16 p-6 sm:p-8">
              <h2 className="text-2xl font-bold">Every site comes with</h2>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {features.map((f) => (
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

      <CtaBand title="Want to see yours instead?" />
    </>
  );
}
