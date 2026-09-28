import { useState, type ReactNode } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faArrowUp,
  faBars,
  faCookieBite,
  faEnvelope,
  faGears,
  faLocationDot,
  faMoon,
  faMotorcycle,
  faPhone,
  faSun,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { AnimatePresence, motion } from "framer-motion";
import { BRANDS, LOGO } from "../data";

export type Route = { page: string; id?: string };

export const NAV = [
  { key: "home", label: "Accueil" },
  { key: "catalogue", label: "Catalogue" },
  { key: "motos", label: "Motos" },
  { key: "pieces", label: "Équipements" },
  { key: "contact", label: "Contact" },
];

function BrandMark({ large = false }: { large?: boolean }) {
  return (
    <img
      src={LOGO}
      alt="Funbike Madagascar"
      className={
        "logo-clean block w-auto object-contain " +
        (large
          ? "h-[clamp(2.5rem,2.1rem+1.2vw,3.5rem)] max-w-[210px]"
          : "h-[clamp(1.85rem,1.65rem+0.6vw,2.3rem)] max-w-[150px]")
      }
    />
  );
}

export function Header({
  route,
  go,
  dark,
  toggle,
}: {
  route: Route;
  go: (p: string, id?: string) => void;
  dark: boolean;
  toggle: () => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <header className="glass-header sticky top-0 z-40 border-b border-black/10 dark:border-white/10">
      <div className="mx-auto flex h-[64px] max-w-[1440px] items-center gap-4 px-4 sm:h-[68px] sm:px-7 lg:px-10">
        <button onClick={() => go("home")} aria-label="Funbike, accueil" className="shrink-0">
          <BrandMark />
        </button>

        <nav className="ml-auto hidden h-full items-center gap-7 lg:flex">
          {NAV.map((item) => {
            const active = route.page === item.key || (route.page === "product" && item.key === "motos");
            return (
              <button
                key={item.key}
                onClick={() => go(item.key)}
                className={
                  "fluid-btn relative flex h-full items-center font-bold uppercase transition-colors " +
                  (active
                    ? "text-[#171816] dark:text-[#f2f0ea]"
                    : "text-black/45 hover:text-black dark:text-white/50 dark:hover:text-white")
                }
              >
                {item.label}
                {active && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-x-0 bottom-0 h-[2px] bg-[#ffd100]"
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  />
                )}
              </button>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-2 lg:ml-7">
          <ThemeToggle dark={dark} toggle={toggle} />
          <button
            onClick={() => setOpen((value) => !value)}
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            className="grid h-9 w-9 place-items-center border border-black/15 text-sm text-[#171816] lg:hidden dark:border-white/15 dark:text-white"
          >
            <FontAwesomeIcon icon={open ? faXmark : faBars} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="glass-header overflow-hidden border-t border-black/10 lg:hidden dark:border-white/10"
          >
            <div className="px-4 pb-4 pt-2">
              {NAV.map((item, index) => (
                <motion.button
                  key={item.key}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.035 }}
                  onClick={() => {
                    go(item.key);
                    setOpen(false);
                  }}
                  className="fluid-h3 flex w-full items-center justify-between border-b border-black/10 py-3.5 text-left font-display font-semibold text-[#171816] dark:border-white/10 dark:text-white"
                >
                  {item.label}
                  <FontAwesomeIcon icon={faArrowRight} className="text-xs text-[#a27b17]" />
                </motion.button>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

export function ThemeToggle({ dark, toggle }: { dark: boolean; toggle: () => void }) {
  return (
    <button
      onClick={toggle}
      aria-label={dark ? "Activer le mode jour" : "Activer le mode nuit"}
      className="glass-panel grid h-9 w-9 place-items-center border-black/10 text-sm text-[#171816] transition hover:border-[#ffd100] hover:text-[#a57d14] dark:border-white/15 dark:text-white dark:hover:border-[#ffd100] dark:hover:text-[#ffd100]"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={dark ? "moon" : "sun"}
          initial={{ opacity: 0, rotate: -45, scale: 0.75 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 45, scale: 0.75 }}
          transition={{ duration: 0.18 }}
          className="grid place-items-center"
        >
          <FontAwesomeIcon icon={dark ? faMoon : faSun} />
        </motion.span>
      </AnimatePresence>
    </button>
  );
}

export function Footer({ go, onCookies }: { go: (p: string, id?: string) => void; onCookies: () => void }) {
  const label = "fluid-eyebrow mb-3 font-bold uppercase text-[#98741b] dark:text-[#ffd100]";
  const icon = "text-[#98741b] dark:text-[#ffd100]";

  function scrollTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <footer className="relative mt-14 overflow-hidden border-t-[3px] border-[#ffd100] bg-gradient-to-b from-[#fffdf4] via-[#fff9df] to-[#fdf4c7] text-[#171816] dark:from-[#161714] dark:via-[#121310] dark:to-[#0d0e0c] dark:text-[#f2f0ea]">
      {/* Subtle ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-[#ffd100]/25 blur-3xl dark:bg-[#ffd100]/10"
      />

      <div className="relative mx-auto max-w-[1440px] px-4 pb-24 pt-9 sm:px-7 sm:pb-14 sm:pt-14 lg:px-10">
        {/* TOP GLASS CTA BANNER — super compact & punchy on mobile */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.4 }}
          className="glass-panel mb-8 flex flex-col justify-between gap-4 rounded-2xl p-4 sm:mb-12 sm:flex-row sm:items-center sm:p-6"
        >
          <div className="min-w-0">
            <span className="fluid-eyebrow inline-flex items-center gap-2 font-bold uppercase text-[#98741b] dark:text-[#ffd100]">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
              Showroom & Atelier · Antananarivo
            </span>
            <h3 className="fluid-h2 mt-1 font-display font-semibold text-[#171816] dark:text-[#f2f0ea]">
              Prêt à essayer votre prochaine moto ?
            </h3>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:shrink-0">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => go("contact")}
              className="fluid-btn inline-flex min-h-10 flex-1 items-center justify-center gap-2 rounded-xl bg-[#ffd100] px-4 py-2.5 font-extrabold uppercase text-[#171816] shadow-sm transition hover:bg-[#ffe36b] sm:flex-initial sm:px-5"
            >
              Demander un devis <FontAwesomeIcon icon={faArrowRight} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => go("motos")}
              className="fluid-btn inline-flex min-h-10 items-center justify-center gap-2 rounded-xl border border-black/15 bg-white/70 px-4 py-2.5 font-bold uppercase text-[#171816] transition hover:border-[#ffd100] dark:border-white/15 dark:bg-white/5 dark:text-[#f2f0ea]"
            >
              <FontAwesomeIcon icon={faMotorcycle} className={icon} />
              Motos
            </motion.button>
          </div>
        </motion.div>

        {/* MOBILE QUICK-ACTION TILES (Call / Email / Atelier) */}
        <div className="mb-7 grid grid-cols-3 gap-2 md:hidden">
          <a
            href="tel:+261340000000"
            className="glass-panel flex flex-col items-center justify-center gap-1.5 rounded-xl p-3 text-center active:scale-95"
          >
            <span className="grid h-8 w-8 place-items-center rounded-full bg-[#ffd100] text-xs text-[#171816]">
              <FontAwesomeIcon icon={faPhone} />
            </span>
            <span className="text-[11px] font-bold">Appeler</span>
            <span className="truncate text-[9px] text-black/50 dark:text-white/50">+261 34 00…</span>
          </a>

          <a
            href="mailto:contact@funbike.mg"
            className="glass-panel flex flex-col items-center justify-center gap-1.5 rounded-xl p-3 text-center active:scale-95"
          >
            <span className="grid h-8 w-8 place-items-center rounded-full bg-[#ffd100] text-xs text-[#171816]">
              <FontAwesomeIcon icon={faEnvelope} />
            </span>
            <span className="text-[11px] font-bold">Email</span>
            <span className="truncate text-[9px] text-black/50 dark:text-white/50">contact@…</span>
          </a>

          <button
            type="button"
            onClick={() => go("pieces")}
            className="glass-panel flex flex-col items-center justify-center gap-1.5 rounded-xl p-3 text-center active:scale-95"
          >
            <span className="grid h-8 w-8 place-items-center rounded-full bg-[#ffd100] text-xs text-[#171816]">
              <FontAwesomeIcon icon={faGears} />
            </span>
            <span className="text-[11px] font-bold">Atelier</span>
            <span className="truncate text-[9px] text-black/50 dark:text-white/50">Pièces & SAV</span>
          </button>
        </div>

        {/* MAIN FOOTER GRID */}
        <div className="grid gap-8 border-b border-black/10 pb-8 md:grid-cols-[1.35fr_0.95fr_0.9fr] md:gap-12 dark:border-white/15">
          {/* Brand + mini partner strip */}
          <div>
            <div className="flex items-center justify-between gap-4">
              <button onClick={() => go("home")} aria-label="Retour à l'accueil">
                <BrandMark large />
              </button>
              <motion.button
                type="button"
                whileTap={{ scale: 0.9 }}
                onClick={scrollTop}
                aria-label="Remonter en haut de la page"
                className="glass-panel grid h-10 w-10 place-items-center rounded-full text-xs text-[#171816] md:hidden dark:text-[#f2f0ea]"
              >
                <FontAwesomeIcon icon={faArrowUp} />
              </motion.button>
            </div>

            <p className="fluid-body mt-4 max-w-sm text-black/65 dark:text-white/60">
              Le terrain change. La passion reste. Motos Sherco, Fantic & TVS, pièces d'origine et équipements pilote pour les routes de Madagascar.
            </p>

            {/* Mini brand pills */}
            <div className="mt-4 flex flex-wrap gap-1.5">
              {BRANDS.slice(0, 6).map((b) => (
                <span
                  key={b.name}
                  className="rounded-full border border-black/10 bg-white/70 px-2.5 py-0.5 text-[10px] font-semibold text-black/65 dark:border-white/10 dark:bg-white/5 dark:text-white/65"
                >
                  {b.name}
                </span>
              ))}
            </div>
          </div>

          {/* Navigation — interactive pills on mobile, clean list on desktop */}
          <div>
            <p className={label}>Explorer</p>
            <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
              {NAV.map((item) => (
                <motion.button
                  key={item.key}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => go(item.key)}
                  className="group flex items-center justify-between rounded-xl border border-black/10 bg-white/60 px-3 py-2.5 text-left text-xs font-semibold text-[#171816] transition hover:border-[#ffd100] hover:bg-white md:rounded-none md:border-0 md:bg-transparent md:px-0 md:py-1.5 md:text-sm dark:border-white/10 dark:bg-white/5 dark:text-white/80 dark:hover:bg-white/10 md:dark:bg-transparent"
                >
                  <span>{item.label}</span>
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    className="text-[10px] text-[#98741b] opacity-70 transition group-hover:translate-x-0.5 md:opacity-0 md:group-hover:opacity-100 dark:text-[#ffd100]"
                  />
                </motion.button>
              ))}
            </div>
          </div>

          {/* Contact details */}
          <div className="hidden md:block">
            <p className={label}>Nous trouver</p>
            <ul className="space-y-3 text-sm text-black/65 dark:text-white/65">
              <li className="flex items-start gap-3">
                <FontAwesomeIcon icon={faLocationDot} className={"mt-1 " + icon} />
                <span>
                  Showroom & atelier Funbike
                  <br />
                  Antananarivo, Madagascar
                </span>
              </li>
              <li className="flex items-center gap-3">
                <FontAwesomeIcon icon={faPhone} className={icon} />
                <a href="tel:+261340000000" className="hover:underline">
                  +261 34 00 000 00
                </a>
              </li>
              <li className="flex items-center gap-3">
                <FontAwesomeIcon icon={faEnvelope} className={icon} />
                <a href="mailto:contact@funbike.mg" className="hover:underline">
                  contact@funbike.mg
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-5 text-[10px] uppercase tracking-[0.12em] text-black/50 dark:text-white/45">
          <span>© {new Date().getFullYear()} Funbike Madagascar</span>

          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={onCookies}
              className="inline-flex items-center gap-1.5 rounded-full border border-black/15 bg-white/60 px-3 py-1 font-bold uppercase transition hover:border-[#ffd100] hover:text-[#171816] dark:border-white/15 dark:bg-white/5 dark:hover:text-[#ffd100]"
            >
              <FontAwesomeIcon icon={faCookieBite} className={icon} /> Cookies
            </button>
            <span className="inline-flex items-center gap-1.5">
              <FontAwesomeIcon icon={faSun} className={icon} /> Lun – sam · 8h–17h30
            </span>
            <motion.button
              type="button"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.92 }}
              onClick={scrollTop}
              aria-label="Haut de page"
              className="hidden h-8 w-8 place-items-center rounded-full border border-black/15 bg-white/70 text-[#171816] transition hover:border-[#ffd100] md:grid dark:border-white/15 dark:bg-white/10 dark:text-white"
            >
              <FontAwesomeIcon icon={faArrowUp} />
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function Section({
  title,
  subtitle,
  children,
  id,
  number,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
  id?: string;
  number?: string;
}) {
  return (
    <section id={id} className="mx-auto max-w-[1440px] px-4 py-10 sm:px-7 sm:py-16 lg:px-10 lg:py-20">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3 border-t border-black/15 pt-4 dark:border-white/15 sm:mb-10">
        <div>
          <p className="fluid-eyebrow mb-2 font-bold uppercase text-[#a27b17] dark:text-[#ffd100]">
            {number ?? "Funbike / sélection"}
          </p>
          <h2 className="fluid-h2 font-display font-semibold text-[#171816] dark:text-[#f2f0ea]">
            {title}
          </h2>
        </div>
        {subtitle && <p className="fluid-body max-w-sm text-black/55 dark:text-white/55">{subtitle}</p>}
      </div>
      {children}
    </section>
  );
}

export function PageHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="border-b border-black/10 bg-[#fff9df]/80 backdrop-blur-xl dark:border-white/10 dark:bg-[#1c1d19]/80"
    >
      <div className="mx-auto grid max-w-[1440px] gap-4 px-4 py-9 sm:px-7 sm:py-14 lg:grid-cols-[1fr_0.55fr] lg:items-end lg:px-10 lg:py-16">
        <div>
          <p className="fluid-eyebrow mb-2.5 font-bold uppercase text-[#a27b17] dark:text-[#ffd100]">
            Funbike / Madagascar
          </p>
          <h1 className="fluid-h1 font-display font-semibold text-[#171816] dark:text-[#f2f0ea]">
            {title}
          </h1>
        </div>
        <p className="fluid-body max-w-md text-black/60 dark:text-white/60 lg:justify-self-end">{subtitle}</p>
      </div>
    </motion.section>
  );
}
