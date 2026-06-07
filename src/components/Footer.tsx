import { Link } from "react-router-dom";
import { Mail } from "./Icons";
import { SITE } from "../lib/site";
import logo from "../assets/ashford-logo-dark.png";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-line bg-ink-2/60">
      <div className="container-cs grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Link to="/" className="inline-flex items-center" aria-label="Ashford Digital — home">
            <img
              src={logo}
              alt="Ashford Digital"
              className="w-auto"
              style={{ height: 44 }}
            />
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-mist">
            Professional websites and local SEO for UK trades — electricians,
            plumbers, gas engineers and builders. Built to win you work.
          </p>
          <a
            href={`mailto:${SITE.email}`}
            className="mt-5 inline-flex items-center gap-2 text-sm text-cloud hover:text-brand-2"
          >
            <Mail width={16} height={16} />
            {SITE.email}
          </a>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-semibold text-cloud">Explore</h4>
          <ul className="space-y-3 text-sm text-mist">
            <li>
              <a href="/#services" className="hover:text-cloud">
                Services
              </a>
            </li>
            <li>
              <a href="/#pricing" className="hover:text-cloud">
                Pricing
              </a>
            </li>
            <li>
              <a href="/#proof" className="hover:text-cloud">
                Results
              </a>
            </li>
            <li>
              <Link to="/onboarding" className="hover:text-cloud">
                Get started
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-semibold text-cloud">Legal</h4>
          <ul className="space-y-3 text-sm text-mist">
            <li>
              <Link to="/terms" className="hover:text-cloud">
                Terms &amp; Conditions
              </Link>
            </li>
            <li className="text-mist/70">Sole trader · England &amp; Wales</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="container-cs flex flex-col items-center justify-between gap-2 py-6 text-xs text-mist sm:flex-row">
          <span>© {year} Ashford Digital. All rights reserved.</span>
          <span>Operated as a sole trader. Not a limited company.</span>
        </div>
      </div>
    </footer>
  );
}
