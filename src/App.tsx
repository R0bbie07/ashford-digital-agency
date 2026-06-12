import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Terms from "./pages/Terms";
import Onboarding from "./pages/Onboarding";

function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
    }
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname, hash]);

  return null;
}

export default function App() {
  return (
    <>
      <ScrollManager />
      <Nav />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route
            path="*"
            element={
              <div className="container-cs flex min-h-[70vh] flex-col items-center justify-center text-center">
                <p className="text-6xl font-bold text-gradient">404</p>
                <p className="mt-3 text-mist">That page doesn’t exist.</p>
                <a href="/" className="btn-primary mt-6">
                  Back home
                </a>
              </div>
            }
          />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
