import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "./Logo";
import { Arrow } from "./Icons";

export const NAV_LINKS = [
  { label: "Pricing", to: "/pricing" },
  { label: "How it works", to: "/how-it-works" },
  { label: "Examples", to: "/examples" },
  { label: "FAQ", to: "/faq" },
  { label: "About", to: "/about" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open ? "glass" : "border-b border-transparent"
      }`}
    >
      <nav className="container-cs flex h-[4.5rem] items-center justify-between gap-6" aria-label="Main">
        <Link to="/" className="flex items-center rounded-md" aria-label="Ashford Digital, home">
          <Logo className="h-8 w-auto text-cloud sm:h-9" title="Ashford Digital" />
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `rounded-lg px-3 py-2 text-[0.95rem] transition-colors hover:text-cloud ${
                  isActive ? "text-cloud" : "text-mist"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Link to="/see-your-site-first" className="btn-primary hidden !min-h-11 !px-4 !py-2 text-sm sm:inline-flex">
            See your site first <Arrow width={16} height={16} aria-hidden />
          </Link>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
            className="flex h-11 w-11 flex-col items-center justify-center gap-1.5 rounded-xl border border-line-2 lg:hidden"
          >
            <span className={`h-0.5 w-5 bg-cloud transition-transform ${open ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`h-0.5 w-5 bg-cloud transition-opacity ${open ? "opacity-0" : ""}`} />
            <span className={`h-0.5 w-5 bg-cloud transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`} />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="overflow-hidden lg:hidden"
          >
            <div className="container-cs flex flex-col gap-1 pb-6 pt-2">
              {[...NAV_LINKS, { label: "Contact", to: "/contact" }].map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  className="rounded-xl px-3 py-3.5 text-lg text-cloud hover:bg-panel"
                >
                  {l.label}
                </Link>
              ))}
              <Link to="/see-your-site-first" className="btn-primary mt-3">
                See your site first <Arrow width={18} height={18} aria-hidden />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
