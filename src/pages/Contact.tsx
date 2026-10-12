import { Link } from "react-router-dom";
import { DemoButton, PageHero } from "../components/ui";
import { Chat, Mail, Phone, Pin } from "../components/Icons";
import { SITE, telHref, waHref } from "../lib/site";

export default function Contact() {
  const ways = [
    { icon: Mail, label: "Email", value: SITE.email, href: `mailto:${SITE.email}` },
    SITE.phone && { icon: Phone, label: "Phone", value: SITE.phone, href: telHref(SITE.phone) },
    SITE.whatsapp && {
      icon: Chat,
      label: "WhatsApp",
      value: "Start a chat",
      href: waHref(SITE.whatsapp),
    },
  ].filter(Boolean) as { icon: typeof Mail; label: string; value: string; href: string }[];

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Talk to Robbie."
        intro="Questions about a plan, your demo or your existing site? Get in touch and you'll hear back from Robbie, not a call centre."
      />

      <section className="pb-20">
        <div className="container-cs grid gap-5 md:grid-cols-2">
          {ways.map((w) => (
            <a
              key={w.label}
              href={w.href}
              {...(w.label === "WhatsApp" ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="card card-hover flex items-center gap-5 p-6"
            >
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-brand/15 text-brand">
                <w.icon width={24} height={24} aria-hidden />
              </span>
              <span>
                <span className="block text-sm text-mist">{w.label}</span>
                <span className="block break-all text-lg font-semibold">{w.value}</span>
              </span>
            </a>
          ))}
          <div className="card flex items-center gap-5 p-6">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-brand/15 text-brand">
              <Pin width={24} height={24} aria-hidden />
            </span>
            <span>
              <span className="block text-sm text-mist">Based in</span>
              <span className="block text-lg font-semibold">
                {SITE.town}, {SITE.county}
              </span>
              <span className="block text-sm text-mist">Working with businesses across the UK</span>
            </span>
          </div>
        </div>

        <div className="container-cs mt-10">
          <div className="card flex flex-col items-start gap-5 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <div>
              <p className="text-xl font-bold">Quickest way to see what we'd build?</p>
              <p className="mt-1 text-mist">
                Ask for your free demo. Or read the{" "}
                <Link to="/faq" className="text-accent underline underline-offset-4">
                  FAQ
                </Link>{" "}
                first.
              </p>
            </div>
            <DemoButton className="w-full sm:w-auto" />
          </div>
        </div>
      </section>
    </>
  );
}
