import { motion } from "framer-motion";
import { GUARANTEE, SITE } from "../lib/site";

interface Clause {
  id: string;
  title: string;
  body: React.ReactNode;
}

const lastUpdated = "October 2026";

const clauses: Clause[] = [
  {
    id: "services",
    title: "1. Services",
    body: (
      <p>
        Ashford Digital provides website design, development, and hosting services
        for small businesses in the United Kingdom. The specific services provided
        are outlined in the plan selected by the client at the point of purchase
        (<strong>Starter</strong>, <strong>Standard</strong> or <strong>Pro</strong>),
        as described on the pricing page.
      </p>
    ),
  },
  {
    id: "payment",
    title: "2. Payment Terms",
    body: (
      <p>
        Services are billed on a monthly recurring basis, starting when the client
        chooses a plan after seeing their free demo. There is{" "}
        <strong>no free trial month</strong>. Payments are collected automatically
        on the same date each month via <strong>Stripe</strong>. Prices are
        Starter <strong>£29/month</strong>, Standard <strong>£49/month</strong> and
        Pro <strong>£89/month</strong>. The first 5 Pro clients pay a founding price
        of <strong>£59/month</strong>. All prices are inclusive of any applicable
        taxes unless stated otherwise. Google ad spend on the Pro plan is paid by
        the client directly to Google and is not included in the monthly fee.
      </p>
    ),
  },
  {
    id: "minimum-commitment",
    title: "3. Minimum Commitment",
    body: (
      <p>
        Clients are committed to a <strong>minimum of 2 monthly payments</strong>{" "}
        before cancellation is permitted. This applies to all plans. Cancellation
        requests submitted before the minimum term is fulfilled will not be
        accepted.
      </p>
    ),
  },
  {
    id: "cancellation",
    title: "4. Cancellation Policy",
    body: (
      <p>
        After the minimum 2 month commitment has been fulfilled, clients may cancel
        at any time by submitting a written cancellation request to{" "}
        <strong>{SITE.email}</strong> with a minimum of{" "}
        <strong>30 days notice</strong>. Access to the website and hosting will
        remain active until the end of the final paid billing period.
      </p>
    ),
  },
  {
    id: "referral",
    title: "5. Referral Scheme",
    body: (
      <p>
        Clients who successfully refer another paying client to Ashford Digital
        will receive <strong>1 month free</strong> added to their account. The
        referred client must make their first payment for the referral reward to
        be applied. Referral rewards are
        non-transferable and have no cash value.
      </p>
    ),
  },
  {
    id: "ip",
    title: "6. Ownership & Intellectual Property",
    body: (
      <p>
        The website designed and developed by Ashford Digital{" "}
        <strong>remains the intellectual property of Ashford Digital</strong> until
        all outstanding payments have been made. Upon cancellation and settlement
        of any outstanding balance, the client is entitled to request a static
        export of their website. Ongoing hosting, updates, and support are only
        provided to active paying clients.
      </p>
    ),
  },
  {
    id: "responsibilities",
    title: "7. Client Responsibilities",
    body: (
      <p>
        The client is responsible for providing accurate business information,
        logos, images, and any other content required to build and maintain their
        website. Ashford Digital is not liable for delays caused by the client
        failing to provide required materials.
      </p>
    ),
  },
  {
    id: "revisions",
    title: "8. Revisions & Updates",
    body: (
      <p>
        Starter and Standard plan clients are entitled to{" "}
        <strong>up to 2 revision requests per month</strong>. Pro plan clients are
        entitled to <strong>unlimited revision requests</strong>. Revision requests
        must be submitted via email to <strong>{SITE.email}</strong> and
        will be completed within <strong>5 working days</strong>.
      </p>
    ),
  },
  {
    id: "liability",
    title: "9. Limitation of Liability",
    body: (
      <p>
        Ashford Digital will not be held liable for any loss of business, revenue,
        or data arising from website downtime, technical issues, or errors beyond
        our reasonable control. Our total liability in any circumstance is{" "}
        <strong>limited to the value of the most recent monthly payment</strong>{" "}
        made by the client.
      </p>
    ),
  },
  {
    id: "law",
    title: "10. Governing Law",
    body: (
      <p>
        These terms are governed by the laws of{" "}
        <strong>England and Wales</strong>. Any disputes arising from these terms
        shall be subject to the exclusive jurisdiction of the courts of England and
        Wales.
      </p>
    ),
  },
  {
    id: "changes",
    title: "11. Changes to Terms",
    body: (
      <p>
        Ashford Digital reserves the right to update these terms at any time.
        Clients will be notified of material changes via email with a minimum of{" "}
        <strong>14 days notice</strong> before changes take effect.
      </p>
    ),
  },
  {
    id: "acceptable-use",
    title: "12. Acceptable Use",
    body: (
      <p>
        The client agrees not to use their Ashford Digital website to promote
        illegal services, publish defamatory content, infringe third party
        intellectual property, or engage in any activity that violates UK law.
        Ashford Digital reserves the right to{" "}
        <strong>suspend or terminate services immediately and without refund</strong>{" "}
        if this clause is breached.
      </p>
    ),
  },
  {
    id: "force-majeure",
    title: "13. Force Majeure",
    body: (
      <p>
        Ashford Digital shall not be liable for any failure or delay in performing
        services caused by circumstances beyond our reasonable control, including
        but not limited to internet outages, third party platform failures
        (including <strong>Cloudflare, Stripe, or Resend</strong>), extreme weather,
        or illness.
      </p>
    ),
  },
  {
    id: "no-guarantee",
    title: "14. No Guarantee of Results",
    body: (
      <p>
        Apart from the Pro guarantee in clause 15, Ashford Digital makes{" "}
        <strong>no guarantee</strong> of specific business outcomes, search engine
        rankings, lead generation, or revenue as a result of the website provided.
        Website performance depends on factors outside our control including market
        conditions and client business operations.
      </p>
    ),
  },
  {
    id: "guarantee",
    title: "15. Pro Results Guarantee",
    body: (
      <>
        <p>
          If a Pro client does not receive their{" "}
          <strong>first tracked enquiry within 60 days of their site going live</strong>,
          Ashford Digital will provide the next <strong>3 months of the Pro plan free
          of charge</strong>. A tracked enquiry is a call, form or message that comes
          through the client's website or the Customer Engine and is recorded in the
          client's dashboard. The guarantee applies only when all of these are true:
        </p>
        <ul>
          {GUARANTEE.terms.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </>
    ),
  },
  {
    id: "privacy",
    title: "16. Privacy",
    body: (
      <>
        <p>
          When you ask for a demo or sign up, we collect the details you give us
          (such as your name, business name, town, phone number and email). We use
          them only to build your demo, provide your website and contact you about
          it. We never sell your details. Form submissions are stored securely with
          our hosting provider, <strong>Cloudflare</strong>, and payments are handled
          by <strong>Stripe</strong>.
        </p>
        <p>
          You can ask us to see, correct or delete your details at any time by
          emailing <strong>{SITE.email}</strong>.
        </p>
      </>
    ),
  },
  {
    id: "severability",
    title: "17. Severability",
    body: (
      <p>
        If any clause within these terms is found to be unenforceable or invalid
        under applicable law, that clause shall be modified to the minimum extent
        necessary to make it enforceable. The remaining clauses shall continue in
        full force and effect.
      </p>
    ),
  },
];

export default function Terms() {
  return (
    <article className="pt-32 pb-24 sm:pt-40">
      <div className="container-cs max-w-3xl">
        <motion.header
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-sm font-semibold uppercase tracking-widest text-accent">
            Legal
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight">
            Terms &amp; Conditions
          </h1>
          <p className="mt-3 text-sm text-mist">
            Ashford Digital · Sole trader, operated by R. Owen · Gainsborough,
            Lincolnshire · Last updated {lastUpdated}
          </p>
        </motion.header>

        {/* Quick reference */}
        <motion.nav
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-10 rounded-2xl border border-line bg-panel elev-sm p-6"
        >
          <h2 className="text-sm font-semibold text-cloud">Contents</h2>
          <ol className="mt-3 grid gap-x-6 gap-y-1.5 text-sm text-mist sm:grid-cols-2">
            {clauses.map((c) => (
              <li key={c.id}>
                <a href={`#${c.id}`} className="hover:text-accent">
                  {c.title}
                </a>
              </li>
            ))}
          </ol>
        </motion.nav>

        <div className="legal mt-12 space-y-10">
          {clauses.map((c, i) => (
            <motion.section
              key={c.id}
              id={c.id}
              className="scroll-mt-24"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: Math.min(i, 4) * 0.03 }}
            >
              <h2 className="text-xl font-semibold text-cloud">{c.title}</h2>
              <div className="mt-3 space-y-3 text-[0.95rem] leading-relaxed text-mist [&_a]:text-accent [&_li]:ml-1 [&_strong]:text-cloud [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5">
                {c.body}
              </div>
            </motion.section>
          ))}
        </div>

        <div className="mt-14 rounded-2xl border border-line bg-panel p-6 text-sm text-mist">
          <p>
            Questions about these Terms? Email{" "}
            <strong className="text-cloud">{SITE.email}</strong> and
            we’ll be happy to help before you sign up.
          </p>
        </div>
      </div>
    </article>
  );
}
