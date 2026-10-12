import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Arrow, Check, Lock } from "../components/Icons";
import { SITE, waHref } from "../lib/site";

interface DemoForm {
  name: string;
  business: string;
  town: string;
  phone: string;
  link: string;
  website: string; // honeypot: real people never see or fill this
}

const empty: DemoForm = { name: "", business: "", town: "", phone: "", link: "", website: "" };

type Status = "idle" | "sending" | "done" | "fallback";

const promises = [
  "Free, with no card needed",
  "Built from your Google listing",
  "Private: only you get the link",
  "Only pay if you want it",
];

export default function SeeYourSite() {
  const [form, setForm] = useState<DemoForm>(empty);
  const [plan, setPlan] = useState("");
  const [errors, setErrors] = useState<Partial<Record<keyof DemoForm, string>>>({});
  const [status, setStatus] = useState<Status>("idle");

  // Read ?plan= after the page loads, so the pre-built HTML always matches.
  useEffect(() => {
    const p = new URLSearchParams(window.location.search).get("plan");
    if (p && /^(Starter|Standard|Pro)$/.test(p)) setPlan(p);
  }, []);

  const set = (k: keyof DemoForm) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }));
  };

  function validate() {
    const e: typeof errors = {};
    if (!form.name.trim()) e.name = "Please add your name.";
    if (!form.business.trim()) e.business = "Please add your business name.";
    if (!form.town.trim()) e.town = "Please add your town.";
    if (!/^[0-9+()\s-]{10,}$/.test(form.phone.trim())) e.phone = "Please add a phone number we can reach you on.";
    setErrors(e);
    const first = Object.keys(e)[0];
    if (first) document.getElementById(`demo-${first}`)?.focus();
    return !first;
  }

  async function onSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    if (!validate()) return;
    setStatus("sending");
    try {
      const res = await fetch("/api/demo", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...form, plan }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("done");
    } catch {
      // Saving failed (e.g. storage not set up). Let the visitor send the
      // details themselves, so the request is never lost.
      setStatus("fallback");
    }
  }

  const summary = [
    `Demo request`,
    `Name: ${form.name}`,
    `Business: ${form.business}`,
    `Town: ${form.town}`,
    `Phone: ${form.phone}`,
    form.link && `Google listing / website: ${form.link}`,
    plan && `Interested in: ${plan}`,
  ]
    .filter(Boolean)
    .join("\n");

  return (
    <section className="relative overflow-hidden pt-28 pb-20 sm:pt-36">
      <div className="hero-glow" aria-hidden />
      <div className="container-cs relative grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
        <div>
          <p className="eyebrow">See your site first</p>
          <h1 className="mt-4 text-[clamp(2.2rem,1.5rem+3.4vw,3.75rem)] font-extrabold">
            See your new website before you pay anything.
          </h1>
          <p className="lead mt-6 max-w-xl">
            Tell us who you are and where you work. We'll build a private demo of your new site from
            your Google listing and get in touch with your link.
          </p>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {promises.map((p) => (
              <li key={p} className="flex gap-3">
                <span className="tick">
                  <Check width={13} height={13} aria-hidden />
                </span>
                {p}
              </li>
            ))}
          </ul>
          <p className="mt-8 hidden text-mist lg:block">
            Want to know what happens next? Read{" "}
            <Link to="/how-it-works" className="text-accent underline underline-offset-4">
              how it works
            </Link>{" "}
            or check the{" "}
            <Link to="/pricing" className="text-accent underline underline-offset-4">
              prices
            </Link>
            .
          </p>
        </div>

        <div className="card p-6 sm:p-8" aria-live="polite">
          {status === "done" ? (
            <div className="py-6 text-center">
              <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-brand text-on-brand">
                <Check width={28} height={28} aria-hidden />
              </div>
              <h2 className="mt-5 text-2xl font-bold">Thanks, {form.name.split(" ")[0]}.</h2>
              <p className="mt-3 text-mist">
                We've got your details. Robbie will build your demo for {form.business} and get in
                touch personally with your private link.
              </p>
              <Link to="/how-it-works" className="btn-ghost mt-6">
                See what happens next
              </Link>
            </div>
          ) : status === "fallback" ? (
            <div className="py-2">
              <h2 className="text-2xl font-bold">Nearly there.</h2>
              <p className="mt-3 text-mist">
                Our form couldn't save your details just now. Tap below to send them to us yourself.
                Nothing is sent until you press send.
              </p>
              <div className="mt-6 flex flex-col gap-3">
                <a
                  className="btn-primary"
                  href={`mailto:${SITE.email}?subject=${encodeURIComponent(
                    `Demo request: ${form.business}`
                  )}&body=${encodeURIComponent(summary)}`}
                >
                  Send by email <Arrow width={18} height={18} aria-hidden />
                </a>
                {SITE.whatsapp && (
                  <a className="btn-ghost" href={waHref(SITE.whatsapp, summary)} target="_blank" rel="noopener noreferrer">
                    Send on WhatsApp
                  </a>
                )}
                <button type="button" className="text-sm text-mist underline" onClick={() => setStatus("idle")}>
                  Go back and edit
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate>
              <h2 className="text-2xl font-bold">Get your free demo</h2>
              <p className="mt-1 text-mist">4 quick questions.</p>

              <div className="mt-6 space-y-5">
                <Field id="name" label="Your name" error={errors.name}>
                  <input id="demo-name" className="field-input" value={form.name} onChange={set("name")} autoComplete="name" aria-invalid={!!errors.name} aria-describedby={errors.name ? "err-name" : undefined} />
                </Field>
                <Field id="business" label="Business name" error={errors.business}>
                  <input id="demo-business" className="field-input" value={form.business} onChange={set("business")} autoComplete="organization" aria-invalid={!!errors.business} aria-describedby={errors.business ? "err-business" : undefined} />
                </Field>
                <Field id="town" label="Town you're based in" error={errors.town}>
                  <input id="demo-town" className="field-input" value={form.town} onChange={set("town")} autoComplete="address-level2" aria-invalid={!!errors.town} aria-describedby={errors.town ? "err-town" : undefined} />
                </Field>
                <Field id="phone" label="Mobile number" error={errors.phone}>
                  <input id="demo-phone" className="field-input" type="tel" inputMode="tel" value={form.phone} onChange={set("phone")} autoComplete="tel" aria-invalid={!!errors.phone} aria-describedby={errors.phone ? "err-phone" : undefined} />
                </Field>
                <Field id="link" label="Google listing or current website (optional)">
                  <input id="demo-link" className="field-input" value={form.link} onChange={set("link")} inputMode="url" placeholder="Paste a link if you have one" />
                </Field>
                {/* Honeypot for spam bots */}
                <div className="absolute -left-[9999px]" aria-hidden>
                  <label htmlFor="demo-website">Leave this empty</label>
                  <input id="demo-website" tabIndex={-1} autoComplete="off" value={form.website} onChange={set("website")} />
                </div>
              </div>

              {plan && (
                <p className="mt-5 text-sm text-mist">
                  Interested in: <span className="font-semibold text-cloud">{plan}</span>
                </p>
              )}

              <button type="submit" disabled={status === "sending"} className="btn-primary mt-6 w-full disabled:opacity-60">
                {status === "sending" ? "Sending…" : (
                  <>
                    Build my free demo <Arrow width={18} height={18} aria-hidden />
                  </>
                )}
              </button>
              <p className="mt-4 flex gap-2 text-sm text-mist">
                <Lock width={16} height={16} className="mt-0.5 shrink-0" aria-hidden />
                <span>
                  We only use your details to build your demo and contact you about it. See our{" "}
                  <Link to="/terms#privacy" className="text-accent underline underline-offset-4">
                    privacy notice
                  </Link>
                  .
                </span>
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="field-label" htmlFor={`demo-${id}`}>
        {label}
      </label>
      {children}
      {error && (
        <p id={`err-${id}`} className="mt-1.5 text-sm text-bad">
          {error}
        </p>
      )}
    </div>
  );
}
