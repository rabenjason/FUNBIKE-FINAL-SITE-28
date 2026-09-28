import { useEffect, useState } from "react";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { Footer, Header, type Route } from "./components/Layout";
import CatChat from "./components/CatChat";
import CookieConsent, { readConsent } from "./components/CookieConsent";
import { RouteProgress, SplashLoader } from "./components/Loaders";
import Home from "./pages/Home";
import { Catalogue, Pieces } from "./pages/Catalog";
import Product from "./pages/Product";
import Contact from "./pages/Contact";

const FIRST_HERO =
  "https://funbike.mg/wp-content/uploads/2026/02/01-250-SEF-FACTORY-2026-3679x2456-1-1920x1080-1.jpg";

export default function App() {
  const [dark, setDark] = useState(
    () =>
      localStorage.getItem("fb-theme") === "dark" ||
      (!localStorage.getItem("fb-theme") && window.matchMedia("(prefers-color-scheme: dark)").matches),
  );
  const [route, setRoute] = useState<Route>({ page: "home" });
  const [booting, setBooting] = useState(true);
  const [cookieOpen, setCookieOpen] = useState(false);
  const [progressKey, setProgressKey] = useState(0);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("fb-theme", dark ? "dark" : "light");
  }, [dark]);

  // Fast splash: wait for the first hero photo (min 650 ms, max 1.6 s)
  useEffect(() => {
    let done = false;
    const start = performance.now();
    const finish = () => {
      if (done) return;
      done = true;
      const wait = Math.max(0, 650 - (performance.now() - start));
      window.setTimeout(() => setBooting(false), wait);
    };
    const img = new Image();
    img.onload = finish;
    img.onerror = finish;
    img.src = FIRST_HERO;
    const cap = window.setTimeout(finish, 1600);
    return () => {
      done = true;
      window.clearTimeout(cap);
    };
  }, []);

  // Cookie banner appears once the splash is gone, only if no choice was saved
  useEffect(() => {
    if (booting || readConsent()) return;
    const timer = window.setTimeout(() => setCookieOpen(true), 500);
    return () => window.clearTimeout(timer);
  }, [booting]);

  function go(page: string, id?: string) {
    setRoute({ page, id });
    setProgressKey((k) => k + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <MotionConfig reducedMotion="user">
      <SplashLoader show={booting} />
      {progressKey > 0 && <RouteProgress key={progressKey} />}

      <div className="min-h-screen bg-white text-[#171816] transition-colors duration-300 dark:bg-[#141513] dark:text-[#f2f0ea]">
        <Header route={route} go={go} dark={dark} toggle={() => setDark((d) => !d)} />
        <main>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={`${route.page}-${route.id ?? ""}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              {route.page === "home" && <Home go={go} />}
              {route.page === "catalogue" && <Catalogue go={go} />}
              {route.page === "motos" && <Catalogue go={go} motosOnly />}
              {route.page === "pieces" && <Pieces go={go} initialBrand={route.id} />}
              {route.page === "product" && <Product id={route.id} go={go} />}
              {route.page === "contact" && <Contact />}
            </motion.div>
          </AnimatePresence>
        </main>
        <Footer go={go} onCookies={() => setCookieOpen(true)} />
        <CatChat hiddenOnMobile={cookieOpen} />
        <CookieConsent open={cookieOpen} onClose={() => setCookieOpen(false)} />
      </div>
    </MotionConfig>
  );
}
