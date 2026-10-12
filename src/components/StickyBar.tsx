import { Link, useLocation } from "react-router-dom";
import { Arrow, Chat, Phone } from "./Icons";
import { SITE, telHref, waHref } from "../lib/site";

/**
 * Phone/tablet bar pinned to the bottom of the screen: the main demo button,
 * plus Call and WhatsApp when those numbers are set in src/lib/site.ts.
 * Hidden on the demo and onboarding pages, which have their own form.
 */
export default function StickyBar() {
  const { pathname } = useLocation();
  if (pathname === "/see-your-site-first" || pathname === "/onboarding") return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-ink/95 px-3 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur lg:hidden">
      <div className="mx-auto flex max-w-xl gap-2">
        {SITE.phone && (
          <a href={telHref(SITE.phone)} className="btn-ghost !px-4" aria-label={`Call ${SITE.phone}`}>
            <Phone width={20} height={20} aria-hidden /> Call
          </a>
        )}
        {SITE.whatsapp && (
          <a
            href={waHref(SITE.whatsapp)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost !px-4"
            aria-label="Message us on WhatsApp"
          >
            <Chat width={20} height={20} aria-hidden />
          </a>
        )}
        <Link to="/see-your-site-first" className="btn-primary flex-1">
          See your site first <Arrow width={18} height={18} aria-hidden />
        </Link>
      </div>
    </div>
  );
}
