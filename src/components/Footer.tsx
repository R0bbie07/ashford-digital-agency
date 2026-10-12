import { Link } from "react-router-dom";
import Logo from "./Logo";
import { Mail, Phone } from "./Icons";
import { SITE, telHref } from "../lib/site";

const groups = [
  {
    title: "Plans",
    links: [
      { label: "Pricing", to: "/pricing" },
      { label: "How it works", to: "/how-it-works" },
      { label: "See your site first", to: "/see-your-site-first" },
      { label: "Examples", to: "/examples" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", to: "/about" },
      { label: "FAQ", to: "/faq" },
      { label: "Contact", to: "/contact" },
      { label: "Terms & conditions", to: "/terms" },
    ],
  },
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-line bg-navy pb-24 text-mist lg:pb-0">
      <div className="container-cs grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Link to="/" className="inline-flex rounded-md" aria-label="Ashford Digital, home">
            <Logo className="h-9 w-auto text-cloud" />
          </Link>
          <p className="mt-5 max-w-sm text-[0.95rem]">
            Monthly websites for UK small businesses, built in {SITE.town}, {SITE.county}. See your
            site before you pay.
          </p>
          <ul className="mt-5 space-y-2 text-[0.95rem]">
            <li>
              <a href={`mailto:${SITE.email}`} className="inline-flex min-h-11 items-center gap-2 text-cloud hover:text-brand">
                <Mail width={18} height={18} aria-hidden /> {SITE.email}
              </a>
            </li>
            {SITE.phone && (
              <li>
                <a href={telHref(SITE.phone)} className="inline-flex min-h-11 items-center gap-2 text-cloud hover:text-brand">
                  <Phone width={18} height={18} aria-hidden /> {SITE.phone}
                </a>
              </li>
            )}
          </ul>
        </div>

        {groups.map((g) => (
          <div key={g.title}>
            <p className="mb-3 text-sm font-semibold text-cloud">{g.title}</p>
            <ul className="space-y-1">
              {g.links.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="inline-flex min-h-11 items-center hover:text-cloud">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-line">
        <div className="container-cs flex flex-col gap-2 py-6 text-sm sm:flex-row sm:justify-between">
          <span>© {year} Ashford Digital. All rights reserved.</span>
          <span>Sole trader, England &amp; Wales. Not a limited company.</span>
        </div>
      </div>
    </footer>
  );
}
