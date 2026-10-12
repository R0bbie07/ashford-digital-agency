import { useEffect } from "react";
import { Link, Routes, Route, useLocation } from "react-router-dom";
import { MotionConfig } from "framer-motion";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import StickyBar from "./components/StickyBar";
import Home from "./pages/Home";
import Pricing from "./pages/Pricing";
import HowItWorks from "./pages/HowItWorks";
import SeeYourSite from "./pages/SeeYourSite";
import Examples from "./pages/Examples";
import About from "./pages/About";
import Faq from "./pages/Faq";
import Contact from "./pages/Contact";
import Terms from "./pages/Terms";
import Onboarding from "./pages/Onboarding";
import { DemoButton } from "./components/ui";
import { metaFor } from "./lib/seo";

/** Scrolls to the top (or to #hash) and updates the title on each page change. */
function RouteEffects() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    const meta = metaFor(pathname);
    document.title = meta.title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", meta.description);

    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ block: "start" });
        return;
      }
    }
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname, hash]);

  return null;
}

function NotFound() {
  return (
    <section className="container-cs flex min-h-[70vh] flex-col items-center justify-center pt-24 text-center">
      <p className="font-display text-7xl font-extrabold text-brand">404</p>
      <h1 className="mt-4 text-3xl font-bold">That page doesn't exist.</h1>
      <p className="mt-3 text-mist">It may have moved. Try the home page, or get your free demo.</p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <DemoButton />
        <Link to="/" className="btn-ghost">
          Back to home
        </Link>
      </div>
    </section>
  );
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <RouteEffects />
      <Nav />
      <main id="main" tabIndex={-1} className="outline-none">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/see-your-site-first" element={<SeeYourSite />} />
          <Route path="/examples" element={<Examples />} />
          <Route path="/about" element={<About />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <StickyBar />
    </MotionConfig>
  );
}
