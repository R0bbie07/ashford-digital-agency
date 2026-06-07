import { useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Arrow, Check, Rocket } from "../components/Icons";
import { PLANS, SITE, TRADES, type PlanId } from "../lib/site";

interface FormState {
  fullName: string;
  businessName: string;
  tradeType: string;
  location: string;
  phone: string;
  email: string;
  plan: PlanId;
  hasDomain: "yes" | "no";
  domainName: string;
  about: string;
  services: string;
  social: string;
  colours: string[];
}

const defaultColours = ["#6d5cff", "#22d3ee", "#f5c451"];

const initialState = (plan: PlanId): FormState => ({
  fullName: "",
  businessName: "",
  tradeType: "",
  location: "",
  phone: "",
  email: "",
  plan,
  hasDomain: "no",
  domainName: "",
  about: "",
  services: "",
  social: "",
  colours: [...defaultColours],
});

type Status = "idle" | "submitting" | "success" | "error";

export default function Onboarding() {
  const [params] = useSearchParams();
  const planFromUrl = params.get("plan");
  const initialPlan: PlanId = planFromUrl === "Pro" ? "Pro" : "Standard";

  const [form, setForm] = useState<FormState>(initialState(initialPlan));
  const [logo, setLogo] = useState<File | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const fileRef = useRef<HTMLInputElement>(null);

  const selectedPlan = useMemo(
    () => PLANS.find((p) => p.id === form.plan)!,
    [form.plan]
  );

  const stripeLink =
    form.plan === "Pro" ? SITE.stripeProLink : SITE.stripeStandardLink;

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => {
      if (!e[key as string]) return e;
      const next = { ...e };
      delete next[key as string];
      return next;
    });
  }

  function setColour(index: number, value: string) {
    setForm((f) => {
      const colours = [...f.colours];
      colours[index] = value;
      return { ...f, colours };
    });
  }

  function onLogoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null;
    if (file) {
      const okType = /image\/(png|svg\+xml)/.test(file.type);
      if (!okType) {
        setErrors((er) => ({ ...er, logo: "Please upload a PNG or SVG file." }));
        setLogo(null);
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setErrors((er) => ({ ...er, logo: "Logo must be under 5 MB." }));
        setLogo(null);
        return;
      }
      setErrors((er) => {
        const n = { ...er };
        delete n.logo;
        return n;
      });
    }
    setLogo(file);
  }

  function validate(): boolean {
    const e: Record<string, string> = {};
    if (!form.fullName.trim()) e.fullName = "Required";
    if (!form.businessName.trim()) e.businessName = "Required";
    if (!form.tradeType.trim()) e.tradeType = "Required";
    if (!form.location.trim()) e.location = "Required";
    if (!form.phone.trim()) e.phone = "Required";
    else if (!/^[0-9+()\s-]{7,}$/.test(form.phone))
      e.phone = "Enter a valid phone number";
    if (!form.email.trim()) e.email = "Required";
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email))
      e.email = "Enter a valid email";
    if (form.hasDomain === "yes" && !form.domainName.trim())
      e.domainName = "Enter your domain name";
    if (!form.about.trim()) e.about = "Tell us a little about your business";
    if (!form.services.trim()) e.services = "Required";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function downloadJsonBackup() {
    // Literal local JSON file backup, saved to the client's device on submit.
    const backup = {
      submittedAt: new Date().toISOString(),
      ...form,
      logoFileName: logo?.name ?? null,
      pricePerMonth: selectedPlan.price,
    };
    const blob = new Blob([JSON.stringify(backup, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    const safe = form.businessName.replace(/[^a-z0-9]+/gi, "-").toLowerCase();
    a.href = url;
    a.download = `ashford-onboarding-${safe || "client"}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg("");
    if (!validate()) {
      const first = document.querySelector("[data-error='true']");
      first?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    setStatus("submitting");

    // Save a local JSON backup immediately, before the network call.
    try {
      downloadJsonBackup();
    } catch {
      /* non-fatal */
    }

    try {
      const fd = new FormData();
      fd.append("fullName", form.fullName);
      fd.append("businessName", form.businessName);
      fd.append("tradeType", form.tradeType);
      fd.append("location", form.location);
      fd.append("phone", form.phone);
      fd.append("email", form.email);
      fd.append("plan", form.plan);
      fd.append("pricePerMonth", String(selectedPlan.price));
      fd.append("hasDomain", form.hasDomain);
      fd.append("domainName", form.domainName);
      fd.append("about", form.about);
      fd.append("services", form.services);
      fd.append("social", form.social);
      fd.append("colours", form.colours.join(", "));
      if (logo) fd.append("logo", logo, logo.name);

      const res = await fetch("/api/onboard", { method: "POST", body: fd });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || `Submission failed (HTTP ${res.status})`);
      }
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMsg(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please email us directly."
      );
    }
  }

  /* --------------------------- Success screen --------------------------- */
  if (status === "success") {
    return (
      <section className="pt-28 pb-24">
        <div className="container-cs max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="rounded-3xl border border-line bg-panel/40 p-8 text-center sm:p-12"
          >
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-brand to-brand-2 text-white">
              <Check width={30} height={30} />
            </div>
            <h1 className="mt-6 text-3xl font-bold tracking-tight">
              You’re all set, {form.fullName.split(" ")[0] || "there"}!
            </h1>
            <p className="mt-3 text-mist">
              We’ve received your details for{" "}
              <strong className="text-cloud">{form.businessName}</strong> and a
              confirmation email is on its way to{" "}
              <strong className="text-cloud">{form.email}</strong>.
            </p>

            <div className="mt-8 rounded-2xl border border-line bg-ink-2/60 p-6 text-left">
              <h2 className="text-sm font-semibold text-cloud">
                What happens next
              </h2>
              <ol className="mt-4 space-y-4">
                {[
                  "Complete your first payment using the secure Stripe link below — this kicks off your build.",
                  "We design and build your website around the details you’ve given us.",
                  "Your professional site goes live within 24 hours of payment.",
                ].map((t, i) => (
                  <li key={i} className="flex gap-3 text-sm text-mist">
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand/20 text-xs font-semibold text-brand-2">
                      {i + 1}
                    </span>
                    <span>{t}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="mt-6 rounded-2xl border border-brand/40 bg-brand/10 p-5">
              <p className="text-sm text-cloud">
                <strong>24-hour delivery promise:</strong> once your first payment
                lands, your website will be live within 24 hours.
              </p>
            </div>

            <a
              href={stripeLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary mt-7 w-full"
            >
              Pay £{selectedPlan.price}/month & start my build{" "}
              <Arrow width={18} height={18} />
            </a>
            <p className="mt-3 text-xs text-mist">
              Secure payment via Stripe · {form.plan} plan · cancel anytime with
              30 days’ notice
            </p>
            <p className="mt-6 text-xs text-mist">
              A backup copy of your answers was saved to your device as a JSON
              file. Keep it safe — no action needed.
            </p>
          </motion.div>
        </div>
      </section>
    );
  }

  /* ------------------------------- Form -------------------------------- */
  const fieldError = (key: string) =>
    errors[key] ? (
      <p data-error="true" className="mt-1 text-xs text-[#ff7a7a]">
        {errors[key]}
      </p>
    ) : null;

  return (
    <section className="pt-28 pb-24">
      <div className="container-cs max-w-3xl">
        <motion.header
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-brand to-brand-2 text-white">
            <Rocket width={26} height={26} />
          </div>
          <h1 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">
            Let’s build your website
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-mist">
            This takes about 5 minutes. The more detail you give, the better your
            site will be. Your site goes live within 24 hours of payment.
          </p>
        </motion.header>

        <motion.form
          onSubmit={onSubmit}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-10 space-y-8"
          noValidate
        >
          {/* Plan selector */}
          <fieldset className="rounded-2xl border border-line bg-panel/40 p-6">
            <legend className="px-2 text-sm font-semibold text-cloud">
              Your plan
            </legend>
            <div className="mt-2 grid gap-3 sm:grid-cols-2">
              {PLANS.map((p) => {
                const active = form.plan === p.id;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => update("plan", p.id)}
                    className={`rounded-xl border p-4 text-left transition-all ${
                      active
                        ? "border-brand bg-brand/10 ring-1 ring-brand"
                        : "border-line bg-ink-2/50 hover:border-brand/40"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">{p.id}</span>
                      <span className="text-lg font-bold">
                        £{p.price}
                        <span className="text-xs font-normal text-mist">/mo</span>
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-mist">{p.blurb}</p>
                    {active && (
                      <span className="mt-2 inline-flex items-center gap-1 text-xs text-brand-2">
                        <Check width={13} height={13} /> Selected
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </fieldset>

          {/* Your details */}
          <fieldset className="rounded-2xl border border-line bg-panel/40 p-6">
            <legend className="px-2 text-sm font-semibold text-cloud">
              Your details
            </legend>
            <div className="mt-2 grid gap-5 sm:grid-cols-2">
              <div>
                <label className="field-label" htmlFor="fullName">
                  Full name
                </label>
                <input
                  id="fullName"
                  className="field-input"
                  value={form.fullName}
                  onChange={(e) => update("fullName", e.target.value)}
                  placeholder="John Smith"
                  autoComplete="name"
                />
                {fieldError("fullName")}
              </div>
              <div>
                <label className="field-label" htmlFor="businessName">
                  Business name
                </label>
                <input
                  id="businessName"
                  className="field-input"
                  value={form.businessName}
                  onChange={(e) => update("businessName", e.target.value)}
                  placeholder="Smith Electrical"
                />
                {fieldError("businessName")}
              </div>
              <div>
                <label className="field-label" htmlFor="tradeType">
                  Trade type
                </label>
                <select
                  id="tradeType"
                  className="field-select"
                  value={form.tradeType}
                  onChange={(e) => update("tradeType", e.target.value)}
                >
                  <option value="">Select your trade…</option>
                  {TRADES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
                {fieldError("tradeType")}
              </div>
              <div>
                <label className="field-label" htmlFor="location">
                  Location / areas covered
                </label>
                <input
                  id="location"
                  className="field-input"
                  value={form.location}
                  onChange={(e) => update("location", e.target.value)}
                  placeholder="Gainsborough & 20 miles around"
                />
                {fieldError("location")}
              </div>
              <div>
                <label className="field-label" htmlFor="phone">
                  Phone number
                </label>
                <input
                  id="phone"
                  className="field-input"
                  value={form.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  placeholder="07123 456789"
                  inputMode="tel"
                  autoComplete="tel"
                />
                {fieldError("phone")}
              </div>
              <div>
                <label className="field-label" htmlFor="email">
                  Email address
                </label>
                <input
                  id="email"
                  className="field-input"
                  type="email"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  placeholder="you@business.co.uk"
                  autoComplete="email"
                />
                {fieldError("email")}
              </div>
            </div>
          </fieldset>

          {/* Domain */}
          <fieldset className="rounded-2xl border border-line bg-panel/40 p-6">
            <legend className="px-2 text-sm font-semibold text-cloud">
              Domain
            </legend>
            <p className="field-label">Do you already have a domain name?</p>
            <div className="mt-1 flex gap-3">
              {(["no", "yes"] as const).map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => update("hasDomain", v)}
                  className={`flex-1 rounded-xl border px-4 py-3 text-sm font-medium capitalize transition-all ${
                    form.hasDomain === v
                      ? "border-brand bg-brand/10 ring-1 ring-brand"
                      : "border-line bg-ink-2/50 hover:border-brand/40"
                  }`}
                >
                  {v === "yes" ? "Yes, I have one" : "No, I need one"}
                </button>
              ))}
            </div>

            <AnimatePresence initial={false}>
              {form.hasDomain === "yes" ? (
                <motion.div
                  key="have-domain"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <div className="mt-5">
                    <label className="field-label" htmlFor="domainName">
                      Your domain name
                    </label>
                    <input
                      id="domainName"
                      className="field-input"
                      value={form.domainName}
                      onChange={(e) => update("domainName", e.target.value)}
                      placeholder="smithelectrical.co.uk"
                    />
                    {fieldError("domainName")}
                  </div>
                  <div className="mt-4 rounded-xl border border-line bg-ink-2/60 p-4 text-sm text-mist">
                    <p className="font-semibold text-cloud">
                      How to give us access to manage your DNS
                    </p>
                    <p className="mt-2">
                      We only need to manage your DNS — you keep full ownership of
                      the domain. Please log in to your domain registrar (e.g.
                      GoDaddy, 123 Reg, Namecheap, IONOS) and either:
                    </p>
                    <ul className="mt-2 list-disc space-y-1 pl-5">
                      <li>
                        Add us as a delegate / user with DNS permissions, then
                        email the invite to {SITE.email}; or
                      </li>
                      <li>
                        Send us a secure note with your registrar login so we can
                        point the nameservers to Cloudflare. We’ll guide you
                        step-by-step after you submit.
                      </li>
                    </ul>
                    <p className="mt-2">
                      Never email passwords in plain text — we’ll send you a secure
                      method once you’re onboarded.
                    </p>
                  </div>
                </motion.div>
              ) : (
                <motion.p
                  key="need-domain"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="mt-4 overflow-hidden rounded-xl border border-line bg-ink-2/60 p-4 text-sm text-mist"
                >
                  No problem — we’ll suggest and register a great domain for your
                  business and manage everything. You’ll own it from day one.
                </motion.p>
              )}
            </AnimatePresence>
          </fieldset>

          {/* Branding */}
          <fieldset className="rounded-2xl border border-line bg-panel/40 p-6">
            <legend className="px-2 text-sm font-semibold text-cloud">
              Branding
            </legend>

            <div className="mt-2">
              <label className="field-label">Logo (PNG or SVG)</label>
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => fileRef.current?.click()}
                  className="btn-ghost !py-2.5 text-sm"
                >
                  {logo ? "Change file" : "Upload logo"}
                </button>
                <span className="text-sm text-mist">
                  {logo ? logo.name : "Optional — PNG or SVG, up to 5 MB"}
                </span>
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/png,image/svg+xml,.png,.svg"
                  className="hidden"
                  onChange={onLogoChange}
                />
              </div>
              {fieldError("logo")}
            </div>

            <div className="mt-6">
              <label className="field-label">
                Brand colours (up to 3 — pick what fits your business)
              </label>
              <div className="flex flex-wrap gap-4">
                {form.colours.map((c, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <input
                      type="color"
                      aria-label={`Brand colour ${i + 1}`}
                      value={c}
                      onChange={(e) => setColour(i, e.target.value)}
                      className="h-11 w-11 cursor-pointer rounded-lg border border-line bg-transparent p-1"
                    />
                    <input
                      type="text"
                      value={c}
                      onChange={(e) => setColour(i, e.target.value)}
                      className="field-input !w-28 !py-2 text-xs uppercase"
                    />
                  </div>
                ))}
              </div>
            </div>
          </fieldset>

          {/* About + services */}
          <fieldset className="rounded-2xl border border-line bg-panel/40 p-6">
            <legend className="px-2 text-sm font-semibold text-cloud">
              About your business
            </legend>
            <div className="mt-2 space-y-5">
              <div>
                <label className="field-label" htmlFor="about">
                  Tell us about your business (3–5 sentences)
                </label>
                <textarea
                  id="about"
                  className="field-textarea"
                  value={form.about}
                  onChange={(e) => update("about", e.target.value)}
                  placeholder="e.g. We’re a family-run electrical firm with 15 years’ experience serving homes and landlords across Lincolnshire. NICEIC registered, fully insured, and known for tidy work and fair prices…"
                />
                {fieldError("about")}
              </div>
              <div>
                <label className="field-label" htmlFor="services">
                  Services you offer
                </label>
                <textarea
                  id="services"
                  className="field-textarea !min-h-[90px]"
                  value={form.services}
                  onChange={(e) => update("services", e.target.value)}
                  placeholder="e.g. Rewiring, fuse board upgrades, EV charger installation, landlord certificates, fault finding…"
                />
                {fieldError("services")}
              </div>
              <div>
                <label className="field-label" htmlFor="social">
                  Existing social media links (optional)
                </label>
                <input
                  id="social"
                  className="field-input"
                  value={form.social}
                  onChange={(e) => update("social", e.target.value)}
                  placeholder="Facebook, Instagram, etc. — paste links separated by commas"
                />
              </div>
            </div>
          </fieldset>

          {status === "error" && (
            <div className="rounded-xl border border-[#ff7a7a]/40 bg-[#ff7a7a]/10 p-4 text-sm text-[#ffb4b4]">
              {errorMsg}{" "}
              <a href={`mailto:${SITE.email}`} className="underline">
                Email us instead
              </a>
              .
            </div>
          )}

          <div className="space-y-3">
            <button
              type="submit"
              disabled={status === "submitting"}
              className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === "submitting" ? (
                "Sending…"
              ) : (
                <>
                  Submit &amp; continue to payment{" "}
                  <Arrow width={18} height={18} />
                </>
              )}
            </button>
            <p className="text-center text-xs text-mist">
              By submitting you agree to our{" "}
              <a href="/terms" className="text-brand-2 hover:underline">
                Terms &amp; Conditions
              </a>
              . You’ll pay your first month securely via Stripe before we build.
            </p>
          </div>
        </motion.form>
      </div>
    </section>
  );
}
