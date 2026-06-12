import { motion } from "framer-motion";

interface Clause {
  id: string;
  title: string;
  body: React.ReactNode;
}

const lastUpdated = "6 June 2026";

const clauses: Clause[] = [
  {
    id: "about",
    title: "1. About these Terms",
    body: (
      <>
        <p>
          These Terms and Conditions (“<strong>Terms</strong>”) govern the
          supply of website design, hosting and related services by Ashford
          Digital (“<strong>we</strong>”, “<strong>us</strong>”, “
          <strong>our</strong>”) to you, the client (“<strong>you</strong>”,
          “<strong>your</strong>”). By placing an order, completing our
          onboarding form, or making your first monthly payment, you agree to be
          bound by these Terms.
        </p>
        <p>
          Ashford Digital is operated by <strong>Robbie Owen</strong> as a
          sole trader, of <strong>DN21 5JJ</strong>. You can contact us at{" "}
          <strong>ashforddigital10@gmail.com</strong>.
        </p>
      </>
    ),
  },
  {
    id: "sole-trader",
    title: "2. Sole Trader Declaration",
    body: (
      <p>
        Ashford Digital is a trading name used by <strong>Robbie Owen</strong>{" "}
        operating as a <strong>sole trader</strong>. Ashford Digital is{" "}
        <strong>not</strong> a limited company and is not registered at Companies
        House. All obligations, rights and liabilities under these Terms are
        those of the sole trader, subject to the limitations set out below.
      </p>
    ),
  },
  {
    id: "services",
    title: "3. Our Services & Plans",
    body: (
      <>
        <p>We offer two monthly subscription plans:</p>
        <ul>
          <li>
            <strong>Standard — £80 per month:</strong> a professional website,
            hosting on Cloudflare Pages, domain management (DNS configuration and
            maintenance), and ongoing updates to your website content as
            reasonably requested.
          </li>
          <li>
            <strong>Pro — £120 per month:</strong> everything in the Standard
            plan, plus initial Google Business Profile set-up and local SEO
            foundations (meta titles, meta descriptions, and a consistent Name,
            Address and Phone number across your website and Google Business
            Profile).
          </li>
        </ul>
        <p>
          Work outside the scope described above (for example e-commerce systems,
          bespoke web applications, professional copywriting, photography, or
          paid advertising management) is not included and may be quoted
          separately by written agreement.
        </p>
      </>
    ),
  },
  {
    id: "payment",
    title: "4. Payment Terms",
    body: (
      <>
        <p>
          Fees are <strong>£80 per month</strong> (Standard) or{" "}
          <strong>£120 per month</strong> (Pro), depending on the plan you
          select. All fees are payable monthly in advance.
        </p>
        <p>
          Payment is collected by recurring card payment via{" "}
          <strong>Stripe</strong>. Your payment is due on the{" "}
          <strong>same date each month</strong> as your first payment (for
          example, if your first payment is taken on the 12th, future payments
          will be due on the 12th of each month). Work on a new website will not
          begin until your first monthly payment has been received.
        </p>
        <p>
          You are responsible for keeping your payment details up to date. All
          prices are in pounds sterling (GBP).
        </p>
      </>
    ),
  },
  {
    id: "late",
    title: "5. Late Payment",
    body: (
      <p>
        If any sum due under these Terms is not paid on its due date, we reserve
        the right to charge statutory interest on the overdue amount at a rate of{" "}
        <strong>8% per annum above the Bank of England base rate</strong>, in
        accordance with the Late Payment of Commercial Debts (Interest) Act 1998,
        calculated daily from the due date until payment is received in full.
        Where payment remains overdue, we may suspend our services (including, where
        applicable, temporarily taking your website offline) until all
        outstanding sums are paid. Suspension does not relieve you of the
        obligation to pay accrued fees.
      </p>
    ),
  },
  {
    id: "no-guarantee",
    title: "6. No Guarantee of Results",
    body: (
      <p>
        We perform all services with reasonable care and skill. However, we give{" "}
        <strong>no guarantee or warranty</strong> as to any particular result,
        including but not limited to the number of enquiries, telephone calls,
        leads, sales, or your position in Google or other search engine rankings.
        Search engine results, Google Business Profile visibility and customer
        behaviour are controlled by third parties and are outside our control.
      </p>
    ),
  },
  {
    id: "liability",
    title: "7. Limitation of Liability",
    body: (
      <>
        <p>
          To the fullest extent permitted by law, our total aggregate liability
          to you arising out of or in connection with these Terms — whether in
          contract, tort (including negligence), breach of statutory duty or
          otherwise — shall be <strong>limited to a sum equal to one (1) month
          of the fees you have paid</strong> under these Terms.
        </p>
        <p>
          We shall not be liable for any indirect, special or consequential loss,
          nor for loss of profit, loss of business, loss of goodwill or loss of
          data. Nothing in these Terms excludes or limits our liability for death
          or personal injury caused by our negligence, for fraud or fraudulent
          misrepresentation, or for any other liability that cannot lawfully be
          excluded or limited.
        </p>
      </>
    ),
  },
  {
    id: "cancellation",
    title: "8. Cancellation",
    body: (
      <p>
        Either party may cancel the subscription by giving the other{" "}
        <strong>30 days’ written notice</strong> (email is sufficient). Fees
        remain payable throughout the notice period. No refund is given for the
        month in progress at the point notice is given. On cancellation, your
        rights in the website are determined by clause 9 below.
      </p>
    ),
  },
  {
    id: "ip",
    title: "9. Intellectual Property & Website Ownership",
    body: (
      <>
        <p>
          All intellectual property rights in the website we create for you
          (including design files, code and layouts created by us) remain our
          property until you have paid for{" "}
          <strong>six (6) consecutive months</strong> of the subscription.
        </p>
        <p>
          Upon completion of six consecutive months of paid subscription,
          ownership of the completed website and its custom design assets
          transfers to you. If the subscription is cancelled before six
          consecutive monthly payments have been made, intellectual property in
          the website remains with us, and you have no right to retain, copy or
          re-host it. Third-party components and licensed assets remain subject to
          their own licence terms.
        </p>
      </>
    ),
  },
  {
    id: "domain",
    title: "10. Domain Ownership",
    body: (
      <p>
        You own your domain name <strong>at all times</strong>. Where we register
        or manage a domain on your behalf, we do so as your agent. We manage DNS
        configuration only and claim no ownership of your domain. On request, we
        will provide the information needed to transfer your domain to you or to
        another registrar.
      </p>
    ),
  },
  {
    id: "google-business",
    title: "11. Google Business Profile (Pro Plan)",
    body: (
      <p>
        Where you are on the Pro plan, we will carry out the{" "}
        <strong>initial set-up only</strong> of your Google Business Profile and
        local SEO foundations. Ongoing management of your Google Business Profile
        (including responding to reviews, posting updates, or making frequent
        changes) is <strong>not included</strong> and may be arranged separately
        by written agreement.
      </p>
    ),
  },
  {
    id: "responsibilities",
    title: "12. Your Responsibilities",
    body: (
      <p>
        You agree to provide accurate business information, content, imagery and
        timely responses needed for us to perform the services. You warrant that
        any materials you supply to us do not infringe the rights of any third
        party, and you agree to indemnify us against any claim arising from
        materials you provide.
      </p>
    ),
  },
  {
    id: "data",
    title: "13. Data Protection",
    body: (
      <p>
        We process personal data in accordance with the UK General Data
        Protection Regulation (UK GDPR) and the Data Protection Act 2018. We use
        the information you provide solely to deliver and support our services. We
        do not sell your data. Payment card details are handled securely by Stripe
        and are not stored by us.
      </p>
    ),
  },
  {
    id: "law",
    title: "14. Governing Law & Jurisdiction",
    body: (
      <p>
        These Terms and any dispute or claim arising out of or in connection with
        them shall be governed by and construed in accordance with the law of{" "}
        <strong>England and Wales</strong>. The parties submit to the exclusive
        jurisdiction of the courts of England and Wales.
      </p>
    ),
  },
  {
    id: "general",
    title: "15. General",
    body: (
      <p>
        These Terms constitute the entire agreement between us and supersede any
        prior arrangements. Any variation must be agreed in writing. If any
        provision is found to be unenforceable, the remaining provisions continue
        in full force. Our failure to enforce any right is not a waiver of that
        right.
      </p>
    ),
  },
];

export default function Terms() {
  return (
    <article className="pt-28 pb-24">
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
            Ashford Digital · Sole trader · Last updated {lastUpdated}
          </p>
        </motion.header>

        {/* Quick reference */}
        <motion.nav
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-10 rounded-2xl border border-line bg-white elev-sm p-6"
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

        <div className="mt-14 rounded-2xl border border-line bg-ink-2/60 p-6 text-sm text-mist">
          <p>
            Questions about these Terms? Email{" "}
            <strong className="text-cloud">ashforddigital10@gmail.com</strong> and we’ll be
            happy to help before you sign up.
          </p>
        </div>
      </div>
    </article>
  );
}
